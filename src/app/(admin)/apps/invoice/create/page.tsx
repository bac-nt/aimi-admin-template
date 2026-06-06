'use client'
import { useState } from 'react'
import { PageBanner, Card, Button, Input } from '@/components/ui'
import { formatCurrency } from '@/lib/data'
import { Plus, Trash2, Check } from 'lucide-react'

interface LineItem { id:number; desc:string; qty:number; price:number }

export default function InvoiceCreatePage() {
  const [to,     setTo]    = useState({ name:'', email:'', address:'' })
  const [items,  setItems] = useState<LineItem[]>([{ id:1, desc:'', qty:1, price:0 }])
  const [notes,  setNotes] = useState('')
  const [saved,  setSaved] = useState(false)
  const [saving, setSaving]= useState(false)

  const addItem  = () => setItems(it=>[...it,{id:Date.now(),desc:'',qty:1,price:0}])
  const delItem  = (id:number) => setItems(it=>it.filter(i=>i.id!==id))
  const updItem  = (id:number, field:keyof LineItem, val:string|number) => setItems(it=>it.map(i=>i.id===id?{...i,[field]:val}:i))

  const subtotal = items.reduce((s,i)=>s+(i.qty*i.price),0)
  const tax      = subtotal * 0.085
  const total    = subtotal + tax

  const handleSave = () => {
    setSaving(true)
    setTimeout(()=>{ setSaving(false); setSaved(true) },1000)
  }

  if (saved) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{background:'var(--success-light)'}}><Check size={32} style={{color:'var(--success)'}}/></div>
      <h2 className="font-black text-xl" style={{color:'var(--foreground)'}}>Invoice Created!</h2>
      <p style={{color:'var(--muted)'}}>Your invoice has been saved successfully.</p>
      <div className="flex gap-3"><Button variant="outline" onClick={()=>setSaved(false)}>Create Another</Button><Button>View Invoice</Button></div>
    </div>
  )

  return (
    <>
      <PageBanner title="Create Invoice" breadcrumbs={[{label:'Home',href:'/'},{label:'Invoice'},{label:'Create'}]}
        action={<div className="flex gap-2"
        description="Create and send professional invoices"><Button variant="outline">Save Draft</Button><Button loading={saving} onClick={handleSave}><Check size={14}/>Send Invoice</Button></div>}/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Bill To</h3>
            <div className="space-y-3">
              <Input label="Client Name" placeholder="John Smith" value={to.name} onChange={e=>setTo(t=>({...t,name:e.target.value}))}/>
              <Input label="Email" type="email" placeholder="client@example.com" value={to.email} onChange={e=>setTo(t=>({...t,email:e.target.value}))}/>
              <Input label="Address" placeholder="123 Main St, City, State" value={to.address} onChange={e=>setTo(t=>({...t,address:e.target.value}))}/>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Line Items</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-xs font-bold uppercase" style={{color:'var(--muted)'}}>
                <div className="col-span-6">Description</div><div className="col-span-2 text-center">Qty</div><div className="col-span-3 text-right">Price</div><div/>
              </div>
              {items.map(item=>(
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6"><input value={item.desc} onChange={e=>updItem(item.id,'desc',e.target.value)} placeholder="Item description" className="field w-full"/></div>
                  <div className="col-span-2"><input type="number" min="1" value={item.qty} onChange={e=>updItem(item.id,'qty',+e.target.value)} className="field w-full text-center"/></div>
                  <div className="col-span-3"><input type="number" min="0" step="0.01" value={item.price} onChange={e=>updItem(item.id,'price',+e.target.value)} placeholder="0.00" className="field w-full text-right"/></div>
                  <button type="button" onClick={()=>delItem(item.id)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addItem}><Plus size={13}/>Add Item</Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-3" style={{color:'var(--foreground)'}}>Notes</h3>
            <textarea rows={3} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Payment terms, thank you note…" className="field w-full resize-none"/>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Summary</h3>
            <div className="space-y-3">
              {[{l:'Subtotal',v:subtotal},{l:'Tax (8.5%)',v:tax}].map(r=>(
                <div key={r.l} className="flex justify-between text-sm"><span style={{color:'var(--muted)'}}>{r.l}</span><span style={{color:'var(--foreground)'}}>{formatCurrency(r.v)}</span></div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t font-black text-lg" style={{borderColor:'var(--border)'}}><span style={{color:'var(--foreground)'}}>Total</span><span style={{color:'var(--primary)'}}>{formatCurrency(total)}</span></div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
