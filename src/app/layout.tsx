import React from 'react'
import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: { default: 'Aimi Dashboard', template: '%s | Aimi' },
  description: 'Aimi — Modern admin dashboard built with Next.js 16, TypeScript and Tailwind CSS',
  icons: [
    { rel: 'icon',             url: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'icon',             url: '/favicon.ico',             sizes: 'any' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5d87ff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
