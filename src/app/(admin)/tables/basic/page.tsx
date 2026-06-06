'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge } from '@/components/ui'
import { PRODUCTS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'

type SortDir = 'asc'|'desc'|null
type SortKey = 'name'|'price'|'stock'|'rating'

export default function BasicTablePage() {
  const [sortKey, setSortKey] = useState<SortKey|null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')
      if (sortDir === 'desc') setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...PRODUCTS].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = a[sortKey], bv = b[sortKey]
    return sortDir === 'asc'
      ? (av < bv ? -1 : av > bv ? 1 : 0)
      : (av > bv ? -1 : av < bv ? 1 : 0)
  })

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <Minus size={10} style={{color:'var(--border)'}}/>
    return sortDir === 'asc' ? <ArrowUp size={10} style={{color:'var(--primary)'}}/> : <ArrowDown size={10} style={{color:'var(--primary)'}}/>
  }

  const COLS: { key: SortKey; label: string }[] = [
    {key:'name',   label:'Product'},
    {key:'price',  label:'Price'},
    {key:'stock',  label:'Stock'},
    {key:'rating', label:'Rating'},
  ]

  return (
    <>
      <PageBanner title="Basic Table" description="Click column headers to sort data ascending or descending"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Tables'},{label:'Basic Table'}]}/>

      {/* Feature callout */}
      <div className="flex flex-wrap gap-3 mb-5">
        {[{l:'Click-to-sort columns',c:'var(--primary)'},{l:'Alternating row shading',c:'var(--secondary)'},{l:'Status badges',c:'var(--success)'}].map(f=>(
          <div key={f.l} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border" style={{borderColor:f.c+'44',background:f.c+'10',color:f.c}}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:f.c}}/>
            {f.l}
          </div>
        ))}
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{borderBottom:'2px solid var(--border)'}}>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase" style={{color:'var(--muted)',background:'var(--surface)'}}>Image</th>
                {COLS.map(col=>(
                  <th key={col.key}
                    className="px-5 py-3 text-left text-xs font-bold uppercase cursor-pointer select-none hover:bg-[var(--primary-light)] transition-colors"
                    style={{color: sortKey===col.key ? 'var(--primary)' : 'var(--muted)', background:'var(--surface)'}}
                    onClick={()=>handleSort(col.key)}>
                    <div className="flex items-center gap-1.5">{col.label}<SortIcon col={col.key}/></div>
                  </th>
                ))}
                <th className="px-5 py-3 text-left text-xs font-bold uppercase" style={{color:'var(--muted)',background:'var(--surface)'}}>Category</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase" style={{color:'var(--muted)',background:'var(--surface)'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p,i)=>(
                <tr key={p.id} className="border-b transition-colors hover:bg-[var(--primary-light)]"
                  style={{borderColor:'rgba(232,237,242,0.7)', background: i%2===1 ? 'rgba(245,247,251,0.5)' : undefined}}>
                  <td className="px-5 py-3.5">
                    <img src={p.img} alt={p.name} className="w-10 h-10 rounded-xl object-cover"/>
                  </td>
                  <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{p.name}</td>
                  <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3.5">
                    <span style={{color: p.stock===0?'var(--error)':p.stock<20?'var(--warning)':'var(--success)', fontWeight:600}}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <span style={{color:'var(--warning)'}}>★</span>
                      <span className="font-semibold" style={{color:'var(--foreground)'}}>{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><Badge variant="primary">{p.category}</Badge></td>
                  <td className="px-5 py-3.5"><Badge variant={p.status==='Active'?'success':'muted'} dot>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t text-xs" style={{borderColor:'var(--border)',color:'var(--muted)'}}>
          {PRODUCTS.length} rows · Sorted by {sortKey||'default'} {sortDir||''}
        </div>
      </Card>
    </>
  )
}
