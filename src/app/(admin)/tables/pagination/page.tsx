'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Select } from '@/components/ui'
import { CUSTOMERS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

export default function PaginationPage() {
  const [page,    setPage]    = useState(1)
  const [perPage, setPerPage] = useState(5)

  const total = CUSTOMERS.length
  const pages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const rows  = CUSTOMERS.slice(start, start + perPage)

  const TIER_V: Record<string,'purple'|'warning'|'secondary'|'muted'> = {Platinum:'purple',Gold:'warning',Silver:'secondary',Bronze:'muted'}

  const goTo = (p: number) => setPage(Math.max(1, Math.min(pages, p)))

  // Generate page numbers with ellipsis
  const getPageNums = () => {
    if (pages <= 7) return Array.from({length:pages},(_,i)=>i+1)
    if (page <= 4)  return [1,2,3,4,5,'...',pages]
    if (page >= pages-3) return [1,'...',pages-4,pages-3,pages-2,pages-1,pages]
    return [1,'...',page-1,page,page+1,'...',pages]
  }

  return (
    <>
      <PageBanner title="Pagination" description="Navigate large datasets with first/prev/next/last controls and variable page size"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Tables'},{label:'Pagination'}]}/>

      <div className="flex flex-wrap gap-3 mb-5">
        {[{l:'First / Prev / Next / Last',c:'var(--primary)'},{l:'Ellipsis for large page counts',c:'var(--secondary)'},{l:'Variable rows per page',c:'var(--success)'}].map(f=>(
          <span key={f.l} className="text-xs px-2.5 py-1 rounded-full" style={{background:f.c+'15',color:f.c}}>{f.l}</span>
        ))}
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['#','Customer','Email','City','Orders','Spent','Tier','Status'].map(h=>(
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {rows.map((c,i)=>(
                <tr key={c.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <td className="px-5 py-3.5 text-xs font-mono" style={{color:'var(--muted)'}}>{start+i+1}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:'var(--primary)'}}>{c.avatar}</div>
                      <span className="font-semibold" style={{color:'var(--foreground)'}}>{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{c.email}</td>
                  <td className="px-5 py-3.5 text-sm" style={{color:'var(--muted)'}}>{c.city}</td>
                  <td className="px-5 py-3.5 text-center font-semibold" style={{color:'var(--foreground)'}}>{c.orders}</td>
                  <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(c.spent)}</td>
                  <td className="px-5 py-3.5"><Badge variant={TIER_V[c.tier]}>{c.tier}</Badge></td>
                  <td className="px-5 py-3.5"><Badge variant={c.status==='active'?'success':'muted'} dot className="capitalize">{c.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t" style={{borderColor:'var(--border)'}}>
          <div className="flex items-center gap-2 text-sm">
            <span style={{color:'var(--muted)'}}>Show</span>
            <Select value={String(perPage)} onChange={e=>{setPerPage(+e.target.value);setPage(1)}}
              options={[3,5,10,20].map(v=>({value:String(v),label:String(v)}))} className="w-20"/>
            <span style={{color:'var(--muted)'}}>entries · showing {start+1}–{Math.min(start+perPage,total)} of {total}</span>
          </div>

          <div className="flex items-center gap-1">
            <button type="button" onClick={()=>goTo(1)} disabled={page===1}
              className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}>
              <ChevronsLeft size={14}/>
            </button>
            <button type="button" onClick={()=>goTo(page-1)} disabled={page===1}
              className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}>
              <ChevronLeft size={14}/>
            </button>

            {getPageNums().map((p,i)=>(
              <button key={i} type="button" onClick={()=>typeof p==='number'&&goTo(p)} disabled={p==='...'}
                className="w-8 h-8 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: p===page ? 'var(--primary)' : 'transparent',
                  color:      p===page ? '#fff' : 'var(--muted)',
                  border:     p!==page && p!=='...' ? '1px solid var(--border)' : 'none',
                  cursor:     p==='...' ? 'default' : 'pointer',
                }}>
                {p}
              </button>
            ))}

            <button type="button" onClick={()=>goTo(page+1)} disabled={page===pages}
              className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}>
              <ChevronRight size={14}/>
            </button>
            <button type="button" onClick={()=>goTo(pages)} disabled={page===pages}
              className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}>
              <ChevronsRight size={14}/>
            </button>
          </div>
        </div>
      </Card>
    </>
  )
}
