'use client'
import { useState } from 'react'
import { Alert, Badge, Button, Card, Modal, PageBanner, SearchBar, Select, Toast } from '@/components/ui'
import { formatCurrency } from '@/lib/data'
import { Search, Eye, Check, X, RefreshCw, Package, AlertTriangle, Download, Filter } from 'lucide-react'

type Status = 'All'|'Pending'|'Approved'|'Rejected'|'Refunded'
interface Return {
  id:string; order:string; customer:string; email:string; product:string
  amount:number; reason:string; detail:string; status:string; date:string; img:string
}

const INIT_RETURNS: Return[] = [
  { id:'RET-001',order:'#ORD-7838',customer:'James Murphy',  email:'jmurphy@email.com', product:'MacBook Air M3',        amount:1099.00,reason:'Defective product', detail:'Screen flickering after 2 days of use. Dead pixels visible in top-left corner.',status:'Pending', date:'Mar 20, 2025',img:'https://picsum.photos/seed/p2/60/60'},
  { id:'RET-002',order:'#ORD-7835',customer:'Lisa Thompson', email:'lisa@email.com',     product:'Organic Cotton T-Shirt',amount:34.99, reason:'Wrong size',       detail:'Ordered L but received M. Tag says M clearly.',status:'Approved',date:'Mar 19, 2025',img:'https://picsum.photos/seed/p5/60/60'},
  { id:'RET-003',order:'#ORD-7834',customer:'Tom Williams',  email:'tomw@email.com',     product:'Sony WH-1000XM5',       amount:279.99,reason:'Not as described', detail:'ANC quality is much worse than advertised. Expected best-in-class.',status:'Pending', date:'Mar 18, 2025',img:'https://picsum.photos/seed/p3/60/60'},
  { id:'RET-004',order:'#ORD-7832',customer:'Chris Brown',   email:'cbrown@email.com',   product:'Leather Crossbody Bag', amount:89.99, reason:'Changed mind',    detail:'No longer needed. Still in original packaging, unopened.',status:'Rejected',date:'Mar 17, 2025',img:'https://picsum.photos/seed/p6/60/60'},
  { id:'RET-005',order:'#ORD-7833',customer:'Priya Sharma',  email:'priya@email.com',    product:'Nike Air Max 270',      amount:129.99,reason:'Damaged in transit',detail:'Package arrived with visible damage. Shoe box crushed, one shoe scuffed.',status:'Refunded',date:'Mar 16, 2025',img:'https://picsum.photos/seed/p1/60/60'},
  { id:'RET-006',order:'#ORD-7836',customer:'David Park',    email:'dpark@email.com',    product:'iPad Pro 12.9"',        amount:1099.00,reason:'Defective product',detail:'Touch ID not working from day one. App crashes frequently.',status:'Approved',date:'Mar 15, 2025',img:'https://picsum.photos/seed/p7/60/60'},
]

const REASON_V: Record<string,'error'|'warning'|'secondary'|'muted'|'primary'> = {
  'Defective product':'error','Damaged in transit':'error',
  'Not as described':'warning','Wrong size':'warning',
  'Changed mind':'muted','Duplicate order':'muted',
}
const STATUS_V: Record<string,'warning'|'success'|'error'|'secondary'|'muted'> = {
  Pending:'warning', Approved:'success', Rejected:'error', Refunded:'secondary',
}

export default function ReturnsPage() {
  const [returns,  setReturns]  = useState(INIT_RETURNS)
  const [filter,   setFilter]   = useState<Status>('All')
  const [search,   setSearch]   = useState('')
  const [detail,   setDetail]   = useState<Return|null>(null)
  const [toast,    setToast]    = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const update = (id:string, status:string) => {
    setReturns(rs=>rs.map(r=>r.id===id?{...r,status}:r))
    setDetail(d=>d?.id===id?{...d,status}:d)
    showToast(`Return ${id} marked as ${status}`)
  }

  const filtered = returns
    .filter(r => filter==='All'||r.status===filter)
    .filter(r => r.customer.toLowerCase().includes(search.toLowerCase())||r.product.toLowerCase().includes(search.toLowerCase()))

  const counts = INIT_RETURNS.reduce((a,r)=>{a[r.status]=(a[r.status]||0)+1;return a},{} as Record<string,number>)
  const totalValue = returns.filter(r=>r.status!=='Rejected').reduce((s,r)=>s+r.amount,0)

  return (
    <>
      <PageBanner title="Returns & Refunds"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Returns'}]}
        description="Manage customer return requests and refunds"
        action={<Button variant="outline"><Download size={14}/>Export</Button>}/>

      {<Toast message={toast}/>}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
        {[
          {l:'Total',    v:returns.length,       c:'var(--foreground)'},
          {l:'Pending',  v:counts.Pending||0,    c:'var(--warning)'  },
          {l:'Approved', v:counts.Approved||0,   c:'var(--success)'  },
          {l:'Refunded', v:counts.Refunded||0,   c:'var(--secondary)'},
          {l:'Refund Value',v:formatCurrency(totalValue),c:'var(--primary)'},
        ].map(s=>(
          <Card key={s.l}><p className="text-xs font-medium mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p>
          <p className="text-xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      {counts.Pending > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl border mb-5" style={{background:'var(--warning-light)',borderColor:'var(--warning)44'}}>
          <AlertTriangle size={18} style={{color:'var(--warning)'}} className="flex-shrink-0"/>
          <p className="text-sm" style={{color:'var(--muted)'}}><strong style={{color:'var(--warning)'}}>{counts.Pending} return{counts.Pending>1?'s':''}</strong> awaiting review.</p>
          <Button size="sm" variant="warning" className="ml-auto" onClick={()=>setFilter('Pending')}>Review Now</Button>
        </div>
      )}

      <Card padding={false}>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
          <div className="flex gap-1.5 flex-wrap">
            {(['All','Pending','Approved','Rejected','Refunded'] as Status[]).map(s=>(
              <button key={s} type="button" onClick={()=>setFilter(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={filter===s?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                {s}{s!=='All'&&counts[s]?` (${counts[s]})`:''}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['Return ID','Product','Customer','Reason','Amount','Status','Date','Actions'].map(h=>(
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}} onClick={()=>setDetail(r)}>
                  <td className="px-5 py-3.5"><span className="font-bold font-mono text-xs" style={{color:'var(--primary)'}}>{r.id}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={r.img} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" style={{background:'var(--surface)'}} alt=""/>
                      <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{r.product}</p><p className="text-xs" style={{color:'var(--muted)'}}>{r.order}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{r.customer}</p><p className="text-xs" style={{color:'var(--muted)'}}>{r.email}</p></td>
                  <td className="px-5 py-3.5"><Badge variant={REASON_V[r.reason]||'muted'} className="text-[10px]">{r.reason}</Badge></td>
                  <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(r.amount)}</td>
                  <td className="px-5 py-3.5"><Badge variant={STATUS_V[r.status]||'muted'} dot>{r.status}</Badge></td>
                  <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{r.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1" onClick={e=>e.stopPropagation()}>
                      <button type="button" onClick={()=>setDetail(r)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Eye size={13}/></button>
                      {r.status==='Pending'&&<>
                        <button type="button" onClick={()=>update(r.id,'Approved')} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--success-light)] hover:text-[var(--success)] transition-colors" style={{color:'var(--muted)'}}><Check size={13}/></button>
                        <button type="button" onClick={()=>update(r.id,'Rejected')} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><X size={13}/></button>
                      </>}
                      {r.status==='Approved'&&<button type="button" onClick={()=>update(r.id,'Refunded')} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--secondary-light)] hover:text-[var(--secondary)] transition-colors" style={{color:'var(--muted)'}} title="Process Refund"><RefreshCw size={13}/></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t" style={{borderColor:'var(--border)'}}><span className="text-sm" style={{color:'var(--muted)'}}>Showing {filtered.length} of {returns.length} returns</span></div>
      </Card>

      <Modal open={!!detail} onClose={()=>setDetail(null)} title={`Return ${detail?.id}`} size="lg"
        footer={<>
          <Button variant="ghost" onClick={()=>setDetail(null)}>Close</Button>
          {detail?.status==='Pending'&&<><Button variant="error" onClick={()=>update(detail.id,'Rejected')}><X size={13}/>Reject</Button><Button variant="success" onClick={()=>update(detail.id,'Approved')}><Check size={13}/>Approve</Button></>}
          {detail?.status==='Approved'&&<Button onClick={()=>update(detail.id,'Refunded')}><RefreshCw size={13}/>Process Refund</Button>}
        </>}>
        {detail&&(
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{background:'var(--surface)'}}>
              <img src={detail.img} className="w-16 h-16 rounded-xl object-cover" alt=""/>
              <div className="flex-1"><p className="font-bold" style={{color:'var(--foreground)'}}>{detail.product}</p><p className="text-xs" style={{color:'var(--muted)'}}>{detail.order}</p><div className="flex gap-2 mt-1.5"><Badge variant={REASON_V[detail.reason]||'muted'}>{detail.reason}</Badge><Badge variant={STATUS_V[detail.status]||'muted'} dot>{detail.status}</Badge></div></div>
              <p className="text-xl font-black" style={{color:'var(--foreground)'}}>{formatCurrency(detail.amount)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{l:'Customer',v:detail.customer},{l:'Email',v:detail.email},{l:'Order',v:detail.order},{l:'Date',v:detail.date}].map(f=>(
                <div key={f.l} className="p-3 rounded-xl" style={{background:'var(--surface)'}}><p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{f.l}</p><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{f.v}</p></div>
              ))}
            </div>
            <div className="p-4 rounded-xl border" style={{borderColor:'var(--border)'}}>
              <p className="text-xs font-bold uppercase mb-2" style={{color:'var(--muted)'}}>Customer Note</p>
              <p className="text-sm" style={{color:'var(--foreground)'}}>{detail.detail}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase mb-2" style={{color:'var(--muted)'}}>Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {['Pending','Approved','Rejected','Refunded'].map(s=>(
                  <button key={s} type="button" onClick={()=>update(detail.id,s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                    style={detail.status===s?{background:'var(--primary)',color:'#fff',borderColor:'var(--primary)'}:{borderColor:'var(--border)',color:'var(--muted)'}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
