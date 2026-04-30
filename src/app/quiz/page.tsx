'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { quizBank } from '@/data/quiz'
import { curriculum } from '@/data/curriculum'
import { Quiz, QuizRecord, WrongQuestion } from '@/types'
import { clsx } from 'clsx'

export default function QuizPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const lessonId = searchParams.get('lesson')
  
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [userAnswers, setUserAnswers] = useState<Map<string, string | string[]>>(new Map())
  const [showResult, setShowResult] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestion[]>([])
  const [showWrongOnly, setShowWrongOnly] = useState(false)

  useEffect(() => {
    const savedWrong = localStorage.getItem('wrongQuestions')
    if (savedWrong) {
      setWrongQuestions(JSON.parse(savedWrong))
    }
  }, [])

  useEffect(() => {
    if (lessonId) {
      const lessonQuizzes = quizBank.filter(q => q.lessonId === lessonId)
      setQuizzes(lessonQuizzes)
      if (lessonQuizzes.length > 0) {
        setCurrentQuiz(lessonQuizzes[0])
        setQuizIndex(0)
      }
    }
  }, [lessonId])

  const getLessonName = (id: string) => {
    for (const unit of curriculum) {
      const lesson = unit.lessons.find(l => l.id === id)
      if (lesson) return `第${lesson.number}课 ${lesson.name}`
    }
    return id
  }

  const handleAnswer = (answer: string | string[]) => {
    if (!currentQuiz) return
    const newAnswers = new Map(userAnswers)
    newAnswers.set(currentQuiz.id, answer)
    setUserAnswers(newAnswers)
  }

  const checkAnswer = (quiz: Quiz, userAnswer: string | string[]): boolean => {
    if (Array.isArray(quiz.answer)) {
      if (!Array.isArray(userAnswer)) return false
      return JSON.stringify(quiz.answer.sort()) === JSON.stringify(userAnswer.sort())
    }
    return quiz.answer === userAnswer
  }

  const submitQuiz = () => {
    setSubmitted(true)
    setShowResult(true)
    
    const newWrong: WrongQuestion[] = []
    quizzes.forEach(quiz => {
      const userAnswer = userAnswers.get(quiz.id)
      if (!userAnswer || !checkAnswer(quiz, userAnswer)) {
        const existingWrong = wrongQuestions.find(w => w.quizId === quiz.id)
        if (existingWrong) {
          existingWrong.wrongCount++
          existingWrong.lastWrongAt = new Date().toISOString()
          existingWrong.mastered = false
        } else {
          newWrong.push({
            id: `W${Date.now()}_${quiz.id}`,
            userId: 'current',
            quizId: quiz.id,
            quiz,
            wrongCount: 1,
            lastWrongAt: new Date().toISOString(),
            mastered: false
          })
        }
      }
    })
    
    const updatedWrong = [...wrongQuestions.filter(w => !newWrong.find(n => n.quizId === w.quizId)), ...newWrong]
    setWrongQuestions(updatedWrong)
    localStorage.setItem('wrongQuestions', JSON.stringify(updatedWrong))
  }

  const nextQuiz = () => {
    if (quizIndex < quizzes.length - 1) {
      setQuizIndex(quizIndex + 1)
      setCurrentQuiz(quizzes[quizIndex + 1])
    }
  }

  const prevQuiz = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1)
      setCurrentQuiz(quizzes[quizIndex - 1])
    }
  }

  const calculateScore = () => {
    let correct = 0
    let total = 0
    quizzes.forEach(quiz => {
      total += quiz.points
      const userAnswer = userAnswers.get(quiz.id)
      if (userAnswer && checkAnswer(quiz, userAnswer)) {
        correct += quiz.points
      }
    })
    return { correct, total, percent: total > 0 ? Math.round((correct / total) * 100) : 0 }
  }

  const markMastered = (wrongId: string) => {
    const updated = wrongQuestions.map(w => 
      w.id === wrongId ? { ...w, mastered: true } : w
    )
    setWrongQuestions(updated)
    localStorage.setItem('wrongQuestions', JSON.stringify(updated))
  }

  const deleteWrong = (wrongId: string) => {
    const updated = wrongQuestions.filter(w => w.id !== wrongId)
    setWrongQuestions(updated)
    localStorage.setItem('wrongQuestions', JSON.stringify(updated))
  }

  if (!lessonId) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">测验中心</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">📝 章节测验</h2>
              {curriculum.map(unit => (
                <div key={unit.id} className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">
                    第{unit.number}单元 {unit.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {unit.lessons.map(lesson => {
                      const quizCount = quizBank.filter(q => q.lessonId === lesson.id).length
                      return (
                        <Link
                          key={lesson.id}
                          href={`/quiz?lesson=${lesson.id}`}
                          className="p-3 border rounded-lg hover:border-primary-300 hover:bg-primary-50 transition"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">第{lesson.number}课</span>
                            <span className="badge-primary text-xs">{quizCount}题</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1 truncate">{lesson.name}</div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center justify-between">
                <span>❌ 错题本</span>
                <button
                  onClick={() => setShowWrongOnly(!showWrongOnly)}
                  className="btn-sm btn-secondary"
                >
                  {showWrongOnly ? '收起' : '展开'}
                </button>
              </h3>
              {wrongQuestions.length > 0 ? (
                <div className="space-y-2">
                  {wrongQuestions.slice(0, showWrongOnly ? undefined : 3).map(wrong => (
                    <div key={wrong.id} className="p-2 bg-red-50 rounded text-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-red-700 font-medium">{wrong.quiz.question}</div>
                          <div className="text-gray-500 text-xs mt-1">
                            错误{wrong.wrongCount}次 | {getLessonName(wrong.quiz.lessonId)}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {!wrong.mastered && (
                            <button
                              onClick={() => markMastered(wrong.id)}
                              className="text-green-600 text-xs"
                              title="标记已掌握"
                            >
                              ✓
                            </button>
                          )}
                          <button
                            onClick={() => deleteWrong(wrong.id)}
                            className="text-red-600 text-xs"
                            title="删除"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">暂无错题</p>
              )}
            </div>

            <div className="card">
              <h3 className="font-semibold mb-3">📊 统计</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">总题库</span>
                  <span className="font-medium">{quizBank.length}题</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">错题数</span>
                  <span className="font-medium text-red-600">{wrongQuestions.filter(w => !w.mastered).length}题</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">📝</div>
        <h1 className="text-2xl font-bold mb-2">暂无测验题</h1>
        <p className="text-gray-500 mb-4">该课程还没有配置测验题</p>
        <Link href="/quiz" className="btn-primary">返回测验中心</Link>
      </div>
    )
  }

  const score = calculateScore()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <nav className="text-sm text-gray-500 mb-2">
          <Link href="/quiz">测验中心</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{getLessonName(lessonId)}</span>
        </nav>
        <h1 className="text-2xl font-bold">{getLessonName(lessonId)} - 测验</h1>
      </div>

      {showResult ? (
        <div className="card">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {score.percent >= 90 ? '🎉' : score.percent >= 60 ? '😊' : '😔'}
            </div>
            <h2 className="text-2xl font-bold mb-2">测验完成</h2>
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {score.correct} / {score.total} 分
            </div>
            <div className="text-lg text-gray-600">
              正确率 {score.percent}%
            </div>
            <div className="mt-4">
              <div className="progress-bar max-w-xs mx-auto">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${score.percent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">📋 答题详情</h3>
            <div className="space-y-4">
              {quizzes.map((quiz, idx) => {
                const userAnswer = userAnswers.get(quiz.id)
                const isCorrect = userAnswer && checkAnswer(quiz, userAnswer)
                
                return (
                  <div 
                    key={quiz.id}
                    className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className={clsx(
                        'w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium',
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      )}>
                        {idx + 1}
                      </span>
                      <span className="flex-1 font-medium">{quiz.question}</span>
                    </div>
                    
                    {!isCorrect && (
                      <div className="ml-8 space-y-1 text-sm">
                        <div className="text-red-600">
                          你的答案：{
                            Array.isArray(userAnswer) 
                              ? userAnswer.join(', ')
                              : userAnswer || '未作答'
                          }
                        </div>
                        <div className="text-green-600">
                          正确答案：{
                            Array.isArray(quiz.answer)
                              ? quiz.answer.join(', ')
                              : quiz.answer
                          }
                        </div>
                        <div className="text-gray-600 mt-2">
                          💡 {quiz.analysis}
                        </div>
                      </div>
                    )}
                    
                    {isCorrect && (
                      <div className="ml-8 text-sm text-gray-600">
                        ✓ 回答正确
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link href="/quiz" className="btn-secondary flex-1">返回测验中心</Link>
            <button 
              onClick={() => {
                setSubmitted(false)
                setShowResult(false)
                setUserAnswers(new Map())
                setQuizIndex(0)
                setCurrentQuiz(quizzes[0])
              }}
              className="btn-primary flex-1"
            >
              重新测验
            </button>
          </div>
        </div>
      ) : currentQuiz ? (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="badge-primary">第{quizIndex + 1}题 / 共{quizzes.length}题</span>
              <span className="badge bg-gray-100 text-gray-700">{currentQuiz.points}分</span>
            </div>
            <div className="text-sm text-gray-500">
              知识点：{currentQuiz.knowledgePoint}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">{currentQuiz.question}</h2>

            {currentQuiz.type === 'single' && currentQuiz.options && (
              <div className="space-y-2">
                {currentQuiz.options.map(option => {
                  const isSelected = userAnswers.get(currentQuiz.id) === option.label
                  return (
                    <button
                      key={option.label}
                      onClick={() => handleAnswer(option.label)}
                      className={clsx(
                        'w-full text-left p-4 rounded-lg border-2 transition',
                        isSelected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <span className="font-medium mr-2">{option.label}.</span>
                      {option.content}
                    </button>
                  )
                })}
              </div>
            )}

            {currentQuiz.type === 'multiple' && currentQuiz.options && (
              <div className="space-y-2">
                {currentQuiz.options.map(option => {
                  const selected = userAnswers.get(currentQuiz.id) as string[] | undefined
                  const isSelected = selected?.includes(option.label)
                  const toggleSelect = () => {
                    const current = (userAnswers.get(currentQuiz.id) as string[]) || []
                    const newSelected = isSelected
                      ? current.filter(l => l !== option.label)
                      : [...current, option.label]
                    handleAnswer(newSelected)
                  }
                  
                  return (
                    <button
                      key={option.label}
                      onClick={toggleSelect}
                      className={clsx(
                        'w-full text-left p-4 rounded-lg border-2 transition',
                        isSelected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <span className="font-medium mr-2">{option.label}.</span>
                      {option.content}
                    </button>
                  )
                })}
              </div>
            )}

            {currentQuiz.type === 'judge' && currentQuiz.options && (
              <div className="space-y-2">
                {currentQuiz.options.map(option => {
                  const isSelected = userAnswers.get(currentQuiz.id) === option.label
                  return (
                    <button
                      key={option.label}
                      onClick={() => handleAnswer(option.label)}
                      className={clsx(
                        'w-full text-left p-4 rounded-lg border-2 transition',
                        isSelected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <span className="font-medium mr-2">{option.label}.</span>
                      {option.content}
                    </button>
                  )
                })}
              </div>
            )}

            {currentQuiz.type === 'fill' && (
              <input
                type="text"
                value={(userAnswers.get(currentQuiz.id) as string) || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="请输入答案"
                className="input-field"
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={prevQuiz}
              disabled={quizIndex === 0}
              className="btn-secondary disabled:opacity-50"
            >
              ← 上一题
            </button>
            
            <div className="flex gap-2">
              {quizzes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuizIndex(idx)
                    setCurrentQuiz(quizzes[idx])
                  }}
                  className={clsx(
                    'w-8 h-8 rounded text-sm',
                    idx === quizIndex
                      ? 'bg-primary-600 text-white'
                      : userAnswers.has(quizzes[idx].id)
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {quizIndex === quizzes.length - 1 ? (
              <button
                onClick={submitQuiz}
                className="btn-primary"
              >
                提交答卷
              </button>
            ) : (
              <button
                onClick={nextQuiz}
                className="btn-primary"
              >
                下一题 →
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
