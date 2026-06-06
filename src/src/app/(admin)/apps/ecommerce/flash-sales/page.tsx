'use client'
import { useState, useEffect } from 'react'
import { PageBanner, Card, CardHeader, Badge, Button, Modal, Input, Progress } from '@/components/ui'
import { formatCurrency } from '@/lib/data'
import { Plus, Edit, Trash2, Clock, Zap, Package, TrendingUp, Eye, Calendar, Target } from 'lucide-react'

interface FlashSale {
  id:number; name:string; discount:number; products:number
  startDate:string; endDate:string; revenue:number; status:string
  orders:number; description:string
}

const INIT: FlashSale[] = [
  { id:1, name:'Spring Clearance',  discount:40, products:18, startDate:'2025-03-25',endDate:'2025-03-27', revenue:8420,  orders:67, status:'Active',    description:'Clear remaining winter stock with deep discounts' },
  { id:2, name:'Weekend Special',   discount:25, products:8,  startDate:'2025-03-28',endDate:'2025-03-30', revenue:0,     orders:0,  status:'Scheduled', description:'Exclusive weekend deals for electronics' },
  { id:3, name:'Flash Friday',      discount:30, products:24, startDate:'2025-03-21',endDate:'2025-03-22', revenue:14250, orders:112,status:'Ended',      description:'Best Friday sales event of the quarter' },
  { id:4, name:'Brand Day — Nike',  discount:20, products:15, startDate:'2025-04-01',endDate:'2025-04-01', revenue:0,     orders:0,  status:'Scheduled', description:'All Nike products at 20% off for one day only' },
  { id:5, name:'Mid-Week Madness',  discount:35, products:10, startDate:'2025-03-19',endDate:'2025-03-20', revenue:5830,  orders:49, status:'Ended',      description:'Surprise mid-week discounts on top sellers' },
]

const STATUS_V: Record<string,'success'|'warning'|'muted'|'primary'> = {
  Active:'success', Scheduled:'warning', Ended:'muted', Draft:'primary'
}

function Countdown({ endDate }: { endDate: string }) {
  const [time, setTime] = useState({ h:0, m:0, s:0 })
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, new Date(endDate).getTime() - Date.now())
      setTime({ h:Math.floor(diff/3600000), m:Math.floor((diff%3600000)/60000), s:Math.floor((diff%60000)/1000) })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [endDate])
  const pad = (n:number) => String(n).padStart(2,'0')
  return (
    <div className="flex gap-1.5 items-center">
      {[{v:time.h,l:'h'},{v:time.m,l:'m'},{v:time.s,l:'s'}].map(t=>(
        <div key={t.l} className="flex items-center gap-0.5">
          <span className="font-black text-base tabular-nums" style={{color:'var(--error)'}}>{pad(t.v)}</span>
          <span className="text-xs" style={{color:'var(--muted)'}}>{t.l}</span>
        </div>
      ))}
    </div>
  )
}

export default function FlashSalesPage() {
  const [sales,   setSales]   = useState(INIT)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState<FlashSale|null>(null)
  const [form,    setForm]    = useState({ name:'', discount:'20', products:'10', startDate:'', endDate:'', description:'' })
  const [toast,   setToast]   = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const openNew = () => {
    setEditing(null)
    const today = new Date().toISOString().split('T')[0]
    setForm({ name:'', discount:'20', products:'10', startDate:today, endDate:today, description:'' })
    setModal(true)
  }
  const openEdit = (s:FlashSale) => {
    setEditing(s)
    setForm({ name:s.name, discount:String(s.discount), products:String(s.products), startDate:s.startDate, endDate:s.endDate, description:s.description })
    setModal(true)
  }
  const save = () => {
    if (!form.name.trim()) return
    const now = new Date(), start = new Date(form.startDate), end = new Date(form.endDate)
    const status = end < now ? 'Ended' : start <= now ? 'Active' : 'Scheduled'
    if (editing) {
      setSales(ss=>ss.map(s=>s.id===editing.id?{...s,...form,discount:+form.discount,products:+form.products,status}:s))
      showToast('Flash sale updated!')
    } else {
      setSales(ss=>[...ss,{id:Date.now(),...form,discount:+form.discount,products:+form.products,revenue:0,orders:0,status}])
      showToast('Flash sale created!')
    }
    setModal(false)
  }

  const active   = sales.filter(s=>s.status==='Active')
  const totalRev = sales.reduce((s,a)=>s+a.revenue,0)
  const maxRev   = Math.max(...sales.map(s=>s.revenue),1)

  return (
    <>
      <PageBanner title="Flash Sales" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Flash Sales'}]}
        description="Create time-limited deals that drive urgency and sales"
        action={<Button onClick={openNew}><Plus size={14}/>New Flash Sale</Button>}/>

      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          {l:'Active Sales',      v:active.length,                        c:'var(--success)' },
          {l:'Scheduled',         v:sales.filter(s=>s.status==='Scheduled').length,c:'var(--warning)'},
          {l:'Total Revenue',     v:formatCurrency(totalRev),             c:'var(--primary)' },
          {l:'Total Orders',      v:sales.reduce((s,a)=>s+a.orders,0),   c:'var(--secondary)'},
        ].map(s=>(
          <Card key={s.l}><p className="text-xs font-medium mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      {/* Active sale heroes */}
      {active.length > 0 && (
        <div className="mb-5">
          <h2 className="font-bold mb-3 text-sm uppercase tracking-wide" style={{color:'var(--muted)'}}>🔥 Live Now</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {active.map(s=>(
              <Card key={s.id} className="border-2" style={{borderColor:'var(--error)22',background:'linear-gradient(135deg,var(--error-light) 0%,var(--card) 60%)'}}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={16} style={{color:'var(--error)'}}/>
                      <span className="font-black text-lg" style={{color:'var(--foreground)'}}>{s.name}</span>
                    </div>
                    <p className="text-sm mb-3" style={{color:'var(--muted)'}}>{s.description}</p>
                    <div className="flex gap-4">
                      <div><p className="text-2xl font-black" style={{color:'var(--error)'}}>{s.discount}%<span className="text-sm ml-0.5">OFF</span></p><p className="text-xs" style={{color:'var(--muted)'}}>Discount</p></div>
                      <div><p className="text-2xl font-black" style={{color:'var(--foreground)'}}>{s.orders}</p><p className="text-xs" style={{color:'var(--muted)'}}>Orders</p></div>
                      <div><p className="text-xl font-black" style={{color:'var(--success)'}}>{formatCurrency(s.revenue)}</p><p className="text-xs" style={{color:'var(--muted)'}}>Revenue</p></div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs mb-1 font-semibold" style={{color:'var(--muted)'}}>Ends in</p>
                    <Countdown endDate={s.endDate + 'T23:59:59'}/>
                    <Badge variant="error" className="mt-2">LIVE</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All sales table */}
      <Card padding={false}>
        <div className="p-4 border-b" style={{borderColor:'var(--border)'}}>
          <h3 className="font-bold" style={{color:'var(--foreground)'}}>All Flash Sales</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['Campaign','Discount','Products','Revenue','Orders','Performance','Status','Actions'].map(h=>(
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {sales.map(s=>(
                <tr key={s.id} className="border-b hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:s.status==='Active'?'var(--error-light)':'var(--surface)'}}>
                        <Zap size={16} style={{color:s.status==='Active'?'var(--error)':'var(--muted)'}}/>
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{s.name}</p>
                        <div className="flex items-center gap-1 text-xs" style={{color:'var(--muted)'}}><Calendar size={10}/>{s.startDate} → {s.endDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="font-black text-lg" style={{color:'var(--error)'}}>{s.discount}%</span></td>
                  <td className="px-5 py-4"><div className="flex items-center gap-1.5"><Package size={12} style={{color:'var(--muted)'}}/><span style={{color:'var(--foreground)'}}>{s.products}</span></div></td>
                  <td className="px-5 py-4 font-bold" style={{color:'var(--foreground)'}}>{s.revenue>0?formatCurrency(s.revenue):'—'}</td>
                  <td className="px-5 py-4 text-center font-bold" style={{color:'var(--foreground)'}}>{s.orders||'—'}</td>
                  <td className="px-5 py-4 w-32">
                    {s.revenue>0
                      ? <><Progress value={Math.round(s.revenue/maxRev*100)} height={4}/><p className="text-[10px] mt-0.5" style={{color:'var(--muted)'}}>{Math.round(s.revenue/maxRev*100)}% of best</p></>
                      : <span className="text-xs" style={{color:'var(--muted)'}}>Not started</span>
                    }
                  </td>
                  <td className="px-5 py-4"><Badge variant={STATUS_V[s.status]} dot>{s.status}</Badge></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button type="button" onClick={()=>openEdit(s)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={13}/></button>
                      <button type="button" onClick={()=>{setSales(ss=>ss.filter(x=>x.id!==s.id));showToast('Deleted')}} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modal} onClose={()=>setModal(false)} title={editing?'Edit Flash Sale':'New Flash Sale'}
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>{editing?'Update':'Create'} Sale</Button></>}>
        <div className="space-y-3">
          <Input label="Campaign Name *" placeholder="e.g. Weekend Mega Sale" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
          <Input label="Description" placeholder="Brief description for internal reference" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Discount %" type="number" min="1" max="99" placeholder="20" value={form.discount} onChange={e=>setForm(f=>({...f,discount:e.target.value}))}/>
            <Input label="Products Count" type="number" placeholder="10" value={form.products} onChange={e=>setForm(f=>({...f,products:e.target.value}))}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" type="date" value={form.startDate} onChange={e=>setForm(f=>({...f,startDate:e.target.value}))}/>
            <Input label="End Date"   type="date" value={form.endDate}   onChange={e=>setForm(f=>({...f,endDate:e.target.value}))}/>
          </div>
        </div>
      </Modal>
    </>
  )
}
