'use client'
import { PageBanner, Card, Badge, Button } from '@/components/ui'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const PROJECTS = [
  { id:1, title:'E-Commerce Platform',   cat:'Web App',    tech:['Next.js','TypeScript','Stripe'],  img:'https://picsum.photos/seed/pf1/600/400', live:'#', repo:'#', views:4200, desc:'Full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.' },
  { id:2, title:'AI Dashboard',          cat:'Dashboard',  tech:['React','Python','OpenAI'],         img:'https://picsum.photos/seed/pf2/600/400', live:'#', repo:'#', views:3100, desc:'Analytics dashboard powered by AI insights with real-time data visualization and predictive analytics.' },
  { id:3, title:'Mobile Banking App',    cat:'Mobile',     tech:['React Native','Node.js','AWS'],    img:'https://picsum.photos/seed/pf3/600/400', live:'#', repo:'#', views:5600, desc:'Secure banking application with biometric auth, instant transfers, and spending analytics.' },
  { id:4, title:'SaaS Landing Page',     cat:'Website',    tech:['Next.js','Tailwind','Framer'],     img:'https://picsum.photos/seed/pf4/600/400', live:'#', repo:'#', views:2800, desc:'High-converting SaaS landing page with animations, testimonials, and pricing sections.' },
  { id:5, title:'Task Management App',   cat:'Web App',    tech:['Vue.js','Pinia','Supabase'],       img:'https://picsum.photos/seed/pf5/600/400', live:'#', repo:'#', views:6100, desc:'Collaborative task management with real-time updates, drag-and-drop, and team workflows.' },
  { id:6, title:'Design System Library', cat:'UI Library', tech:['React','Storybook','TypeScript'],  img:'https://picsum.photos/seed/pf6/600/400', live:'#', repo:'#', views:3900, desc:'Comprehensive design system with 80+ components, dark mode, and full accessibility support.' },
]
const CATS = ['All','Web App','Dashboard','Mobile','Website','UI Library']
const SKILLS = [
  {label:'React / Next.js',pct:95,color:COLOR.primary},{label:'TypeScript',pct:90,color:COLOR.secondary},
  {label:'Node.js',pct:85,color:COLOR.success},{label:'UI/UX Design',pct:80,color:COLOR.warning},
  {label:'AWS / Cloud',pct:75,color:COLOR.purple},{label:'Mobile (RN)',pct:70,color:COLOR.error},
]

export default function PortfolioPage() {
  const [cat, setCat]       = useState('All')
  const [active, setActive] = useState<typeof PROJECTS[0]|null>(null)
  const filtered = PROJECTS.filter(p=>cat==='All'||p.cat===cat)
  return (
    <>
      <PageBanner title="Portfolio" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Portfolio'}]} description="Selected works and case studies"/>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 mb-5">
        <div className="xl:col-span-3">
          <div className="flex flex-wrap gap-2 mb-5">
            {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all" style={cat===c?{background:'var(--primary)',color:'white',borderColor:'var(--primary)'}:{background:'var(--surface)',color:'var(--muted)',borderColor:'var(--border)'}}>{c}</button>)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(p=>(
              <div key={p.id} className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" onClick={()=>setActive(p)}>
                <div className="relative h-48 overflow-hidden" style={{background:'var(--surface)'}}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform" style={{background:'var(--primary)'}}><Eye size={13}/>View</button>
                    <button className="px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 hover:scale-105 transition-transform" style={{background:'rgba(255,255,255,0.2)'}}><Github size={13}/>Code</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}>{p.title}</h3>
                    <Badge variant="primary" className="text-[9px] flex-shrink-0">{p.cat}</Badge>
                  </div>
                  <p className="text-xs mb-2.5 line-clamp-2" style={{color:'var(--muted)'}}>{p.desc}</p>
                  <div className="flex flex-wrap gap-1">{p.tech.map(t=><span key={t} className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{background:'var(--surface)',color:'var(--muted)'}}>{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-sm mb-4" style={{color:'var(--foreground)'}}>Skills</h3>
            <div className="space-y-3">
              {SKILLS.map(s=>(
                <div key={s.label}><div className="flex justify-between text-xs mb-1"><span style={{color:'var(--foreground)'}}>{s.label}</span><span className="font-bold" style={{color:s.color}}>{s.pct}%</span></div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{background:'var(--border)'}}><div className="h-full rounded-full" style={{width:`${s.pct}%`,background:s.color,transition:'width 0.6s ease'}}/></div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-sm mb-3" style={{color:'var(--foreground)'}}>Stats</h3>
            {[{l:'Projects',v:PROJECTS.length},{l:'Clients',v:'28+'},{l:'Years Exp.',v:'8+'},{l:'Coffee/day',v:'4 ☕'}].map(s=>(
              <div key={s.l} className="flex justify-between text-sm py-1.5 border-b last:border-0" style={{borderColor:'var(--border)'}}><span style={{color:'var(--muted)'}}>{s.l}</span><span className="font-bold" style={{color:'var(--foreground)'}}>{s.v}</span></div>
            ))}
          </Card>
          <Button className="w-full justify-center">Download CV</Button>
        </div>
      </div>

      {/* Project modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={()=>setActive(null)}>
          <div className="card w-full max-w-2xl animate-fade-up overflow-hidden" onClick={e=>e.stopPropagation()}>
            <img src={active.img} alt={active.title} className="w-full h-56 object-cover"/>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div><h2 className="font-black text-xl" style={{color:'var(--foreground)'}}>{active.title}</h2><Badge variant="primary" className="mt-1">{active.cat}</Badge></div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline"><ExternalLink size={13}/>Live Demo</Button>
                  <Button size="sm" variant="ghost"><Github size={13}/>GitHub</Button>
                </div>
              </div>
              <p className="text-sm mb-4" style={{color:'var(--muted)'}}>{active.desc}</p>
              <div className="flex flex-wrap gap-1.5">{active.tech.map(t=><Badge key={t} variant="muted">{t}</Badge>)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
