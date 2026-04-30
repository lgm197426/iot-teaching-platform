'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import { curriculum } from '@/data/curriculum'
import { simulators } from '@/data/simulator'

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string

  let currentLesson = null
  let currentUnit = null
  let prevLesson = null
  let nextLesson = null

  for (const unit of curriculum) {
    const lessonIndex = unit.lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex !== -1) {
      currentLesson = unit.lessons[lessonIndex]
      currentUnit = unit
      prevLesson = lessonIndex > 0 ? unit.lessons[lessonIndex - 1] : null
      nextLesson = lessonIndex < unit.lessons.length - 1 ? unit.lessons[lessonIndex + 1] : null
      break
    }
  }

  if (!currentLesson || !currentUnit) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">课程未找到</h1>
        <p className="text-gray-500 mb-6">该课程可能已被移除</p>
        <Link href="/course" className="btn-primary">
          返回课程列表
        </Link>
      </div>
    )
  }

  const simulator = currentLesson.simulatorId 
    ? simulators.find(s => s.id === currentLesson.simulatorId) 
    : null

  return (
    <div className="max-w-5xl mx-auto">
      {/* 面包屑 */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/course" className="hover:text-primary-600">教材学习</Link>
        <span className="mx-2">/</span>
        <span>第{currentUnit.number}单元 {currentUnit.name}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">第{currentLesson.number}课</span>
      </nav>

      {/* 课程头部 */}
      <header className="mb-6 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-white/20 text-white">
                第{currentUnit.number}单元
              </span>
              <span className="badge bg-white/20 text-white">
                第{currentLesson.number}课
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{currentLesson.name}</h1>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span>⏱️ {currentLesson.duration}分钟</span>
              {simulator && <span>🔬 {simulator.name}</span>}
              <span>📝 {currentLesson.quizIds.length}道测验题</span>
            </div>
          </div>
          <div className="text-6xl opacity-20">📖</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧内容 */}
        <main className="lg:col-span-2">
          {/* 教学目标 */}
          <section className="card mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span>🎯</span> 教学目标
            </h2>
            <ul className="space-y-2">
              {currentLesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 重点难点 */}
          <section className="card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>⭐</span> 重点
                </h3>
                <ul className="space-y-1">
                  {currentLesson.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary-600">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>⚠️</span> 难点
                </h3>
                <ul className="space-y-1">
                  {currentLesson.difficulties.map((diff, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 课程内容 */}
          <section className="card mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📝</span> 课程内容
            </h2>
            <article className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-5">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-4">{children}</h3>,
                  p: ({ children }) => <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  code: ({ className, children }) => {
                    if (className) {
                      return <code className={className}>{children}</code>
                    }
                    return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-primary-700">{children}</code>
                  },
                  pre: ({ children }) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">{children}</pre>,
                  table: ({ children }) => <table className="min-w-full border-collapse mb-4">{children}</table>,
                  thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
                  th: ({ children }) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold">{children}</th>,
                  td: ({ children }) => <td className="border border-gray-300 px-4 py-2">{children}</td>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-primary-500 pl-4 my-4 text-gray-700">{children}</blockquote>,
                }}
              >
                {currentLesson.content}
              </ReactMarkdown>
            </article>
          </section>

          {/* 课程导航 */}
          <section className="flex justify-between items-center gap-4">
            {prevLesson ? (
              <Link href={`/course/${prevLesson.id}`} className="btn-secondary flex-1">
                <span>←</span>
                <span>上一课：{prevLesson.name}</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextLesson ? (
              <Link href={`/course/${nextLesson.id}`} className="btn-primary flex-1">
                <span>下一课：{nextLesson.name}</span>
                <span>→</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </section>
        </main>

        {/* 右侧边栏 */}
        <aside className="space-y-4">
          {/* 开始测验 */}
          <div className="card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span>✏️</span> 随堂测验
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              本课共{currentLesson.quizIds.length}道测验题
            </p>
            <Link href={`/quiz?lesson=${currentLesson.id}`} className="btn-primary w-full">
              开始测验
            </Link>
          </div>

          {/* 实验模拟 */}
          {simulator && (
            <div className="card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span>🔬</span> 实践模拟
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {simulator.description}
              </p>
              <Link href={`/simulator/${simulator.id}`} className="btn-success w-full">
                打开模拟器
              </Link>
            </div>
          )}

          {/* 学习进度 */}
          <div className="card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span>📊</span> 学习进度
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">完成度</span>
                <span className="text-primary-600 font-medium">0%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full btn-sm btn-secondary">
                <span>⭐</span> 标记为重点
              </button>
              <button className="w-full btn-sm btn-secondary">
                <span>✅</span> 标记已学完
              </button>
            </div>
          </div>

          {/* 相关课程 */}
          <div className="card">
            <h3 className="font-semibold mb-3">本单元其他课程</h3>
            <ul className="space-y-2">
              {currentUnit.lessons.filter(l => l.id !== lessonId).slice(0, 3).map(lesson => (
                <li key={lesson.id}>
                  <Link 
                    href={`/course/${lesson.id}`}
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    第{lesson.number}课 {lesson.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
