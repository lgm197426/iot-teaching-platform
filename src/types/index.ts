export type UserRole = 'student' | 'teacher'

export interface User {
  id: string
  name: string
  role: UserRole
  avatar?: string
  classId?: string
  createdAt: string
}

export interface Unit {
  id: string
  number: number
  name: string
  description: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  unitId: string
  number: number
  name: string
  duration: number
  objectives: string[]
  keyPoints: string[]
  difficulties: string[]
  content: string
  videoUrl?: string
  simulatorId?: string
  quizIds: string[]
}

export interface KnowledgePoint {
  id: string
  lessonId: string
  title: string
  content: string
  examples?: string[]
  notes?: string
}

export interface Simulator {
  id: string
  name: string
  type: SimulatorType
  description: string
  icon: string
  lessonIds: string[]
  devices: Device[]
  guide: string
}

export type SimulatorType = 'sensor' | 'rfid' | 'bluetooth' | 'mqtt' | 'lock' | 'home' | 'visualization'

export interface Device {
  id: string
  name: string
  type: string
  icon: string
  parameters: DeviceParameter[]
  defaultValue: Record<string, any>
}

export interface DeviceParameter {
  key: string
  label: string
  type: 'number' | 'string' | 'select' | 'boolean'
  unit?: string
  min?: number
  max?: number
  step?: number
  options?: { label: string; value: any }[]
  defaultValue: any
}

export interface ExperimentRecord {
  id: string
  userId: string
  simulatorId: string
  simulatorType: SimulatorType
  name: string
  config: Record<string, any>
  data: any[]
  result?: string
  createdAt: string
  updatedAt: string
}

export interface Quiz {
  id: string
  lessonId: string
  type: QuizType
  question: string
  options?: QuizOption[]
  answer: string | string[]
  analysis: string
  difficulty: 1 | 2 | 3
  points: number
  knowledgePoint: string
}

export type QuizType = 'single' | 'multiple' | 'judge' | 'fill' | 'short'

export interface QuizOption {
  label: string
  content: string
}

export interface QuizRecord {
  id: string
  userId: string
  quizId: string
  userAnswer: string | string[]
  isCorrect: boolean
  score: number
  createdAt: string
}

export interface WrongQuestion {
  id: string
  userId: string
  quizId: string
  quiz: Quiz
  wrongCount: number
  lastWrongAt: string
  mastered: boolean
}

export interface LessonPlan {
  id: string
  lessonId: string
  teacherId: string
  templateType: 'lecture' | 'inquiry' | 'project'
  objectives: string[]
  keyPoints: string[]
  difficulties: string[]
  procedures: TeachingProcedure[]
  boardDesign: string
  activities: Activity[]
  homework: string[]
  createdAt: string
  updatedAt: string
}

export interface TeachingProcedure {
  step: number
  name: string
  duration: number
  content: string
  method: string
}

export interface Activity {
  name: string
  type: 'discussion' | 'group' | 'experiment' | 'quiz'
  description: string
  duration: number
  materials?: string[]
}

export interface UserProgress {
  lessonId: string
  status: 'not_started' | 'in_progress' | 'completed'
  progress: number
  lastVisitAt: string
  completedAt?: string
}

export interface ClassInfo {
  id: string
  name: string
  grade: string
  teacherId: string
  studentIds: string[]
  createdAt: string
}
