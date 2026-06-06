'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ChevronDown, Power, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_CONFIG, type NavItem } from '@/config/navigation'
import { Badge } from '@/components/ui'
import { useUIStore } from '@/store/ui'

function isChildActive(children: {href:string}[], pathname: string) {
  return children.some(c => pathname === c.href || pathname.startsWith(c.href + '/'))
}

function NavRow({ item, mini }: { item: NavItem; mini: boolean }) {
  const pathname  = usePathname()
  const Icon      = item.icon
  const hasKids   = !!item.children?.length
  const kidActive = hasKids ? isChildActive(item.children!, pathname) : false
  const leafActive = !hasKids && !!item.href &&
    (pathname === item.href || pathname.startsWith(item.href + '/'))
  const [open, setOpen] = useState(kidActive)

  useEffect(() => { if (kidActive) setOpen(true) }, [kidActive])

  if (hasKids) return (
    <div>
      <button onClick={() => setOpen(o => !o)}
        className={cn('nav-item w-full justify-between pr-2', kidActive && 'text-[var(--primary)]')}
        style={kidActive ? { color:'var(--primary)' } : {}}
        title={mini ? item.label : undefined}>
        <span className="flex items-center gap-3 min-w-0">
          <Icon size={17} className="flex-shrink-0 opacity-75" />
          {!mini && <span className="truncate">{item.label}</span>}
        </span>
        {!mini && (
          <span className="flex items-center gap-1.5 flex-shrink-0">
            {item.badge !== undefined && (
              <Badge variant={typeof item.badge === 'string' && item.badge === 'New' ? 'primary' : 'success'}
                className="text-[9px] px-1.5 py-0.5">{item.badge}</Badge>
            )}
            <ChevronDown size={13} className={cn('text-[var(--muted)] transition-transform duration-200', open && 'rotate-180')} />
          </span>
        )}
      </button>
      {open && !mini && (
        <div className="mt-0.5 space-y-0.5">
          {item.children!.map(child => (
            <Link key={child.href} href={child.href}
              className={cn('nav-child', pathname === child.href && 'active')}>
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <Link href={item.href!} prefetch={true}
      className={cn('nav-item', leafActive && 'active')}
      title={mini ? item.label : undefined}>
      <Icon size={17} className="flex-shrink-0 opacity-75" />
      {!mini && <span className="flex-1 truncate">{item.label}</span>}
      {!mini && item.badge !== undefined && (
        <Badge variant={typeof item.badge === 'string' && item.badge === 'New' ? 'primary' : 'success'}
          className="text-[9px] px-1.5 py-0.5">{item.badge}</Badge>
      )}
    </Link>
  )
}

interface SidebarProps { open: boolean; onClose: () => void }

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { sidebarType } = useUIStore()
  const mini = sidebarType === 'mini'
  const fullW = mini ? 64 : 240

  return (
    <>
      {/* Mobile backdrop only */}
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />}

      {/*
        DESKTOP: use a width-based approach so the flex layout collapses.
        - When open: width = fullW → sidebar takes up space
        - When closed: width = 0, overflow hidden → layout shifts left
        MOBILE: uses fixed position + translate (open/close via translate)
      */}
      <aside
        className={cn(
          'h-full flex-col border-r flex-shrink-0',
          // Mobile: fixed overlay, toggle with translate
          'fixed lg:static top-0 left-0 z-50',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        style={{
          background:  'var(--card)',
          borderColor: 'var(--border)',
          // On desktop: width-based collapse (drives flex layout)
          width:    fullW,
          // Desktop-only: hide by overriding with 0 width via a wrapper trick
        }}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-4 flex-shrink-0 border-b overflow-hidden"
            style={{ height:64, borderColor:'var(--border)' }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="flex-shrink-0">
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
              </defs>
              <rect width="34" height="34" rx="9" fill="url(#sg)" />
              <path d="M8 24V12l5.5 6.5L17 12l3.5 6.5L26 12v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            {!mini && (
              <>
                <span className="text-[18px] font-black tracking-tight flex-1 truncate" style={{color:'var(--foreground)'}}>Modernize</span>
                <button onClick={onClose} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}>
                  <X size={18}/>
                </button>
              </>
            )}
          </div>

          {/* Nav */}
          <nav className={cn('flex-1 overflow-y-auto py-3', mini ? 'px-1.5' : 'px-3')}>
            {NAV_CONFIG.map(section => (
              <div key={section.section}>
                {!mini && <p className="nav-section">{section.section}</p>}
                {mini  && <div className="h-2" />}
                <div className="space-y-0.5">
                  {section.items.map((item, i) => (
                    <NavRow key={`${section.section}-${i}`} item={item} mini={mini} />
                  ))}
                </div>
              </div>
            ))}
            <div className="h-4" />
          </nav>

          {/* User card */}
          {!mini && (
            <div className="flex-shrink-0 px-3 pb-3">
              <div className="flex items-center gap-2.5 p-3 rounded-[var(--radius-lg)] border" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:'var(--primary)'}}>MA</div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[var(--card)]" style={{background:'var(--success)'}}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate leading-tight" style={{color:'var(--foreground)'}}>Mathew</p>
                  <p className="text-xs truncate leading-tight" style={{color:'var(--muted)'}}>Designer</p>
                </div>
                <button className="text-[var(--muted)] hover:text-[var(--error)] transition-colors" title="Logout"><Power size={15}/></button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
