'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Modal, Select } from '@/components/ui'
import { ORDERS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { Search, Eye, Edit, Truck, Download, Filter, RefreshCw, Package, CheckCircle, XCircle, Clock, ChevronDown } from 'lucide-react'
import Link from 'next/link'

type Status = 'All'|'Pending'|'Processing'|'Shipped'|'Delivered'|'Cancelled'
type Order = typeof ORDERS[0]

const STATUS_V: Record<string,'success'|'primary'|'warning'|'secondary'|'error'|'muted'> = {
  Delivered:'success', Processing:'primary', Shipped:'secondary', Pending:'warning', Cancelled:'error'
}
const STATUS_ICON: Record<string, React.ElementType> = {
  Delivered:CheckCircle, Processing:RefreshCw, Shipped:Truck, Pending:Clock, Cancelled:XCircle
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(ORDERS)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<Status>('All')
  const [sort,   setSort]   = useState<'date'|'total'>('date')
  const [detail, setDetail] = useState<Order|null>(null)
  const [toast,  setToast]  = useState<string|null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const filtered = orders
    .filter(o => status === 'All' || o.status === status)
    .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort === 'total' ? b.total - a.total : 0)

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(os => os.map(o => o.id === id ? {...o, status: newStatus} : o))
    setDetail(d => d?.id === id ? {...d, status: newStatus} : d)
    showToast(`Order ${id} updated to ${newStatus}`)
  }

  const counts = ORDERS.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <>
      <PageBanner title="Orders" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Orders'}]}
        description="Manage and track all customer orders"
        action={<div className="flex gap-2"><Button variant="outline" size="sm"><Download size={14}/>Export</Button><Button size="sm"><RefreshCw size={14}/>Refresh</Button></div>}
      />

      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
        {[
          { l:'Total',     v:orders.length,               c:'var(--foreground)' },
          { l:'Pending',   v:counts.Pending||0,            c:'var(--warning)'   },
          { l:'Processing',v:counts.Processing||0,         c:'var(--primary)'   },
          { l:'Shipped',   v:counts.Shipped||0,            c:'var(--secondary)' },
          { l:'Delivered', v:counts.Delivered||0,          c:'var(--success)'   },
        ].map(s => (
          <Card key={s.l}>
            <p className="text-xs font-medium mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p>
            <p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p>
          </Card>
        ))}
      </div>

      <Card padding={false}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border flex-1 max-w-xs" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
            <Search size={14} style={{color:'var(--muted)'}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search orders…" className="bg-transparent text-sm outline-none w-full" style={{color:'var(--foreground)'}}/>
          </div>
          <div className="flex gap-1.5">
            {(['All','Pending','Processing','Shipped','Delivered','Cancelled'] as Status[]).map(s => (
              <button key={s} type="button" onClick={() => setStatus(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={status===s ? {background:'var(--primary)',color:'#fff'} : {background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                {s}
              </button>
            ))}
          </div>
          <Select options={[{value:'date',label:'Sort: Date'},{value:'total',label:'Sort: Total'}]}
            value={sort} onChange={e => setSort(e.target.value as typeof sort)}
            className="w-36 ml-auto"/>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['Order ID','Customer','Items','Total','Payment','Status','Date','Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(o => {
                const Icon = STATUS_ICON[o.status] || Clock
                return (
                  <tr key={o.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}} onClick={()=>setDetail(o)}>
                    <td className="px-5 py-3.5"><span className="font-bold font-mono text-xs" style={{color:'var(--primary)'}}>{o.id}</span></td>
                    <td className="px-5 py-3.5">
                      <div><p className="font-semibold" style={{color:'var(--foreground)'}}>{o.customer}</p><p className="text-xs" style={{color:'var(--muted)'}}>{o.city}</p></div>
                    </td>
                    <td className="px-5 py-3.5 text-center"><span className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center" style={{background:'var(--primary-light)',color:'var(--primary)'}}>{o.items}</span></td>
                    <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(o.total)}</td>
                    <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{o.payment}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={STATUS_V[o.status]} dot className="capitalize">
                        {o.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{o.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                        <button type="button" onClick={()=>setDetail(o)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Eye size={13}/></button>
                        <button type="button" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={13}/></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t flex items-center justify-between text-sm" style={{borderColor:'var(--border)'}}>
          <span style={{color:'var(--muted)'}}>Showing {filtered.length} of {orders.length} orders</span>
          <div className="flex gap-1">
            {[1,2,3].map(p => (
              <button key={p} className="w-8 h-8 rounded-lg text-sm font-semibold transition-all" style={p===1?{background:'var(--primary)',color:'#fff'}:{color:'var(--muted)',border:'1px solid var(--border)'}}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      {/* Order Detail Modal */}
      <Modal open={!!detail} onClose={()=>setDetail(null)} title={`Order ${detail?.id}`}
        description={`Placed on ${detail?.date}`} size="lg"
        footer={<>
          <Button variant="ghost" onClick={()=>setDetail(null)}>Close</Button>
          <Button variant="outline" size="md"><Download size={13}/>Invoice</Button>
          {detail && detail.status !== 'Delivered' && detail.status !== 'Cancelled' && (
            <Button onClick={()=>updateStatus(detail.id, detail.status==='Pending'?'Processing':detail.status==='Processing'?'Shipped':'Delivered')}>
              <Truck size={13}/>Mark as {detail.status==='Pending'?'Processing':detail.status==='Processing'?'Shipped':'Delivered'}
            </Button>
          )}
        </>}>
        {detail && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[{l:'Customer',v:detail.customer},{l:'Email',v:detail.email},{l:'City',v:detail.city},{l:'Payment',v:detail.payment}].map(f=>(
                <div key={f.l} className="p-3 rounded-xl" style={{background:'var(--surface)'}}>
                  <p className="text-xs font-medium mb-0.5" style={{color:'var(--muted)'}}>{f.l}</p>
                  <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{f.v}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl border" style={{borderColor:'var(--border)'}}>
              <p className="text-xs font-bold uppercase mb-3" style={{color:'var(--muted)'}}>Items ({detail.items})</p>
              {Array.from({length:detail.items},(_,i)=>i+1).map(i=>(
                <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{background:'var(--surface)'}}><img src={`https://picsum.photos/seed/oi${detail.id}${i}/40/40`} className="w-full h-full object-cover"/></div>
                  <div className="flex-1"><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>Product Item #{i}</p></div>
                  <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{formatCurrency(detail.total/detail.items)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl" style={{background:'var(--primary-light)'}}>
              <span className="font-bold" style={{color:'var(--primary)'}}>Order Total</span>
              <span className="font-black text-lg" style={{color:'var(--primary)'}}>{formatCurrency(detail.total)}</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase mb-2" style={{color:'var(--muted)'}}>Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s => (
                  <button key={s} type="button" onClick={()=>updateStatus(detail.id, s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                    style={detail.status===s ? {background:'var(--primary)',color:'#fff',borderColor:'var(--primary)'} : {borderColor:'var(--border)',color:'var(--muted)'}}>
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
