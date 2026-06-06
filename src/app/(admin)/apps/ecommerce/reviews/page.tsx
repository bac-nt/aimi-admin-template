'use client'
import { useState } from 'react'
import { Badge, Button, Card, Modal, PageBanner, SearchBar, Toast } from '@/components/ui'
import { REVIEWS } from '@/lib/data'
import { Check, Download, Eye, Filter, Flag, MessageSquare, Search, Star, ThumbsUp, Trash2, X } from 'lucide-react'

type Review = typeof REVIEWS[0]
type Filter = 'All'|'Pending'|'Approved'|'Flagged'

const RATING_V: Record<number, 'success'|'primary'|'warning'|'error'> = { 5:'success', 4:'primary', 3:'warning', 2:'error', 1:'error' }

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(REVIEWS.map(r=>({...r,flagged:false})))
  const [filter,  setFilter]  = useState<Filter>('All')
  const [search,  setSearch]  = useState('')
  const [detail,  setDetail]  = useState<typeof reviews[0]|null>(null)
  const [toast,   setToast]   = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }
  const approve = (id:number) => { setReviews(rs=>rs.map(r=>r.id===id?{...r,status:'Approved'}:r)); showToast('Review approved') }
  const reject  = (id:number) => { setReviews(rs=>rs.filter(r=>r.id!==id)); showToast('Review removed') }
  const flag    = (id:number) => { setReviews(rs=>rs.map(r=>r.id===id?{...r,flagged:!r.flagged}:r)) }

  const filtered = reviews
    .filter(r => filter==='All'||(filter==='Flagged'?r.flagged:r.status===filter))
    .filter(r => r.product.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase()))

  const avgRating = (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1)
  const stars = [5,4,3,2,1].map(s=>({star:s,count:reviews.filter(r=>r.rating===s).length}))

  return (
    <>
      <PageBanner title="Product Reviews" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Reviews'}]}
        description="Moderate customer reviews and ratings"
        action={<Button variant="outline"><Download size={14}/>Export</Button>}/>
      {<Toast message={toast}/>}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
        {/* Rating summary */}
        <Card className="lg:col-span-1">
          <div className="text-center mb-4">
            <p className="text-4xl font-black" style={{color:'var(--warning)'}}>{avgRating}</p>
            <div className="flex justify-center gap-0.5 my-1">{[1,2,3,4,5].map(s=><span key={s} style={{color:+avgRating>=s?'var(--warning)':'var(--border)',fontSize:18}}>★</span>)}</div>
            <p className="text-xs" style={{color:'var(--muted)'}}>{reviews.length} reviews</p>
          </div>
          <div className="space-y-2">
            {stars.map(s=>(
              <div key={s.star} className="flex items-center gap-2 text-xs">
                <span style={{color:'var(--muted)',minWidth:8}}>{s.star}</span>
                <span style={{color:'var(--warning)'}}>★</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{background:'var(--border)'}}>
                  <div className="h-full rounded-full" style={{width:`${Math.round(s.count/reviews.length*100)}%`,background:'var(--warning)'}}/>
                </div>
                <span style={{color:'var(--muted)',minWidth:12}}>{s.count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {l:'Total',     v:reviews.length,                        c:'var(--foreground)'},
            {l:'Pending',   v:reviews.filter(r=>r.status==='Pending').length, c:'var(--warning)' },
            {l:'Approved',  v:reviews.filter(r=>r.status==='Approved').length,c:'var(--success)' },
            {l:'Flagged',   v:reviews.filter(r=>r.flagged).length,   c:'var(--error)'    },
          ].map(s=>(
            <Card key={s.l}><p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
          ))}
        </div>
      </div>

      <Card padding={false}>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
          <div className="flex gap-1.5">
            {(['All','Pending','Approved','Flagged'] as Filter[]).map(f=>(
              <button key={f} type="button" onClick={()=>setFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={filter===f?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y" style={{borderColor:'var(--border)'}}>
          {filtered.map(r=>(
            <div key={r.id} className={`p-5 hover:bg-[var(--surface)] transition-colors ${r.flagged?'border-l-2':''}`} style={r.flagged?{borderLeftColor:'var(--error)'}:{}}>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:'var(--primary)'}}>{r.customer[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{r.customer}</span>
                        {r.verified&&<span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{background:'var(--success-light)',color:'var(--success)'}}>✓ Verified</span>}
                      </div>
                      <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>{r.product} · {r.date}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={RATING_V[r.rating]||'muted'}>{'★'.repeat(r.rating)} {r.rating}/5</Badge>
                      <Badge variant={r.status==='Approved'?'success':'warning'} dot>{r.status}</Badge>
                    </div>
                  </div>
                  <p className="font-semibold text-sm mt-2" style={{color:'var(--foreground)'}}>{r.title}</p>
                  <p className="text-sm mt-1" style={{color:'var(--muted)'}}>{r.body}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs flex items-center gap-1" style={{color:'var(--muted)'}}><ThumbsUp size={11}/>{r.helpful} helpful</span>
                    <div className="flex gap-1 ml-auto">
                      <button type="button" onClick={()=>setDetail(r)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Eye size={12}/></button>
                      {r.status==='Pending'&&<button type="button" onClick={()=>approve(r.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--success-light)] hover:text-[var(--success)] transition-colors" style={{color:'var(--muted)'}}><Check size={13}/></button>}
                      <button type="button" onClick={()=>flag(r.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--warning-light)] hover:text-[var(--warning)] transition-colors" style={{color:r.flagged?'var(--error)':'var(--muted)'}}><Flag size={12}/></button>
                      <button type="button" onClick={()=>reject(r.id)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
