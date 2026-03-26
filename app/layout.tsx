import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UserManual-SleepAssistPro',
  description: 'SleepAssistPro 智能床应用用户手册 - 快速开始、连接设置、功能使用指南',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/sleepassistpro-logo.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/sleepassistpro-logo.svg',
    apple: '/sleepassistpro-logo.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
