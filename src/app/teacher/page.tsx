'use client'

import { useState } from 'react'
import Link from 'next/link'
import { curriculum } from '@/data/curriculum'
import { clsx } from 'clsx'

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState<'homework' | 'students' | 'projection' | 'data'>('homework')
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedClass, setSelectedClass] = useState('八年级(1)班')
  const [selectedLesson, setSelectedLesson] = useState('')
  const [deadline, setDeadline] = useState('')

  const tabs = [
    { id: 'homework', name: '作业管理', icon: '📋' },
    { id: 'students', name: '学生数据', icon: '👥' },
    { id: 'projection', name: '课堂投屏', icon: '🖥️' },
    { id: 'data', name: '数据统计', icon: '📊' },
  ]

  const mockStudents = [
    { id: 1, name: '张小明', class: '八年级(1)班', progress: 85, quizScore: 82, experiments: 6 },
    { id: 2, name: '李小红', class: '八年级(1)班', progress: 92, quizScore: 88, experiments: 7 },
    { id: 3, name: '王小刚', class: '八年级(1)班', progress: 78, quizScore: 75, experiments: 5 },
    { id: 4, name: '赵小芳', class: '八年级(1)班', progress: 90, quizScore: 85, experiments: 8 },
  ]

  const handlePublishHomework = () => {
    if (!selectedLesson) {
      alert('请选择课程！')
      return
    }
    if (!deadline) {
      alert('请选择截止时间！')
      return
    }
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">教师后台</h1>
        <p className="text-gray-600">
          作业管理 · 学生数据 · 课堂投屏 · 数据统计
        </p>
      </div>

      {/* Tab导航 */}
      <div className="mb-6 border-b">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                'px-4 py-3 font-medium transition-colors border-b-2 -mb-[2px]',
                activeTab === tab.id
                  ? 'text-primary-700 border-primary-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              )}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab内容 */}
      {activeTab === 'homework' && (
        <div className="space-y-6">
          {/* 发布作业 */}
          <section className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>➕</span> 发布新作业
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">选择班级</label>
                <select 
                  className="select-field"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option>八年级(1)班</option>
                  <option>八年级(2)班</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">选择课程</label>
                <select 
                  className="select-field"
                  value={selectedLesson}
                  onChange={(e) => setSelectedLesson(e.target.value)}
                >
                  <option value="">请选择课程</option>
                  {curriculum.flatMap(u => u.lessons).slice(0, 10).map(l => (
                    <option key={l.id} value={l.id}>第{l.number}课 {l.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">截止时间</label>
                <input 
                  type="date" 
                  className="input-field"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
            <button className="btn-primary" onClick={handlePublishHomework}>发布作业</button>
            {showSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                ✅ 作业发布成功！
              </div>
            )}
          </section>

          {/* 作业列表 */}
          <section className="card">
            <h2 className="text-xl font-semibold mb-4">已发布作业</h2>
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-gray-500">暂无已发布作业</p>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>👥</span> 学生数据
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-700">姓名</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">班级</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">学习进度</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">测验平均分</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">实验完成</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((student) => (
                  <tr key={student.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{student.name}</td>
                    <td className="px-4 py-3 text-gray-600">{student.class}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${student.progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{student.quizScore}分</td>
                    <td className="px-4 py-3 text-gray-600">{student.experiments}个</td>
                    <td className="px-4 py-3">
                      <button className="btn-sm btn-secondary">查看详情</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'projection' && (
        <div className="space-y-6">
          <section className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>🖥️</span> 课堂投屏
            </h2>
            <p className="text-gray-600 mb-4">
              选择要投屏展示的内容，系统将进入全屏演示模式
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/course" className="card-hover text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="font-medium">教材内容</div>
                <div className="text-sm text-gray-500">投屏知识点讲解</div>
              </Link>
              <Link href="/simulator" className="card-hover text-center">
                <div className="text-4xl mb-2">🔬</div>
                <div className="font-medium">实验演示</div>
                <div className="text-sm text-gray-500">投屏模拟器演示</div>
              </Link>
              <Link href="/quiz" className="card-hover text-center">
                <div className="text-4xl mb-2">✏️</div>
                <div className="font-medium">课堂测验</div>
                <div className="text-sm text-gray-500">投屏测验统计</div>
              </Link>
            </div>
          </section>

          <section className="card bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">💡 使用提示</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 按 F11 进入浏览器全屏模式</li>
              <li>• 建议使用教室投影仪投屏到白板</li>
              <li>• 学生可通过学生端同步查看内容</li>
            </ul>
          </section>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-4">班级整体情况</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">平均学习进度</span>
                  <span className="font-medium">86%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '86%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">测验平均分</span>
                  <span className="font-medium">82分</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">实验完成率</span>
                  <span className="font-medium">78%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">单元掌握情况</h3>
            <div className="space-y-2">
              {curriculum.slice(0, 6).map((unit, idx) => (
                <div key={unit.id} className="flex items-center gap-2">
                  <span className="w-20 text-sm text-gray-600">第{unit.number}单元</span>
                  <div className="flex-1 progress-bar">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${Math.max(20, 90 - idx * 10)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{Math.max(20, 90 - idx * 10)}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card md:col-span-2">
            <h3 className="font-semibold mb-4">数据导出</h3>
            <div className="flex gap-4">
              <button className="btn-secondary">📥 导出学生成绩</button>
              <button className="btn-secondary">📥 导出学习报告</button>
              <button className="btn-secondary">📥 导出测验统计</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
