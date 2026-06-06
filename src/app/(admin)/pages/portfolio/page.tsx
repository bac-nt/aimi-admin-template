'use client'
import React, { useState } from 'react'
import { ExternalLink, ArrowRight, Award, Github, Layers, Cpu, Palette, Globe, Star } from 'lucide-react'

const PROJECTS = [
  { id:1, title:'NexaCommerce Platform', cat:'Web App', year:'2024', client:'TechCorp Ltd',
    featured:true, desc:'Full-featured e-commerce platform with real-time inventory, multi-currency checkout and advanced analytics dashboard. Handled $2M+ in transactions in first quarter.',
    tech:['Next.js 15','TypeScript','Prisma','Stripe','Vercel'], img:'https://picsum.photos/seed/port1/800/500',
    color:'var(--primary)', award:'Best E-commerce Solution 2024', stats:{users:'12K',revenue:'$2M+',uptime:'99.9%'} },
  { id:2, title:'Finova Mobile Banking', cat:'Mobile', year:'2024', client:'FinBank Group',
    featured:false, desc:'Cross-platform banking app with biometric auth, instant P2P transfers, investment portfolio tracking and real-time market data for 50,000 users.',
    tech:['React Native','Expo','Firebase','Plaid'], img:'https://picsum.photos/seed/port2/800/500',
    color:'var(--secondary)', award:null, stats:{users:'50K',downloads:'180K',rating:'4.9★'} },
  { id:3, title:'Orion SaaS Dashboard', cat:'Web App', year:'2024', client:'CloudStart Inc',
    featured:true, desc:'Real-time analytics and operations hub for a growing SaaS platform. Reduced reporting time by 60% and increased decision velocity across 8 product teams.',
    tech:['Next.js','Recharts','PostgreSQL','tRPC','Tailwind'], img:'https://picsum.photos/seed/port3/800/500',
    color:'var(--success)', award:'Awwwards Honorable Mention', stats:{teams:8,reduction:'60%',users:'10K+'} },
  { id:4, title:'Bloom Brand Identity', cat:'Design', year:'2023', client:'Bloom Creative',
    featured:false, desc:'Complete brand overhaul — logo, design system, website and all marketing collateral. Resulted in 40% increase in brand recognition and a Behance feature.',
    tech:['Figma','Adobe CC','Framer','Webflow'], img:'https://picsum.photos/seed/port4/800/500',
    color:'var(--warning)', award:'Behance Featured', stats:{assets:'200+',screens:'45',recognition:'+40%'} },
  { id:5, title:'RetailPro Inventory', cat:'Web App', year:'2023', client:'RetailPro LLC',
    featured:false, desc:'End-to-end inventory management with barcode scanning, multi-warehouse support, supplier portal and automated reorder triggers across 12 retail locations.',
    tech:['Go','Vue 3','PostgreSQL','Redis','Docker'], img:'https://picsum.photos/seed/port5/800/500',
    color:'var(--purple)', award:null, stats:{locations:12,items:'85K+',accuracy:'99.8%'} },
  { id:6, title:'NovaMind AI Assistant', cat:'AI/ML', year:'2024', client:'NovaMind Inc',
    featured:true, desc:'Enterprise AI assistant with RAG architecture, multi-model routing, conversation memory and tool-use capabilities. 10x faster than previous workflow.',
    tech:['Python','LangChain','FastAPI','React','OpenAI'], img:'https://picsum.photos/seed/port6/800/500',
    color:'var(--error)', award:'Product Hunt #1 of the Day', stats:{queries:'1M+',accuracy:'94%',speedup:'10x'} },
]

const CATS = ['All','Web App','Mobile','Design','AI/ML']
const CAT_ICONS: Record<string,React.ElementType> = { 'Web App':Globe, 'Mobile':Cpu, 'Design':Palette, 'AI/ML':Layers }

const STATS = [{v:'48+',l:'Projects'},{v:'$2.4M',l:'Client Value'},{v:'98%',l:'Satisfaction'},{v:'6',l:'Awards'}]

export default function PortfolioPage() {
  const [cat,      setCat]      = useState('All')
  const [selected, setSelected] = useState<typeof PROJECTS[0]|null>(null)

  const shown = cat==='All' ? PROJECTS : PROJECTS.filter(p=>p.cat===cat)
  const featured = PROJECTS.filter(p=>p.featured)

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:'var(--foreground)',background:'var(--surface)'}}>

      {/* Nav */}
      <nav className="border-b" style={{background:'var(--card)',borderColor:'var(--border)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 h-16">
          <div className="font-black text-xl" style={{color:'var(--primary)'}}>Aimi</div>
          {['Work','About','Blog','Contact'].map(n=>(
            <a key={n} href="#" className="text-sm font-semibold hidden md:block hover:text-[var(--primary)] transition-colors" style={{color:n==='Work'?'var(--primary)':'var(--muted)'}}>{n}</a>
          ))}
          <button type="button" className="ml-auto px-4 py-2 rounded-xl font-bold text-sm text-white" style={{background:'var(--primary)'}}>Hire Us</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center" style={{background:'linear-gradient(160deg,#0a0a1a,#111827,#0a1628)'}}>
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'radial-gradient(circle at 1px 1px,white 1px,transparent 0)',backgroundSize:'28px 28px'}}/>
        <div className="absolute top-8 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-15" style={{background:'var(--primary)'}}/>
        <div className="absolute bottom-8 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10" style={{background:'var(--secondary)'}}/>
        <div className="relative max-w-3xl mx-auto px-4 space-y-6">
          <div className="text-xs font-bold uppercase tracking-widest" style={{color:'var(--secondary)'}}>Selected Work</div>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-none">We craft<br/><span style={{color:'var(--primary)'}}>digital</span> products</h1>
          <p className="text-white/60 text-base max-w-xl mx-auto">From concept to launch. Full-stack development, UI/UX design and AI integration for forward-thinking companies.</p>
          {/* Stats */}
          <div className="flex items-center justify-center gap-10 pt-4">
            {STATS.map(s=>(
              <div key={s.l} className="text-center">
                <p className="text-2xl font-black text-white">{s.v}</p>
                <p className="text-white/50 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:'var(--primary)'}}>Highlights</p>
            <h2 className="text-3xl font-black" style={{color:'var(--foreground)'}}>Featured Work</h2>
          </div>
        </div>
        <div className="space-y-6">
          {featured.map((p,i)=>(
            <div key={p.id} className={`group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border hover:shadow-2xl transition-all duration-300 ${i%2===1?'':''}`} style={{background:'var(--card)',borderColor:'var(--border)'}}>
              <div className={`relative h-64 lg:h-auto overflow-hidden ${i%2===1?'lg:order-2':''}`}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div className="absolute inset-0" style={{background:`linear-gradient(to right,${i%2===1?'transparent,'+p.color+'33':''+p.color+'33,transparent'})`}}/>
                {p.award && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold text-white" style={{background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)'}}>
                    <Award size={11} style={{color:'var(--warning)'}}/>{p.award}
                  </div>
                )}
              </div>
              <div className={`p-8 flex flex-col justify-center ${i%2===1?'lg:order-1':''}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{background:p.color+'15',color:p.color}}>{p.cat}</span>
                  <span className="text-xs" style={{color:'var(--muted)'}}>{p.client} · {p.year}</span>
                </div>
                <h3 className="text-2xl font-black mb-3" style={{color:'var(--foreground)'}}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{color:'var(--muted)'}}>{p.desc}</p>
                {/* Stats */}
                <div className="flex gap-4 mb-5">
                  {Object.entries(p.stats).map(([k,v])=>(
                    <div key={k} className="text-center">
                      <p className="font-black text-base" style={{color:p.color}}>{v}</p>
                      <p className="text-[10px] capitalize" style={{color:'var(--muted)'}}>{k}</p>
                    </div>
                  ))}
                </div>
                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map(t=>(
                    <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg" style={{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90" style={{background:p.color}}>
                    <ExternalLink size={13}/>View Project
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border transition-all hover:bg-[var(--surface)]" style={{color:'var(--muted)',borderColor:'var(--border)'}}>
                    <Github size={13}/>Source
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16" style={{background:'var(--card)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-black" style={{color:'var(--foreground)'}}>All Projects</h2>
            <div className="flex gap-2">
              {CATS.map(c=>{
                const Icon = CAT_ICONS[c]
                return (
                  <button key={c} type="button" onClick={()=>setCat(c)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={cat===c?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                    {Icon && <Icon size={11}/>}{c}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shown.map(p=>(
              <div key={p.id} className="group relative rounded-3xl overflow-hidden border cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button type="button" className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-gray-800 hover:scale-105 transition-transform flex items-center gap-1.5">
                      <ExternalLink size={11}/>View
                    </button>
                    <button type="button" className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:scale-105 transition-transform">
                      <Github size={14}/>
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{background:p.color}}>{p.cat}</span>
                    {p.featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white flex items-center gap-1" style={{background:'rgba(0,0,0,0.5)'}}>
                      <Star size={8} fill="var(--warning)" style={{color:'var(--warning)'}}/>Featured
                    </span>}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs mb-1" style={{color:'var(--muted)'}}>{p.client} · {p.year}</p>
                  <h3 className="font-black text-sm mb-2" style={{color:'var(--foreground)'}}>{p.title}</h3>
                  <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{color:'var(--muted)'}}>{p.desc}</p>
                  {p.award && (
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold" style={{color:'var(--warning)'}}>
                      <Award size={10}/>{p.award}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tech.slice(0,3).map(t=>(
                      <span key={t} className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{background:'var(--card)',color:'var(--muted)'}}>{t}</span>
                    ))}
                    {p.tech.length>3&&<span className="text-[9px]" style={{color:'var(--muted)'}}>+{p.tech.length-3}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-3xl p-12 text-center" style={{background:'linear-gradient(135deg,#0a0a1a,#111827)'}}>
          <div className="text-4xl mb-5">🚀</div>
          <h2 className="text-3xl font-black text-white mb-3">Have a project in mind?</h2>
          <p className="text-white/60 mb-7">We'd love to hear about it. Let's build something great together.</p>
          <button type="button" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:opacity-90" style={{background:'var(--primary)',color:'white'}}>
            Start a Project <ArrowRight size={15}/>
          </button>
        </div>
      </section>

      <div className="border-t py-6 text-center text-xs" style={{borderColor:'var(--border)',background:'var(--card)',color:'var(--muted)'}}>
        © 2025 Aimi Studio · All rights reserved
      </div>
    </div>
  )
}
