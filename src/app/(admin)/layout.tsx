'use client'
import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/store/ui'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { cn } from '@/lib/utils'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const {
    sidebarOpen, darkMode, setSidebar, toggleSidebar,
    toggleDark, cardStyle, compactMode, containerType, sidebarType,
  } = useUIStore()

  const pathname   = usePathname()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => { document.documentElement.classList.toggle('dark', darkMode) }, [darkMode])
  useEffect(() => { document.documentElement.setAttribute('data-card-style', cardStyle) }, [cardStyle])
  useEffect(() => { document.documentElement.classList.toggle('compact', compactMode) }, [compactMode])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.classList.remove('page-enter')
    void el.offsetHeight
    el.classList.add('page-enter')
  }, [pathname])

  const mini = sidebarType === 'mini'
  const sw   = mini ? 72 : 260

  return (
    <div className="flex h-screen" style={{ background: 'var(--surface)' }}>

      {/*
       * Desktop sidebar wrapper
       * - Animates WIDTH from sw→0 when toggled (triggers layout shift = sidebar hides)
       * - overflow:hidden clips the sidebar content when width→0 (makes it disappear)
       * - Mini hover panel uses position:fixed so it ESCAPES this overflow:hidden safely
       */}
      <div
        className="hidden lg:flex flex-col flex-shrink-0"
        style={{
          width:      sidebarOpen ? sw : 0,
          height:     '100vh',
          overflow:   'hidden',             // clips sidebar when width→0
          transition: 'width 220ms cubic-bezier(0.4,0,0.2,1)',
          willChange: 'width',
        }}
      >
        {/* Inner: fixed width so sidebar doesn't reflow during animation */}
        <div className="h-full" style={{ width: sw, flexShrink: 0 }}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebar(false)} />
        </div>
      </div>

      {/* Mobile sidebar — fixed overlay, not in flow */}
      <div className="lg:hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebar(false)} />
      </div>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0" style={{ height: '100vh', minHeight: 0 }}>

        {/* Topbar — sits above page content */}
        <div className="flex-shrink-0" style={{ zIndex: 30, position: 'relative' }}>
          <Topbar onMenu={toggleSidebar} dark={darkMode} onToggleDark={toggleDark} />
        </div>

        {/* Scrollable content */}
        <main
          className={cn('flex-1 overflow-y-auto', compactMode ? 'p-3 md:p-4' : 'p-5 md:p-6')}
          style={{ minHeight: 0 }}
        >
          <div
            ref={contentRef}
            className={cn('page-enter', containerType === 'boxed' && 'max-w-7xl mx-auto')}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
