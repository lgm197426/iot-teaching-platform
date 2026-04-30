'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useUserStore, useHydration } from '@/store'

const sidebarItems = [
  { name: '首页', href: '/', icon: '🏠', desc: '课程入口' },
  { name: '教材学习', href: '/course', icon: '📚', desc: '6单元30课' },
  { name: '备课中心', href: '/teaching', icon: '📝', desc: '教师专用' },
  { name: '实践模拟', href: '/simulator', icon: '🔬', desc: '物联网实验' },
  { name: '测验中心', href: '/quiz', icon: '✏️', desc: '检验效果' },
  { name: '教师后台', href: '/teacher', icon: '👨‍🏫', desc: '数据管理' },
]

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const hydrated = useHydration()
  const { role, setRole } = useUserStore()

  useEffect(() => {
    setMounted(true)
    const savedRole = localStorage.getItem('userRole')
    if (savedRole) {
      setRole(savedRole as 'student' | 'teacher')
    }
  }, [setRole])

  useEffect(() => {
    if (mounted && role) {
      localStorage.setItem('userRole', role)
    }
  }, [role, mounted])

  const handleRoleChange = (newRole: 'student' | 'teacher') => {
    setRole(newRole)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              aria-label="切换侧边栏"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-xl shadow-md group-hover:shadow-lg transition-shadow">
                🌐
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">物联学堂</h1>
                <p className="text-xs text-gray-500 leading-tight">八年级物联网教学</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-600">当前身份：</span>
              <span className="text-sm font-bold text-primary-700">
                {role === 'student' ? '👨‍🎓 学生' : '👨‍🏫 教师'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleRoleChange('student')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                  role === 'student' 
                    ? 'bg-primary-600 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                )}
              >
                👨‍🎓 学生
              </button>
              <button
                onClick={() => handleRoleChange('teacher')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                  role === 'teacher' 
                    ? 'bg-primary-600 text-white shadow-sm' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                )}
              >
                👨‍🏫 教师
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边栏 */}
      <aside
        className={cn(
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden',
          sidebarOpen ? 'w-64' : 'w-0'
        )}
      >
        <nav className="p-4 space-y-1 w-64">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                )}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    'font-medium text-sm',
                    isActive ? 'text-primary-700' : 'text-gray-900'
                  )}>
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{item.desc}</div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50 w-64">
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p className="font-medium text-gray-700">物联学堂 v1.0</p>
            <p>基于人教版八年级教材</p>
            <p className="text-gray-400">适配1024×768分辨率</p>
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300 ease-in-out',
          sidebarOpen ? 'lg:ml-64' : 'ml-0'
        )}
      >
        <div className="p-4 lg:p-6 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>

      {/* 移动端遮罩 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 快捷键提示 */}
      <div className="fixed bottom-4 right-4 z-50 hidden lg:block">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-xs text-gray-500 space-y-1">
          <p><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700">空格</kbd> 返回首页</p>
          <p><kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700">ESC</kbd> 关闭侧栏</p>
        </div>
      </div>
    </div>
  )
}
