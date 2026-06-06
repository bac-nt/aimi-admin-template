'use client'
import { PageBanner, Button } from '@/components/ui'
import { Plus, Trash2, Download, Send } from 'lucide-react'
import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'

interface LineItem { id:number; desc:string; qty:number; rate:number }

export default function InvoiceCreatePage() {
  const [items, setItems] = useState<LineItem[]>([
    {id:1,desc:'Web Design & Development',qty:1,rate:3000},
    {id:2,desc:'UI/UX Consultation',       qty:4,rate:150 },
  ])
  const add    = () => setItems(s=>[...s,{id:Date.now(),desc:'',qty:1,rate:0}])
  const remove = (id:number) => setItems(s=>s.filter(i=>i.id!==id))
  const upd    = (id:number,field:keyof LineItem,val:string|number) => setItems(s=>s.map(i=>i.id===id?{...i,[field]:val}:i))
  const sub    = items.reduce((a,i)=>a+i.qty*i.rate,0)
  const tax    = Math.round(sub*0.1)
  const total  = sub+tax

  return (
    <>
      <PageBanner title="Edit Invoice" breadcrumbs={[{label:'Home',href:'/'},{label:'Invoice'},{label:'Edit'}]}/>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <div className="card p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>From</h3>
              <div className="space-y-3">
                <input className="field w-full" defaultValue="Modernize Inc." placeholder="Business Name"/>
                <textarea className="field w-full resize-none" rows={3} defaultValue={"123 Business Ave, San Francisco, CA 94105"}/>
                <input className="field w-full" defaultValue="billing@modernize.dev" placeholder="Email"/>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Bill To</h3>
              <div className="space-y-3">
                <input className="field w-full" placeholder="Client Name"/>
                <textarea className="field w-full resize-none" rows={3} placeholder="Client address..."/>
                <input className="field w-full" placeholder="Client email"/>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Invoice #</label><input className="field w-full" defaultValue="INV-009"/></div>
              <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Issue Date</label><input type="date" className="field w-full"/></div>
              <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Due Date</label><input type="date" className="field w-full"/></div>
            </div>
            <table className="w-full text-sm mb-3">
              <thead><tr className="border-b" style={{borderColor:'var(--border)'}}>
                {['Description','Qty','Rate','Amount',''].map(h=><th key={h} className="text-left pb-2.5 text-xs font-bold uppercase pr-3" style={{color:'var(--muted)'}}>{h}</th>)}
              </tr></thead>
              <tbody>{items.map(item=>(
                <tr key={item.id} className="border-b" style={{borderColor:'var(--border)'}}>
                  <td className="py-2 pr-3"><input className="field w-full text-sm" value={item.desc} onChange={e=>upd(item.id,'desc',e.target.value)} placeholder="Description"/></td>
                  <td className="py-2 pr-3 w-20"><input type="number" className="field w-full text-center" value={item.qty} onChange={e=>upd(item.id,'qty',Number(e.target.value))} min={1}/></td>
                  <td className="py-2 pr-3 w-28"><input type="number" className="field w-full text-right" value={item.rate} onChange={e=>upd(item.id,'rate',Number(e.target.value))} min={0}/></td>
                  <td className="py-2 pr-3 w-28 text-right font-semibold whitespace-nowrap" style={{color:'var(--foreground)'}}>{formatCurrency(item.qty*item.rate)}</td>
                  <td className="py-2 w-8"><button onClick={()=>remove(item.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={13}/></button></td>
                </tr>
              ))}</tbody>
            </table>
            <button onClick={add} className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80 mb-5" style={{color:'var(--primary)'}}><Plus size={14}/>Add Line</button>
            <div className="flex justify-end">
              <div className="w-60 space-y-2">
                {[['Subtotal',sub],['Tax (10%)',tax]].map(([l,v])=>(
                  <div key={String(l)} className="flex justify-between text-sm"><span style={{color:'var(--muted)'}}>{l}</span><span style={{color:'var(--foreground)'}}>{formatCurrency(Number(v))}</span></div>
                ))}
                <div className="flex justify-between font-black pt-2 border-t" style={{borderColor:'var(--border)',color:'var(--foreground)'}}><span>Total</span><span style={{color:'var(--primary)'}}>{formatCurrency(total)}</span></div>
              </div>
            </div>
          </div>
          <div className="card p-5"><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Notes / Terms</label><textarea className="field w-full resize-none" rows={3} defaultValue="Payment due within 30 days. Thank you for your business!"/></div>
          <div className="flex gap-3"><Button><Send size={14}/>Send Invoice</Button><Button variant="outline"><Download size={14}/>Download PDF</Button><Button variant="ghost">Save Draft</Button></div>
        </div>
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-bold text-sm mb-4" style={{color:'var(--foreground)'}}>Summary</h3>
            {[{l:'Invoice #',v:'INV-009'},{l:'Items',v:String(items.length)},{l:'Subtotal',v:formatCurrency(sub)},{l:'Tax 10%',v:formatCurrency(tax)}].map(s=>(
              <div key={s.l} className="flex justify-between text-sm py-1.5 border-b last:border-0" style={{borderColor:'var(--border)'}}><span style={{color:'var(--muted)'}}>{s.l}</span><span className="font-semibold" style={{color:'var(--foreground)'}}>{s.v}</span></div>
            ))}
            <div className="flex justify-between font-black mt-2 pt-2 border-t" style={{borderColor:'var(--border)',color:'var(--foreground)'}}><span>Total Due</span><span style={{color:'var(--primary)'}}>{formatCurrency(total)}</span></div>
          </div>
        </div>
      </div>
    </>
  )
}
