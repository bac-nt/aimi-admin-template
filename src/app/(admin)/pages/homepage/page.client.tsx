'use client'
import { PageBanner, Card, Badge, Button, Toggle } from '@/components/ui'
import { AreaChartWidget, BarChartWidget } from '@/components/charts'
import { COLOR } from '@/config/tokens'
import { TrendingUp, Users, Globe, Zap, Star, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const PLANS = [
  { name:'Starter',      price:9,  desc:'For individuals',  color:COLOR.secondary  },
  { name:'Professional', price:29, desc:'Most popular',     color:COLOR.primary,   highlight:true },
  { name:'Enterprise',   price:79, desc:'For large teams',  color:COLOR.purple     },
]
const TESTIMONIALS = [
  { name:'Sarah Johnson', role:'CTO, TechCorp',    text:'Modernize transformed how our team works. Incredible product.',   rating:5 },
  { name:'Mark Wilson',   role:'Dev Lead, StartupX',text:'The best admin template we have ever used. Worth every penny.',  rating:5 },
  { name:'Anna Chen',     role:'CEO, DataVault',   text:'Clean code, beautiful UI, and outstanding support team.',         rating:5 },
]

export default function HomepagePage() {
  const [yearly, setYearly] = useState(false)
  return (
    <>
      <PageBanner title="Homepage" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Homepage'}]} description="Frontend landing page template"/>

      {/* Hero section */}
      <div className="card overflow-hidden mb-5" style={{background:'linear-gradient(135deg,var(--primary),var(--primary-dark,#1a56db))'}}>
        <div className="p-10 text-center text-white relative">
          <Badge variant="secondary" className="mb-4 text-xs px-3 py-1">🚀 Next.js 16 + React 19.2</Badge>
          <h1 className="text-4xl font-black mb-3 leading-tight">Build Faster.<br/>Ship Smarter.</h1>
          <p className="text-white/70 max-w-md mx-auto mb-6 text-base">The most complete admin template with 90+ components, beautiful UI, and full TypeScript support.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" className="bg-white text-[var(--primary)] border-white hover:bg-white/90 shadow-lg">Get Started Free</Button>
            <Button size="lg" variant="ghost" className="text-white border-white/50 hover:bg-white/15">View Demo <ArrowRight size={16}/></Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-4 right-8 w-20 h-20 rounded-full opacity-10" style={{background:'white'}}/>
          <div className="absolute bottom-4 left-8 w-14 h-14 rounded-full opacity-10" style={{background:'white'}}/>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[{icon:'⚡',l:'Components',v:'90+',c:COLOR.primary},{icon:'📦',l:'Pages',v:'60+',c:COLOR.secondary},{icon:'⭐',l:'Stars',v:'4.9',c:COLOR.warning},{icon:'👥',l:'Users',v:'12K+',c:COLOR.success}].map(s=>(
          <Card key={s.l} hover className="text-center">
            <div className="text-3xl mb-2">{s.icon}</div>
            <p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p>
            <p className="text-xs font-medium" style={{color:'var(--muted)'}}>{s.l}</p>
          </Card>
        ))}
      </div>

      {/* Features + Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        <Card>
          <h2 className="font-black text-xl mb-4" style={{color:'var(--foreground)'}}>Why Choose Modernize?</h2>
          <div className="space-y-3">
            {[{icon:Zap,t:'Turbopack',d:'Blazing-fast dev server with Next.js 16 Turbopack.',c:COLOR.warning},{icon:Users,t:'Team Ready',d:'Role-based access, multi-user workflows out of the box.',c:COLOR.primary},{icon:Globe,t:'i18n Ready',d:'Built with internationalization support from the ground up.',c:COLOR.secondary},{icon:Star,t:'TypeScript',d:'Fully typed with strict TypeScript 5.8 throughout.',c:COLOR.success}].map(f=>(
              <div key={f.t} className="flex items-start gap-3 p-3.5 rounded-xl" style={{background:'var(--surface)'}}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:f.c+'22'}}><f.icon size={18} style={{color:f.c}}/></div>
                <div><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{f.t}</p><p className="text-xs" style={{color:'var(--muted)'}}>{f.d}</p></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-black text-xl mb-1" style={{color:'var(--foreground)'}}>Monthly Growth</h2>
          <p className="text-xs mb-4" style={{color:'var(--muted)'}}>Users & revenue trend</p>
          <AreaChartWidget series={[{name:'Users',data:[820,930,1100,1280,1450,1620,1890,2100]},{name:'Revenue',data:[420,580,720,890,1020,1180,1350,1520]}]} categories={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']} colors={[COLOR.primary,COLOR.secondary]} height={220}/>
        </Card>
      </div>

      {/* Pricing */}
      <h2 className="font-black text-2xl text-center mb-2" style={{color:'var(--foreground)'}}>Simple Pricing</h2>
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="text-sm" style={{color:yearly?'var(--muted)':'var(--foreground)'}}>Monthly</span>
        <Toggle checked={yearly} onChange={setYearly}/>
        <span className="text-sm flex items-center gap-1.5" style={{color:yearly?'var(--foreground)':'var(--muted)'}}>Yearly<Badge variant="success" className="text-[10px]">-20%</Badge></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {PLANS.map(p=>(
          <Card key={p.name} className={p.highlight?'border-2':'border'} style={(p.highlight as any)?{borderColor:'var(--primary)',transform:'scale(1.02)'}:{}}>
            <div className="p-1 pb-4 border-b mb-4" style={{borderColor:'var(--border)'}}>
              <Badge variant="primary" className="mb-3 text-xs">{p.desc}</Badge>
              <h3 className="font-black text-lg" style={{color:'var(--foreground)'}}>{p.name}</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black" style={{color:p.color}}>${yearly?Math.round(p.price*.8):p.price}</span>
                <span className="text-sm" style={{color:'var(--muted)'}}>/mo</span>
              </div>
            </div>
            <Button variant={p.highlight?'primary':'outline'} className="w-full justify-center">Get Started</Button>
          </Card>
        ))}
      </div>

      {/* Testimonials */}
      <h2 className="font-black text-2xl text-center mb-5" style={{color:'var(--foreground)'}}>Loved by Developers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t,i)=>(
          <Card key={i}>
            <div className="flex gap-0.5 mb-3">{Array.from({length:t.rating}).map((_,j)=><span key={j} className="text-amber-400 text-sm">★</span>)}</div>
            <p className="text-sm italic mb-4" style={{color:'var(--muted)'}}>"{t.text}"</p>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{background:COLOR.primary}}>{t.name[0]}</div>
              <div><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{t.name}</p><p className="text-xs" style={{color:'var(--muted)'}}>{t.role}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
