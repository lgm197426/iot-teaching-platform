'use client'

import Link from 'next/link'
import { simulators } from '@/data/simulator'
import { curriculum } from '@/data/curriculum'

export default function SimulatorListPage() {
  const simulatorTypes = [
    { type: 'sensor', name: '传感器', icon: '🌡️', color: 'bg-red-500' },
    { type: 'rfid', name: 'RFID', icon: '🎴', color: 'bg-blue-500' },
    { type: 'bluetooth', name: '蓝牙', icon: '📶', color: 'bg-purple-500' },
    { type: 'mqtt', name: 'MQTT', icon: '📨', color: 'bg-green-500' },
    { type: 'lock', name: '门锁', icon: '🔐', color: 'bg-yellow-500' },
    { type: 'home', name: '智能家居', icon: '🏠', color: 'bg-indigo-500' },
    { type: 'visualization', name: '可视化', icon: '📊', color: 'bg-pink-500' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">物联网实践模拟器</h1>
        <p className="text-gray-600">
          {simulators.length}个模拟器 · 覆盖传感器、通信、智能家居等场景
        </p>
      </div>

      {/* 模拟器分类 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">模拟器分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {simulatorTypes.map((st) => {
            const count = simulators.filter(s => s.type === st.type).length
            return (
              <div key={st.type} className="card text-center">
                <div className={`w-12 h-12 ${st.color} rounded-xl mx-auto mb-2 flex items-center justify-center text-white text-2xl`}>
                  {st.icon}
                </div>
                <div className="font-medium text-gray-900">{st.name}</div>
                <div className="text-xs text-gray-500">{count}个</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 模拟器列表 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">全部模拟器</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulators.map((sim) => {
            const relatedLessons = curriculum
              .flatMap(u => u.lessons)
              .filter(l => sim.lessonIds.includes(l.id))

            return (
              <Link
                key={sim.id}
                href={`/simulator/${sim.id}`}
                className="card-hover group"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {sim.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                      {sim.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {sim.description}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      关联课程：{relatedLessons.length}课
                    </span>
                    <span className="text-primary-600 group-hover:underline">
                      打开模拟器 →
                    </span>
                  </div>
                  {relatedLessons.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {relatedLessons.slice(0, 2).map(lesson => (
                        <span key={lesson.id} className="badge text-xs bg-gray-100 text-gray-600">
                          第{lesson.number}课
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 使用说明 */}
      <section className="mt-8">
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span>💡</span> 使用提示
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 模拟器支持离线使用，数据保存在本地</li>
            <li>• 实验数据可导出为CSV格式，用于报告撰写</li>
            <li>• 教师可使用"演示模式"进行课堂投屏教学</li>
            <li>• 每个模拟器都配有详细的实验指导步骤</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
