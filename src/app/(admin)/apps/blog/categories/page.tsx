'use client'
import { useState } from 'react'
import { Toast, PageBanner, Card, Badge, Button, Modal, Input, Select } from '@/components/ui'
import { BLOG_CATEGORIES } from '@/lib/data'
import { Plus, Edit, Trash2, ChevronRight, FolderOpen } from 'lucide-react'

type Cat = typeof BLOG_CATEGORIES[0]

export default function BlogCategoriesPage() {
  const [cats,    setCats]    = useState(BLOG_CATEGORIES)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState<Cat|null>(null)
  const [form,    setForm]    = useState({ name:'', slug:'', parent:'', color:'#5d87ff', description:'' })
  const [toast,   setToast]   = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const openNew  = () => { setEditing(null); setForm({name:'',slug:'',parent:'',color:'#5d87ff',description:''}); setModal(true) }
  const openEdit = (c:Cat) => { setEditing(c); setForm({name:c.name,slug:c.slug,parent:c.parent||'',color:c.color,description:''}); setModal(true) }

  const save = () => {
    if (!form.name.trim()) return
    if (editing) {
      setCats(cs => cs.map(c => c.id===editing.id ? {...c,...form,parent:form.parent||null} : c))
      showToast('Category updated!')
    } else {
      setCats(cs => [...cs, {id:Date.now(),count:0,...form,parent:form.parent||null}])
      showToast('Category created!')
    }
    setModal(false)
  }

  const topLevel = cats.filter(c => !c.parent)
  const childOf  = (name:string) => cats.filter(c => c.parent===name)

  return (
    <>
      <PageBanner title="Blog Categories" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'Categories'}]}
        description="Organise your blog posts into categories"
        action={<Button onClick={openNew}><Plus size={14}/>New Category</Button>}/>
      {<Toast message={toast}/>}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Tree */}
        <div className="lg:col-span-3 space-y-2">
          {topLevel.map(cat => (
            <Card key={cat.id} padding={false}>
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:cat.color+'18',border:`1.5px solid ${cat.color}33`}}>
                  <FolderOpen size={14} style={{color:cat.color}}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{cat.name}</p>
                  <p className="text-xs" style={{color:'var(--muted)'}}>/{cat.slug} · {cat.count} posts · {childOf(cat.name).length} sub-categories</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button type="button" onClick={()=>openEdit(cat)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={13}/></button>
                  <button type="button" onClick={()=>{setCats(cs=>cs.filter(c=>c.id!==cat.id&&c.parent!==cat.name));showToast('Deleted')}} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={13}/></button>
                </div>
              </div>
              {childOf(cat.name).map(child => (
                <div key={child.id} className="flex items-center gap-3 px-5 py-3 border-t ml-8" style={{borderColor:'var(--border)'}}>
                  <ChevronRight size={12} style={{color:'var(--border)'}} className="flex-shrink-0"/>
                  <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{background:child.color+'18'}}>
                    <span style={{color:child.color,fontSize:10}}>●</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{child.name}</p>
                    <p className="text-xs" style={{color:'var(--muted)'}}>/{child.slug} · {child.count} posts</p>
                  </div>
                  <button type="button" onClick={()=>openEdit(child)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={13}/></button>
                  <button type="button" onClick={()=>{setCats(cs=>cs.filter(c=>c.id!==child.id));showToast('Deleted')}} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={13}/></button>
                </div>
              ))}
            </Card>
          ))}
        </div>

        {/* Quick Add Form */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Quick Add Category</h3>
            <div className="space-y-3">
              <Input label="Name *" placeholder="e.g. Technology" value={form.name}
                onChange={e=>setForm(f=>({...f,name:e.target.value,slug:e.target.value.toLowerCase().replace(/\s+/g,'-')}))}/>
              <Input label="Slug" placeholder="technology" value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value}))}/>
              <Select label="Parent Category" value={form.parent} onChange={e=>setForm(f=>({...f,parent:e.target.value}))}
                options={[{value:'',label:'— None (top level) —'},...topLevel.map(c=>({value:c.name,label:c.name}))]}/>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={form.color} onChange={e=>setForm(f=>({...f,color:e.target.value}))} className="w-10 h-10 rounded-lg border cursor-pointer" style={{borderColor:'var(--border)'}}/>
                  <span className="text-sm font-mono" style={{color:'var(--muted)'}}>{form.color}</span>
                </div>
              </div>
              <Button className="w-full" onClick={save}><Plus size={14}/>Add Category</Button>
            </div>
          </Card>
        </div>
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title={editing?'Edit Category':'New Category'}
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>{editing?'Update':'Create'}</Button></>}>
        <div className="space-y-3">
          <Input label="Name *" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
          <Input label="Slug"   value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value}))}/>
          <Select label="Parent" value={form.parent} onChange={e=>setForm(f=>({...f,parent:e.target.value}))}
            options={[{value:'',label:'None'},...topLevel.filter(c=>c.id!==editing?.id).map(c=>({value:c.name,label:c.name}))]}/>
        </div>
      </Modal>
    </>
  )
}
