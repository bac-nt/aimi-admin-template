'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Power, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_CONFIG, type NavItem } from '@/config/navigation'
import { Badge } from '@/components/ui'
import { useUIStore } from '@/store/ui'

/* ── helpers ───────────────────────────────────────────────────── */
function isChildActive(children: { href: string }[], path: string) {
  return children.some(c => path === c.href || path.startsWith(c.href + '/'))
}

function Dot({ active }: { active: boolean }) {
  return (
    <span style={{
      display: 'inline-block', flexShrink: 0,
      width: active ? 7 : 5, height: active ? 7 : 5,
      borderRadius: '50%',
      background:   active ? 'var(--primary)' : 'transparent',
      border:       active ? 'none' : '1.5px solid var(--muted-2)',
      transition:   'all 150ms',
    }}/>
  )
}

/* ── Logo mark ─────────────────────────────────────────────────── */
function LogoMark({ size = 34 }: { size?: number }) {
  const fs = Math.round(size * 0.52)
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      borderRadius: Math.round(size * 0.27),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    }}>
      <span style={{
        color: '#fff',
        fontSize: fs,
        fontWeight: 800,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: 1,
        letterSpacing: '-0.03em',
        userSelect: 'none',
      }}>A</span>
    </div>
  )
}

/* ── Nav row (used in full expanded view) ──────────────────────── */
function NavRow({ item }: { item: NavItem }) {
  const path      = usePathname()
  const Icon      = item.icon
  const hasKids   = !!item.children?.length
  const kidActive = hasKids ? isChildActive(item.children!, path) : false
  const leafActive = !hasKids && !!item.href &&
    (path === item.href || path.startsWith(item.href + '/'))
  const [open, setOpen] = useState(kidActive)

  useEffect(() => { if (kidActive) setOpen(true) }, [kidActive])

  if (hasKids) return (
    <div>
      <button type="button" onClick={() => setOpen(o => !o)}
        className="nav-item w-full"
        style={kidActive ? { background: 'var(--primary-light)', color: 'var(--primary)' } : {}}
      >
        <Icon size={18} style={{ flexShrink: 0, color: kidActive ? 'var(--primary)' : 'var(--muted)' }}/>
        <span className="flex-1 min-w-0 truncate text-left">{item.label}</span>
        <span className="flex items-center gap-1.5 flex-shrink-0">
          {item.badge !== undefined && (
            <Badge variant={item.badge === 'New' ? 'primary' : 'success'} style={{ fontSize: 9, padding: '1px 5px' }}>
              {item.badge}
            </Badge>
          )}
          <ChevronDown size={13} style={{
            color: 'var(--muted)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms',
          }}/>
        </span>
      </button>
      {open && (
        <div style={{ paddingTop: 2, paddingBottom: 4 }}>
          {item.children!.map(child => {
            const active = path === child.href || path.startsWith(child.href + '/')
            return (
              <Link key={child.href} href={child.href}
                className="flex items-center gap-3 rounded-lg"
                style={{
                  padding: '6px 12px 6px 36px', fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? 'var(--primary)' : 'var(--muted)',
                  textDecoration: 'none', transition: 'color 120ms',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--foreground)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
              >
                <Dot active={active}/>
                <span className="truncate">{child.label}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )

  return (
    <Link href={item.href!} prefetch className={cn('nav-item', leafActive && 'active')}>
      <Icon size={18} style={{ flexShrink: 0, color: leafActive ? '#fff' : 'var(--muted)' }}/>
      <span className="flex-1 min-w-0 truncate">{item.label}</span>
      {item.badge !== undefined && (
        <Badge variant={item.badge === 'New' ? 'primary' : 'success'} style={{ fontSize: 9, padding: '1px 5px', flexShrink: 0 }}>
          {item.badge}
        </Badge>
      )}
    </Link>
  )
}

/* ── Nav content (shared by full + mini-expanded) ──────────────── */
function NavContent() {
  return (
    <nav className="sidebar-nav flex-1 py-2 px-2.5" style={{ minHeight: 0 }}>
      {NAV_CONFIG.map(section => (
        <div key={section.section} className="mb-1">
          <p className="nav-section">{section.section}</p>
          <div className="space-y-0.5">
            {section.items.map((item, i) => <NavRow key={i} item={item}/>)}
          </div>
        </div>
      ))}
      <div className="h-4"/>
    </nav>
  )
}

/* ── User card ─────────────────────────────────────────────────── */
function UserCard() {
  return (
    <div className="flex-shrink-0 p-3 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: 'var(--surface)' }}>
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[11px]"
            style={{ background: 'var(--primary)' }}>MA</div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[var(--card)]"
            style={{ background: 'var(--success)' }}/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold truncate" style={{ color: 'var(--foreground)' }}>Mathew</p>
          <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>Designer</p>
        </div>
        <button type="button" className="hover:text-[var(--error)] transition-colors flex-shrink-0"
          style={{ color: 'var(--muted)' }} title="Sign out">
          <Power size={14}/>
        </button>
      </div>
    </div>
  )
}

/* ── MINI sidebar — icon strip + hover expands in-place ─────────── */
function MiniSidebar() {
  const path      = usePathname()
  const [expanded, setExpanded] = useState(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setExpanded(true)
  }, [])
  const onLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setExpanded(false), 150)
  }, [])
  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }, [])

  /*
   * Layout trick — no duplicate:
   * The wrapper has a fixed visual width (72px when collapsed, 260px when expanded).
   * We change the wrapper's width WITH a smooth transition.
   * The parent layout wrapper must allow this — it's set to width=72 always (mini),
   * but this component uses position:fixed to overlay content, avoiding layout shift.
   *
   * Actually cleaner: use a fixed sidebar that overlays (no width change in layout).
   * The layout always reserves 72px for mini mode.
   * On hover, the sidebar GROWS over content (position:fixed, starts at x=0).
   */
  return (
    <div
      className="h-full"
      style={{ position: 'relative' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* The actual sidebar — fixed, starts at left:0, width transitions 72→260 */}
      <div
        className="fixed top-0 left-0 flex flex-col border-r"
        style={{
          height: '100vh',
          width:  expanded ? 260 : 72,
          background: 'var(--card)',
          borderColor: 'var(--border)',
          zIndex: 50,
          transition: 'width 180ms cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',      /* clip content during expand animation */
          willChange: 'width',
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* ── Logo header ─── */}
        <div className="flex items-center flex-shrink-0 border-b gap-2.5"
          style={{ height: 64, borderColor: 'var(--border)', padding: expanded ? '0 16px' : '0 19px', overflow: 'hidden' }}>
          <LogoMark/>
          {/* Brand name fades in when expanded */}
          <span
            className="font-extrabold flex-1 truncate whitespace-nowrap"
            style={{
              fontSize: 17, color: 'var(--foreground)', letterSpacing: '-0.025em',
              opacity: expanded ? 1 : 0,
              transition: 'opacity 120ms',
              pointerEvents: 'none',
            }}
          >
            Aimi
          </span>
        </div>

        {expanded ? (
          /* Full nav when expanded */
          <>
            <NavContent/>
            <UserCard/>
          </>
        ) : (
          /* Icon-only strip when collapsed */
          <nav className="sidebar-nav flex-1 py-2" style={{ minHeight: 0 }}>
            {NAV_CONFIG.map(section => (
              <div key={section.section} className="mb-1">
                <div className="h-px mx-3 my-2" style={{ background: 'var(--border)' }}/>
                {section.items.map((item, i) => {
                  const Icon = item.icon
                  const kidActive  = item.children ? isChildActive(item.children, path) : false
                  const leafActive = !item.children && !!item.href &&
                    (path === item.href || path.startsWith(item.href + '/'))
                  const active = kidActive || leafActive
                  return (
                    <div key={i} className="flex items-center justify-center" style={{ height: 38 }}>
                      <div className="flex items-center justify-center rounded-xl"
                        style={{
                          width: 36, height: 36,
                          background: active ? 'var(--primary)' : undefined,
                          color: active ? '#fff' : 'var(--muted)',
                          transition: 'all 150ms',
                        }}>
                        <Icon size={18}/>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
            {/* Mini user avatar */}
            <div className="flex justify-center mt-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[11px]"
                style={{ background: 'var(--primary)' }}>MA</div>
            </div>
          </nav>
        )}
      </div>
    </div>
  )
}

/* ── SIDEBAR SHELL ─────────────────────────────────────────────── */
interface SidebarProps { open: boolean; onClose: () => void }

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { sidebarType } = useUIStore()
  const mini = sidebarType === 'mini'

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
          onClick={onClose}/>
      )}

      {mini ? (
        /* Mini mode — rendered in layout's 72px reserved space */
        <div className="hidden lg:block" style={{ width: 72, height: '100vh' }}>
          <MiniSidebar/>
        </div>
      ) : (
        /* Full sidebar */
        <aside
          className={cn(
            'flex flex-col h-full border-r',
            'fixed lg:static top-0 left-0 z-50 lg:z-auto',
            open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
          style={{ width: 260, background: 'var(--card)', borderColor: 'var(--border)', maxHeight: '100dvh' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-4 flex-shrink-0 border-b"
            style={{ height: 64, borderColor: 'var(--border)' }}>
            <LogoMark/>
            <span className="flex-1 truncate font-extrabold"
              style={{ fontSize: 17, color: 'var(--foreground)', letterSpacing: '-0.025em' }}>
              Aimi
            </span>
            <button type="button" onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface)]"
              style={{ color: 'var(--muted)' }}>
              <X size={16}/>
            </button>
          </div>

          <NavContent/>
          <UserCard/>
        </aside>
      )}
    </>
  )
}
