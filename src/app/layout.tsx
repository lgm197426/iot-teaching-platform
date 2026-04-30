import './globals.css'
import type { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: '物联学堂 - 八年级物联网教学平台',
  description: '基于《义务教育信息科技 八年级全一册·物联网实践与探索》的配套教学网站',
  keywords: '物联网,初中信息科技,八年级,教学平台,智慧教育',
  authors: [{ name: '物联学堂' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
