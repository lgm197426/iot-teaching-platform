import Link from 'next/link'
import { curriculum } from '@/data/curriculum'
import { simulators } from '@/data/simulator'

export default function HomePage() {
  const totalLessons = curriculum.reduce((sum, unit) => sum + unit.lessons.length, 0)
  
  const quickLinks = [
    { name: '开始学习', href: '/course', icon: '📚', color: 'bg-blue-500', desc: '进入教材学习' },
    { name: '实践模拟', href: '/simulator', icon: '🔬', color: 'bg-green-500', desc: '物联网实验' },
    { name: '章节测验', href: '/quiz', icon: '✏️', color: 'bg-purple-500', desc: '检验学习效果' },
    { name: '备课中心', href: '/teaching', icon: '📝', color: 'bg-orange-500', desc: '教师专用' },
  ]

  const recentLessons = curriculum.slice(0, 2).flatMap(unit => unit.lessons.slice(0, 2))

  return (
    <div className="max-w-7xl mx-auto">
      {/* 欢迎横幅 */}
      <section className="mb-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">欢迎来到物联学堂</h1>
            <p className="text-lg opacity-90 mb-4">
              基于《义务教育信息科技 八年级全一册·物联网实践与探索》
            </p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span>📖</span> 6个单元
              </span>
              <span className="flex items-center gap-1">
                <span>📝</span> {totalLessons}课时
              </span>
              <span className="flex items-center gap-1">
                <span>🔬</span> {simulators.length}个模拟器
              </span>
            </div>
          </div>
          <div className="hidden md:block text-8xl opacity-20">
            🌐
          </div>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>⚡</span> 快速入口
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-hover group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${link.color} rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform`}>
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{link.name}</h3>
                  <p className="text-sm text-gray-500">{link.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最近学习 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>📚</span> 最近学习
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentLessons.map((lesson) => {
            const unit = curriculum.find(u => u.id === lesson.unitId)
            return (
              <Link
                key={lesson.id}
                href={`/course/${lesson.id}`}
                className="card-hover group"
              >
                <div className="mb-2">
                  <span className="badge-primary text-xs">
                    第{unit?.number}单元
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                  第{lesson.number}课 {lesson.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {lesson.keyPoints[0]}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 单元概览 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>📑</span> 教材目录
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {curriculum.map((unit) => (
            <Link
              key={unit.id}
              href={`/course?unit=${unit.id}`}
              className="card-hover group"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 font-bold text-lg">
                  {unit.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                    {unit.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {unit.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>📖 {unit.lessons.length}课时</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 模拟器入口 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🔬</span> 实践模拟器
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {simulators.slice(0, 4).map((sim) => (
            <Link
              key={sim.id}
              href={`/simulator/${sim.id}`}
              className="card-hover group text-center"
            >
              <div className="text-5xl mb-3">{sim.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                {sim.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {sim.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/simulator" className="btn-secondary">
            查看全部模拟器 →
          </Link>
        </div>
      </section>

      {/* 学习统计 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>📊</span> 我的学习
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">0</div>
              <div className="text-gray-500">已学习课时</div>
              <div className="mt-3">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">总进度 0%</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">0</div>
              <div className="text-gray-500">完成实验</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-500">测验成绩</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
