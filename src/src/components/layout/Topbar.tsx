'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Menu, Search, ShoppingCart, Moon, Sun, Bell, ChevronDown, X,
  Settings, Check, LogOut, User, MessageSquare, Calendar, Mail,
  StickyNote, Receipt, BookOpen, Store, Bot, Kanban,
  PanelLeft, AlignJustify,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TOPBAR_APPS, TOPBAR_LINKS } from '@/config/navigation'
import { Avatar, Badge, Toggle } from '@/components/ui'
import { useUIStore } from '@/store/ui'

const NOTIFICATIONS = [
  { id:1, text:'Roman Joined the Team!',     sub:'Congratulations',          time:'9:30 AM',  color:'var(--primary)', read:false },
  { id:2, text:'New message received',       sub:'Salma sent you a message', time:'10:05 AM', color:'var(--success)', read:false },
  { id:3, text:'Payment received from John', sub:'Order #94745',             time:'10:45 AM', color:'var(--warning)', read:true  },
  { id:4, text:'Jolly completed tasks',      sub:'Jolly passed!',            time:'12:07 PM', color:'var(--error)',   read:true  },
]

const APP_ICONS: Record<string, React.ElementType> = {
  Chat: MessageSquare, Calendar, Email: Mail, Contacts: User,
  Notes: StickyNote, Kanban, 'AI Chat': Bot, Invoice: Receipt,
  Blog: BookOpen, Shop: Store,
}

const THEME_COLORS = [
  { name:'Blue',   val:'#5d87ff' },
  { name:'Purple', val:'#7c3aed' },
  { name:'Green',  val:'#13deb9' },
  { name:'Orange', val:'#ffae1f' },
  { name:'Teal',   val:'#49beff' },
  { name:'Red',    val:'#fa896b' },
  { name:'Pink',   val:'#e879f9' },
  { name:'Indigo', val:'#6366f1' },
]

// SVG avatar placeholder - no third party
function UserAvatar({ size = 32, name = 'M' }: { size?: number; name?: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{ width: size, height: size, background: 'var(--primary)', fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}

interface TopbarProps { onMenu: () => void; dark: boolean; onToggleDark: () => void }

export default function Topbar({ onMenu, dark, onToggleDark }: TopbarProps) {
  type Panel = 'apps'|'notif'|'cart'|'user'|'settings'|null
  const [panel,   setPanel]  = useState<Panel>(null)
  const [search,  setSearch] = useState(false)
  const [notifs,  setNotifs] = useState(NOTIFICATIONS)
  const searchRef = useRef<HTMLInputElement>(null)

  const {
    themeColor, setThemeColor,
    sidebarType, setSidebarType,
    direction, setDirection,
    containerType, setContainerType,
    cardStyle, setCardStyle,
    compactMode, setCompactMode,
    locale, setLocale,
    resetSettings,
  } = useUIStore()

  const toggle = (p: NonNullable<Panel>) => setPanel(prev => prev === p ? null : p)
  const close  = useCallback(() => setPanel(null), [])

  // Apply theme color to CSS vars
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', themeColor)
    const hex = themeColor.replace('#', '')
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    document.documentElement.style.setProperty('--primary-light', `rgba(${r},${g},${b},0.12)`)
  }, [themeColor])

  // Apply direction
  useEffect(() => {
    document.documentElement.setAttribute('dir', direction)
  }, [direction])

  // Close panels on route change (fixes ghost overlay)
  useEffect(() => { close() }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // ESC key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') { close(); setSearch(false) } }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [close])

  useEffect(() => { if (search) searchRef.current?.focus() }, [search])

  const unread = notifs.filter(n => !n.read).length

  // Icon button helper
  const Btn = ({ onClick, active, badge, title, children }: {
    onClick: () => void; active?: boolean; badge?: number; title?: string; children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        'relative w-9 h-9 rounded-[var(--radius)] flex items-center justify-center transition-all duration-150',
        active
          ? 'bg-[var(--primary-light)] text-[var(--primary)]'
          : 'text-[var(--muted)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]'
      )}
    >
      {children}
      {!!badge && badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full text-[9px] font-bold flex items-center justify-center text-white"
          style={{ background: 'var(--error)', padding: '0 3px' }}>
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  )

  const t = (en: string, vi: string) => locale === 'vi' ? vi : en

  return (
    <>
      {/* ── Header ── */}
      <header
        className="flex items-center gap-1.5 px-4 flex-shrink-0 border-b z-30 relative"
        style={{ height: 64, background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        {/* Hamburger - toggles sidebar open/close */}
        <Btn onClick={onMenu} title="Toggle sidebar"><Menu size={20} /></Btn>

        {/* Search */}
        {search ? (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border w-52 animate-fade-in"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <Search size={13} style={{ color: 'var(--muted)' }} />
            <input
              ref={searchRef}
              placeholder={t('Search...', 'Tìm kiếm...')}
              className="bg-transparent text-sm outline-none flex-1"
              style={{ color: 'var(--foreground)' }}
              onBlur={() => setSearch(false)}
            />
            <button type="button" onClick={() => setSearch(false)} style={{ color: 'var(--muted)' }}><X size={13} /></button>
          </div>
        ) : (
          <Btn onClick={() => setSearch(true)} title="Search"><Search size={18} /></Btn>
        )}

        {/* Apps dropdown */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => toggle('apps')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius)] text-sm font-medium transition-all',
              panel === 'apps'
                ? 'bg-[var(--primary-light)] text-[var(--primary)]'
                : 'text-[var(--foreground)] hover:bg-[var(--surface)]'
            )}
          >
            Apps
            <ChevronDown size={13} className={cn('transition-transform duration-200', panel === 'apps' && 'rotate-180')} />
          </button>
          {panel === 'apps' && (
            <div className="absolute left-0 top-full mt-1.5 w-52 card py-1.5 animate-fade-up z-50"
              style={{ boxShadow: 'var(--shadow-dropdown)' }}>
              {TOPBAR_APPS.map(a => {
                const Icon = APP_ICONS[a.label] || Menu
                return (
                  <Link key={a.href} href={a.href} onClick={close}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface)]"
                    style={{ color: 'var(--foreground)' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--primary-light)' }}>
                      <Icon size={14} style={{ color: 'var(--primary)' }} />
                    </div>
                    {a.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {TOPBAR_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={close}
              className="px-3 py-2 rounded-[var(--radius)] text-sm font-medium transition-all hover:bg-[var(--surface)]"
              style={{ color: 'var(--foreground)' }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* ── Right icons ── */}
        <div className="flex items-center gap-0.5">
          {/* Language toggle - simple button, no emoji rendering bug */}
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}
            title={locale === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
            className="px-2.5 h-9 flex items-center justify-center rounded-[var(--radius)] transition-all text-xs font-bold border hover:bg-[var(--primary-light)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
          >
            {locale === 'en' ? 'EN' : 'VI'}
          </button>

          {/* Cart */}
          <div className="relative">
            <Btn onClick={() => toggle('cart')} active={panel === 'cart'} title="Cart">
              <ShoppingCart size={18} />
            </Btn>
            {panel === 'cart' && (
              <div className="absolute right-0 top-full mt-2 w-72 card animate-fade-up z-50"
                style={{ boxShadow: 'var(--shadow-dropdown)' }}>
                <div className="px-4 py-3.5 border-b font-bold" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                  {t('Shopping Cart', 'Giỏ hàng')}
                </div>
                <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
                  <ShoppingCart size={32} className="mx-auto mb-2 opacity-20" />
                  {t('Your cart is empty', 'Giỏ hàng trống')}
                </div>
                <div className="px-4 pb-3">
                  <Link href="/apps/ecommerce/checkout" onClick={close}
                    className="block w-full py-2.5 rounded-xl text-sm font-semibold text-white text-center transition-all hover:brightness-110"
                    style={{ background: 'var(--primary)' }}>
                    {t('View Cart', 'Xem giỏ hàng')}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Dark mode */}
          <Btn onClick={onToggleDark} title={dark ? 'Light mode' : 'Dark mode'}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </Btn>

          {/* Notifications */}
          <div className="relative">
            <Btn onClick={() => toggle('notif')} active={panel === 'notif'} badge={unread} title="Notifications">
              <Bell size={18} />
            </Btn>
            {panel === 'notif' && (
              <div className="absolute right-0 top-full mt-2 card animate-fade-up z-50"
                style={{ width: 340, boxShadow: 'var(--shadow-dropdown)' }}>
                <div className="px-4 py-3.5 border-b flex items-center justify-between"
                  style={{ borderColor: 'var(--border)' }}>
                  <span className="font-bold" style={{ color: 'var(--foreground)' }}>
                    {t('Notifications', 'Thông báo')}
                  </span>
                  <div className="flex items-center gap-2">
                    {unread > 0 && <Badge variant="error">{unread} new</Badge>}
                    {unread > 0 && (
                      <button type="button"
                        onClick={() => setNotifs(ns => ns.map(n => ({ ...n, read: true })))}
                        className="text-xs font-semibold hover:opacity-70"
                        style={{ color: 'var(--primary)' }}>
                        {t('Mark all read', 'Đánh dấu tất cả')}
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifs.map(n => (
                    <div key={n.id}
                      onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))}
                      className={cn('flex gap-3 px-4 py-3.5 cursor-pointer transition-colors hover:bg-[var(--surface)]', !n.read && 'bg-[var(--surface)]')}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: n.color + '22' }}>
                        <Bell size={14} style={{ color: n.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm truncate', !n.read && 'font-semibold')} style={{ color: 'var(--foreground)' }}>{n.text}</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{n.sub}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>{n.time}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.color }} />}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center border-t" style={{ borderColor: 'var(--border)' }}>
                  <button type="button" className="text-sm font-semibold hover:opacity-70" style={{ color: 'var(--primary)' }}>
                    {t('View all', 'Xem tất cả')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => toggle('user')}
              className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-[var(--radius)] transition-colors hover:bg-[var(--surface)]"
            >
              <UserAvatar size={32} name="Mathew Anderson" />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold leading-tight" style={{ color: 'var(--foreground)' }}>Matt</p>
                <p className="text-[10px] leading-tight" style={{ color: 'var(--muted)' }}>Admin</p>
              </div>
            </button>
            {panel === 'user' && (
              <div className="absolute right-0 top-full mt-2 w-52 card animate-fade-up z-50"
                style={{ boxShadow: 'var(--shadow-dropdown)' }}>
                <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <UserAvatar size={40} name="Mathew Anderson" />
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>Mathew Anderson</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>Administrator</p>
                    </div>
                  </div>
                </div>
                {[
                  { label: t('My Profile', 'Hồ sơ của tôi'), href: '/apps/users/profile', Icon: User },
                  { label: t('Account Settings', 'Cài đặt tài khoản'), href: '/pages/account-setting', Icon: Settings },
                  { label: t('IAM & Permissions', 'IAM & Phân quyền'), href: '/pages/iam', Icon: null },
                ].map(item => (
                  <Link key={item.href} href={item.href} onClick={close}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface)]"
                    style={{ color: 'var(--foreground)' }}>
                    {item.Icon && <item.Icon size={15} style={{ color: 'var(--muted)' }} />}
                    {!item.Icon && <span className="w-[15px]" />}
                    {item.label}
                  </Link>
                ))}
                <div className="border-t px-4 py-2.5" style={{ borderColor: 'var(--border)' }}>
                  <button type="button"
                    className="flex items-center gap-3 text-sm w-full transition-colors hover:text-[var(--error)]"
                    style={{ color: 'var(--muted)' }}>
                    <LogOut size={15} />{t('Logout', 'Đăng xuất')}
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* NOTE: Settings gear is REMOVED from header - now only floating bottom-right */}
        </div>
      </header>

      {/* ── Settings / Customizer side panel (slide from right) ── */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full z-50 flex flex-col',
          'transition-transform duration-300 ease-out',
          panel === 'settings' ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ width: 320, background: 'var(--card)', borderLeft: '1px solid var(--border)', boxShadow: 'var(--shadow-dropdown)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="font-bold" style={{ color: 'var(--foreground)' }}>{t('Customizer', 'Tùy chỉnh')}</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>{t('Personalize your dashboard', 'Cá nhân hóa giao diện')}</p>
          </div>
          <button type="button" onClick={close}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface)] transition-colors"
            style={{ color: 'var(--muted)' }}>
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Theme Color */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
              {t('Theme Color', 'Màu chủ đề')}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {THEME_COLORS.map(tc => (
                <button key={tc.val} type="button" onClick={() => setThemeColor(tc.val)}
                  title={tc.name}
                  className="w-10 h-10 rounded-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                  style={{ background: tc.val, outline: themeColor === tc.val ? '3px solid var(--foreground)' : 'none', outlineOffset: 2 }}>
                  {themeColor === tc.val && <Check size={16} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
              {t('Mode', 'Chế độ')}
            </p>
            <div className="flex gap-3">
              {[
                { label: t('Light', 'Sáng'), Icon: Sun,  val: false },
                { label: t('Dark',  'Tối'),  Icon: Moon, val: true  },
              ].map(m => (
                <button key={String(m.val)} type="button"
                  onClick={() => { if (dark !== m.val) onToggleDark() }}
                  className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all"
                  style={{
                    borderColor: dark === m.val ? 'var(--primary)' : 'var(--border)',
                    background:  dark === m.val ? 'var(--primary-light)' : undefined,
                  }}>
                  <m.Icon size={18} style={{ color: dark === m.val ? 'var(--primary)' : 'var(--muted)' }} />
                  <span className="text-xs font-medium" style={{ color: dark === m.val ? 'var(--primary)' : 'var(--muted)' }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Type */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
              {t('Sidebar Type', 'Kiểu Sidebar')}
            </p>
            <div className="flex gap-3">
              {[
                { label: t('Full', 'Đầy đủ'), val: 'full' as const, Icon: AlignJustify },
                { label: t('Mini', 'Thu nhỏ'), val: 'mini' as const, Icon: PanelLeft   },
              ].map(m => (
                <button key={m.val} type="button" onClick={() => setSidebarType(m.val)}
                  className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all"
                  style={{
                    borderColor: sidebarType === m.val ? 'var(--primary)' : 'var(--border)',
                    background:  sidebarType === m.val ? 'var(--primary-light)' : undefined,
                  }}>
                  <m.Icon size={18} style={{ color: sidebarType === m.val ? 'var(--primary)' : 'var(--muted)' }} />
                  <span className="text-xs font-medium" style={{ color: sidebarType === m.val ? 'var(--primary)' : 'var(--muted)' }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direction */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
              {t('Direction', 'Hướng chữ')}
            </p>
            <div className="flex gap-3">
              {[{ label: 'LTR', val: 'ltr' as const }, { label: 'RTL', val: 'rtl' as const }].map(m => (
                <button key={m.val} type="button" onClick={() => setDirection(m.val)}
                  className="flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all"
                  style={{
                    borderColor: direction === m.val ? 'var(--primary)' : 'var(--border)',
                    background:  direction === m.val ? 'var(--primary-light)' : undefined,
                    color:       direction === m.val ? 'var(--primary)' : 'var(--muted)',
                  }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Container */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
              {t('Container', 'Kiểu Container')}
            </p>
            <div className="flex gap-3">
              {[
                { label: t('Boxed', 'Hộp'),        val: 'boxed' as const },
                { label: t('Full Width', 'Rộng đầy'), val: 'full'  as const },
              ].map(m => (
                <button key={m.val} type="button" onClick={() => setContainerType(m.val)}
                  className="flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all"
                  style={{
                    borderColor: containerType === m.val ? 'var(--primary)' : 'var(--border)',
                    background:  containerType === m.val ? 'var(--primary-light)' : undefined,
                    color:       containerType === m.val ? 'var(--primary)' : 'var(--muted)',
                  }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card Style */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
              {t('Card Style', 'Kiểu Card')}
            </p>
            <div className="flex gap-3">
              {[
                { label: t('Border', 'Viền'), val: 'border' as const },
                { label: t('Shadow', 'Bóng'), val: 'shadow' as const },
              ].map(m => (
                <button key={m.val} type="button" onClick={() => setCardStyle(m.val)}
                  className="flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all"
                  style={{
                    borderColor: cardStyle === m.val ? 'var(--primary)' : 'var(--border)',
                    background:  cardStyle === m.val ? 'var(--primary-light)' : undefined,
                    color:       cardStyle === m.val ? 'var(--primary)' : 'var(--muted)',
                  }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Mode */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                  {t('Compact Mode', 'Chế độ thu gọn')}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {t('Reduce padding density', 'Giảm mật độ padding')}
                </p>
              </div>
              <Toggle checked={compactMode} onChange={setCompactMode} size="sm" />
            </div>
          </div>

          {/* Language */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
              {t('Language', 'Ngôn ngữ')}
            </p>
            <div className="flex gap-3">
              {[
                { label: 'English',     val: 'en' as const, sub: 'EN' },
                { label: 'Tiếng Việt', val: 'vi' as const, sub: 'VI' },
              ].map(m => (
                <button key={m.val} type="button" onClick={() => setLocale(m.val)}
                  className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl border-2 text-xs font-bold transition-all"
                  style={{
                    borderColor: locale === m.val ? 'var(--primary)' : 'var(--border)',
                    background:  locale === m.val ? 'var(--primary-light)' : undefined,
                    color:       locale === m.val ? 'var(--primary)' : 'var(--muted)',
                  }}>
                  <span className="text-base font-black">{m.sub}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset button */}
        <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <button type="button"
            onClick={() => resetSettings()}
            className="w-full py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-[var(--surface)]"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            {t('Reset to Default', 'Đặt lại mặc định')}
          </button>
        </div>
      </div>

      {/* ── Floating Settings Gear - bottom right corner ── */}
      <button
        type="button"
        onClick={() => toggle('settings')}
        title={t('Customize', 'Tùy chỉnh')}
        className={cn(
          'fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full text-white',
          'flex items-center justify-center shadow-lg',
          'transition-all hover:scale-110 active:scale-95',
          panel === 'settings' && 'scale-0 opacity-0 pointer-events-none'
        )}
        style={{ background: 'var(--primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
      >
        <Settings size={20} className="animate-spin" style={{ animationDuration: '8s' }} />
      </button>

      {/* ── Overlay: only show for dropdown panels (not settings, settings has its own) ── */}
      {panel && panel !== 'settings' && (
        <div className="fixed inset-0 z-20" onClick={close} />
      )}
      {/* Settings overlay - darker */}
      {panel === 'settings' && (
        <div className="fixed inset-0 z-20 bg-black/30" onClick={close} />
      )}
    </>
  )
}
