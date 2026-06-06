'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Modal, Input, Select, Toggle } from '@/components/ui'
import { Plus, Edit, Trash2, Search, Globe, ExternalLink, Package, Star } from 'lucide-react'

interface Brand { id:number; name:string; slug:string; logo:string; country:string; products:number; status:string; website:string; featured:boolean; rating:number }

const INIT: Brand[] = [
  { id:1,  name:'Apple',     slug:'apple',     logo:'🍎', country:'USA',         products:48, status:'Active',   website:'apple.com',    featured:true,  rating:4.9 },
  { id:2,  name:'Samsung',   slug:'samsung',   logo:'📱', country:'South Korea', products:62, status:'Active',   website:'samsung.com',  featured:true,  rating:4.6 },
  { id:3,  name:'Nike',      slug:'nike',      logo:'👟', country:'USA',         products:35, status:'Active',   website:'nike.com',     featured:true,  rating:4.5 },
  { id:4,  name:'Adidas',    slug:'adidas',    logo:'🏃', country:'Germany',     products:28, status:'Active',   website:'adidas.com',   featured:false, rating:4.4 },
  { id:5,  name:'Sony',      slug:'sony',      logo:'🎵', country:'Japan',       products:19, status:'Active',   website:'sony.com',     featured:false, rating:4.7 },
  { id:6,  name:'Levi\'s',   slug:'levis',     logo:'👖', country:'USA',         products:24, status:'Active',   website:'levi.com',     featured:false, rating:4.2 },
  { id:7,  name:'Lululemon', slug:'lululemon', logo:'🧘', country:'Canada',      products:16, status:'Active',   website:'lululemon.com',featured:false, rating:4.6 },
  { id:8,  name:'Fossil',    slug:'fossil',    logo:'⌚', country:'USA',         products:11, status:'Inactive', website:'fossil.com',   featured:false, rating:4.1 },
]

const COUNTRIES = ['USA','Germany','Japan','South Korea','Canada','UK','France','Italy','Australia','China']

export default function BrandsPage() {
  const [brands,  setBrands]  = useState(INIT)
  const [search,  setSearch]  = useState('')
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState<Brand|null>(null)
  const [toast,   setToast]   = useState<string|null>(null)
  const [form,    setForm]    = useState({ name:'', country:'USA', website:'', featured:false, status:'Active' })

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }
  const openNew   = () => { setEditing(null); setForm({name:'',country:'USA',website:'',featured:false,status:'Active'}); setModal(true) }
  const openEdit  = (b:Brand) => { setEditing(b); setForm({name:b.name,country:b.country,website:b.website,featured:b.featured,status:b.status}); setModal(true) }

  const save = () => {
    if (!form.name.trim()) return
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')
    if (editing) {
      setBrands(bs=>bs.map(b=>b.id===editing.id?{...b,...form,slug}:b))
      showToast('Brand updated!')
    } else {
      setBrands(bs=>[...bs,{id:Date.now(),slug,logo:'🏷️',products:0,rating:0,...form}])
      showToast('Brand created!')
    }
    setModal(false)
  }

  const filtered = brands.filter(b=>b.name.toLowerCase().includes(search.toLowerCase()))
  const featured = brands.filter(b=>b.featured)

  return (
    <>
      <PageBanner title="Brands" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Brands'}]}
        description="Manage product brands and manufacturers"
        action={<Button onClick={openNew}><Plus size={14}/>New Brand</Button>}/>
      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[{l:'Total Brands',v:brands.length,c:'var(--primary)'},{l:'Active',v:brands.filter(b=>b.status==='Active').length,c:'var(--success)'},{l:'Featured',v:featured.length,c:'var(--warning)'}].map(s=>(
          <Card key={s.l}><p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      {/* Featured brands */}
      {featured.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{color:'var(--muted)'}}>⭐ Featured Brands</h2>
          <div className="flex gap-3 flex-wrap">
            {featured.map(b=>(
              <div key={b.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2" style={{borderColor:'var(--warning)44',background:'var(--warning-light)'}}>
                <span className="text-2xl">{b.logo}</span>
                <div>
                  <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{b.name}</p>
                  <p className="text-xs" style={{color:'var(--muted)'}}>{b.products} products · ★{b.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Card padding={false}>
        <div className="flex items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border flex-1 max-w-xs" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
            <Search size={14} style={{color:'var(--muted)'}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search brands…" className="bg-transparent text-sm outline-none w-full" style={{color:'var(--foreground)'}}/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['Brand','Country','Products','Rating','Featured','Status','Website','Actions'].map(h=>(
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(b=>(
                <tr key={b.id} className="border-b hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:'var(--surface)'}}>{b.logo}</div>
                      <div><p className="font-bold" style={{color:'var(--foreground)'}}>{b.name}</p><p className="text-xs" style={{color:'var(--muted)'}}>/{b.slug}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm"><Globe size={12} style={{color:'var(--muted)'}}/><span style={{color:'var(--foreground)'}}>{b.country}</span></div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5"><Package size={12} style={{color:'var(--muted)'}}/><span className="font-semibold" style={{color:'var(--foreground)'}}>{b.products}</span></div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 text-sm" style={{color:'var(--warning)'}}><Star size={12} fill="currentColor"/><span className="font-bold">{b.rating||'—'}</span></div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Toggle checked={b.featured} onChange={v=>setBrands(bs=>bs.map(x=>x.id===b.id?{...x,featured:v}:x))} size="sm"/>
                  </td>
                  <td className="px-5 py-3.5"><Badge variant={b.status==='Active'?'success':'muted'} dot>{b.status}</Badge></td>
                  <td className="px-5 py-3.5">
                    <a href={`https://${b.website}`} target="_blank" rel="noopener" className="flex items-center gap-1 text-xs hover:opacity-70 transition-opacity" style={{color:'var(--primary)'}} onClick={e=>e.stopPropagation()}>
                      <ExternalLink size={11}/>{b.website}
                    </a>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button type="button" onClick={()=>openEdit(b)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={13}/></button>
                      <button type="button" onClick={()=>{setBrands(bs=>bs.filter(x=>x.id!==b.id));showToast('Brand deleted')}} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modal} onClose={()=>setModal(false)} title={editing?'Edit Brand':'New Brand'}
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>{editing?'Update':'Create'} Brand</Button></>}>
        <div className="space-y-3">
          <Input label="Brand Name *" placeholder="e.g. Nike" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
          <Select label="Country" value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))}
            options={COUNTRIES.map(c=>({value:c,label:c}))}/>
          <Input label="Website" type="url" placeholder="example.com" value={form.website} onChange={e=>setForm(f=>({...f,website:e.target.value}))}
            left={<Globe size={13}/>}/>
          <Select label="Status" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}
            options={[{value:'Active',label:'Active'},{value:'Inactive',label:'Inactive'}]}/>
          <Toggle checked={form.featured} onChange={v=>setForm(f=>({...f,featured:v}))} label="Feature on homepage" size="sm"/>
        </div>
      </Modal>
    </>
  )
}
