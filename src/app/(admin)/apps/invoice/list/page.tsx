'use client'
import { useState } from 'react'
import { Badge, Button, Card, Modal, PageBanner, SearchBar } from '@/components/ui'
import { INVOICES } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { Search, Download, Eye, Plus, Printer } from 'lucide-react'
import Link from 'next/link'
import type { Invoice } from '@/types'

const STATUS_V: Record<string,'success'|'warning'|'error'|'muted'> = { Paid:'success', Pending:'warning', Overdue:'error', Draft:'muted' }

export default function InvoiceListPage() {
  const [invoices] = useState<Invoice[]>(INVOICES)
  const [sf, setSf] = useState('All')
  const [search, setSearch] = useState('')
  const [detail, setDetail] = useState<Invoice|null>(null)

  const filtered = invoices.filter(i => {
    const ms = (i.client||i.customer).toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase())
    const mf = sf==='All' || i.status===sf
    return ms && mf
  })

  const totals = invoices.reduce((a,i)=>{ a.total+=i.total; if(i.status==='Paid')a.paid+=i.total; if(i.status==='Pending'||i.status==='Overdue')a.due+=i.total; return a },{ total:0,paid:0,due:0 })

  return (
    <>
      <PageBanner title="Invoices" breadcrumbs={[{label:'Home',href:'/'},{label:'Invoice'},{label:'List'}]}
        description="Manage and track all invoices"
        action={<Link href="/apps/invoice/create"><Button><Plus size={14}/>New Invoice</Button></Link>}/>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[{l:'Total',v:formatCurrency(totals.total),c:'var(--primary)'},{l:'Paid',v:formatCurrency(totals.paid),c:'var(--success)'},{l:'Outstanding',v:formatCurrency(totals.due),c:'var(--error)'}].map(s=>(
          <Card key={s.l}><p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      <Card padding={false}>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
          <div className="flex gap-1.5">
            {['All','Paid','Pending','Overdue','Draft'].map(s=>(
              <button key={s} type="button" onClick={()=>setSf(s)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={sf===s?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>{s}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['Invoice','Client','Items','Date','Due','Amount','Status','Actions'].map(h=>(
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{filtered.map(inv=>(
              <tr key={inv.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}} onClick={()=>setDetail(inv)}>
                <td className="px-5 py-3.5"><span className="font-mono font-bold text-xs" style={{color:'var(--primary)'}}>{inv.id}</span></td>
                <td className="px-5 py-3.5"><p className="font-semibold" style={{color:'var(--foreground)'}}>{inv.client||inv.customer}</p><p className="text-xs" style={{color:'var(--muted)'}}>{inv.email}</p></td>
                <td className="px-5 py-3.5 text-center">{inv.items.length}</td>
                <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{inv.date}</td>
                <td className="px-5 py-3.5 text-xs" style={{color:inv.status==='Overdue'?'var(--error)':'var(--muted)'}}>{inv.due}</td>
                <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(inv.total)}</td>
                <td className="px-5 py-3.5"><Badge variant={STATUS_V[inv.status]} dot>{inv.status}</Badge></td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1" onClick={e=>e.stopPropagation()}>
                    <button type="button" onClick={()=>setDetail(inv)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Eye size={13}/></button>
                    <button type="button" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Download size={13}/></button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>

      <Modal open={!!detail} onClose={()=>setDetail(null)} title={detail?.id||''} size="lg"
        footer={<><Button variant="ghost" onClick={()=>setDetail(null)}>Close</Button><Button variant="outline"><Printer size={13}/>Print</Button><Button><Download size={13}/>Download PDF</Button></>}>
        {detail&&(
          <div className="space-y-4">
            <div className="flex justify-between p-4 rounded-xl" style={{background:'var(--surface)'}}>
              <div><p className="font-bold" style={{color:'var(--foreground)'}}>{detail.client||detail.customer}</p><p className="text-xs" style={{color:'var(--muted)'}}>{detail.email}</p></div>
              <Badge variant={STATUS_V[detail.status]}>{detail.status}</Badge>
            </div>
            <table className="w-full text-sm">
              <thead><tr className="border-b" style={{borderColor:'var(--border)'}}><th className="text-left pb-2 font-bold" style={{color:'var(--muted)'}}>Item</th><th className="text-center pb-2 font-bold" style={{color:'var(--muted)'}}>Qty</th><th className="text-right pb-2 font-bold" style={{color:'var(--muted)'}}>Price</th><th className="text-right pb-2 font-bold" style={{color:'var(--muted)'}}>Total</th></tr></thead>
              <tbody>{detail.items.map((item,i)=>(
                <tr key={i} className="border-b" style={{borderColor:'var(--border)'}}><td className="py-2" style={{color:'var(--foreground)'}}>{item.name}</td><td className="py-2 text-center" style={{color:'var(--muted)'}}>{item.qty}</td><td className="py-2 text-right" style={{color:'var(--muted)'}}>{formatCurrency(item.price)}</td><td className="py-2 text-right font-semibold" style={{color:'var(--foreground)'}}>{formatCurrency(item.qty*item.price)}</td></tr>
              ))}</tbody>
            </table>
            <div className="space-y-1.5 text-sm">
              {[{l:'Subtotal',v:detail.subtotal},{l:'Tax',v:detail.tax}].map(r=>(
                <div key={r.l} className="flex justify-between"><span style={{color:'var(--muted)'}}>{r.l}</span><span style={{color:'var(--foreground)'}}>{formatCurrency(r.v)}</span></div>
              ))}
              <div className="flex justify-between pt-2 border-t font-black text-base" style={{borderColor:'var(--border)'}}><span style={{color:'var(--foreground)'}}>Total</span><span style={{color:'var(--primary)'}}>{formatCurrency(detail.total)}</span></div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
