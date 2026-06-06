'use client'
import { useState, useMemo } from 'react'
import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_TAGS } from '@/lib/data'
import { Search, Clock, User, Eye, Heart, MessageSquare, ArrowRight, ChevronRight, Tag, TrendingUp, Rss, BookOpen } from 'lucide-react'

const READING_TIME = [4,6,5,8,7,5,6,10]

const POPULAR = [
  { title:'Getting Started with Next.js 15', views:'12.4K', img:'https://picsum.photos/seed/b1/60/60' },
  { title:'Tailwind CSS Best Practices', views:'9.1K', img:'https://picsum.photos/seed/b2/60/60' },
  { title:'TypeScript for React Developers', views:'8.7K', img:'https://picsum.photos/seed/b5/60/60' },
  { title:'Docker & Kubernetes for Beginners', views:'7.2K', img:'https://picsum.photos/seed/b6/60/60' },
]

const NEWSLETTER_BENEFITS = ['No spam ever','Weekly digest','Exclusive tutorials','Early access to guides']

export default function BlogPage() {
  const [search,   setSearch]   = useState('')
  const [cat,      setCat]      = useState('All')
  const [page,     setPage]     = useState(1)
  const [email,    setEmail]    = useState('')
  const [subbed,   setSubbed]   = useState(false)
  const PER = 4

  const published = BLOG_POSTS.filter(p=>p.status==='Published')
  const featured  = published[0]
  const rest       = published.slice(1)

  const filtered = useMemo(()=>rest.filter(p=>{
    const ms = !search || p.title.toLowerCase().includes(search.toLowerCase())
    const mc = cat==='All' || p.cat===cat
    return ms && mc
  }), [search, cat, rest])

  const paginated = filtered.slice((page-1)*PER, page*PER)
  const pages = Math.ceil(filtered.length/PER)

  const CAT_COLORS: Record<string,string> = {
    Development:'var(--primary)', Design:'var(--purple)',
    DevOps:'var(--secondary)', Tutorial:'var(--warning)'
  }

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:'var(--foreground)',background:'var(--surface)'}}>

      {/* ── HEADER ─────────────────────────────────────── */}
      <div className="border-b" style={{background:'var(--card)',borderColor:'var(--border)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <div className="font-black text-lg" style={{color:'var(--primary)'}}>Aimi</div>
          <ChevronRight size={14} style={{color:'var(--border)'}}/>
          <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>Blog</span>
          <div className="ml-auto flex items-center gap-2 text-xs font-semibold" style={{color:'var(--primary)'}}>
            <Rss size={13}/> Subscribe
          </div>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────── */}
      <div className="relative overflow-hidden py-16 text-center" style={{background:'linear-gradient(135deg,#0f0f1a,#1a1a2e)'}}>
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle at 1px 1px,white 1px,transparent 0)',backgroundSize:'28px 28px'}}/>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold" style={{background:'rgba(93,135,255,0.15)',color:'var(--primary)',border:'1px solid rgba(93,135,255,0.3)'}}>
            <BookOpen size={11}/> Technical Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">Ideas, Guides &<br/><span style={{color:'var(--primary)'}}>Deep Dives</span></h1>
          <p className="text-white/60 text-base">Expert articles on web development, design systems and modern engineering practices.</p>
          {/* Search */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl max-w-md mx-auto mt-4" style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)'}}>
            <Search size={15} style={{color:'rgba(255,255,255,0.4)'}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles…"
              className="flex-1 bg-transparent text-sm outline-none text-white placeholder-white/30"/>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── MAIN CONTENT ───────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Featured post */}
            {!search && cat==='All' && (
              <article className="group relative rounded-3xl overflow-hidden border cursor-pointer hover:shadow-xl transition-all duration-300" style={{background:'var(--card)',borderColor:'var(--border)'}}>
                <div className="h-64 overflow-hidden relative">
                  <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-bold text-white" style={{background:CAT_COLORS[featured.cat]||'var(--primary)'}}>⭐ Featured</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{background:CAT_COLORS[featured.cat]+'20',color:CAT_COLORS[featured.cat]||'var(--primary)'}}>{featured.cat}</span>
                    <span className="flex items-center gap-1 text-xs" style={{color:'var(--muted)'}}><Clock size={11}/>{READING_TIME[0]} min read</span>
                    <span className="text-xs" style={{color:'var(--muted)'}}>{featured.date}</span>
                  </div>
                  <h2 className="text-xl font-black mb-2 group-hover:text-[var(--primary)] transition-colors" style={{color:'var(--foreground)'}}>{featured.title}</h2>
                  <p className="text-sm leading-relaxed mb-4" style={{color:'var(--muted)'}}>A comprehensive guide covering everything you need to know to build production-ready applications with the latest features and best practices.</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{background:'var(--primary)'}}>{featured.author[0]}</div>
                      <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>{featured.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{color:'var(--muted)'}}>
                      <span className="flex items-center gap-1"><Eye size={11}/>{featured.views.toLocaleString('en-US')}</span>
                      <span className="flex items-center gap-1"><Heart size={11}/>{featured.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={11}/>{featured.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Category pills */}
            <div className="flex gap-2 flex-wrap">
              {['All',...Array.from(new Set(rest.map(p=>p.cat)))].map(c=>(
                <button key={c} type="button" onClick={()=>{setCat(c);setPage(1)}}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={cat===c?{background:'var(--primary)',color:'#fff'}:{background:'var(--card)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                  {c}
                </button>
              ))}
            </div>

            {/* Post grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {paginated.map((post,i)=>(
                <article key={post.id} className="group rounded-2xl overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" style={{background:'var(--card)',borderColor:'var(--border)'}}>
                  <div className="h-44 overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:(CAT_COLORS[post.cat]||'var(--primary)')+'15',color:CAT_COLORS[post.cat]||'var(--primary)'}}>{post.cat}</span>
                      <span className="flex items-center gap-1 text-[10px]" style={{color:'var(--muted)'}}><Clock size={10}/>{READING_TIME[i+1]||5} min</span>
                    </div>
                    <h3 className="font-black text-sm leading-snug mb-3 group-hover:text-[var(--primary)] transition-colors" style={{color:'var(--foreground)'}}>{post.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{background:'var(--secondary)'}}>{post.author[0]}</div>
                        <span className="text-xs" style={{color:'var(--muted)'}}>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]" style={{color:'var(--muted)'}}>
                        <span className="flex items-center gap-0.5"><Eye size={10}/>{(post.views/1000).toFixed(1)}K</span>
                        <span className="flex items-center gap-0.5"><Heart size={10}/>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty state */}
            {paginated.length===0 && (
              <div className="text-center py-16 rounded-2xl border" style={{borderColor:'var(--border)'}}>
                <Search size={32} className="mx-auto mb-3" style={{color:'var(--border)'}}/>
                <p className="font-bold" style={{color:'var(--muted)'}}>No articles found for "{search}"</p>
              </div>
            )}

            {/* Pagination */}
            {pages>1 && (
              <div className="flex items-center justify-center gap-1.5">
                {Array.from({length:pages},(_,i)=>(
                  <button key={i} type="button" onClick={()=>setPage(i+1)}
                    className="w-9 h-9 rounded-xl text-sm font-bold transition-all"
                    style={page===i+1?{background:'var(--primary)',color:'#fff'}:{background:'var(--card)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                    {i+1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── SIDEBAR ────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Categories */}
            <div className="rounded-2xl border p-5" style={{background:'var(--card)',borderColor:'var(--border)'}}>
              <h3 className="font-black text-sm mb-4" style={{color:'var(--foreground)'}}>Categories</h3>
              <div className="space-y-2">
                {BLOG_CATEGORIES.map(c=>(
                  <button key={c.id} type="button" onClick={()=>setCat(cat===c.name?'All':c.name)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-sm transition-all hover:bg-[var(--surface)]"
                    style={cat===c.name?{background:'var(--primary-light)',color:'var(--primary)'}:{color:'var(--foreground)'}}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{background:c.color}}/>
                      <span className="font-semibold">{c.name}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{background:'var(--surface)',color:'var(--muted)'}}>{c.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="rounded-2xl border p-5" style={{background:'var(--card)',borderColor:'var(--border)'}}>
              <h3 className="font-black text-sm mb-4 flex items-center gap-2" style={{color:'var(--foreground)'}}>
                <TrendingUp size={14} style={{color:'var(--primary)'}}/> Popular This Week
              </h3>
              <div className="space-y-4">
                {POPULAR.map((p,i)=>(
                  <div key={i} className="flex items-center gap-3 cursor-pointer group">
                    <span className="text-lg font-black w-6 text-center flex-shrink-0" style={{color:'var(--border)'}}>{i+1}</span>
                    <img src={p.img} alt={p.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-2" style={{color:'var(--foreground)'}}>{p.title}</p>
                      <p className="text-[10px] mt-0.5" style={{color:'var(--muted)'}}><Eye size={9} className="inline mr-0.5"/>{p.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-2xl border p-5" style={{background:'var(--card)',borderColor:'var(--border)'}}>
              <h3 className="font-black text-sm mb-4 flex items-center gap-2" style={{color:'var(--foreground)'}}>
                <Tag size={13} style={{color:'var(--primary)'}}/> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {BLOG_TAGS.slice(0,12).map(t=>(
                  <button key={t.id} type="button" className="text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all hover:bg-[var(--primary)] hover:text-white" style={{background:'var(--surface)',color:'var(--muted)'}}>
                    #{t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl p-5 text-white overflow-hidden relative" style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))'}}>
              <div className="absolute right-0 top-0 w-20 h-20 rounded-full opacity-10" style={{background:'white',transform:'translate(30%,-30%)'}}/>
              <div className="relative space-y-3">
                <div className="text-2xl">📨</div>
                <h3 className="font-black text-sm">Weekly Newsletter</h3>
                <p className="text-white/70 text-xs">Get the best articles delivered to your inbox every week.</p>
                <ul className="space-y-1.5">
                  {NEWSLETTER_BENEFITS.map(b=>(
                    <li key={b} className="flex items-center gap-1.5 text-xs text-white/80">
                      <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[8px] font-bold">✓</span>{b}
                    </li>
                  ))}
                </ul>
                {subbed ? (
                  <p className="text-xs font-bold text-white">✓ You're subscribed!</p>
                ) : (
                  <div className="space-y-2">
                    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email…"
                      className="w-full px-3 py-2 rounded-xl text-xs outline-none text-gray-800" style={{background:'rgba(255,255,255,0.9)'}}/>
                    <button type="button" onClick={()=>{if(email)setSubbed(true)}}
                      className="w-full py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90" style={{background:'rgba(255,255,255,0.2)',color:'white',border:'1px solid rgba(255,255,255,0.3)'}}>
                      Subscribe Free →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t py-6 text-center text-xs" style={{borderColor:'var(--border)',background:'var(--card)',color:'var(--muted)'}}>
        © 2025 Aimi Blog · <a href="#" style={{color:'var(--primary)'}}>Privacy</a> · <a href="#" style={{color:'var(--primary)'}}>Terms</a>
      </div>
    </div>
  )
}
