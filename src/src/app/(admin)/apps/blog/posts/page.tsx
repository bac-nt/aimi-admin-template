'use client'
import { PageBanner, Card, Badge, Avatar, Button, Modal } from '@/components/ui'
import { Search, Plus, Eye, Edit, Trash2, Heart, MessageSquare, Calendar, Grid, List, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { COLOR } from '@/config/tokens'
import Link from 'next/link'

const INIT_POSTS = [
  { id:1, title:'Getting Started with Next.js 15',       cat:'Development', author:'Mathew',  date:'Jan 15', views:4200, likes:128, comments:24, status:'Published', img:'https://picsum.photos/seed/b1/400/240' },
  { id:2, title:'Tailwind CSS Best Practices in 2025',   cat:'Design',      author:'Nirav',   date:'Jan 18', views:3100, likes:96,  comments:18, status:'Published', img:'https://picsum.photos/seed/b2/400/240' },
  { id:3, title:'Building Scalable React Applications',  cat:'Development', author:'Bhavesh', date:'Jan 22', views:5600, likes:210, comments:41, status:'Published', img:'https://picsum.photos/seed/b3/400/240' },
  { id:4, title:'UI/UX Design Trends to Watch in 2025',  cat:'Design',      author:'Lara',    date:'Jan 25', views:2800, likes:87,  comments:15, status:'Draft',     img:'https://picsum.photos/seed/b4/400/240' },
  { id:5, title:'TypeScript for React Developers',       cat:'Development', author:'Andrew',  date:'Jan 28', views:6100, likes:243, comments:52, status:'Published', img:'https://picsum.photos/seed/b5/400/240' },
  { id:6, title:'Docker & Kubernetes for Beginners',     cat:'DevOps',      author:'Sunil',   date:'Feb 1',  views:3900, likes:145, comments:33, status:'Published', img:'https://picsum.photos/seed/b6/400/240' },
]
const CAT_V: Record<string,'primary'|'secondary'|'warning'|'purple'> = { Development:'primary', Design:'purple', DevOps:'secondary', Tutorial:'warning' }
const STA_V: Record<string,'success'|'warning'> = { Published:'success', Draft:'warning' }

export default function BlogPostsPage() {
  const [view, setView]     = useState<'grid'|'list'>('grid')
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')
  const [posts, setPosts]   = useState(INIT_POSTS)
  const [deleteId, setDeleteId] = useState<number|null>(null)
  const [toast, setToast]   = useState<string|null>(null)

  const cats = ['All', ...Array.from(new Set(posts.map(p => p.cat)))]
  const filtered = posts.filter(p => {
    const ms = p.title.toLowerCase().includes(search.toLowerCase())
    const mc = cat === 'All' || p.cat === cat
    return ms && mc
  })

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = (id: number) => {
    setPosts(ps => ps.filter(p => p.id !== id))
    setDeleteId(null)
    showToast('Post deleted successfully')
  }

  const toggleStatus = (id: number) => {
    setPosts(ps => ps.map(p => p.id===id ? {...p, status: p.status==='Published'?'Draft':'Published'} : p))
    showToast('Post status updated')
  }

  const stats = [
    { l:'Total Posts',  v:posts.length,                                            c:'var(--primary)'  },
    { l:'Published',    v:posts.filter(p=>p.status==='Published').length,          c:'var(--success)'  },
    { l:'Total Views',  v:posts.reduce((a,p) => a+p.views, 0).toLocaleString(),   c:'var(--secondary)'},
    { l:'Total Likes',  v:posts.reduce((a,p) => a+p.likes, 0),                    c:'var(--warning)'  },
  ]

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold animate-fade-up shadow-lg" style={{background:'var(--success)'}}>
          <Check size={16}/>{toast}
        </div>
      )}

      <PageBanner title="Blog Posts" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'Posts'}]}/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map(s => (
          <Card key={s.l}><p className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border w-56" style={{background:'var(--card)',borderColor:'var(--border)'}}>
          <Search size={14} style={{color:'var(--muted)'}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search posts..." className="bg-transparent text-sm outline-none w-full" style={{color:'var(--foreground)'}}/>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {cats.map(c => <button key={c} onClick={()=>setCat(c)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={cat===c?{background:'var(--primary)',color:'white'}:{background:'var(--surface)',color:'var(--muted)'}}>{c}</button>)}
        </div>
        <div className="flex border rounded-xl overflow-hidden ml-auto" style={{borderColor:'var(--border)'}}>
          <button onClick={()=>setView('grid')} className="px-3 py-2 transition-colors" style={view==='grid'?{background:'var(--primary)',color:'white'}:{color:'var(--muted)'}}><Grid size={15}/></button>
          <button onClick={()=>setView('list')} className="px-3 py-2 transition-colors" style={view==='list'?{background:'var(--primary)',color:'white'}:{color:'var(--muted)'}}><List size={15}/></button>
        </div>
        <Link href="/apps/blog/create"><Button><Plus size={14}/>New Post</Button></Link>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="card group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="relative h-44 overflow-hidden" style={{background:'var(--surface)'}}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <Badge variant={CAT_V[p.cat]||'primary'}>{p.cat}</Badge>
                  <Badge variant={STA_V[p.status]}>{p.status}</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm leading-snug mb-2 line-clamp-2" style={{color:'var(--foreground)'}}>{p.title}</h3>
                <div className="flex items-center gap-3 text-xs mb-3" style={{color:'var(--muted)'}}>
                  <span className="flex items-center gap-1"><Calendar size={10}/>{p.date}</span>
                  <span>by {p.author}</span>
                </div>
                <div className="flex items-center gap-3 text-xs pt-3 border-t" style={{color:'var(--muted)',borderColor:'var(--border)'}}>
                  <span className="flex items-center gap-1"><Eye size={11}/>{p.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Heart size={11}/>{p.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare size={11}/>{p.comments}</span>
                  <div className="ml-auto flex gap-1">
                    <button onClick={()=>toggleStatus(p.id)} title="Toggle status" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--warning-light)] transition-colors" style={{color:'var(--muted)'}}>
                      <div className="w-2 h-2 rounded-full" style={{background:p.status==='Published'?'var(--success)':'var(--warning)'}}/>
                    </button>
                    <Link href="/apps/blog/edit"><button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}><Edit size={12}/></button></Link>
                    <button onClick={()=>setDeleteId(p.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr style={{borderBottom:`1px solid var(--border)`}}>
                {['Post','Category','Author','Date','Views','Status','Actions'].map(h=>(
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase" style={{color:'var(--muted)',background:'var(--surface)'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{filtered.map(p=>(
                <tr key={p.id} className="border-b hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <td className="px-5 py-3.5 max-w-xs"><p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{p.title}</p></td>
                  <td className="px-5 py-3.5"><Badge variant={CAT_V[p.cat]||'primary'}>{p.cat}</Badge></td>
                  <td className="px-5 py-3.5 text-sm" style={{color:'var(--muted)'}}>{p.author}</td>
                  <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{p.date}</td>
                  <td className="px-5 py-3.5 text-sm" style={{color:'var(--muted)'}}>{p.views.toLocaleString()}</td>
                  <td className="px-5 py-3.5"><Badge variant={STA_V[p.status]}>{p.status}</Badge></td>
                  <td className="px-5 py-3.5"><div className="flex gap-1">
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}><Eye size={12}/></button>
                    <Link href="/apps/blog/edit"><button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}><Edit size={12}/></button></Link>
                    <button onClick={()=>setDeleteId(p.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Delete modal */}
      <Modal open={!!deleteId} onClose={()=>setDeleteId(null)} title="Delete Post"
        footer={<><Button variant="ghost" onClick={()=>setDeleteId(null)}>Cancel</Button><Button variant="error" onClick={()=>deleteId&&handleDelete(deleteId)}><Trash2 size={14}/>Delete</Button></>}>
        <p className="text-sm" style={{color:'var(--muted)'}}>Are you sure you want to delete this post? This action cannot be undone.</p>
      </Modal>
    </>
  )
}
