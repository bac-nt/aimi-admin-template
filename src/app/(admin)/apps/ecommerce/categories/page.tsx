'use client'
import React from 'react'
import { Badge, Button, Card, Modal, PageBanner, SearchBar, Select } from '@/components/ui'
import { SeoFields, type SeoData } from '@/components/ui/SeoFields'
import { Plus, Edit, Trash2, ChevronRight, Search, Check } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const INIT_CATS = [
  { id:1, name:'Electronics',  slug:'electronics',  parent:null, count:148, img:'💻', desc:'Phones, laptops, gadgets',     status:'Active',  seo:{ metaTitle:'Buy Electronics Online', metaDesc:'Shop the best electronics at great prices.', slug:'electronics', keywords:'electronics shop' } },
  { id:2, name:'Fashion',      slug:'fashion',       parent:null, count:234, img:'👗', desc:'Clothing, shoes, accessories',  status:'Active',  seo:{ metaTitle:'Fashion & Clothing', metaDesc:'Discover the latest fashion trends.', slug:'fashion', keywords:'fashion clothing' } },
  { id:3, name:'Books',        slug:'books',         parent:null, count:89,  img:'📚', desc:'Fiction, textbooks and ebooks', status:'Active',  seo:{ metaTitle:'', metaDesc:'', slug:'books', keywords:'' } },
  { id:4, name:'Toys',         slug:'toys',          parent:null, count:67,  img:'🧸', desc:'Kids toys and games',           status:'Active',  seo:{ metaTitle:'', metaDesc:'', slug:'toys', keywords:'' } },
  { id:5, name:'Smartphones',  slug:'smartphones',   parent:1,    count:52,  img:'📱', desc:'Android, iOS phones',          status:'Active',  seo:{ metaTitle:'', metaDesc:'', slug:'smartphones', keywords:'' } },
  { id:6, name:'Laptops',      slug:'laptops',       parent:1,    count:38,  img:'💻', desc:'Gaming, business laptops',     status:'Active',  seo:{ metaTitle:'', metaDesc:'', slug:'laptops', keywords:'' } },
  { id:7, name:"Men's Wear",   slug:'mens-wear',     parent:2,    count:89,  img:'👔', desc:'T-shirts, pants, suits',       status:'Active',  seo:{ metaTitle:'', metaDesc:'', slug:'mens-wear', keywords:'' } },
  { id:8, name:"Women's Wear", slug:'womens-wear',   parent:2,    count:112, img:'👗', desc:'Dresses, tops, accessories',   status:'Draft',   seo:{ metaTitle:'', metaDesc:'', slug:'womens-wear', keywords:'' } },
]

type Cat = typeof INIT_CATS[0]

export default function EcommerceCategoriesPage() {
  const [cats,    setCats]   = useState(INIT_CATS)
  const [search,  setSearch] = useState('')
  const [modal,   setModal]  = useState(false)
  const [editing, setEdit]   = useState<Cat|null>(null)
  const [form,    setForm]   = useState({ name:'', slug:'', desc:'', parent:'', status:'Active' })
  const [seo,     setSeo]    = useState<SeoData>({ metaTitle:'', metaDesc:'', slug:'', keywords:'' })

  const topLevel = cats.filter(c => !c.parent)
  const children = (pid: number) => cats.filter(c => c.parent === pid)
  const filtered = cats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const openCreate = () => {
    setEdit(null)
    setForm({ name:'', slug:'', desc:'', parent:'', status:'Active' })
    setSeo({ metaTitle:'', metaDesc:'', slug:'', keywords:'' })
    setModal(true)
  }

  const openEdit = (c: Cat) => {
    setEdit(c)
    setForm({ name:c.name, slug:c.slug, desc:c.desc, parent:String(c.parent||''), status:c.status })
    setSeo(c.seo as SeoData)
    setModal(true)
  }

  const save = () => {
    if (!form.name) return
    if (editing) {
      setCats(cs => cs.map(c => c.id===editing.id ? {...c,...form,parent:form.parent?Number(form.parent):null,seo} : c))
    } else {
      setCats(cs => [...cs, {
        id: Date.now(), name:form.name, slug:seo.slug||form.slug||form.name.toLowerCase().replace(/\s+/g,'-'),
        parent:form.parent?Number(form.parent):null, count:0, img:'📦', desc:form.desc, status:form.status, seo,
      }])
    }
    setModal(false)
  }

  return (
    <>
      <PageBanner title="Product Categories" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Categories'}]} description="Organize products with hierarchical categories"
        action={<Button onClick={openCreate}><Plus size={14}/>Add Category</Button>}/>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 animate-fade-up">
        {[
          {l:'Total Categories',v:cats.length,c:COLOR.primary},
          {l:'Top Level',v:topLevel.length,c:COLOR.secondary},
          {l:'Active',v:cats.filter(c=>c.status==='Active').length,c:COLOR.success},
          {l:'Total Products',v:cats.reduce((a,c)=>a+c.count,0).toLocaleString('en-US'),c:COLOR.warning},
        ].map(s=>(
          <Card key={s.l}><p className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Category tree table */}
        <div className="xl:col-span-2">
          <Card padding={false}>
            <div className="p-4 border-b flex items-center gap-3" style={{borderColor:'var(--border)'}}>
              <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
                  {['Category','Slug','Products','SEO','Status','Actions'].map(h=>(
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {(search ? filtered : topLevel).map(cat => (
                    <React.Fragment key={cat.id}>
                      <tr className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{cat.img}</span>
                            <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{cat.name}</p><p className="text-xs" style={{color:'var(--muted)'}}>{cat.desc.slice(0,35)}…</p></div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5"><code className="text-xs px-2 py-1 rounded" style={{background:'var(--surface)',color:'var(--muted)'}}>{cat.slug}</code></td>
                        <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{cat.count}</td>
                        <td className="px-5 py-3.5">
                          {cat.seo.metaTitle
                            ? <Badge variant="success">✓ Done</Badge>
                            : <Badge variant="warning">Missing</Badge>
                          }
                        </td>
                        <td className="px-5 py-3.5"><Badge variant={cat.status==='Active'?'success':'warning'}>{cat.status}</Badge></td>
                        <td className="px-5 py-3.5"><div className="flex gap-1">
                          <button onClick={()=>openEdit(cat)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Edit size={12}/></button>
                          <button onClick={()=>setCats(c=>c.filter(x=>x.id!==cat.id))} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                        </div></td>
                      </tr>
                      {!search && children(cat.id).map(child=>(
                        <tr key={child.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)',background:'rgba(93,135,255,0.02)'}}>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3 pl-6">
                              <ChevronRight size={12} style={{color:'var(--muted)'}}/><span className="text-lg">{child.img}</span>
                              <div><p className="font-medium text-sm" style={{color:'var(--foreground)'}}>{child.name}</p><p className="text-xs" style={{color:'var(--muted)'}}>↳ {cat.name}</p></div>
                            </div>
                          </td>
                          <td className="px-5 py-3"><code className="text-xs px-2 py-1 rounded" style={{background:'var(--surface)',color:'var(--muted)'}}>{child.slug}</code></td>
                          <td className="px-5 py-3 text-sm" style={{color:'var(--muted)'}}>{child.count}</td>
                          <td className="px-5 py-3">{child.seo.metaTitle?<Badge variant="success" className="text-[10px]">✓ Done</Badge>:<Badge variant="warning" className="text-[10px]">Missing</Badge>}</td>
                          <td className="px-5 py-3"><Badge variant={child.status==='Active'?'success':'warning'} className="text-[10px]">{child.status}</Badge></td>
                          <td className="px-5 py-3"><div className="flex gap-1">
                            <button onClick={()=>openEdit(child)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Edit size={12}/></button>
                            <button onClick={()=>setCats(c=>c.filter(x=>x.id!==child.id))} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                          </div></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick stats */}
        <div className="space-y-4">
          <Card>
            <p className="font-bold text-sm mb-4" style={{color:'var(--foreground)'}}>Top Categories</p>
            <div className="space-y-3">
              {[...cats].sort((a,b)=>b.count-a.count).slice(0,5).map((c,i)=>(
                <div key={c.id} className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center">{c.img}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium truncate" style={{color:'var(--foreground)'}}>{c.name}</span><span style={{color:'var(--muted)'}}>{c.count}</span></div>
                    <div className="h-1.5 rounded-full" style={{background:'var(--border)'}}><div className="h-full rounded-full" style={{width:`${(c.count/234)*100}%`,background:`var(--${['primary','secondary','success','warning','error'][i]})`}}/></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="font-bold text-sm mb-3" style={{color:'var(--foreground)'}}>SEO Coverage</p>
            <div className="space-y-2">
              {[
                {l:'With SEO set',v:cats.filter(c=>c.seo.metaTitle).length,total:cats.length,c:COLOR.success},
                {l:'Missing SEO',  v:cats.filter(c=>!c.seo.metaTitle).length,total:cats.length,c:COLOR.warning},
              ].map(s=>(
                <div key={s.l}>
                  <div className="flex justify-between text-xs mb-1"><span style={{color:'var(--muted)'}}>{s.l}</span><span className="font-bold" style={{color:s.c}}>{s.v}/{s.total}</span></div>
                  <div className="h-1.5 rounded-full" style={{background:'var(--border)'}}><div className="h-full rounded-full" style={{width:`${(s.v/s.total)*100}%`,background:s.c}}/></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? `Edit: ${editing.name}` : 'Add Category'}
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>{editing?'Update':'Create Category'}</Button></>}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Name *</label>
              <input className="field w-full" value={form.name}
                onChange={e=>{ setForm(f=>({...f,name:e.target.value})); if(!seo.slug) setSeo(s=>({...s,slug:e.target.value.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')})) }}
                placeholder="Category name"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Parent Category</label>
              <Select
                value={form.parent}
                onChange={e=>setForm(f=>({...f,parent:e.target.value}))}
                options={[{value:'',label:'None (Top Level)'},...topLevel.filter(cat=>!editing||cat.id!==editing.id).map(cat=>({value:String(cat.id),label:cat.name}))]}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Description</label>
            <textarea className="field w-full resize-none" rows={2} value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Brief description…"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Status</label>
            <div className="flex gap-2">
              {['Active','Draft'].map(s=>(
                <button key={s} type="button" onClick={()=>setForm(f=>({...f,status:s}))}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                  style={form.status===s?{borderColor:'var(--primary)',background:'var(--primary-light)',color:'var(--primary)'}:{borderColor:'var(--border)',color:'var(--muted)'}}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* SEO inside modal */}
          <div className="pt-2 border-t" style={{borderColor:'var(--border)'}}>
            <SeoFields
              value={seo}
              onChange={setSeo}
              titlePlaceholder={`e.g. Buy ${form.name||'Category'} Online — Best Prices`}
              slugPlaceholder={form.name.toLowerCase().replace(/\s+/g,'-') || 'category-slug'}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
