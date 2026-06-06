'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Modal, Input, Select, Toggle, Progress } from '@/components/ui'
import { COUPONS } from '@/lib/data'
import { Plus, Edit, Trash2, Copy, Tag, Percent, DollarSign, Truck, Calendar, Search, CheckCircle } from 'lucide-react'

type Coupon = typeof COUPONS[0]
type CouponType = 'Percent'|'Fixed'|'Shipping'
const TYPE_V: Record<CouponType,'primary'|'success'|'secondary'> = { Percent:'primary', Fixed:'success', Shipping:'secondary' }
const TYPE_ICON: Record<CouponType, React.ElementType> = { Percent, Fixed:DollarSign, Shipping:Truck }

export default function CouponsPage() {
  const [coupons,  setCoupons]  = useState(COUPONS)
  const [search,   setSearch]   = useState('')
  const [modal,    setModal]    = useState(false)
  const [editing,  setEditing]  = useState<Coupon|null>(null)
  const [copied,   setCopied]   = useState<number|null>(null)
  const [toast,    setToast]    = useState<string|null>(null)
  const [form,     setForm]     = useState({ code:'', type:'Percent' as CouponType, value:'', minOrder:'', limit:'', expires:'', active:true })

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const copy = (id:number, code:string) => {
    navigator.clipboard?.writeText(code).catch(()=>{})
    setCopied(id); setTimeout(()=>setCopied(null),2000)
    showToast(`Copied: ${code}`)
  }

  const save = () => {
    if (!form.code.trim()) return
    if (editing) {
      setCoupons(cs=>cs.map(c=>c.id===editing.id ? {...c,...form,value:+form.value,minOrder:+form.minOrder,limit:+form.limit,uses:c.uses} : c))
      showToast('Coupon updated!')
    } else {
      setCoupons(cs=>[...cs,{id:Date.now(),...form,value:+form.value,minOrder:+form.minOrder,limit:+form.limit,uses:0,status:'Active'}])
      showToast('Coupon created!')
    }
    setModal(false)
  }

  const filtered = coupons.filter(c => c.code.toLowerCase().includes(search.toLowerCase()))
  const activeCount   = coupons.filter(c=>c.status==='Active').length
  const totalUses     = coupons.reduce((s,c)=>s+c.uses,0)

  return (
    <>
      <PageBanner title="Coupons" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Coupons'}]}
        description="Create and manage discount codes and promotions"
        action={<Button onClick={()=>{setEditing(null);setForm({code:'',type:'Percent',value:'',minOrder:'',limit:'500',expires:'',active:true});setModal(true)}}><Plus size={14}/>New Coupon</Button>}/>
      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[{l:'Active Coupons',v:activeCount,c:'var(--success)'},{l:'Total Uses',v:totalUses,c:'var(--primary)'},{l:'Total Created',v:coupons.length,c:'var(--secondary)'}].map(s=>(
          <Card key={s.l}><p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      <Card padding={false}>
        <div className="flex items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border flex-1 max-w-xs" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
            <Search size={14} style={{color:'var(--muted)'}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search coupons…" className="bg-transparent text-sm outline-none w-full" style={{color:'var(--foreground)'}}/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['Code','Type','Discount','Min Order','Usage','Expires','Status','Actions'].map(h=>(
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(c=>{
                const Icon = TYPE_ICON[c.type as CouponType] || Tag
                const pct  = c.limit > 0 ? Math.round(c.uses/c.limit*100) : 0
                return (
                  <tr key={c.id} className="border-b hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black font-mono text-sm tracking-wider" style={{color:'var(--foreground)'}}>{c.code}</span>
                        <button type="button" onClick={()=>copy(c.id,c.code)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:copied===c.id?'var(--success)':'var(--muted)'}}>
                          {copied===c.id ? <CheckCircle size={12}/> : <Copy size={12}/>}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><Badge variant={TYPE_V[c.type as CouponType]}><Icon size={10}/>{c.type}</Badge></td>
                    <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{c.type==='Percent'?`${c.value}%`:c.type==='Fixed'?`$${c.value}`:'Free Shipping'}</td>
                    <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{c.minOrder>0?`$${c.minOrder}`:'No minimum'}</td>
                    <td className="px-5 py-3.5">
                      <div className="text-xs mb-1" style={{color:'var(--muted)'}}>{c.uses} / {c.limit}</div>
                      <Progress value={pct} height={4} className="w-20" color={pct>80?'var(--warning)':undefined}/>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 text-xs" style={{color:'var(--muted)'}}><Calendar size={11}/>{c.expires}</div>
                    </td>
                    <td className="px-5 py-3.5"><Badge variant={c.status==='Active'?'success':'muted'} dot>{c.status}</Badge></td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button type="button" onClick={()=>{setEditing(c);setForm({code:c.code,type:c.type as CouponType,value:String(c.value),minOrder:String(c.minOrder),limit:String(c.limit),expires:c.expires,active:c.status==='Active'});setModal(true)}} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={13}/></button>
                        <button type="button" onClick={()=>{setCoupons(cs=>cs.filter(x=>x.id!==c.id));showToast('Coupon deleted')}} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modal} onClose={()=>setModal(false)} title={editing?'Edit Coupon':'New Coupon'}
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>{editing?'Update':'Create'} Coupon</Button></>}>
        <div className="space-y-3">
          <Input label="Coupon Code *" placeholder="SUMMER25" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value.toUpperCase()}))} hint="Customers enter this at checkout"/>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Discount Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Percent','Fixed','Shipping'] as CouponType[]).map(t=>{
                const Icon=TYPE_ICON[t]
                return (
                  <button key={t} type="button" onClick={()=>setForm(f=>({...f,type:t}))}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-semibold transition-all"
                    style={form.type===t?{borderColor:'var(--primary)',background:'var(--primary-light)',color:'var(--primary)'}:{borderColor:'var(--border)',color:'var(--muted)'}}>
                    <Icon size={16}/>{t}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label={form.type==='Percent'?'Discount %':'Discount Amount'} type="number" placeholder={form.type==='Percent'?'25':'10'} value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))} disabled={form.type==='Shipping'}/>
            <Input label="Minimum Order ($)" type="number" placeholder="50" value={form.minOrder} onChange={e=>setForm(f=>({...f,minOrder:e.target.value}))}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Usage Limit" type="number" placeholder="500" value={form.limit} onChange={e=>setForm(f=>({...f,limit:e.target.value}))}/>
            <Input label="Expiry Date" type="date" value={form.expires} onChange={e=>setForm(f=>({...f,expires:e.target.value}))}/>
          </div>
          <Toggle checked={form.active} onChange={v=>setForm(f=>({...f,active:v}))} label="Active coupon" size="sm"/>
        </div>
      </Modal>
    </>
  )
}
