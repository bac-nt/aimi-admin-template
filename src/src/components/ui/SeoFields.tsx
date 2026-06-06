'use client'
import { useState } from 'react'
import { Search, ChevronDown, Check } from 'lucide-react'

export interface SeoData {
  metaTitle: string
  metaDesc:  string
  slug:      string
  keywords:  string
}

interface SeoFieldsProps {
  value:             SeoData
  onChange:          (data: SeoData) => void
  titlePlaceholder?: string
  slugPlaceholder?:  string
  defaultOpen?:      boolean
}

export function SeoFields({
  value,
  onChange,
  titlePlaceholder = 'SEO title...',
  slugPlaceholder  = 'url-friendly-slug',
  defaultOpen      = false,
}: SeoFieldsProps) {
  const [open, setOpen] = useState(defaultOpen)

  const titleLen  = value.metaTitle.length
  const descLen   = value.metaDesc.length
  const titleOk   = titleLen >= 30 && titleLen <= 60
  const descOk    = descLen  >= 70 && descLen  <= 160
  const slugOk    = value.slug.length > 0
  const kwOk      = value.keywords.length > 0
  const score     = [titleOk, descOk, slugOk, kwOk].filter(Boolean).length
  const scoreColor = score === 4 ? 'var(--success)' : score >= 2 ? 'var(--warning)' : 'var(--error)'
  const scoreLabel = score === 4 ? 'Good' : score >= 2 ? 'Needs work' : 'Poor'

  const titleBorderColor = titleLen > 60 ? 'var(--error)' : titleLen > 50 ? 'var(--warning)' : undefined
  const descBorderColor  = descLen  > 160 ? 'var(--error)' : descLen  > 140 ? 'var(--warning)' : undefined
  const titleCountColor  = titleLen > 60 ? 'var(--error)' : titleLen > 50 ? 'var(--warning)' : 'var(--muted)'
  const descCountColor   = descLen  > 160 ? 'var(--error)' : descLen  > 140 ? 'var(--warning)' : 'var(--muted)'

  return (
    <div className="card overflow-hidden">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors hover:bg-[var(--surface)]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary-light)' }}>
            <Search size={15} style={{ color: 'var(--primary)' }} />
          </div>
          <div className="text-left">
            <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>SEO Settings</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              {value.metaTitle ? `"${value.metaTitle.slice(0, 40)}${value.metaTitle.length > 40 ? '…' : ''}"` : 'Click to configure'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Score pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: scoreColor + '20', color: scoreColor }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: scoreColor }} />
            {scoreLabel} {score}/4
          </div>
          <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: 'var(--muted)' }} />
        </div>
      </button>

      {open && (
        <div className="border-t space-y-4 px-5 pb-5 pt-4 animate-fade-in" style={{ borderColor: 'var(--border)' }}>

          {/* Google SERP preview */}
          {(value.metaTitle || value.slug) && (
            <div className="p-4 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--muted)' }}>Google Preview</p>
              <p className="text-[15px] font-normal truncate" style={{ color: '#1a0dab' }}>
                {value.metaTitle || 'Page title will appear here'}
              </p>
              <p className="text-xs mt-0.5 truncate" style={{ color: '#006621' }}>
                yoursite.com › {value.slug || 'page-slug'}
              </p>
              <p className="text-xs mt-1 line-clamp-2" style={{ color: '#545454' }}>
                {value.metaDesc || 'Meta description will appear here in search results...'}
              </p>
            </div>
          )}

          {/* Meta Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Meta Title
                {titleOk && <Check size={12} className="inline ml-1.5" style={{ color: 'var(--success)' }} />}
              </label>
              <span className="text-xs font-mono" style={{ color: titleCountColor }}>{titleLen}/60</span>
            </div>
            <input
              className="field w-full"
              placeholder={titlePlaceholder}
              value={value.metaTitle}
              onChange={e => onChange({ ...value, metaTitle: e.target.value })}
              style={{ borderColor: titleBorderColor }}
            />
            <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div className="h-full rounded-full transition-all" style={{
                width: `${Math.min(100, (titleLen / 60) * 100)}%`,
                background: titleBorderColor || (titleLen >= 30 ? 'var(--success)' : 'var(--warning)'),
              }} />
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Recommended: 30–60 characters</p>
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Meta Description
                {descOk && <Check size={12} className="inline ml-1.5" style={{ color: 'var(--success)' }} />}
              </label>
              <span className="text-xs font-mono" style={{ color: descCountColor }}>{descLen}/160</span>
            </div>
            <textarea
              className="field w-full resize-none"
              rows={3}
              placeholder="Meta description..."
              value={value.metaDesc}
              onChange={e => onChange({ ...value, metaDesc: e.target.value })}
              style={{ borderColor: descBorderColor }}
            />
            <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div className="h-full rounded-full transition-all" style={{
                width: `${Math.min(100, (descLen / 160) * 100)}%`,
                background: descBorderColor || (descLen >= 70 ? 'var(--success)' : 'var(--warning)'),
              }} />
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Recommended: 70–160 characters</p>
          </div>

          {/* URL Slug */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
              URL Slug
              {slugOk && <Check size={12} className="inline ml-1.5" style={{ color: 'var(--success)' }} />}
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              <span className="px-3 text-xs border-r py-2.5 flex-shrink-0" style={{ color: 'var(--muted)', borderColor: 'var(--border)', background: 'var(--surface)' }}>
                yoursite.com /
              </span>
              <input
                className="flex-1 px-3 py-2.5 bg-transparent text-sm outline-none"
                placeholder={slugPlaceholder}
                value={value.slug}
                onChange={e => onChange({ ...value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                style={{ color: 'var(--foreground)' }}
              />
            </div>
          </div>

          {/* Focus Keyword */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>
              Focus Keyword
              {kwOk && <Check size={12} className="inline ml-1.5" style={{ color: 'var(--success)' }} />}
            </label>
            <input
              className="field w-full"
              placeholder="e.g. best wireless headphones"
              value={value.keywords}
              onChange={e => onChange({ ...value, keywords: e.target.value })}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>The main keyword you want this page to rank for</p>
          </div>

          {/* Checklist */}
          <div className="p-3.5 rounded-xl space-y-2" style={{ background: 'var(--surface)' }}>
            {[
              { label: 'Meta title 30–60 chars', ok: titleOk },
              { label: 'Meta description 70–160 chars', ok: descOk },
              { label: 'URL slug defined', ok: slugOk },
              { label: 'Focus keyword set', ok: kwOk },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: item.ok ? 'var(--success)' : 'var(--border)' }}>
                  {item.ok && <Check size={9} className="text-white" />}
                </div>
                <span style={{ color: item.ok ? 'var(--foreground)' : 'var(--muted)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
