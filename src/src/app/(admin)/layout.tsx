'use client'
import { useEffect } from 'react'
import { useUIStore } from '@/store/ui'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { cn } from '@/lib/utils'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const {
    sidebarOpen, darkMode, setSidebar, toggleSidebar,
    toggleDark, cardStyle, compactMode, containerType, sidebarType,
  } = useUIStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    document.documentElement.setAttribute('data-card-style', cardStyle)
  }, [cardStyle])

  useEffect(() => {
    document.documentElement.classList.toggle('compact', compactMode)
  }, [compactMode])

  const mini  = sidebarType === 'mini'
  const fullW = mini ? 64 : 240

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--surface)' }}>
      {/*
        Desktop sidebar wrapper: controls width to collapse the flex layout.
        Mobile: sidebar handles its own fixed positioning.
      */}
      <div
        className="hidden lg:block flex-shrink-0 overflow-hidden transition-all duration-300"
        style={{ width: sidebarOpen ? fullW : 0 }}
        aria-hidden={!sidebarOpen}
      >
        <Sidebar open={sidebarOpen} onClose={() => setSidebar(false)} />
      </div>

      {/* Mobile sidebar (fixed overlay, shown via translate) */}
      <div className="lg:hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebar(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenu={toggleSidebar} dark={darkMode} onToggleDark={toggleDark} />
        <main className={cn('flex-1 overflow-y-auto', compactMode ? 'p-3 md:p-4' : 'p-5 md:p-6')}>
          <div className={cn(containerType === 'boxed' && 'max-w-7xl mx-auto')}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
