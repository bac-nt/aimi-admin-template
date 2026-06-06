'use client'
import { PageBanner, Card, Badge, Button, Input, Modal } from '@/components/ui'
import { Plus, X, Tag, TrendingUp, Hash, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const INIT_TAGS = [
  {id:1,name:'New Arrival',  slug:'new-arrival',  count:28,trending:true,  color:COLOR.primary  },
  {id:2,name:'Best Seller',  slug:'best-seller',  count:42,trending:true,  color:COLOR.success  },
  {id:3,name:'Sale',         slug:'sale',          count:35,trending:false, color:COLOR.error    },
  {id:4,name:'Featured',     slug:'featured',      count:19,trending:true,  color:COLOR.secondary},
  {id:5,name:'Limited',      slug:'limited',       count:8, trending:false, color:COLOR.warning  },
  {id:6,name:'Eco Friendly', slug:'eco-friendly',  count:14,trending:false, color:COLOR.success  },
  {id:7,name:'Handmade',     slug:'handmade',      count:7, trending:false, color:COLOR.purple   },
  {id:8,name:'Premium',      slug:'premium',       count:22,trending:true,  color:COLOR.primary  },
]

const COLOR_OPTS = [COLOR.primary,COLOR.secondary,COLOR.success,COLOR.warning,COLOR.error,COLOR.purple]

export default function EcommerceTagsPage() {
  const [tags, setTags]     = useState(INIT_TAGS)
  const [modal, setModal]   = useState(false)
  const [edit, setEdit]     = useState<typeof INIT_TAGS[0]|null>(null)
  const [search, setSearch] = useState('')
  const [form, setForm]     = useState({ name:'', slug:'', color: COLOR.primary })

  const openCreate = () => { setEdit(null); setForm({ name:'', slug:'', color: COLOR.primary }); setModal(true) }
  const openEdit   = (t: typeof INIT_TAGS[0]) => { setEdit(t); setForm({ name:t.name, slug:t.slug, color:t.color }); setModal(true) }
  const save = () => {
    if (!form.name.trim()) return
    if (edit) {
      setTags(ts => ts.map(t => t.id===edit.id ? {...t,...form} : t))
    } else {
      setTags(ts => [...ts, {
        id: Date.now(), name: form.name, slug: form.slug || form.name.toLowerCase().replace(/\s+/g,'-'),
        count: 0, trending: false, color: form.color,
      }])
    }
    setModal(false)
  }

  const filtered = tags.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
  const trending = tags.filter(t => t.trending).sort((a,b) => b.count - a.count)

  return (
    <>
      <PageBanner title="Product Tags" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Tags'}]} description="Organize products with searchable tags"
        action={<Button onClick={openCreate}><Plus size={14}/>Add Tag</Button>}/>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <input
                className="field flex-1"
                placeholder="Search tags..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filtered.sort((a,b) => b.count - a.count).map(tag => (
                <div key={tag.id} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all hover:shadow-sm" style={{borderColor: tag.color+'44', background: tag.color+'11'}}>
                  <Hash size={11} style={{color: tag.color}}/>
                  <span className="text-sm font-semibold" style={{color: 'var(--foreground)'}}>{tag.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{background: tag.color+'22', color: tag.color}}>{tag.count}</span>
                  {tag.trending && <TrendingUp size={10} style={{color: COLOR.success}}/>}
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(tag)} className="w-5 h-5 rounded flex items-center justify-center hover:bg-[var(--primary-light)]" style={{color:'var(--muted)'}}><Edit size={9}/></button>
                    <button onClick={() => setTags(ts => ts.filter(t => t.id !== tag.id))} className="w-5 h-5 rounded flex items-center justify-center hover:bg-[var(--error-light)]" style={{color:'var(--muted)'}}><X size={9}/></button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{color:'var(--muted)'}}>{filtered.length} tags total</p>
          </Card>

          {/* Tag list table */}
          <Card padding={false}>
            <div className="p-4 border-b" style={{borderColor:'var(--border)'}}>
              <h3 className="font-bold" style={{color:'var(--foreground)'}}>All Tags</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
                  {['Name','Slug','Products','Trending','Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>{filtered.map(tag => (
                  <tr key={tag.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{background: tag.color}}/>
                        <span className="font-semibold" style={{color:'var(--foreground)'}}>{tag.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><code className="text-xs px-2 py-1 rounded" style={{background:'var(--surface)',color:'var(--muted)'}}>{tag.slug}</code></td>
                    <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{tag.count}</td>
                    <td className="px-5 py-3.5">
                      {tag.trending ? <Badge variant="success">Trending</Badge> : <span className="text-xs" style={{color:'var(--muted)'}}>—</span>}
                    </td>
                    <td className="px-5 py-3.5"><div className="flex gap-1">
                      <button onClick={() => openEdit(tag)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Edit size={12}/></button>
                      <button onClick={() => setTags(ts => ts.filter(t => t.id !== tag.id))} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                    </div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-sm mb-4" style={{color:'var(--foreground)'}}>Trending Tags</h3>
            <div className="space-y-2.5">
              {trending.map((t,i) => (
                <div key={t.id} className="flex items-center gap-2.5">
                  <span className="text-xs font-black w-5" style={{color:'var(--muted)'}}>{i+1}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <TrendingUp size={12} style={{color:COLOR.success}}/>
                    <span className="text-sm font-medium" style={{color:'var(--foreground)'}}>{t.name}</span>
                  </div>
                  <span className="text-xs font-bold" style={{color:'var(--primary)'}}>{t.count}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-sm mb-3" style={{color:'var(--foreground)'}}>Stats</h3>
            {[
              {l:'Total Tags',v:tags.length},
              {l:'Trending',v:tags.filter(t=>t.trending).length},
              {l:'Total Uses',v:tags.reduce((a,t)=>a+t.count,0).toLocaleString('en-US')},
              {l:'Unused Tags',v:tags.filter(t=>t.count===0).length},
            ].map(s=>(
              <div key={s.l} className="flex justify-between text-sm py-1.5 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                <span style={{color:'var(--muted)'}}>{s.l}</span>
                <span className="font-bold" style={{color:'var(--foreground)'}}>{s.v}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={edit ? `Edit: ${edit.name}` : 'New Tag'}
        footer={<><Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button><Button onClick={save}>{edit ? 'Update' : 'Create'}</Button></>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Name *</label>
            <input className="field w-full" value={form.name}
              onChange={e => setForm(f => ({...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}))}
              placeholder="Tag name"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Slug</label>
            <input className="field w-full" value={form.slug}
              onChange={e => setForm(f => ({...f, slug: e.target.value}))}
              placeholder="url-slug"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{color:'var(--foreground)'}}>Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTS.map(c => (
                <button key={c} type="button" onClick={() => setForm(f => ({...f, color: c}))}
                  className="w-8 h-8 rounded-xl transition-all hover:scale-110"
                  style={{background:c, outline: form.color===c ? '3px solid var(--foreground)' : 'none', outlineOffset:2}}/>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
