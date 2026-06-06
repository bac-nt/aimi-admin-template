'use client'
import { useState } from 'react'
import { Badge, Button, Card, Modal, PageBanner, SearchBar, Toast } from '@/components/ui'
import { Search, Check, X, Flag, ThumbsUp, Trash2, MessageSquare, Clock, Filter, Reply } from 'lucide-react'

type Status = 'All'|'Pending'|'Approved'|'Spam'
interface Comment {
  id:number; author:string; email:string; post:string; content:string
  date:string; status:string; likes:number; flagged:boolean; replies:number
}

const INIT: Comment[] = [
  { id:1, author:'Nirav Joshi',   email:'nirav@dev.com',   post:'Getting Started with Next.js 15',    content:'Great article! Really helped me understand the new App Router. The examples are clear and practical.',          date:'Mar 20',likes:5, status:'Approved',replies:1,flagged:false },
  { id:2, author:'Andrew McDown', email:'andrew@pm.com',   post:'Tailwind CSS Best Practices',         content:'I disagree with the approach on utility classes. Purging unused styles should always be mentioned first.',      date:'Mar 21',likes:2, status:'Pending', replies:0,flagged:false },
  { id:3, author:'Spammer123',    email:'spam@junk.com',   post:'TypeScript Patterns',                 content:'Buy cheap watches at discount prices! Click here now!!! 50% off all luxury brands today only.',                date:'Mar 22',likes:0, status:'Spam',    replies:0,flagged:true  },
  { id:4, author:'Lara Croft',    email:'lara@design.io',  post:'UI/UX Design Trends 2025',            content:'Love the section on micro-interactions! Could you do a deeper dive into animation curves?',                    date:'Mar 23',likes:12,status:'Approved',replies:3,flagged:false },
  { id:5, author:'Bhavesh Patel', email:'b.patel@web.com', post:'Building Scalable React Applications',content:'The context API section needs updating. With React 19 you can use use() hook for better patterns.',            date:'Mar 24',likes:7, status:'Pending', replies:0,flagged:false },
  { id:6, author:'Sofia M.',      email:'sofia@growth.io', post:'TypeScript for React Developers',     content:'Best TypeScript tutorial I have read. The generic types section finally made it click for me. Thank you!',     date:'Mar 25',likes:19,status:'Approved',replies:2,flagged:false },
  { id:7, author:'David Park',    email:'dpark@email.com', post:'Docker & Kubernetes for Beginners',   content:'There is a typo in the docker-compose.yml example on line 12. The port mapping is missing the colon.',        date:'Mar 26',likes:4, status:'Pending', replies:0,flagged:false },
  { id:8, author:'Bot Account',   email:'bot123@auto.net', post:'Getting Started with Next.js 15',    content:'Visit our site for amazing deals! Great content btw. Check us out for more!',                                  date:'Mar 26',likes:0, status:'Spam',    replies:0,flagged:true  },
]

const STATUS_V: Record<string,'success'|'warning'|'error'|'muted'> = {
  Approved:'success', Pending:'warning', Spam:'error'
}

export default function CommentsPage() {
  const [comments, setComments] = useState(INIT)
  const [filter,   setFilter]   = useState<Status>('All')
  const [search,   setSearch]   = useState('')
  const [detail,   setDetail]   = useState<Comment|null>(null)
  const [toast,    setToast]    = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const approve = (id:number) => { setComments(cs=>cs.map(c=>c.id===id?{...c,status:'Approved'}:c)); showToast('Comment approved') }
  const reject  = (id:number) => { setComments(cs=>cs.map(c=>c.id===id?{...c,status:'Spam'}:c));     showToast('Marked as spam')   }
  const remove  = (id:number) => { setComments(cs=>cs.filter(c=>c.id!==id));                          showToast('Comment deleted')  }
  const flag    = (id:number) => { setComments(cs=>cs.map(c=>c.id===id?{...c,flagged:!c.flagged}:c))                               }

  const filtered = comments
    .filter(c => filter==='All' || c.status===filter)
    .filter(c => c.author.toLowerCase().includes(search.toLowerCase())
              || c.post.toLowerCase().includes(search.toLowerCase())
              || c.content.toLowerCase().includes(search.toLowerCase()))

  const counts = comments.reduce((a,c)=>{ a[c.status]=(a[c.status]||0)+1; return a },{} as Record<string,number>)

  return (
    <>
      <PageBanner title="Comments" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'Comments'}]}
        description="Moderate and manage blog comments"
        action={
          <div className="flex gap-2">
            {counts.Pending>0 && (
              <Button variant="success" onClick={()=>{comments.filter(c=>c.status==='Pending').forEach(c=>approve(c.id));showToast(`${counts.Pending} comments approved`)}}>
                <Check size={14}/>Approve All Pending ({counts.Pending})
              </Button>
            )}
          </div>
        }/>

      {<Toast message={toast}/>}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 animate-fade-up">
        {[
          {l:'Total',    v:comments.length,          c:'var(--foreground)'},
          {l:'Pending',  v:counts.Pending||0,         c:'var(--warning)'  },
          {l:'Approved', v:counts.Approved||0,        c:'var(--success)'  },
          {l:'Spam',     v:counts.Spam||0,            c:'var(--error)'    },
        ].map(s=>(
          <Card key={s.l}><p className="text-xs font-medium mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      <Card padding={false}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
          <div className="flex gap-1.5 flex-wrap">
            {(['All','Pending','Approved','Spam'] as Status[]).map(s=>(
              <button key={s} type="button" onClick={()=>setFilter(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={filter===s?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                {s}{s!=='All'&&counts[s]?` (${counts[s]})`:''}</button>
            ))}
          </div>
        </div>

        {/* Comment list */}
        <div className="divide-y" style={{borderColor:'var(--border)'}}>
          {filtered.length === 0 && (
            <div className="p-10 text-center"><MessageSquare size={32} className="mx-auto mb-2" style={{color:'var(--border)'}}/><p style={{color:'var(--muted)'}}>No comments found</p></div>
          )}
          {filtered.map(c=>(
            <div key={c.id} className={`p-5 transition-colors hover:bg-[var(--surface)] ${c.flagged?'border-l-2 border-l-[var(--error)]':''}`}>
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{background:c.status==='Spam'?'var(--error)':'var(--primary)'}}>
                  {c.author[0]}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Meta row */}
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <div>
                      <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{c.author}</span>
                      <span className="text-xs mx-1.5" style={{color:'var(--border)'}}>·</span>
                      <span className="text-xs" style={{color:'var(--muted)'}}>{c.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Badge variant={STATUS_V[c.status]} dot>{c.status}</Badge>
                      {c.flagged && <Badge variant="error">⚑ Flagged</Badge>}
                    </div>
                  </div>

                  {/* Post reference */}
                  <div className="flex items-center gap-1 mb-2 text-xs" style={{color:'var(--muted)'}}>
                    <MessageSquare size={10}/> On: <span className="font-semibold" style={{color:'var(--primary)'}}>{c.post}</span>
                    <span className="mx-1">·</span><Clock size={10}/>{c.date}
                  </div>

                  {/* Comment content */}
                  <p className="text-sm leading-relaxed" style={{color:'var(--foreground)'}}>{c.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className="flex items-center gap-1 text-xs" style={{color:'var(--muted)'}}><ThumbsUp size={11}/>{c.likes}</span>
                    {c.replies>0&&<span className="flex items-center gap-1 text-xs" style={{color:'var(--muted)'}}><Reply size={11}/>{c.replies} replies</span>}

                    <div className="flex gap-1 ml-auto">
                      {c.status==='Pending' && <>
                        <button type="button" onClick={()=>approve(c.id)} title="Approve"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-[var(--success-light)] hover:text-[var(--success)]" style={{color:'var(--muted)',border:'1px solid var(--border)'}}>
                          <Check size={11}/>Approve
                        </button>
                        <button type="button" onClick={()=>reject(c.id)} title="Spam"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-[var(--error-light)] hover:text-[var(--error)]" style={{color:'var(--muted)',border:'1px solid var(--border)'}}>
                          <X size={11}/>Spam
                        </button>
                      </>}
                      {c.status==='Approved' && (
                        <button type="button" onClick={()=>reject(c.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-[var(--warning-light)] hover:text-[var(--warning)]" style={{color:'var(--muted)',border:'1px solid var(--border)'}}>
                          <Flag size={11}/>Mark Spam
                        </button>
                      )}
                      <button type="button" onClick={()=>flag(c.id)} title={c.flagged?'Unflag':'Flag'}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--warning-light)]" style={{color:c.flagged?'var(--error)':'var(--muted)'}}>
                        <Flag size={13}/>
                      </button>
                      <button type="button" onClick={()=>remove(c.id)} title="Delete"
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--error-light)] hover:text-[var(--error)]" style={{color:'var(--muted)'}}>
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t" style={{borderColor:'var(--border)'}}>
          <span className="text-sm" style={{color:'var(--muted)'}}>Showing {filtered.length} of {comments.length} comments</span>
        </div>
      </Card>
    </>
  )
}
