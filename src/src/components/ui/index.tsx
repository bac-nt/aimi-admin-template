'use client'
/**
 * Modernize UI Component Library
 * All shared components exported from one file.
 */
import React, { useState, useRef, useEffect, type ReactNode, type InputHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import { ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ─────────────────────────────────────────────────────────────────

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'purple' | 'muted' | 'outline'
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline'
type ButtonSize    = 'sm' | 'md' | 'lg'

// ─── Badge ─────────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<BadgeVariant, { bg: string; color: string; border?: string }> = {
  primary:   { bg: 'var(--primary-light)',   color: 'var(--primary)'   },
  secondary: { bg: 'var(--secondary-light)', color: 'var(--secondary)' },
  success:   { bg: 'var(--success-light)',   color: 'var(--success)'   },
  warning:   { bg: 'var(--warning-light)',   color: 'var(--warning)'   },
  error:     { bg: 'var(--error-light)',     color: 'var(--error)'     },
  purple:    { bg: 'var(--purple-light)',    color: 'var(--purple)'    },
  muted:     { bg: 'var(--surface)',         color: 'var(--muted)'     },
  outline:   { bg: 'transparent',            color: 'var(--muted)', border: 'var(--border)' },
}

interface BadgeProps {
  variant?: BadgeVariant
  dot?: boolean
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}
export function Badge({ variant = 'muted', dot, children, className, style }: BadgeProps) {
  const v = BADGE_STYLES[variant]
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold', className)}
      style={{ background: v.bg, color: v.color, border: v.border ? `1px solid ${v.border}` : undefined, ...style }}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: v.color }} />
      )}
      {children}
    </span>
  )
}

// ─── Button ────────────────────────────────────────────────────────────────

const BTN_VARIANTS: Record<ButtonVariant, React.CSSProperties> = {
  primary:   { background: 'var(--primary)',   color: '#fff'               },
  secondary: { background: 'var(--secondary)', color: '#fff'               },
  success:   { background: 'var(--success)',   color: '#fff'               },
  warning:   { background: 'var(--warning)',   color: '#fff'               },
  error:     { background: 'var(--error)',     color: '#fff'               },
  ghost:     { background: 'transparent',      color: 'var(--muted)'       },
  outline:   { background: 'transparent',      color: 'var(--foreground)', border: '1px solid var(--border)' },
}
const BTN_SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
  md: 'px-4 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-6 py-3 text-base gap-2.5 rounded-xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  href?: string
  children: ReactNode
}
export function Button({ variant = 'primary', size = 'md', loading, href, children, className, style, disabled, ...rest }: ButtonProps) {
  const cls = cn(
    'inline-flex items-center justify-center font-semibold transition-all duration-150 select-none whitespace-nowrap',
    'hover:opacity-85 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
    BTN_SIZES[size],
    className,
  )
  const s: React.CSSProperties = { ...BTN_VARIANTS[variant], ...style }
  if (href) return <Link href={href} className={cls} style={s}>{children}</Link>
  return (
    <button {...rest} disabled={disabled || loading} className={cls} style={s}>
      {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      {children}
    </button>
  )
}

// ─── Card ──────────────────────────────────────────────────────────────────

interface CardProps { children: ReactNode; className?: string; padding?: boolean | string; style?: React.CSSProperties; onClick?: () => void }
export function Card({ children, className, padding = true, style, onClick }: CardProps) {
  const p = padding === false ? '' : typeof padding === 'string' ? padding : 'p-5'
  return (
    <div className={cn('card', p, className)} style={style} onClick={onClick}>
      {children}
    </div>
  )
}

interface CardHeaderProps { title: string; subtitle?: string; action?: ReactNode; className?: string }
export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)}>
      <div>
        <h3 className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{title}</h3>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?:  string
  left?:  ReactNode
  right?: ReactNode
}
export function Input({ label, error, hint, left, right, className, id, ...rest }: InputProps) {
  const uid = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={uid} className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
          {label}
        </label>
      )}
      <div className="relative">
        {left && <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }}>{left}</div>}
        <input
          {...rest}
          id={uid}
          className={cn(
            'field w-full',
            left  && 'pl-9',
            right && 'pr-9',
            error && 'border-[var(--error)] focus:shadow-[0_0_0_3px_rgba(250,137,107,0.15)]',
          )}
        />
        {right && <div className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }}>{right}</div>}
      </div>
      {error && <p className="text-xs mt-1" style={{ color: 'var(--error)' }}>{error}</p>}
      {hint && !error && <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{hint}</p>}
    </div>
  )
}

// ─── Textarea ─────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; error?: string; hint?: string
}
export function Textarea({ label, error, hint, className, id, ...rest }: TextareaProps) {
  const uid = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  return (
    <div className={cn('w-full', className)}>
      {label && <label htmlFor={uid} className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>{label}</label>}
      <textarea {...rest} id={uid} className={cn('field w-full resize-none', error && 'border-[var(--error)]')} />
      {error && <p className="text-xs mt-1" style={{ color: 'var(--error)' }}>{error}</p>}
      {hint && !error && <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{hint}</p>}
    </div>
  )
}

// ─── Select ───────────────────────────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string; error?: string; options: { value: string; label: string }[]
}
export function Select({ label, error, options, className, id, ...rest }: SelectProps) {
  const uid = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  return (
    <div className={cn('w-full', className)}>
      {label && <label htmlFor={uid} className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>{label}</label>}
      <select {...rest} id={uid} className={cn('field w-full appearance-none cursor-pointer')}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs mt-1" style={{ color: 'var(--error)' }}>{error}</p>}
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────

interface ToggleProps { checked: boolean; onChange: (v: boolean) => void; size?: 'sm' | 'md'; disabled?: boolean; label?: string }
export function Toggle({ checked, onChange, size = 'md', disabled, label }: ToggleProps) {
  const sm = size === 'sm'
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none" style={{ opacity: disabled ? 0.5 : 1 }}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn('rounded-full transition-all duration-200 flex-shrink-0 relative', sm ? 'w-8 h-4' : 'w-11 h-6')}
        style={{ background: checked ? 'var(--primary)' : 'var(--border)' }}
      >
        <span
          className="absolute top-0.5 rounded-full bg-white shadow transition-transform duration-200"
          style={{
            width:     sm ? 12 : 20,
            height:    sm ? 12 : 20,
            transform: checked ? `translateX(${sm ? 18 : 22}px)` : 'translateX(2px)',
          }}
        />
      </button>
      {label && <span className="text-sm" style={{ color: 'var(--foreground)' }}>{label}</span>}
    </label>
  )
}

// ─── Progress ─────────────────────────────────────────────────────────────

interface ProgressProps { value: number; color?: string; height?: number; className?: string }
export function Progress({ value, color = 'var(--primary)', height = 6, className }: ProgressProps) {
  return (
    <div className={cn('w-full rounded-full overflow-hidden', className)} style={{ height, background: 'var(--border)' }}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} />
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────

interface AvatarProps { name: string; size?: number; color?: string; online?: boolean }
export function Avatar({ name, size = 36, color = 'var(--primary)', online }: AvatarProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div
        className="w-full h-full rounded-full flex items-center justify-center text-white font-bold"
        style={{ background: color, fontSize: size * 0.35 }}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className="absolute bottom-0 right-0 rounded-full ring-2 ring-[var(--card)]"
          style={{ width: size * 0.28, height: size * 0.28, background: online ? 'var(--success)' : 'var(--border)' }}
        />
      )}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}
const MODAL_WIDTHS = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
      <div
        className={cn('relative w-full rounded-2xl shadow-2xl z-10 flex flex-col max-h-[90vh]', MODAL_WIDTHS[size])}
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start gap-3 p-5 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
            <div className="flex-1 min-w-0">
              {title       && <h2 className="font-bold text-base" style={{ color: 'var(--foreground)' }}>{title}</h2>}
              {description && <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{description}</p>}
            </div>
            <button type="button" onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--surface)] transition-colors flex-shrink-0"
              style={{ color: 'var(--muted)' }}>
              <X size={16} />
            </button>
          </div>
        )}
        {/* Body */}
        {children && <div className="p-5 overflow-y-auto flex-1">{children}</div>}
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2.5 p-4 border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────

interface TabItem { label: string; content: ReactNode; badge?: string | number }
interface TabsProps { items: TabItem[]; variant?: 'default' | 'card' | 'pills'; defaultIndex?: number }

export function Tabs({ items, variant = 'default', defaultIndex = 0 }: TabsProps) {
  const [active, setActive] = useState(defaultIndex)

  const tabBarCls = cn(
    'flex gap-1 mb-5 flex-wrap',
    variant === 'card'  && 'p-1 rounded-xl w-fit',
    variant === 'pills' && 'gap-2',
  )
  const tabBarStyle: React.CSSProperties = variant === 'card' ? { background: 'var(--surface)', border: '1px solid var(--border)' } : {}

  const tabCls = (i: number) => cn(
    'flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer select-none',
    active === i
      ? 'text-white'
      : 'hover:opacity-80',
  )
  const tabStyle = (i: number): React.CSSProperties => active === i
    ? { background: 'var(--primary)', color: '#fff' }
    : { color: 'var(--muted)', background: 'transparent' }

  return (
    <div>
      <div className={tabBarCls} style={tabBarStyle}>
        {items.map((item, i) => (
          <button key={i} type="button" className={tabCls(i)} style={tabStyle(i)} onClick={() => setActive(i)}>
            {item.label}
            {item.badge !== undefined && (
              <span className="text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
                style={{ background: active === i ? 'rgba(255,255,255,0.25)' : 'var(--primary-light)', color: active === i ? '#fff' : 'var(--primary)' }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div>{items[active]?.content}</div>
    </div>
  )
}

// ─── PageBanner ───────────────────────────────────────────────────────────

interface Breadcrumb { label: string; href?: string }
interface PageBannerProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  action?: ReactNode
}
export function PageBanner({ title, description, breadcrumbs, action }: PageBannerProps) {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 mb-2 text-xs flex-wrap" style={{ color: 'var(--muted)' }}>
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight size={11} />}
              {b.href
                ? <Link href={b.href} className="hover:text-[var(--primary)] transition-colors">{b.label}</Link>
                : <span style={i === breadcrumbs.length - 1 ? { color: 'var(--foreground)' } : {}}>{b.label}</span>
              }
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>{title}</h1>
          {description && <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{description}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  )
}

// ─── StarRating ───────────────────────────────────────────────────────────

interface StarRatingProps { value: number; max?: number; size?: number; onChange?: (v: number) => void }
export function StarRating({ value, max = 5, size = 14, onChange }: StarRatingProps) {
  const [hov, setHov] = useState(0)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => i + 1).map(s => (
        <button
          key={s} type="button"
          onClick={onChange ? () => onChange(s) : undefined}
          onMouseEnter={() => onChange && setHov(s)}
          onMouseLeave={() => onChange && setHov(0)}
          className={cn('transition-transform', onChange && 'hover:scale-110 cursor-pointer')}
          style={{ color: s <= (hov || value) ? 'var(--warning)' : 'var(--border)' }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// ─── Toast / Alert (simple inline) ──────────────────────────────────────

interface AlertProps {
  variant?: 'success' | 'warning' | 'error' | 'info'
  children: ReactNode
  onClose?: () => void
  className?: string
}
const ALERT_STYLES = {
  success: { bg: 'var(--success-light)', color: 'var(--success)',   border: 'rgba(19,222,185,0.3)'  },
  warning: { bg: 'var(--warning-light)', color: 'var(--warning)',   border: 'rgba(255,174,31,0.3)'  },
  error:   { bg: 'var(--error-light)',   color: 'var(--error)',     border: 'rgba(250,137,107,0.3)' },
  info:    { bg: 'var(--primary-light)', color: 'var(--primary)',   border: 'rgba(93,135,255,0.3)'  },
}
export function Alert({ variant = 'info', children, onClose, className }: AlertProps) {
  const s = ALERT_STYLES[variant]
  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-xl border text-sm font-medium', className)}
      style={{ background: s.bg, color: s.color, borderColor: s.border }}>
      <span className="flex-1">{children}</span>
      {onClose && (
        <button type="button" onClick={onClose} className="hover:opacity-70 transition-opacity flex-shrink-0"><X size={14} /></button>
      )}
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────

export function Spinner({ size = 20, color = 'var(--primary)' }: { size?: number; color?: string }) {
  return (
    <div className="rounded-full border-2 animate-spin flex-shrink-0"
      style={{ width: size, height: size, borderColor: color + '33', borderTopColor: color }} />
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────

export function Divider({ label }: { label?: string }) {
  if (!label) return <hr style={{ borderColor: 'var(--border)', margin: '16px 0' }} />
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  )
}

// ─── Re-export SeoFields ──────────────────────────────────────────────────
export { SeoFields } from './SeoFields'
