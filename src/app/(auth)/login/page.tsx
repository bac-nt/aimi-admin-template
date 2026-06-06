'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button, Input } from '@/components/ui'

export default function LoginPage() {
  const [show, setShow] = useState(false)
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--surface)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[55%] flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{ width: 80+i*60, height: 80+i*60, left: `${i*15}%`, top: `${i*8}%`, opacity: 0.1 }} />
          ))}
        </div>
        <div className="relative text-white text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-8">
            <svg width="40" height="40" viewBox="0 0 34 34" fill="none">
              <path d="M8 24V12l5.5 6.5L17 12l3.5 6.5L26 12v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <h1 className="text-5xl font-black mb-4">Modernize</h1>
          <p className="text-white/80 text-lg mb-10">Professional admin dashboard with complete features</p>
          <div className="grid grid-cols-2 gap-4">
            {[['65+','Pages & Routes'],['90+','UI Components'],['7','Chart Types'],['3','Dashboards']].map(([v,l])=>(
              <div key={l} className="bg-white/10 rounded-xl p-4 text-left backdrop-blur-sm">
                <p className="text-3xl font-black">{v}</p>
                <p className="text-white/70 text-sm mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-8">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--primary)"/><stop offset="100%" stopColor="var(--secondary)"/></linearGradient></defs>
              <rect width="34" height="34" rx="9" fill="url(#lg)"/>
              <path d="M8 24V12l5.5 6.5L17 12l3.5 6.5L26 12v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="text-xl font-black" style={{ color: 'var(--foreground)' }}>Modernize</span>
          </div>
          <h2 className="text-3xl font-black mb-1" style={{ color: 'var(--foreground)' }}>Welcome back 👋</h2>
          <p className="mb-8" style={{ color: 'var(--muted)' }}>Sign in to your admin account</p>

          {/* Demo credentials box */}
          <div className="p-3 rounded-lg border mb-6" style={{ background: 'var(--primary-light)', borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)' }}>
            <p className="text-xs font-bold mb-1" style={{ color: 'var(--primary)' }}>🚀 Demo Account</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Email: admin@modernize.com · Password: admin123</p>
          </div>

          <div className="space-y-4">
            <Input label="Email Address" type="email" defaultValue="admin@modernize.com" placeholder="your@email.com" />
            <Input label="Password" type={show ? 'text' : 'password'} defaultValue="admin123"
              endIcon={<button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={16}/> : <Eye size={16}/>}</button>}
            />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--muted)' }}>
                <input type="checkbox" className="rounded accent-[var(--primary)]" defaultChecked />
                Remember me
              </label>
              <Link href="#" className="font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>Forgot password?</Link>
            </div>
            <Link href="/dashboard/ecommerce">
              <Button variant="primary" className="w-full justify-center py-3 text-base mt-2">
                Sign In <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <p className="text-center text-sm mt-6" style={{ color: 'var(--muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="#" className="font-bold transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
