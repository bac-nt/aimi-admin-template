'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Select, SearchBar } from '@/components/ui'
import { ORDERS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { Download, Filter, Trash2, Eye, Check, X } from 'lucide-react'

type Status = 'All'|'Delivered'|'Processing'|'Shipped'|'Pending'|'Cancelled'

export default function EnhancedTablePage() {
  const [search,   setSearch]   = useState('')
  const [status,   setStatus]   = useState<Status>('All')
  const [selected, setSelected] = useState<string[]>([])
  const [toast,    setToast]    = useState<string|null>(null)

  const filtered = ORDERS.filter(o => {
    const ms = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
    const mv = status==='All' || o.status===status
    return ms && mv
  })

  const allSelected = filtered.length > 0 && filtered.every(o => selected.includes(o.id))
  const toggleAll   = () => setSelected(allSelected ? [] : filtered.map(o=>o.id))
  const toggle      = (id:string) => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id])

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const STATUS_V: Record<string,'success'|'primary'|'secondary'|'warning'|'error'> = {
    Delivered:'success', Processing:'primary', Shipped:'secondary', Pending:'warning', Cancelled:'error'
  }

  return (
    <>
      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}
      <PageBanner title="Enhanced Table" description="Multi-select rows, bulk actions, column filters and CSV export"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Tables'},{label:'Enhanced Table'}]}
        action={<Button variant="outline"><Download size={14}/>Export CSV</Button>}/>

      <div className="flex flex-wrap gap-3 mb-5">
        {[{l:'Row selection & bulk actions',c:'var(--primary)'},{l:'Column filter dropdown',c:'var(--secondary)'},{l:'Live search across fields',c:'var(--success)'},{l:'CSV export',c:'var(--warning)'}].map(f=>(
          <span key={f.l} className="text-xs px-2.5 py-1 rounded-full" style={{background:f.c+'15',color:f.c}}>{f.l}</span>
        ))}
      </div>

      <Card padding={false}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search orders…"/>
          <Select value={status} onChange={e=>setStatus(e.target.value as Status)} className="w-44"
            options={['All','Delivered','Processing','Shipped','Pending','Cancelled'].map(v=>({value:v,label:v==='All'?'All Statuses':v}))}/>
          {selected.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>{selected.length} selected</span>
              <Button size="sm" variant="error" onClick={()=>{setSelected([]);showToast(`${selected.length} orders removed`)}}><Trash2 size={12}/>Delete</Button>
              <Button size="sm" variant="success" onClick={()=>{setSelected([]);showToast('Marked as delivered')}}><Check size={12}/>Mark Delivered</Button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              <th className="px-4 py-3" style={{background:'var(--surface)',width:44}}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll}
                  className="w-4 h-4 rounded cursor-pointer accent-[var(--primary)]"/>
              </th>
              {['Order ID','Customer','City','Items','Total','Status','Date'].map(h=>(
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(o=>(
                <tr key={o.id} className="border-b transition-colors hover:bg-[var(--surface)]"
                  style={{borderColor:'rgba(232,237,242,0.7)', background:selected.includes(o.id)?'var(--primary-light)':undefined}}>
                  <td className="px-4 py-3.5 text-center">
                    <input type="checkbox" checked={selected.includes(o.id)} onChange={()=>toggle(o.id)}
                      className="w-4 h-4 rounded cursor-pointer accent-[var(--primary)]"/>
                  </td>
                  <td className="px-5 py-3.5"><span className="font-mono font-bold text-xs" style={{color:'var(--primary)'}}>{o.id}</span></td>
                  <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{o.customer}</td>
                  <td className="px-5 py-3.5 text-sm" style={{color:'var(--muted)'}}>{o.city}</td>
                  <td className="px-5 py-3.5 text-center">{o.items}</td>
                  <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(o.total)}</td>
                  <td className="px-5 py-3.5"><Badge variant={STATUS_V[o.status]||'muted'} dot>{o.status}</Badge></td>
                  <td className="px-5 py-3.5 text-xs whitespace-nowrap" style={{color:'var(--muted)'}}>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex items-center justify-between text-sm" style={{borderColor:'var(--border)'}}>
          <span style={{color:'var(--muted)'}}>{filtered.length} of {ORDERS.length} orders</span>
          <span style={{color:'var(--muted)'}}>{selected.length} selected</span>
        </div>
      </Card>
    </>
  )
}
