'use client'

import { useState } from 'react'
import Link from 'next/link'
import { curriculum } from '@/data/curriculum'
import { clsx } from 'clsx'

export default function CoursePage() {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')

  const filteredUnits = curriculum.filter(unit => {
    if (!searchKeyword) return true
    return unit.name.includes(searchKeyword) || 
           unit.lessons.some(lesson => lesson.name.includes(searchKeyword))
  })

  return (
    <div className="max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">教材同步学习</h1>
        <p className="text-gray-600">
          6个单元 {curriculum.reduce((sum, u) => sum + u.lessons.length, 0)}课时 · 对标人教版教材
        </p>
      </div>

      {/* 搜索栏 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="搜索课程..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="input-field max-w-md"
        />
      </div>

      <div className="flex gap-6">
        {/* 左侧单元导航 */}
        <aside className="w-64 flex-shrink-0">
          <div className="card sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4">单元导航</h3>
            <nav className="space-y-1">
              {filteredUnits.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
                  className={clsx(
                    'w-full text-left px-3 py-2 rounded-lg transition-colors',
                    selectedUnit === unit.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">第{unit.number}单元</span>
                    <span className="text-xs text-gray-500">{unit.lessons.length}课</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 truncate">{unit.name}</div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 右侧课程列表 */}
        <main className="flex-1">
          {filteredUnits.map((unit) => (
            <section key={unit.id} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {unit.number}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{unit.name}</h2>
                  <p className="text-sm text-gray-500">{unit.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unit.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/course/${lesson.id}`}
                    className="card-hover group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm font-medium text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-700">
                        {lesson.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                          {lesson.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {lesson.keyPoints.slice(0, 2).map((point, idx) => (
                            <span key={idx} className="badge text-xs bg-gray-100 text-gray-600">
                              {point}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>⏱️ {lesson.duration}分钟</span>
                          {lesson.simulatorId && <span>🔬 有实验</span>}
                          <span>📝 {lesson.quizIds.length}题</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
