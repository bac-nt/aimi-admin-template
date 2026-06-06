'use client'
import { useState } from 'react'
import { Toast, PageBanner, Card, Badge, Button, Input, Modal } from '@/components/ui'
import { BLOG_TAGS } from '@/lib/data'
import { Plus, X, TrendingUp, Edit, Trash2, Hash } from 'lucide-react'

type Tag = typeof BLOG_TAGS[0]

export default function BlogTagsPage() {
  const [tags,   setTags]   = useState(BLOG_TAGS)
  const [input,  setInput]  = useState('')
  const [editing,setEditing]= useState<Tag|null>(null)
  const [modal,  setModal]  = useState(false)
  const [form,   setForm]   = useState({name:'',trending:false})
  const [toast,  setToast]  = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const addTag = () => {
    const n = input.trim().toLowerCase().replace(/\s+/g,'-')
    if (!n || tags.find(t=>t.slug===n)) return
    setTags(ts=>[...ts,{id:Date.now(),name:n,slug:n,count:0,trending:false}])
    setInput('')
    showToast(`Tag "${n}" created!`)
  }

  const save = () => {
    if (!form.name.trim()) return
    setTags(ts=>ts.map(t=>t.id===editing!.id?{...t,...form,slug:form.name.toLowerCase().replace(/\s+/g,'-')}:t))
    setModal(false); showToast('Tag updated!')
  }

  return (
    <>
      <PageBanner title="Blog Tags" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'Tags'}]}
        description="Manage tags to help readers discover related content"
        action={<Button onClick={()=>{setEditing(null);setForm({name:'',trending:false});setModal(true)}}><Plus size={14}/>New Tag</Button>}/>
      {<Toast message={toast}/>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{color:'var(--foreground)'}}>All Tags <span className="text-sm font-normal" style={{color:'var(--muted)'}}>({tags.length})</span></h3>
              <div className="flex items-center gap-2">
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTag()}
                  placeholder="new-tag-name" className="field text-sm w-44"/>
                <Button size="sm" onClick={addTag}><Plus size={13}/>Add</Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.sort((a,b)=>b.count-a.count).map(t=>(
                <div key={t.id} className="group flex items-center gap-1.5 pl-3 pr-1.5 py-2 rounded-xl border transition-all hover:border-[var(--primary)] hover:shadow-sm"
                  style={{borderColor:'var(--border)'}}>
                  <Hash size={11} style={{color:'var(--primary)'}}/>
                  <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>{t.name}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{background:'var(--surface)',color:'var(--muted)'}}>{t.count}</span>
                  {t.trending && <TrendingUp size={11} style={{color:'var(--success)'}}/>}
                  <div className="flex gap-0.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={()=>{setEditing(t);setForm({name:t.name,trending:t.trending});setModal(true)}} className="w-5 h-5 rounded flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={10}/></button>
                    <button type="button" onClick={()=>{setTags(ts=>ts.filter(x=>x.id!==t.id));showToast('Tag deleted')}} className="w-5 h-5 rounded flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><X size={10}/></button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="font-bold mb-3" style={{color:'var(--foreground)'}}>📈 Trending Tags</h3>
            <div className="space-y-2">
              {tags.filter(t=>t.trending).map(t=>(
                <div key={t.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                  <div className="flex items-center gap-2"><Hash size={12} style={{color:'var(--primary)'}}/><span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>{t.name}</span></div>
                  <Badge variant="success">{t.count} posts</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold mb-1" style={{color:'var(--foreground)'}}>Tag Statistics</h3>
            <p className="text-xs mb-3" style={{color:'var(--muted)'}}>Total: {tags.length} · Trending: {tags.filter(t=>t.trending).length}</p>
            <div className="space-y-2">
              {tags.sort((a,b)=>b.count-a.count).slice(0,5).map(t=>(
                <div key={t.id} className="flex items-center gap-2">
                  <span className="text-xs w-20 truncate" style={{color:'var(--muted)'}}>{t.name}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{background:'var(--border)'}}>
                    <div className="h-full rounded-full" style={{width:`${Math.round(t.count/tags[0].count*100)}%`,background:'var(--primary)'}}/>
                  </div>
                  <span className="text-xs w-6 text-right" style={{color:'var(--muted)'}}>{t.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title="Edit Tag"
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>Update Tag</Button></>}>
        <div className="space-y-3">
          <Input label="Tag Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border" style={{borderColor:'var(--border)'}}>
            <input type="checkbox" checked={form.trending} onChange={e=>setForm(f=>({...f,trending:e.target.checked}))} className="w-4 h-4 rounded"/>
            <div><p className="text-sm font-semibold" style={{color:'var(--foreground)'}}>Trending tag</p><p className="text-xs" style={{color:'var(--muted)'}}>Show in trending section</p></div>
          </label>
        </div>
      </Modal>
    </>
  )
}
