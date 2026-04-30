'use client'

import { useEffect, useState } from 'react'
import { create } from 'zustand'

interface UserState {
  role: 'student' | 'teacher'
  name: string
  setRole: (role: 'student' | 'teacher') => void
  setName: (name: string) => void
}

interface ProgressState {
  completedLessons: string[]
  currentLesson: string | null
  lessonProgress: Record<string, number>
  markCompleted: (lessonId: string) => void
  setProgress: (lessonId: string, progress: number) => void
}

interface QuizState {
  records: Array<{
    lessonId: string
    score: number
    total: number
    completedAt: string
  }>
  addRecord: (lessonId: string, score: number, total: number) => void
}

export const useUserStore = create<UserState>((set) => ({
  role: 'student',
  name: '',
  setRole: (role) => set({ role }),
  setName: (name) => set({ name }),
}))

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedLessons: [],
  currentLesson: null,
  lessonProgress: {},
  markCompleted: (lessonId) => {
    const { completedLessons } = get()
    if (!completedLessons.includes(lessonId)) {
      set({ completedLessons: [...completedLessons, lessonId] })
      localStorage.setItem('completedLessons', JSON.stringify([...completedLessons, lessonId]))
    }
  },
  setProgress: (lessonId, progress) => {
    const { lessonProgress } = get()
    set({ 
      lessonProgress: { ...lessonProgress, [lessonId]: progress },
      currentLesson: lessonId 
    })
    localStorage.setItem('lessonProgress', JSON.stringify({ ...lessonProgress, [lessonId]: progress }))
  },
}))

export const useQuizStore = create<QuizState>((set, get) => ({
  records: [],
  addRecord: (lessonId, score, total) => {
    const { records } = get()
    const newRecords = [...records, {
      lessonId,
      score,
      total,
      completedAt: new Date().toISOString()
    }]
    set({ records: newRecords })
    localStorage.setItem('quizRecords', JSON.stringify(newRecords))
  },
}))

export function useHydration() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const completedLessons = localStorage.getItem('completedLessons')
    const lessonProgress = localStorage.getItem('lessonProgress')
    const quizRecords = localStorage.getItem('quizRecords')
    
    if (completedLessons) {
      useProgressStore.setState({ completedLessons: JSON.parse(completedLessons) })
    }
    if (lessonProgress) {
      useProgressStore.setState({ lessonProgress: JSON.parse(lessonProgress) })
    }
    if (quizRecords) {
      useQuizStore.setState({ records: JSON.parse(quizRecords) })
    }
    
    setHydrated(true)
  }, [])

  return hydrated
}
