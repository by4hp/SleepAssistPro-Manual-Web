import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

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
