'use client'
/**
 * Aimi UI — Component Library
 * Matches aimi-nextjs.adminmart.com design system
 */
import React, { useState, useRef, useEffect, useCallback, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, type ButtonHTMLAttributes, type SelectHTMLAttributes } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { ChevronRight, X, ChevronDown, Star, Search, Check, AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ──────────────────────────────────────────────────────
type BadgeVariant  = 'primary'|'secondary'|'success'|'warning'|'error'|'purple'|'muted'
type ButtonVariant = 'primary'|'secondary'|'success'|'warning'|'error'|'ghost'|'outline'
type ButtonSize    = 'xs'|'sm'|'md'|'lg'

// ─── Badge ───────────────────────────────────────────────────────
const BADGE_BG:    Record<BadgeVariant,string> = {
  primary:'var(--primary-light)', secondary:'var(--secondary-light)',
  success:'var(--success-light)', warning:'var(--warning-light)',
  error:  'var(--error-light)',   purple:'var(--purple-light)',
  muted:  'var(--surface)',
}
const BADGE_COLOR: Record<BadgeVariant,string> = {
  primary:'var(--primary)',   secondary:'var(--secondary)',
  success:'var(--success)',   warning:'var(--warning)',
  error:  'var(--error)',     purple:'var(--purple)',
  muted:  'var(--muted)',
}

interface BadgeProps { variant?:BadgeVariant; dot?:boolean; children:ReactNode; className?:string; style?:React.CSSProperties }
export function Badge({ variant='muted', dot, children, className, style }:BadgeProps) {
  return (
    <span
      className={cn('badge', className)}
      style={{ background:BADGE_BG[variant], color:BADGE_COLOR[variant], ...style }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:'currentColor',opacity:0.9}}/>}
      {children}
    </span>
  )
}

// ─── Button ──────────────────────────────────────────────────────
const BTN_STYLE: Record<ButtonVariant,React.CSSProperties> = {
  primary:   {background:'var(--primary)',   color:'#fff'},
  secondary: {background:'var(--secondary)', color:'#fff'},
  success:   {background:'var(--success)',   color:'#fff'},
  warning:   {background:'var(--warning)',   color:'#fff'},
  error:     {background:'var(--error)',     color:'#fff'},
  ghost:     {background:'transparent',      color:'var(--muted)'},
  outline:   {background:'transparent',      color:'var(--foreground)', border:'1px solid var(--border)'},
}
const BTN_SIZE: Record<ButtonSize,string> = {
  xs: 'text-xs px-2.5 py-1   gap-1   rounded-md  h-7',
  sm: 'text-xs px-3   py-1.5 gap-1.5 rounded-lg  h-8',
  md: 'text-sm px-4   py-2   gap-2   rounded-xl  h-9',
  lg: 'text-sm px-5   py-2.5 gap-2   rounded-xl  h-10',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:ButtonVariant; size?:ButtonSize; loading?:boolean; href?:string; children:ReactNode
}
export function Button({variant='primary',size='md',loading,href,children,className,style,disabled,...rest}:ButtonProps) {
  const cls = cn(
    'inline-flex items-center justify-center font-semibold transition-all duration-150',
    'select-none whitespace-nowrap',
    'hover:opacity-85 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed',
    BTN_SIZE[size], className,
  )
  const s: React.CSSProperties = { ...BTN_STYLE[variant], ...style }
  if (href) return <Link href={href} className={cls} style={s}>{children}</Link>
  return (
    <button {...rest} disabled={disabled||loading} className={cls} style={s}>
      {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"/>}
      {children}
    </button>
  )
}

// ─── Card ─────────────────────────────────────────────────────────
interface CardProps { children:ReactNode; className?:string; padding?:boolean|string; style?:React.CSSProperties; onClick?:()=>void }
export function Card({children,className,padding=true,style,onClick}:CardProps) {
  const p = padding===false?'':typeof padding==='string'?padding:'p-6'
  return (
    <div
      className={cn('card',p,onClick&&'cursor-pointer',className)}
      style={{transition:'box-shadow 180ms ease,transform 180ms ease',...style}}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// ─── CardHeader ───────────────────────────────────────────────────
interface CardHeaderProps { title:string; subtitle?:string; action?:ReactNode; className?:string }
export function CardHeader({title,subtitle,action,className}:CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3 mb-5',className)}>
      <div>
        <h3 className="text-base font-bold" style={{color:'var(--foreground)'}}>{title}</h3>
        {subtitle&&<p className="text-xs mt-0.5 font-medium" style={{color:'var(--muted)'}}>{subtitle}</p>}
      </div>
      {action&&<div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

// ─── Input ────────────────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:string; error?:string; hint?:string; left?:ReactNode; right?:ReactNode; className?:string
}
export function Input({label,error,hint,left,right,className,id,type='text',...rest}:InputProps) {
  const uid = id||(label?label.toLowerCase().replace(/\s+/g,'-'):undefined)
  return (
    <div className={cn('w-full',className)}>
      {label&&(
        <label htmlFor={uid} className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {left&&<div className="absolute left-3 pointer-events-none" style={{color:'var(--muted-2)'}}>{left}</div>}
        <input
          {...rest} id={uid} type={type}
          className={cn(
            'field w-full',
            left&&'pl-9', right&&'pr-9',
            error&&'!border-[var(--error)] !shadow-[0_0_0_3px_rgba(250,137,107,0.12)]',
          )}
        />
        {right&&<div className="absolute right-3" style={{color:'var(--muted-2)'}}>{right}</div>}
      </div>
      {error&&<p className="text-xs mt-1.5 font-medium flex items-center gap-1" style={{color:'var(--error)'}}><AlertCircle size={11}/>{error}</p>}
      {hint&&!error&&<p className="text-xs mt-1.5" style={{color:'var(--muted)'}}>{hint}</p>}
    </div>
  )
}

// ─── Textarea ─────────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?:string; error?:string; hint?:string; className?:string
}
export function Textarea({label,error,hint,className,id,...rest}:TextareaProps) {
  const uid = id||(label?label.toLowerCase().replace(/\s+/g,'-'):undefined)
  return (
    <div className={cn('w-full',className)}>
      {label&&<label htmlFor={uid} className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>{label}</label>}
      <textarea {...rest} id={uid} className={cn('field w-full resize-none',error&&'!border-[var(--error)]')}/>
      {error&&<p className="text-xs mt-1.5 font-medium" style={{color:'var(--error)'}}>{error}</p>}
      {hint&&!error&&<p className="text-xs mt-1.5" style={{color:'var(--muted)'}}>{hint}</p>}
    </div>
  )
}

// ─── Select (custom dropdown — no native <select>) ───────────────
interface SelectProps {
  label?:string; error?:string; hint?:string
  options:{value:string;label:string}[]
  value?:string; onChange?:(e:{target:{value:string}})=>void
  disabled?:boolean; className?:string; id?:string; placeholder?:string
}
export function Select({label,error,hint,options,value,onChange,disabled,className,id,placeholder}:SelectProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const uid = id||(label?label.toLowerCase().replace(/\s+/g,'-'):undefined)
  const selected = options.find(o=>o.value===value)
  const display  = selected?.label ?? placeholder ?? 'Select…'

  useEffect(()=>{
    if(!open) return
    const fn=(e:MouseEvent)=>{
      if(wrapRef.current&&!wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown',fn,{capture:true})
    return()=>document.removeEventListener('mousedown',fn,{capture:true})
  },[open])

  const pick=(val:string)=>{ onChange?.({target:{value:val}}); setOpen(false) }

  return (
    <div className={cn('w-full relative',className)} ref={wrapRef}>
      {label&&(
        <label htmlFor={uid} className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>{label}</label>
      )}
      <button
        id={uid} type="button" disabled={disabled}
        onClick={()=>!disabled&&setOpen(o=>!o)}
        className={cn(
          'field w-full flex items-center justify-between gap-2 cursor-pointer text-left transition-all',
          disabled&&'opacity-50 cursor-not-allowed',
          error&&'!border-[var(--error)]',
          open&&'!border-[var(--primary)] shadow-[0_0_0_3px_rgba(93,135,255,0.15)]',
        )}
      >
        <span className="truncate" style={{color:selected?'var(--foreground)':'var(--muted-2)'}}>{display}</span>
        <ChevronDown size={14} className="flex-shrink-0 transition-transform duration-150" style={{color:'var(--muted)',transform:open?'rotate(180deg)':'none'}}/>
      </button>

      {open&&(
        <div
          role="listbox"
          className="absolute left-0 right-0 z-[200] py-1.5 overflow-auto animate-scale-in"
          style={{
            top:'calc(100% + 4px)',
            background:'var(--card)',
            border:'1px solid var(--border)',
            borderRadius:'var(--radius-lg)',
            boxShadow:'var(--shadow-dropdown)',
            maxHeight:224,
          }}
        >
          {options.map(o=>{
            const isSel = o.value===value
            return (
              <button
                key={o.value} type="button" role="option" aria-selected={isSel}
                onClick={()=>pick(o.value)}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-2 text-sm text-left"
                style={{
                  color:isSel?'var(--primary)':'var(--foreground)',
                  background:isSel?'var(--primary-light)':'transparent',
                  fontWeight:isSel?600:400,
                  transition:'background 80ms',
                }}
                onMouseEnter={e=>{if(!isSel)(e.currentTarget as HTMLElement).style.background='var(--surface)'}}
                onMouseLeave={e=>{if(!isSel)(e.currentTarget as HTMLElement).style.background='transparent'}}
              >
                <span className="truncate">{o.label}</span>
                {isSel&&<Check size={13} className="flex-shrink-0" style={{color:'var(--primary)'}}/>}
              </button>
            )
          })}
        </div>
      )}

      {error&&<p className="text-xs mt-1.5 font-medium flex items-center gap-1" style={{color:'var(--error)'}}><AlertCircle size={11}/>{error}</p>}
      {hint&&!error&&<p className="text-xs mt-1.5" style={{color:'var(--muted)'}}>{hint}</p>}
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────
interface ToggleProps { checked:boolean; onChange:(v:boolean)=>void; size?:'sm'|'md'; disabled?:boolean; label?:string }
export function Toggle({checked,onChange,size='md',disabled,label}:ToggleProps) {
  const sm = size==='sm'
  const w = sm?28:40; const h = sm?16:22; const dot = sm?11:16; const off = 2
  const on = w-dot-off
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none" style={{opacity:disabled?0.5:1}}>
      <button
        type="button" role="switch" aria-checked={checked} disabled={disabled}
        onClick={()=>onChange(!checked)}
        className="relative flex-shrink-0 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-1"
        style={{width:w,height:h,background:checked?'var(--primary)':'var(--border)',boxShadow:checked?'0 0 0 0 transparent':undefined}}
      >
        <span
          className="absolute rounded-full bg-white transition-transform duration-200"
          style={{width:dot,height:dot,top:off,left:off,transform:checked?`translateX(${on-off}px)`:'translateX(0)',boxShadow:'0 1px 3px rgba(0,0,0,0.2)'}}
        />
      </button>
      {label&&<span className="text-sm font-medium" style={{color:'var(--foreground)'}}>{label}</span>}
    </label>
  )
}

// ─── Progress ─────────────────────────────────────────────────────
interface ProgressProps { value:number; color?:string; height?:number; className?:string }
export function Progress({value,color='var(--primary)',height=6,className}:ProgressProps) {
  return (
    <div className={cn('w-full rounded-full overflow-hidden',className)} style={{height,background:'var(--border)'}}>
      <div className="h-full rounded-full progress-bar" style={{width:`${Math.min(100,Math.max(0,value))}%`,background:color}}/>
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────
interface AvatarProps { name?:string; size?:number; color?:string; online?:boolean; src?:string; className?:string }
export function Avatar({name='',size=36,color='var(--primary)',online,src,className}:AvatarProps) {
  const initials = name.trim().split(/\s+/).map(n=>n[0]||'').join('').toUpperCase().slice(0,2)||'?'
  const fontSize  = Math.floor(size*0.36)
  const dotSize   = Math.max(8,Math.floor(size*0.26))
  return (
    <div className={cn('relative flex-shrink-0',className)} style={{width:size,height:size}}>
      {src
        ? <img src={src} alt={name} className="w-full h-full rounded-full object-cover"/>
        : <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold" style={{background:color,fontSize}}>{initials}</div>
      }
      {online!==undefined&&(
        <span className="absolute bottom-0 right-0 rounded-full ring-2 ring-[var(--card)]"
          style={{width:dotSize,height:dotSize,background:online?'var(--success)':'var(--muted)'}}/>
      )}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────
const MODAL_W = {sm:'max-w-sm',md:'max-w-md',lg:'max-w-xl',xl:'max-w-3xl'}
interface ModalProps {
  open:boolean; onClose:()=>void; title?:string; description?:string
  children?:ReactNode; footer?:ReactNode; size?:keyof typeof MODAL_W
}
export function Modal({open,onClose,title,description,children,footer,size='md'}:ModalProps) {
  useEffect(()=>{
    if(!open) return
    const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()}
    document.addEventListener('keydown',fn)
    return()=>document.removeEventListener('keydown',fn)
  },[open,onClose])

  if(!open) return null

  const content = (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{zIndex:9999}}>
      <div
        className="absolute inset-0 animate-fade-in"
        style={{background:'rgba(0,0,0,0.5)',backdropFilter:'blur(3px)'}}
        onClick={onClose}
      />
      <div
        className={cn('relative w-full flex flex-col max-h-[90vh] animate-scale-in',MODAL_W[size])}
        style={{
          background:'var(--card)',
          borderRadius:'var(--radius-xl)',
          boxShadow:'0 25px 60px rgba(0,0,0,0.2)',
          border:'1px solid var(--border)',
          zIndex:10000,
        }}
      >
        {(title||description)&&(
          <div className="flex items-start gap-3 px-6 py-5 border-b flex-shrink-0" style={{borderColor:'var(--border)'}}>
            <div className="flex-1 min-w-0">
              {title&&<h2 className="text-base font-bold" style={{color:'var(--foreground)'}}>{title}</h2>}
              {description&&<p className="text-sm mt-0.5" style={{color:'var(--muted)'}}>{description}</p>}
            </div>
            <button type="button" onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[var(--surface)] transition-colors flex-shrink-0"
              style={{color:'var(--muted)'}}>
              <X size={16}/>
            </button>
          </div>
        )}
        {children&&<div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>}
        {footer&&(
          <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t flex-shrink-0" style={{borderColor:'var(--border)'}}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )

  return typeof document!=='undefined' ? createPortal(content,document.body) : null
}

// ─── Tabs ─────────────────────────────────────────────────────────
interface TabItem { label:string; content:ReactNode; badge?:string|number }
interface TabsProps { items:TabItem[]; variant?:'default'|'card'; defaultIndex?:number }
export function Tabs({items,variant='default',defaultIndex=0}:TabsProps) {
  const [active,setActive] = useState(defaultIndex)
  return (
    <div>
      <div className={cn(
        'flex gap-1',
        variant==='default'&&'border-b mb-5',
        variant==='card'&&'p-1 rounded-xl mb-5 w-fit',
      )}
      style={{
        borderColor:'var(--border)',
        background:variant==='card'?'var(--surface-2)':undefined,
      }}>
        {items.map((tab,i)=>(
          <button key={i} type="button" onClick={()=>setActive(i)}
            className={cn(
              'flex items-center gap-2 text-sm font-semibold transition-all whitespace-nowrap select-none cursor-pointer',
              variant==='default'&&'px-4 py-2.5 -mb-px border-b-2',
              variant==='card'&&'px-4 py-2 rounded-lg',
            )}
            style={active===i
              ?variant==='default'
                ?{color:'var(--primary)',borderColor:'var(--primary)'}
                :{color:'var(--foreground)',background:'var(--card)',boxShadow:'var(--shadow-card)'}
              :variant==='default'
                ?{color:'var(--muted)',borderColor:'transparent'}
                :{color:'var(--muted)'}}
          >
            {tab.label}
            {tab.badge!==undefined&&(
              <span className="text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 font-bold"
                style={{background:'var(--primary)',color:'#fff'}}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div>{items[active]?.content}</div>
    </div>
  )
}

// ─── PageBanner ───────────────────────────────────────────────────
interface PageBannerProps { title:string; description?:string; breadcrumbs?:{label:string;href?:string}[]; action?:ReactNode }
export function PageBanner({title,description,breadcrumbs,action}:PageBannerProps) {
  return (
    <div className="mb-6 animate-fade-up">
      {breadcrumbs&&breadcrumbs.length>0&&(
        <nav className="flex items-center gap-1 mb-1.5 text-xs" style={{color:'var(--muted)'}}>
          {breadcrumbs.map((b,i)=>(
            <span key={i} className="flex items-center gap-1">
              {i>0&&<ChevronRight size={12} style={{color:'var(--border)'}}/>}
              {b.href
                ?<a href={b.href} className="hover:text-[var(--primary)] transition-colors font-medium">{b.label}</a>
                :<span className="font-semibold" style={{color:'var(--foreground-2)'}}>{b.label}</span>
              }
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight" style={{color:'var(--foreground)'}}>{title}</h1>
          {description&&<p className="text-sm mt-0.5 font-medium" style={{color:'var(--muted)'}}>{description}</p>}
        </div>
        {action&&<div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  )
}

// ─── StarRating ───────────────────────────────────────────────────
interface StarRatingProps { value:number; max?:number; size?:number; onChange?:(v:number)=>void }
export function StarRating({value,max=5,size=14,onChange}:StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({length:max}).map((_,i)=>(
        <Star key={i} size={size}
          fill={i<Math.floor(value)?'var(--warning)':i<value?'url(#half)':'none'}
          style={{color:'var(--warning)',cursor:onChange?'pointer':'default'}}
          onClick={()=>onChange&&onChange(i+1)}/>
      ))}
    </div>
  )
}

// ─── Alert ────────────────────────────────────────────────────────
const ALERT_CFG = {
  info:    {bg:'var(--primary-light)',color:'var(--primary)',  Icon:Info         },
  success: {bg:'var(--success-light)',color:'var(--success)',  Icon:CheckCircle2 },
  warning: {bg:'var(--warning-light)',color:'var(--warning)',  Icon:AlertTriangle},
  error:   {bg:'var(--error-light)',  color:'var(--error)',    Icon:AlertCircle  },
}
interface AlertProps { variant?:keyof typeof ALERT_CFG; children:ReactNode; onClose?:()=>void; className?:string }
export function Alert({variant='info',children,onClose,className}:AlertProps) {
  const cfg = ALERT_CFG[variant]
  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-xl text-sm font-medium',className)}
      style={{background:cfg.bg,color:cfg.color}}>
      <cfg.Icon size={16} className="flex-shrink-0 mt-0.5"/>
      <div className="flex-1">{children}</div>
      {onClose&&<button type="button" onClick={onClose} className="flex-shrink-0 hover:opacity-70"><X size={14}/></button>}
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────
export function Spinner({size=20,color='var(--primary)'}:{size?:number;color?:string}) {
  return (
    <span className="animate-spin rounded-full border-2 flex-shrink-0 inline-block"
      style={{width:size,height:size,borderColor:`${color}30`,borderTopColor:color}}/>
  )
}

// ─── Divider ──────────────────────────────────────────────────────
export function Divider({label}:{label?:string}) {
  if(!label) return <div className="h-px w-full my-4" style={{background:'var(--border)'}}/>
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px" style={{background:'var(--border)'}}/>
      <span className="text-xs font-semibold px-2" style={{color:'var(--muted)'}}>{label}</span>
      <div className="flex-1 h-px" style={{background:'var(--border)'}}/>
    </div>
  )
}

// ─── DataTable ────────────────────────────────────────────────────
interface ColDef<T> { key:string; header:string; render?:(row:T,i:number)=>ReactNode; width?:number }
interface DataTableProps<T> { columns:ColDef<T>[]; data:T[]; className?:string; emptyMessage?:string }
export function DataTable<T extends Record<string,unknown>>({columns,data,className,emptyMessage='No data'}:DataTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto',className)}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{borderBottom:'2px solid var(--border)'}}>
            {columns.map(col=>(
              <th key={col.key} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap"
                style={{color:'var(--muted)',background:'var(--surface)',width:col.width}}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length===0
            ?<tr><td colSpan={columns.length} className="px-5 py-12 text-center text-sm" style={{color:'var(--muted)'}}>{emptyMessage}</td></tr>
            :data.map((row,i)=>(
              <tr key={i} className="border-b hover:bg-[var(--surface)] transition-colors" style={{borderColor:'var(--border-2)'}}>
                {columns.map(col=>(
                  <td key={col.key} className="px-5 py-3.5">
                    {col.render?col.render(row,i):String(row[col.key]??'')}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────
const TOAST_BG: Record<string,string> = {
  success:'var(--success)',error:'var(--error)',warning:'var(--warning)',info:'var(--primary)'
}
const TOAST_ICON: Record<string,string> = {success:'✓',error:'✕',warning:'!',info:'i'}
interface ToastProps { message:string|null; variant?:'success'|'error'|'warning'|'info' }
export function Toast({message,variant='success'}:ToastProps) {
  if(!message) return null
  if(typeof document==='undefined') return null
  const content=(
    <div className="fixed top-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-xl animate-fade-up"
      style={{background:TOAST_BG[variant],zIndex:99999,minWidth:220,maxWidth:360,boxShadow:'0 8px 24px rgba(0,0,0,0.18)'}}>
      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
        style={{background:'rgba(255,255,255,0.25)'}}>{TOAST_ICON[variant]}</span>
      <span className="flex-1">{message}</span>
    </div>
  )
  return createPortal(content,document.body)
}

// ─── Skeleton ─────────────────────────────────────────────────────
export function Skeleton({className,height=16}:{className?:string;height?:number}) {
  return <div className={cn('skeleton',className)} style={{height}}/>
}
export function SkeletonTable({rows=5,cols=5}:{rows?:number;cols?:number}) {
  return (
    <div>
      {Array.from({length:rows}).map((_,i)=>(
        <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b" style={{borderColor:'var(--border)'}}>
          {Array.from({length:cols}).map((_,j)=>(
            <Skeleton key={j} height={13} className={j===0?'w-28':j===cols-1?'w-16':'flex-1'}/>
          ))}
        </div>
      ))}
    </div>
  )
}
export function SkeletonCard() {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="skeleton w-10 h-10 rounded-xl"/>
        <div className="flex-1 space-y-2">
          <Skeleton height={13} className="w-3/4"/>
          <Skeleton height={11} className="w-1/2"/>
        </div>
      </div>
      <Skeleton height={12} className="mb-2"/>
      <Skeleton height={12} className="w-5/6 mb-2"/>
      <Skeleton height={12} className="w-4/6"/>
    </Card>
  )
}

// ─── EmptyState ───────────────────────────────────────────────────
interface EmptyStateProps { icon?:string; title:string; desc?:string; action?:ReactNode }
export function EmptyState({icon='📭',title,desc,action}:EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-bold text-sm mb-1" style={{color:'var(--foreground)'}}>{title}</h3>
      {desc&&<p className="text-xs mb-4 max-w-xs" style={{color:'var(--muted)'}}>{desc}</p>}
      {action&&<div className="mt-2">{action}</div>}
    </div>
  )
}

// ─── SearchBar ────────────────────────────────────────────────────
interface SearchBarProps { value:string; onChange:(v:string)=>void; placeholder?:string; className?:string }
export function SearchBar({value,onChange,placeholder='Search…',className}:SearchBarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 px-3.5 rounded-xl border transition-all duration-150',
        'focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(93,135,255,0.12)]',
        className,
      )}
      style={{
        background:'var(--card)',
        borderColor:'var(--border)',
        minWidth:200,
        height:38,
      }}
    >
      <Search size={14} style={{color:'var(--muted-2)',flexShrink:0}}/>
      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent text-sm outline-none flex-1"
        style={{color:'var(--foreground)'}}
      />
      {value&&(
        <button
          type="button"
          onClick={()=>onChange('')}
          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface)]"
          style={{color:'var(--muted)'}}
        >
          <X size={11}/>
        </button>
      )}
    </div>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────
interface StatCardProps { label:string; value:string|number; color?:string; icon?:React.ElementType; trend?:number; suffix?:string }
export function StatCard({label,value,color='var(--primary)',icon:Icon,trend,suffix}:StatCardProps) {
  return (
    <Card className="flex items-start gap-3">
      {Icon&&(
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:color+'18'}}>
          <Icon size={20} style={{color}}/>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold mb-0.5" style={{color:'var(--muted)'}}>{label}</p>
        <p className="text-2xl font-extrabold leading-none tracking-tight" style={{color:'var(--foreground)'}}>
          {value}{suffix&&<span className="text-sm font-semibold ml-0.5">{suffix}</span>}
        </p>
        {trend!==undefined&&(
          <p className="text-xs mt-1.5 font-semibold" style={{color:trend>=0?'var(--success)':'var(--error)'}}>
            {trend>=0?'↑':'↓'} {Math.abs(trend)}%
          </p>
        )}
      </div>
    </Card>
  )
}

// ─── FilterTabs ───────────────────────────────────────────────────
interface FilterTabsProps { options:string[]; active:string; onChange:(v:string)=>void; counts?:Record<string,number> }
export function FilterTabs({options,active,onChange,counts}:FilterTabsProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map(opt=>(
        <button key={opt} type="button" onClick={()=>onChange(opt)}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap"
          style={active===opt
            ?{background:'var(--primary)',color:'#fff'}
            :{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
          {opt}{counts&&counts[opt]!==undefined?` (${counts[opt]})`:''  }
        </button>
      ))}
    </div>
  )
}

// ─── Toolbar ──────────────────────────────────────────────────────
interface ToolbarProps { children:ReactNode; className?:string }
export function Toolbar({children,className}:ToolbarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3 p-4 border-b',className)}
      style={{borderColor:'var(--border)'}}>
      {children}
    </div>
  )
}

// ─── PageSkeleton ─────────────────────────────────────────────────
export function PageSkeleton() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="space-y-2">
        <Skeleton height={28} className="w-48"/>
        <Skeleton height={14} className="w-72"/>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({length:4}).map((_,i)=><SkeletonCard key={i}/>)}
      </div>
      <Card padding={false}>
        <div className="p-4"><Skeleton height={36} className="w-full max-w-xs"/></div>
        <SkeletonTable/>
      </Card>
    </div>
  )
}
