import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'New Tab',
  description: 'A clean new tab page with search and shortcuts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
