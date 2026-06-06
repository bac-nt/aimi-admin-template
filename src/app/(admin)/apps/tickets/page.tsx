'use client'
import React, { useState } from 'react'
import { Badge, Button, Card, Input, Modal, PageBanner, SearchBar, Select, Toast } from '@/components/ui'
import { TICKETS } from '@/lib/data'
import { Search, Plus, MessageSquare, Clock, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'
import type { Ticket } from '@/types'

const PRIORITY_V: Record<string,'error'|'warning'|'primary'|'muted'> = { urgent:'error', high:'warning', medium:'primary', low:'muted' }
const STATUS_V:   Record<string,'error'|'primary'|'success'|'muted'> = { open:'error', 'in-progress':'primary', resolved:'success', closed:'muted' }
const STATUS_ICON: Record<string, React.ElementType> = { open:AlertTriangle, 'in-progress':RefreshCw, resolved:CheckCircle, closed:Clock }

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(TICKETS)
  const [filter,  setFilter]  = useState('All')
  const [search,  setSearch]  = useState('')
  const [modal,   setModal]   = useState(false)
  const [detail,  setDetail]  = useState<Ticket|null>(null)
  const [toast,   setToast]   = useState<string|null>(null)
  const [form,    setForm]    = useState({ subject:'', customer:'', email:'', category:'Bug', priority:'medium' })

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const filtered = tickets
    .filter(t => filter==='All' || t.status===filter.toLowerCase().replace(' ','-'))
    .filter(t => t.subject.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()))

  const counts = tickets.reduce((a,t)=>{ a[t.status]=(a[t.status]||0)+1; return a },{} as Record<string,number>)

  return (
    <>
      <PageBanner title="Support Tickets" breadcrumbs={[{label:'Home',href:'/'},{label:'Tickets'}]}
        description="Manage customer support requests"
        action={<Button onClick={()=>setModal(true)}><Plus size={14}/>New Ticket</Button>}/>

      {<Toast message={toast}/>}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 animate-fade-up">
        {[{l:'Open',v:counts.open||0,c:'var(--error)'},{l:'In Progress',v:counts['in-progress']||0,c:'var(--primary)'},{l:'Resolved',v:counts.resolved||0,c:'var(--success)'},{l:'Total',v:tickets.length,c:'var(--foreground)'}].map(s=>(
          <Card key={s.l}><p className="text-xs font-medium mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      <Card padding={false}>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
          <div className="flex gap-1.5 flex-wrap">
            {['All','Open','In Progress','Resolved','Closed'].map(s=>(
              <button key={s} type="button" onClick={()=>setFilter(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={filter===s?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['ID','Subject','Customer','Priority','Status','Assignee','Updated','Actions'].map(h=>(
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(t=>{
                const Icon = STATUS_ICON[t.status]||Clock
                return (
                  <tr key={t.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}} onClick={()=>setDetail(t)}>
                    <td className="px-5 py-3.5"><span className="font-mono text-xs font-bold" style={{color:'var(--primary)'}}>{t.id}</span></td>
                    <td className="px-5 py-3.5"><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{t.subject}</p><p className="text-xs" style={{color:'var(--muted)'}}>{t.category}</p></td>
                    <td className="px-5 py-3.5"><p className="font-medium text-sm" style={{color:'var(--foreground)'}}>{t.customer}</p><p className="text-xs" style={{color:'var(--muted)'}}>{t.email}</p></td>
                    <td className="px-5 py-3.5"><Badge variant={PRIORITY_V[t.priority]} className="capitalize">{t.priority}</Badge></td>
                    <td className="px-5 py-3.5"><Badge variant={STATUS_V[t.status]} dot className="capitalize">{t.status.replace('-',' ')}</Badge></td>
                    <td className="px-5 py-3.5 text-xs" style={{color:'var(--foreground)'}}>{t.assignee}</td>
                    <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{t.updated}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1" onClick={e=>e.stopPropagation()}>
                        <button type="button" onClick={()=>setDetail(t)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><MessageSquare size={13}/></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={!!detail} onClose={()=>setDetail(null)} title={detail?.id||''} size="lg"
        footer={<><Button variant="ghost" onClick={()=>setDetail(null)}>Close</Button><Button>Reply</Button></>}>
        {detail&&(
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{background:'var(--surface)'}}>
              <h3 className="font-bold mb-2" style={{color:'var(--foreground)'}}>{detail.subject}</h3>
              <div className="flex flex-wrap gap-2"><Badge variant={PRIORITY_V[detail.priority]} className="capitalize">{detail.priority}</Badge><Badge variant={STATUS_V[detail.status]} dot className="capitalize">{detail.status.replace('-',' ')}</Badge><Badge variant="muted">{detail.category}</Badge></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{l:'Customer',v:detail.customer},{l:'Email',v:detail.email},{l:'Assignee',v:detail.assignee},{l:'Created',v:detail.created}].map(f=>(
                <div key={f.l} className="p-3 rounded-xl" style={{background:'var(--surface)'}}>
                  <p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{f.l}</p>
                  <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{f.v}</p>
                </div>
              ))}
            </div>
            <Select label="Update Status" value={detail.status} onChange={e=>{ setTickets(ts=>ts.map(t=>t.id===detail.id?{...t,status:e.target.value as Ticket['status']}:t)); setDetail(d=>d?{...d,status:e.target.value as Ticket['status']}:d) }}
              options={[{value:'open',label:'Open'},{value:'in-progress',label:'In Progress'},{value:'resolved',label:'Resolved'},{value:'closed',label:'Closed'}]}/>
          </div>
        )}
      </Modal>

      <Modal open={modal} onClose={()=>setModal(false)} title="New Ticket"
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={()=>{setTickets(ts=>[{id:`TKT-00${ts.length+1}`,messages:0,created:'Today',updated:'Just now',...form,status:'open',assignee:'Unassigned'},...ts]);setModal(false);showToast('Ticket created!')}}>Create Ticket</Button></>}>
        <div className="space-y-3">
          <Input label="Subject *" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}/>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Customer Name" value={form.customer} onChange={e=>setForm(f=>({...f,customer:e.target.value}))}/>
            <Input label="Email" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Category" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} options={['Bug','Billing','API','Auth','Sales','Other'].map(v=>({value:v,label:v}))}/>
            <Select label="Priority" value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))} options={['urgent','high','medium','low'].map(v=>({value:v,label:v[0].toUpperCase()+v.slice(1)}))}/>
          </div>
        </div>
      </Modal>
    </>
  )
}
