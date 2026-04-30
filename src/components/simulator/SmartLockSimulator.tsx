'use client'

import { useState } from 'react'

interface UnlockLog {
  timestamp: Date
  method: 'password' | 'fingerprint' | 'card' | 'remote' | 'face'
  userId: string
  success: boolean
}

interface User {
  id: string
  name: string
  password?: string
  fingerprint?: boolean
  cardId?: string
  faceId?: boolean
}

export default function SmartLockSimulator() {
  const [isLocked, setIsLocked] = useState(true)
  const [logs, setLogs] = useState<UnlockLog[]>([])
  const [battery, setBattery] = useState(85)
  const [showKeypad, setShowKeypad] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [showFaceDetect, setShowFaceDetect] = useState(false)
  
  const [users] = useState<User[]>([
    { id: 'U001', name: '张明', password: '123456', fingerprint: true, cardId: 'CARD001', faceId: true },
    { id: 'U002', name: '李华', password: '654321', fingerprint: true, cardId: 'CARD002', faceId: false },
    { id: 'U003', name: '王老师', password: '888888', fingerprint: false, cardId: 'CARD003', faceId: true },
  ])

  const addLog = (method: UnlockLog['method'], userId: string, success: boolean) => {
    setLogs(prev => [{
      timestamp: new Date(),
      method,
      userId,
      success
    }, ...prev].slice(0, 30))
    
    if (success) {
      setIsLocked(false)
      setBattery(prev => Math.max(0, prev - 0.5))
      setTimeout(() => setIsLocked(true), 5000)
    }
  }

  const getMethodIcon = (method: UnlockLog['method']) => {
    const icons = {
      password: '🔢',
      fingerprint: '👆',
      card: '💳',
      remote: '📱',
      face: '👤'
    }
    return icons[method]
  }

  const getMethodName = (method: UnlockLog['method']) => {
    const names = {
      password: '密码开锁',
      fingerprint: '指纹开锁',
      card: '刷卡开锁',
      remote: '远程开锁',
      face: '人脸识别'
    }
    return names[method]
  }

  const handlePasswordUnlock = () => {
    const user = users.find(u => u.password === inputPassword)
    addLog('password', user?.id || 'unknown', !!user)
    setInputPassword('')
    setShowKeypad(false)
  }

  const handleFingerprintUnlock = (user: User) => {
    if (user.fingerprint) {
      addLog('fingerprint', user.id, true)
    }
  }

  const handleCardUnlock = (user: User) => {
    if (user.cardId) {
      addLog('card', user.id, true)
    }
  }

  const handleRemoteUnlock = (user: User) => {
    addLog('remote', user.id, true)
  }

  const handleFaceUnlock = (user: User) => {
    if (user.faceId) {
      addLog('face', user.id, true)
      setShowFaceDetect(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">🔐 实验说明</h3>
        <p className="text-sm text-blue-800">
          本模拟器演示智能门锁的多种开锁方式：密码、指纹、刷卡、远程开锁、人脸识别。
          选择不同方式体验开锁流程，观察安全日志记录。支持查看电量、管理用户权限。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-4">🚪 智能门锁</h3>
            
            <div className="relative bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl p-8 flex items-center justify-center min-h-[300px]">
              {showFaceDetect ? (
                <div className="text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-4 border-4 border-blue-400 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-6xl">👤</span>
                  </div>
                  <p className="mb-4">请对准摄像头</p>
                  <div className="space-y-2">
                    {users.filter(u => u.faceId).map(user => (
                      <button
                        key={user.id}
                        onClick={() => handleFaceUnlock(user)}
                        className="btn-sm btn-success w-full"
                      >
                        识别为 {user.name}
                      </button>
                    ))}
                    <button
                      onClick={() => setShowFaceDetect(false)}
                      className="btn-sm btn-secondary w-full"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : showKeypad ? (
                <div className="text-center text-white">
                  <div className="mb-4 text-xl">输入密码</div>
                  <div className="mb-4 text-4xl font-mono tracking-widest">
                    {'*'.repeat(inputPassword.length)}
                  </div>
                  <div className="grid grid-cols-3 gap-2 w-48 mx-auto mb-4">
                    {[1,2,3,4,5,6,7,8,9,'C',0,'✓'].map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          if (key === 'C') setInputPassword('')
                          else if (key === '✓') handlePasswordUnlock()
                          else setInputPassword(prev => prev + key)
                        }}
                        className="p-4 bg-gray-600 rounded-lg hover:bg-gray-500 font-bold text-xl"
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { setShowKeypad(false); setInputPassword('') }}
                    className="text-sm text-gray-400"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">{isLocked ? '🔒' : '🔓'}</div>
                  <div className="text-2xl font-bold mb-2">
                    {isLocked ? '门已锁定' : '门已打开'}
                  </div>
                  {!isLocked && (
                    <p className="text-sm text-gray-300">5秒后自动上锁</p>
                  )}
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                    <span>🔋 电量: {battery}%</span>
                    <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${battery > 20 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${battery}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!showKeypad && !showFaceDetect && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                <button
                  onClick={() => setShowKeypad(true)}
                  className="p-3 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition"
                >
                  <div className="text-3xl mb-1">🔢</div>
                  <div className="text-sm font-medium">密码开锁</div>
                </button>
                <button
                  onClick={() => handleFingerprintUnlock(users[0])}
                  className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition"
                >
                  <div className="text-3xl mb-1">👆</div>
                  <div className="text-sm font-medium">指纹开锁</div>
                </button>
                <button
                  onClick={() => handleCardUnlock(users[0])}
                  className="p-3 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition"
                >
                  <div className="text-3xl mb-1">💳</div>
                  <div className="text-sm font-medium">刷卡开锁</div>
                </button>
                <button
                  onClick={() => handleRemoteUnlock(users[0])}
                  className="p-3 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition"
                >
                  <div className="text-3xl mb-1">📱</div>
                  <div className="text-sm font-medium">远程开锁</div>
                </button>
                <button
                  onClick={() => setShowFaceDetect(true)}
                  className="p-3 bg-pink-50 rounded-lg text-center hover:bg-pink-100 transition"
                >
                  <div className="text-3xl mb-1">👤</div>
                  <div className="text-sm font-medium">人脸识别</div>
                </button>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">📋 开锁记录</h3>
            {logs.length > 0 ? (
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {logs.map((log, idx) => {
                  const user = users.find(u => u.id === log.userId)
                  return (
                    <div 
                      key={idx}
                      className={`p-2 rounded flex items-center justify-between ${
                        log.success ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getMethodIcon(log.method)}</span>
                        <div>
                          <div className={`text-sm font-medium ${log.success ? 'text-green-700' : 'text-red-700'}`}>
                            {getMethodName(log.method)} - {log.success ? '成功' : '失败'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user?.name || '未知用户'} | {log.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">暂无开锁记录</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3">👥 用户管理</h3>
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-2">{user.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {user.password && <span className="badge text-xs bg-blue-100 text-blue-700">密码</span>}
                    {user.fingerprint && <span className="badge text-xs bg-green-100 text-green-700">指纹</span>}
                    {user.cardId && <span className="badge text-xs bg-purple-100 text-purple-700">刷卡</span>}
                    {user.faceId && <span className="badge text-xs bg-pink-100 text-pink-700">人脸</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">📊 使用统计</h3>
            <div className="space-y-2">
              {(['password', 'fingerprint', 'card', 'remote', 'face'] as const).map(method => {
                const count = logs.filter(l => l.method === method && l.success).length
                return (
                  <div key={method} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <span>{getMethodIcon(method)}</span>
                      <span className="text-gray-600">{getMethodName(method)}</span>
                    </span>
                    <span className="font-medium text-gray-900">{count}次</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ 安全提示</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• 定期更换密码</li>
              <li>• 及时为门锁充电</li>
              <li>• 勿将密码告知他人</li>
              <li>• 发现异常及时查看日志</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">💡 实验思考</h3>
        <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
          <li>多种开锁方式如何提高安全性和便捷性？</li>
          <li>为什么需要记录开锁日志？有什么作用？</li>
          <li>电量耗尽时智能门锁应该如何应对？</li>
          <li>人脸识别相比密码有哪些优势和风险？</li>
        </ol>
      </div>
    </div>
  )
}
