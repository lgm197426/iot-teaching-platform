'use client'

import { useState } from 'react'

interface RFIDTag {
  id: string
  name: string
  type: 'active' | 'passive'
  authorized: boolean
}

interface AccessLog {
  timestamp: Date
  tagId: string
  tagName: string
  action: 'granted' | 'denied'
}

export default function RFIDSimulator() {
  const [tags, setTags] = useState<RFIDTag[]>([
    { id: 'TAG001', name: '学生卡-张明', type: 'passive', authorized: true },
    { id: 'TAG002', name: '学生卡-李华', type: 'passive', authorized: true },
    { id: 'TAG003', name: '教师卡-王老师', type: 'active', authorized: true },
  ])
  const [logs, setLogs] = useState<AccessLog[]>([])
  const [isReading, setIsReading] = useState(false)
  const [doorOpen, setDoorOpen] = useState(false)
  const [showAddTag, setShowAddTag] = useState(false)
  const [newTag, setNewTag] = useState({ id: '', name: '', type: 'passive' as const })

  const handleSwipe = (tag: RFIDTag) => {
    setIsReading(true)
    setDoorOpen(false)
    
    setTimeout(() => {
      setIsReading(false)
      const granted = tag.authorized
      setDoorOpen(granted)
      
      setLogs(prev => [{
        timestamp: new Date(),
        tagId: tag.id,
        tagName: tag.name,
        action: granted ? ('granted' as const) : ('denied' as const)
      }, ...prev].slice(0, 20))
      
      if (granted) {
        setTimeout(() => setDoorOpen(false), 3000)
      }
    }, 1000)
  }

  const addTag = () => {
    if (newTag.id && newTag.name) {
      setTags(prev => [...prev, { ...newTag, authorized: false }])
      setNewTag({ id: '', name: '', type: 'passive' })
      setShowAddTag(false)
    }
  }

  const toggleAuthorization = (tagId: string) => {
    setTags(prev => prev.map(t => 
      t.id === tagId ? { ...t, authorized: !t.authorized } : t
    ))
  }

  const deleteTag = (tagId: string) => {
    setTags(prev => prev.filter(t => t.id !== tagId))
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">🎴 实验说明</h3>
        <p className="text-sm text-blue-800">
          本模拟器演示RFID门禁系统工作原理。选择一张RFID卡片，点击"刷卡"模拟刷卡操作。
          观察系统是否识别卡片、判断权限、记录日志。可添加新卡片、设置授权。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">🏷️ RFID卡片列表</h3>
              <button 
                onClick={() => setShowAddTag(true)}
                className="btn-sm btn-primary"
              >
                ➕ 添加卡片
              </button>
            </div>

            <div className="space-y-2">
              {tags.map(tag => (
                <div 
                  key={tag.id}
                  className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tag.type === 'active' ? '🔋' : '🏷️'}</span>
                    <div>
                      <div className="font-medium text-gray-900">{tag.name}</div>
                      <div className="text-xs text-gray-500">
                        ID: {tag.id} | {tag.type === 'active' ? '有源' : '无源'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAuthorization(tag.id)}
                      className={`btn-sm ${tag.authorized ? 'btn-success' : 'btn-secondary'}`}
                    >
                      {tag.authorized ? '✅ 已授权' : '❌ 未授权'}
                    </button>
                    <button 
                      onClick={() => handleSwipe(tag)}
                      disabled={isReading}
                      className="btn-sm btn-primary disabled:opacity-50"
                    >
                      刷卡
                    </button>
                    <button 
                      onClick={() => deleteTag(tag.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showAddTag && (
            <div className="card">
              <h3 className="font-semibold mb-3">➕ 添加新卡片</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">卡片ID</label>
                  <input
                    type="text"
                    value={newTag.id}
                    onChange={(e) => setNewTag({ ...newTag, id: e.target.value })}
                    placeholder="如: TAG004"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">卡片名称</label>
                  <input
                    type="text"
                    value={newTag.name}
                    onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                    placeholder="如: 学生卡-王芳"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">卡片类型</label>
                  <select
                    value={newTag.type}
                    onChange={(e) => setNewTag({ ...newTag, type: e.target.value as any })}
                    className="select-field text-sm"
                  >
                    <option value="passive">无源标签（需要读写器供电）</option>
                    <option value="active">有源标签（自带电池）</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={addTag} className="btn-primary btn-sm">添加</button>
                  <button onClick={() => setShowAddTag(false)} className="btn-secondary btn-sm">取消</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-4">🚪 门禁系统</h3>
            
            <div className="relative bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
              {isReading ? (
                <div className="text-center">
                  <div className="text-4xl animate-pulse mb-2">📡</div>
                  <p className="text-gray-600">正在读取卡片...</p>
                </div>
              ) : doorOpen ? (
                <div className="text-center">
                  <div className="text-6xl mb-2">🚪</div>
                  <p className="text-green-600 font-semibold">门已打开</p>
                  <p className="text-sm text-gray-500 mt-1">3秒后自动关闭</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-2">🔒</div>
                  <p className="text-gray-600">门已锁定</p>
                  <p className="text-sm text-gray-500 mt-1">请刷卡开门</p>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="p-2 bg-green-50 rounded text-center">
                <div className="text-green-600 font-medium">授权卡片</div>
                <div className="text-2xl font-bold text-green-700">
                  {tags.filter(t => t.authorized).length}
                </div>
              </div>
              <div className="p-2 bg-red-50 rounded text-center">
                <div className="text-red-600 font-medium">未授权卡片</div>
                <div className="text-2xl font-bold text-red-700">
                  {tags.filter(t => !t.authorized).length}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">📋 刷卡记录</h3>
            {logs.length > 0 ? (
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {logs.map((log, idx) => (
                  <div 
                    key={idx}
                    className={`p-2 rounded text-sm ${
                      log.action === 'granted' ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={log.action === 'granted' ? 'text-green-700' : 'text-red-700'}>
                        {log.action === 'granted' ? '✅ 允许通行' : '❌ 拒绝通行'}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      {log.tagName} ({log.tagId})
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">暂无刷卡记录</p>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">💡 实验思考</h3>
        <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
          <li>有源标签和无源标签有什么区别？（提示：供电方式、读取距离）</li>
          <li>为什么需要设置卡片授权？不授权会怎样？</li>
          <li>RFID门禁系统相比传统钥匙有哪些优势？（提示：安全性、便捷性、可追溯）</li>
        </ol>
      </div>
    </div>
  )
}
