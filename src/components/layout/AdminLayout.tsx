'use client'
import { useEffect } from 'react'
import { Settings } from 'lucide-react'
import { useUIStore } from '@/store/ui'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, darkMode, setSidebar, toggleDark } = useUIStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--surface)' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebar(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenu={() => setSidebar(!sidebarOpen)} dark={darkMode} onToggleDark={toggleDark} />
        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          {children}
        </main>
      </div>

      {/* Floating customizer */}
      <button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        style={{ background: 'var(--primary)', boxShadow: 'var(--shadow-button)' }}
        title="Customize"
      >
        <Settings size={20} className="animate-spin" style={{ animationDuration: '8s' }} />
      </button>
    </div>
  )
}
