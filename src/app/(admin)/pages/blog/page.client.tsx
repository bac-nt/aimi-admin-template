'use client'
import { PageBanner, Card, Badge, Button, Input } from '@/components/ui'
import { Search, Calendar, User, ArrowRight, TrendingUp, Eye, Heart } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'
import Link from 'next/link'

const POSTS = [
  { id:1, title:'Getting Started with Next.js 16',         cat:'Development',  author:'Mathew',  date:'Mar 15',  views:4200, likes:128, img:'https://picsum.photos/seed/p1/600/300',   excerpt:'Learn how to set up a new Next.js 16 project with Turbopack and the App Router from scratch.' },
  { id:2, title:'Tailwind CSS 4.0 — What Is New',          cat:'Design',       author:'Nirav',   date:'Mar 18',  views:3100, likes:96,  img:'https://picsum.photos/seed/p2/600/300',   excerpt:'Explore the major new features in Tailwind CSS 4.0 including native CSS variables and much more.' },
  { id:3, title:'React 19 — Full Feature Breakdown',       cat:'React',        author:'Bhavesh', date:'Mar 22',  views:5600, likes:210, img:'https://picsum.photos/seed/p3/600/300',   excerpt:'Everything you need to know about React 19.2 features, including the Actions API and compiler.' },
  { id:4, title:'TypeScript 5.8 Advanced Patterns',        cat:'TypeScript',   author:'Lara',    date:'Mar 25',  views:2800, likes:87,  img:'https://picsum.photos/seed/p4/600/300',   excerpt:'Deep dive into advanced TypeScript 5.8 patterns for scalable enterprise applications.' },
  { id:5, title:'Mastering Zustand for React State',       cat:'State Mgmt',   author:'Andrew',  date:'Mar 28',  views:6100, likes:243, img:'https://picsum.photos/seed/p5/600/300',   excerpt:'A complete guide to Zustand 5 — the lightweight state management library for React.' },
  { id:6, title:'SEO Best Practices for Next.js Apps',     cat:'SEO',          author:'Sofia',   date:'Apr 1',   views:3900, likes:145, img:'https://picsum.photos/seed/p6/600/300',   excerpt:'Optimize your Next.js application for search engines with metadata, OG tags, and structured data.' },
]
const CATS = ['All','Development','Design','React','TypeScript','State Mgmt','SEO']
const FEATURED = POSTS[2]

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')
  const filtered = POSTS.filter(p => {
    const ms = p.title.toLowerCase().includes(search.toLowerCase())
    const mc = cat === 'All' || p.cat === cat
    return ms && mc
  })
  return (
    <>
      <PageBanner title="Blog" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Blog'}]} description="Latest articles, tutorials and news"/>

      {/* Featured post */}
      <div className="card overflow-hidden mb-5 group cursor-pointer hover:shadow-lg transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-56 md:h-auto overflow-hidden" style={{minHeight:220}}>
            <img src={FEATURED.img} alt={FEATURED.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
          </div>
          <div className="p-7 flex flex-col justify-center">
            <Badge variant="primary" className="w-fit mb-3">Featured</Badge>
            <h2 className="text-2xl font-black mb-2 leading-tight" style={{color:'var(--foreground)'}}>{FEATURED.title}</h2>
            <p className="text-sm mb-4" style={{color:'var(--muted)'}}>{FEATURED.excerpt}</p>
            <div className="flex items-center gap-4 text-xs mb-4" style={{color:'var(--muted)'}}>
              <span className="flex items-center gap-1"><User size={11}/>{FEATURED.author}</span>
              <span className="flex items-center gap-1"><Calendar size={11}/>{FEATURED.date}</span>
              <span className="flex items-center gap-1"><Eye size={11}/>{FEATURED.views.toLocaleString()}</span>
            </div>
            <Button variant="primary" className="w-fit">Read Article <ArrowRight size={14}/></Button>
          </div>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <Input placeholder="Search articles..." startIcon={<Search size={14}/>} value={search} onChange={e=>setSearch(e.target.value)} className="w-56"/>
        <div className="flex gap-1.5 flex-wrap">
          {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={cat===c?{background:'var(--primary)',color:'white'}:{background:'var(--surface)',color:'var(--muted)'}}>{c}</button>)}
        </div>
        <p className="text-xs ml-auto" style={{color:'var(--muted)'}}>{filtered.length} articles</p>
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(p=>(
          <div key={p.id} className="card group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
            <div className="h-44 overflow-hidden" style={{background:'var(--surface)'}}>
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" className="text-[10px]">{p.cat}</Badge>
                <span className="text-[10px]" style={{color:'var(--muted)'}}>{p.date}</span>
              </div>
              <h3 className="font-bold text-sm leading-snug mb-2 line-clamp-2" style={{color:'var(--foreground)'}}>{p.title}</h3>
              <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{color:'var(--muted)'}}>{p.excerpt}</p>
              <div className="flex items-center justify-between text-xs pt-3 border-t" style={{borderColor:'var(--border)',color:'var(--muted)'}}>
                <span className="flex items-center gap-1"><User size={10}/>{p.author}</span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5"><Eye size={10}/>{p.views.toLocaleString()}</span>
                  <span className="flex items-center gap-0.5"><Heart size={10}/>{p.likes}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-8 text-center">
        <Button variant="outline">Load More Articles</Button>
      </div>
    </>
  )
}
