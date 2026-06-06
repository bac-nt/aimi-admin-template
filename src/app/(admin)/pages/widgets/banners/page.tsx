'use client'
import React, { useState } from 'react'
import { PageBanner, Button } from '@/components/ui'
import { X, Zap, Gift, Star, Megaphone, Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────
type BannerVariant = 'info' | 'success' | 'warning' | 'error'

const VARIANT_CFG: Record<BannerVariant, { bg: string; Icon: React.ElementType }> = {
  info:    { bg: 'var(--primary)', Icon: Info },
  success: { bg: 'var(--success)', Icon: CheckCircle },
  warning: { bg: 'var(--warning)', Icon: AlertTriangle },
  error:   { bg: 'var(--error)',   Icon: X },
}

// ── Components ───────────────────────────────────────────────────
function AlertBanner({
  variant = 'info',
  children,
  onClose,
}: {
  variant?: BannerVariant
  children: React.ReactNode
  onClose?: () => void
}) {
  const { bg, Icon } = VARIANT_CFG[variant]
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-white text-sm font-semibold"
      style={{ background: bg }}
    >
      <Icon size={16} style={{ flexShrink: 0, opacity: 0.9 }} />
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

// ── Strip item data (no single-quoted strings with apostrophes) ──
const STRIPS = [
  {
    id: 'strip-1',
    Icon: Megaphone,
    txt: "🚀 v2.0 is here — check out the new features!",
    btn: "See what's new",
    color: 'var(--primary)',
  },
  {
    id: 'strip-2',
    Icon: Star,
    txt: '⭐ Rate us on Product Hunt and get 1 month free.',
    btn: 'Rate Now',
    color: 'var(--warning)',
  },
  {
    id: 'strip-3',
    Icon: Bell,
    txt: '📢 Scheduled maintenance Sunday 2–4 AM UTC.',
    btn: 'Details',
    color: 'var(--error)',
  },
]

// ── Page ─────────────────────────────────────────────────────────
export default function BannersPage() {
  const [hidden, setHidden] = useState<string[]>([])
  const isHidden = (id: string) => hidden.includes(id)
  const dismiss  = (id: string) => setHidden(prev => [...prev, id])

  return (
    <>
      <PageBanner
        title="Banner Widgets"
        description="Notification banners, alerts and announcement strips"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Pages' }, { label: 'Banner Widgets' }]}
        action={
          <Button variant="outline" onClick={() => setHidden([])}>Reset All</Button>
        }
      />

      <div className="space-y-8 max-w-3xl">

        {/* Alert Banners */}
        <section>
          <h2 className="font-bold text-sm mb-4 uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Alert Banners
          </h2>
          <div className="space-y-3">
            {!isHidden('info') && (
              <AlertBanner variant="info" onClose={() => dismiss('info')}>
                <strong>Info:</strong> Your account will be upgraded at midnight.
              </AlertBanner>
            )}
            {!isHidden('success') && (
              <AlertBanner variant="success" onClose={() => dismiss('success')}>
                <strong>Success!</strong> Payment processed successfully.
              </AlertBanner>
            )}
            {!isHidden('warning') && (
              <AlertBanner variant="warning" onClose={() => dismiss('warning')}>
                <strong>Warning:</strong> Subscription expires in 3 days.{' '}
                <a href="#" className="underline font-bold">Renew now</a>
              </AlertBanner>
            )}
            {!isHidden('error') && (
              <AlertBanner variant="error" onClose={() => dismiss('error')}>
                <strong>Error:</strong> Failed to sync data. Please retry.
              </AlertBanner>
            )}
          </div>
        </section>

        {/* Promotional Banners */}
        <section>
          <h2 className="font-bold text-sm mb-4 uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Promotional Banners
          </h2>
          <div className="space-y-3">
            {!isHidden('promo-1') && (
              <div
                className="relative overflow-hidden rounded-2xl p-5 text-white"
                style={{ background: 'linear-gradient(135deg, var(--primary), #7c3aed)' }}
              >
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 font-black opacity-10 select-none"
                  style={{ fontSize: 80 }}
                >
                  %
                </div>
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-lg leading-tight">50% off Pro Plan!</p>
                    <p className="text-sm opacity-80 mt-0.5">Limited time — ends Sunday midnight.</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
                      style={{ background: 'white', color: 'var(--primary)' }}
                    >
                      Claim Deal
                    </button>
                    <button
                      type="button"
                      onClick={() => dismiss('promo-1')}
                      className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!isHidden('promo-2') && (
              <div
                className="flex items-center gap-4 p-4 rounded-2xl border-2"
                style={{ borderColor: 'var(--warning)', background: 'var(--warning-light)' }}
              >
                <Gift size={20} style={{ color: 'var(--warning)', flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>
                    🎉 Welcome gift — 30 days free on any plan.
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>No credit card required.</p>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white flex-shrink-0 transition-opacity hover:opacity-90"
                  style={{ background: 'var(--warning)' }}
                >
                  Activate
                </button>
                <button
                  type="button"
                  onClick={() => dismiss('promo-2')}
                  className="flex-shrink-0 hover:opacity-60 transition-opacity"
                  style={{ color: 'var(--muted)' }}
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Announcement Strips */}
        <section>
          <h2 className="font-bold text-sm mb-4 uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Announcement Strips
          </h2>
          <div className="space-y-3">
            {STRIPS.map(({ id, Icon, txt, btn, color }) => (
              <div
                key={id}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: `${color}14`,
                  border: `1px solid ${color}30`,
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon size={14} style={{ color, flexShrink: 0 }} />
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                    {txt}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold whitespace-nowrap flex-shrink-0 hover:opacity-70 transition-opacity"
                  style={{ color }}
                >
                  {btn} →
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
