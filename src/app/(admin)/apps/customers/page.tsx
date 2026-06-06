'use client'
import React, { useState } from 'react'
import { Badge, Button, Card, Input, Modal, PageBanner, Progress, SearchBar, Select, Toast } from '@/components/ui'
import { CUSTOMERS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { Search, Plus, Edit, Trash2, Eye, Download, Mail, Phone, MapPin, ShoppingBag, TrendingUp, Users, Crown, Star } from 'lucide-react'

type Customer = typeof CUSTOMERS[0]
const STATUS_V: Record<string,'success'|'error'|'warning'> = { Active:'success', Suspended:'error', Inactive:'warning' }
const TIER_V:   Record<string,'purple'|'warning'|'secondary'|'muted'> = { Platinum:'purple', Gold:'warning', Silver:'secondary', Bronze:'muted' }
const TIER_ICON: Record<string, React.ElementType> = { Platinum:Crown, Gold:Star, Silver:Star, Bronze:Star }

export default function CustomersPage() {
  const [customers, setCustomers] = useState(CUSTOMERS)
  const [search,    setSearch]    = useState('')
  const [tier,      setTier]      = useState('All')
  const [detail,    setDetail]    = useState<Customer|null>(null)
  const [invModal,  setInvModal]  = useState(false)
  const [toast,     setToast]     = useState<string|null>(null)
  const [email,     setEmail]     = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(()=>setToast(null), 3000) }

  const tiers = ['All','Platinum','Gold','Silver','Bronze']
  const filtered = customers
    .filter(c => tier==='All' || c.tier===tier)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))

  const totalRevenue = customers.reduce((s,c) => s + c.spent, 0)
  const topSpent     = Math.max(...customers.map(c=>c.spent))

  return (
    <>
      <PageBanner title="Customers" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Customers'}]}
        description="Manage your customer base and segments"
        action={<div className="flex gap-2">
          <Button variant="outline"><Download size={14}/>Export</Button>
          <Button onClick={()=>setInvModal(true)}><Plus size={14}/>Add Customer</Button>
        </div>}
      />
      {<Toast message={toast}/>}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 animate-fade-up">
        {[
          {l:'Total Customers',  v:customers.length,                                 c:'var(--primary)',   i:Users},
          {l:'Active',           v:customers.filter(c=>c.status==='Active').length,  c:'var(--success)',   i:TrendingUp},
          {l:'Platinum / Gold',  v:customers.filter(c=>['Platinum','Gold'].includes(c.tier)).length, c:'var(--warning)', i:Crown},
          {l:'Total Revenue',    v:formatCurrency(totalRevenue),                     c:'var(--secondary)', i:ShoppingBag},
        ].map(s => (
          <Card key={s.l} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'var(--primary-light)'}}>
              <s.i size={18} style={{color:'var(--primary)'}}/>
            </div>
            <div><p className="text-xs" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-lg font-black" style={{color:s.c}}>{s.v}</p></div>
          </Card>
        ))}
      </div>

      <Card padding={false}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
          <div className="flex gap-1.5 flex-wrap">
            {tiers.map(t => (
              <button key={t} type="button" onClick={()=>setTier(t)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={tier===t ? {background:'var(--primary)',color:'#fff'} : {background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['Customer','Contact','Orders','Spent','Tier','Status','Since','Actions'].map(h=>(
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(c => {
                const init = c.name.split(' ').map(n=>n[0]).join('').toUpperCase()
                const pct  = Math.round(c.spent / topSpent * 100)
                return (
                  <tr key={c.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}} onClick={()=>setDetail(c)}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:'var(--primary)'}}>{init}</div>
                        <div><p className="font-semibold" style={{color:'var(--foreground)'}}>{c.name}</p><p className="text-xs" style={{color:'var(--muted)'}}>{c.city}</p></div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><div className="text-xs space-y-0.5"><p style={{color:'var(--foreground)'}}>{c.email}</p><p style={{color:'var(--muted)'}}>{c.phone}</p></div></td>
                    <td className="px-5 py-3.5 text-center font-bold" style={{color:'var(--foreground)'}}>{c.orders}</td>
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-sm" style={{color:'var(--foreground)'}}>{formatCurrency(c.spent)}</div>
                      <Progress value={pct} height={4} className="mt-1 w-20"/>
                    </td>
                    <td className="px-5 py-3.5"><Badge variant={TIER_V[c.tier]}>{c.tier}</Badge></td>
                    <td className="px-5 py-3.5"><Badge variant={STATUS_V[c.status]} dot>{c.status}</Badge></td>
                    <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{c.since}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1" onClick={e=>e.stopPropagation()}>
                        <button type="button" onClick={()=>setDetail(c)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Eye size={13}/></button>
                        <button type="button" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={13}/></button>
                        {c.tier!=='Platinum' && <button type="button" onClick={()=>{setCustomers(cs=>cs.filter(x=>x.id!==c.id));showToast('Customer removed')}} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={13}/></button>}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t" style={{borderColor:'var(--border)'}}>
          <span className="text-sm" style={{color:'var(--muted)'}}>Showing {filtered.length} of {customers.length} customers</span>
        </div>
      </Card>

      {/* Customer Detail Modal */}
      <Modal open={!!detail} onClose={()=>setDetail(null)} title={detail?.name} size="md"
        footer={<><Button variant="ghost" onClick={()=>setDetail(null)}>Close</Button><Button><Mail size={13}/>Email Customer</Button></>}>
        {detail && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{background:'var(--surface)'}}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-black" style={{background:'var(--primary)'}}>{detail.name.split(' ').map(n=>n[0]).join('')}</div>
              <div>
                <h3 className="font-bold" style={{color:'var(--foreground)'}}>{detail.name}</h3>
                <div className="flex gap-2 mt-1"><Badge variant={TIER_V[detail.tier]}>{detail.tier}</Badge><Badge variant={STATUS_V[detail.status]} dot>{detail.status}</Badge></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{l:'Email',v:detail.email,i:Mail},{l:'Phone',v:detail.phone,i:Phone},{l:'City',v:detail.city,i:MapPin},{l:'Customer since',v:detail.since,i:Users}].map(f=>(
                <div key={f.l} className="p-3 rounded-xl border" style={{borderColor:'var(--border)'}}>
                  <div className="flex items-center gap-2 mb-0.5"><f.i size={12} style={{color:'var(--muted)'}}/><p className="text-xs" style={{color:'var(--muted)'}}>{f.l}</p></div>
                  <p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{f.v}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl text-center" style={{background:'var(--primary-light)'}}>
                <p className="text-2xl font-black" style={{color:'var(--primary)'}}>{detail.orders}</p>
                <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>Total Orders</p>
              </div>
              <div className="p-4 rounded-xl text-center" style={{background:'var(--success-light)'}}>
                <p className="text-xl font-black" style={{color:'var(--success)'}}>{formatCurrency(detail.spent)}</p>
                <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>Total Spent</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Customer Modal */}
      <Modal open={invModal} onClose={()=>setInvModal(false)} title="Add Customer"
        footer={<><Button variant="ghost" onClick={()=>setInvModal(false)}>Cancel</Button><Button onClick={()=>{showToast('Customer added!');setInvModal(false)}}>Add Customer</Button></>}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name *" placeholder="John"/>
            <Input label="Last Name *"  placeholder="Doe"/>
          </div>
          <Input label="Email *" type="email" placeholder="john@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          <Input label="Phone" type="tel" placeholder="+1 555-0100"/>
          <Input label="City"  placeholder="New York"/>
          <Select label="Tier" options={['Bronze','Silver','Gold','Platinum'].map(v=>({value:v,label:v}))}/>
        </div>
      </Modal>
    </>
  )
}
