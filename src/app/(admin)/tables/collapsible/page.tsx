'use client'
import React from 'react'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button } from '@/components/ui'
import { ORDERS } from '@/lib/data'
import { PRODUCTS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { ChevronDown, ChevronRight, Package, MapPin, CreditCard } from 'lucide-react'

export default function CollapsibleTablePage() {
  const [expanded, setExpanded] = useState<string[]>([])
  const toggle = (id:string) => setExpanded(e => e.includes(id) ? e.filter(x=>x!==id) : [...e,id])

  const STATUS_V: Record<string,'success'|'primary'|'secondary'|'warning'|'error'> = {
    Delivered:'success', Processing:'primary', Shipped:'secondary', Pending:'warning', Cancelled:'error'
  }

  return (
    <>
      <PageBanner title="Collapsible Table" description="Click any row to expand it and reveal detailed sub-content"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Tables'},{label:'Collapsible Table'}]}/>

      <div className="flex flex-wrap gap-3 mb-5">
        {[{l:'Click row to expand',c:'var(--primary)'},{l:'Sub-table in expanded rows',c:'var(--secondary)'},{l:'Animated expand/collapse',c:'var(--success)'}].map(f=>(
          <span key={f.l} className="text-xs px-2.5 py-1 rounded-full" style={{background:f.c+'15',color:f.c}}>{f.l}</span>
        ))}
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              <th className="px-4 py-3 w-10" style={{background:'var(--surface)'}}/>
              {['Order ID','Customer','Total','Items','Status','Date'].map(h=>(
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {ORDERS.map(o=>{
                const isOpen = expanded.includes(o.id)
                return (
                  <React.Fragment key={o.id}>
                    <tr key={o.id}
                      className="border-b cursor-pointer transition-colors hover:bg-[var(--surface)]"
                      style={{borderColor:'rgba(232,237,242,0.7)', background:isOpen?'var(--primary-light)':undefined}}
                      onClick={()=>toggle(o.id)}>
                      <td className="px-4 py-3.5 text-center">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center transition-transform" style={{background:'var(--surface)',transform:isOpen?'rotate(0deg)':'rotate(-90deg)'}}>
                          <ChevronDown size={13} style={{color:'var(--muted)'}}/>
                        </div>
                      </td>
                      <td className="px-5 py-3.5"><span className="font-mono font-bold text-xs" style={{color:'var(--primary)'}}>{o.id}</span></td>
                      <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{o.customer}</td>
                      <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(o.total)}</td>
                      <td className="px-5 py-3.5 text-center">{o.items}</td>
                      <td className="px-5 py-3.5"><Badge variant={STATUS_V[o.status]||'muted'} dot>{o.status}</Badge></td>
                      <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{o.date}</td>
                    </tr>
                    {isOpen && (
                      <tr key={`${o.id}-detail`} className="animate-fade-in">
                        <td colSpan={7} className="px-5 pb-4 pt-0" style={{background:'var(--primary-light)'}}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                            {/* Customer info */}
                            <div className="p-3 rounded-xl border" style={{background:'var(--card)',borderColor:'var(--border)'}}>
                              <p className="text-xs font-bold uppercase mb-2" style={{color:'var(--muted)'}}>Customer Info</p>
                              <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{o.customer}</p>
                              <div className="flex items-center gap-1 mt-1 text-xs" style={{color:'var(--muted)'}}><MapPin size={11}/>{o.city}</div>
                              <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>{o.email}</p>
                            </div>
                            {/* Payment */}
                            <div className="p-3 rounded-xl border" style={{background:'var(--card)',borderColor:'var(--border)'}}>
                              <p className="text-xs font-bold uppercase mb-2" style={{color:'var(--muted)'}}>Payment</p>
                              <div className="flex items-center gap-1.5 text-sm" style={{color:'var(--foreground)'}}><CreditCard size={13}/>{o.payment}</div>
                              <p className="font-black text-base mt-1" style={{color:'var(--primary)'}}>{formatCurrency(o.total)}</p>
                            </div>
                            {/* Items */}
                            <div className="p-3 rounded-xl border" style={{background:'var(--card)',borderColor:'var(--border)'}}>
                              <p className="text-xs font-bold uppercase mb-2" style={{color:'var(--muted)'}}>Items ({o.items})</p>
                              {PRODUCTS.slice(0, o.items).map((p,i)=>(
                                <div key={i} className="flex items-center gap-2 py-1 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                                  <img src={p.img} alt={p.name} className="w-6 h-6 rounded object-cover flex-shrink-0"/>
                                  <span className="text-xs truncate flex-1" style={{color:'var(--foreground)'}}>{p.name}</span>
                                  <span className="text-xs font-bold flex-shrink-0" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
