'use client'
import { PageBanner, Card, CardHeader, Button, Input, Select, Toggle, Toast } from '@/components/ui'
import { useState } from 'react'
import { Send, Upload, Plus, X, Tag } from 'lucide-react'

export default function VerticalFormPage() {
  const [toast, setToast] = useState<string|null>(null)
  const [tags,  setTags]  = useState<string[]>(['design','ui'])
  const [tagIn, setTagIn] = useState('')
  const [form,  setForm]  = useState({ title:'', category:'', content:'', priority:'medium', status:'draft', featured:false, comments:true, notify:false })

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }
  const addTag = () => { if(tagIn.trim()&&!tags.includes(tagIn.trim())){setTags(t=>[...t,tagIn.trim()]);setTagIn('')} }

  return (
    <>
      <Toast message={toast}/>
      <PageBanner title="Vertical Form" description="Stacked label-above-input layout, standard for content creation"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Vertical'}]}
        action={<div className="flex gap-2"><Button variant="outline">Save Draft</Button><Button onClick={()=>showToast('Post published!')}><Send size={14}/>Publish</Button></div>}/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Main content */}
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <CardHeader title="Post Content"/>
            <div className="space-y-4">
              <Input label="Title *" placeholder="Enter a compelling title…" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Content *</label>
                {/* Toolbar */}
                <div className="flex gap-1 p-2 border border-b-0 rounded-t-xl" style={{borderColor:'var(--border)',background:'var(--surface)'}}>
                  {['B','I','U','H1','H2','—'].map(cmd=>(
                    <button key={cmd} type="button" className="px-2 py-1 rounded text-xs font-bold hover:bg-[var(--card)] transition-colors" style={{color:'var(--muted)'}}>{cmd}</button>
                  ))}
                </div>
                <textarea rows={8} value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))}
                  placeholder="Write your post content here…"
                  className="w-full px-3.5 py-2.5 text-sm outline-none resize-none rounded-b-xl border"
                  style={{borderColor:'var(--border)',background:'var(--card)',color:'var(--foreground)'}}/>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Featured Image"/>
            <div className="border-2 border-dashed rounded-2xl p-8 text-center transition-colors hover:border-[var(--primary)] cursor-pointer" style={{borderColor:'var(--border)'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{background:'var(--primary-light)'}}><Upload size={20} style={{color:'var(--primary)'}}/></div>
              <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>Drop image here or click to upload</p>
              <p className="text-xs mt-1" style={{color:'var(--muted)'}}>PNG, JPG, WebP · Max 5MB · Recommended 1200×630px</p>
              <Button variant="outline" size="sm" className="mt-3"><Upload size={12}/>Choose File</Button>
            </div>
          </Card>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          <Card>
            <CardHeader title="Publish Settings"/>
            <div className="space-y-4">
              <Select label="Status" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}
                options={[{value:'draft',label:'Draft'},{value:'published',label:'Published'},{value:'scheduled',label:'Scheduled'},{value:'private',label:'Private'}]}/>
              <Select label="Category" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}
                options={[{value:'',label:'Select category…'},{value:'dev',label:'Development'},{value:'design',label:'Design'},{value:'devops',label:'DevOps'},{value:'tutorial',label:'Tutorial'}]}/>
              <Select label="Priority" value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}
                options={['low','medium','high'].map(v=>({value:v,label:v[0].toUpperCase()+v.slice(1)}))}/>
            </div>
          </Card>

          <Card>
            <CardHeader title="Tags"/>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map(t=>(
                <span key={t} className="flex items-center gap-1 pl-2.5 pr-1 py-0.5 rounded-full text-xs font-semibold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>
                  <Tag size={9}/>{t}
                  <button type="button" onClick={()=>setTags(ts=>ts.filter(x=>x!==t))} className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagIn} onChange={e=>setTagIn(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTag()}
                placeholder="Add tag…" className="field flex-1 py-2"/>
              <button type="button" onClick={addTag} className="px-3 rounded-xl flex items-center justify-center transition-colors hover:opacity-85" style={{background:'var(--primary)',color:'#fff'}}><Plus size={14}/></button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Options"/>
            <div className="space-y-3">
              {[
                {k:'featured' as const, l:'Featured Post',   d:'Pin to top of listing'},
                {k:'comments' as const, l:'Allow Comments',  d:'Readers can comment'},
                {k:'notify'   as const, l:'Notify Subscribers',d:'Send email on publish'},
              ].map(o=>(
                <div key={o.k} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                  <div><p className="text-sm font-semibold" style={{color:'var(--foreground)'}}>{o.l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{o.d}</p></div>
                  <Toggle checked={form[o.k]} onChange={v=>setForm(f=>({...f,[o.k]:v}))} size="sm"/>
                </div>
              ))}
            </div>
          </Card>

          <Button className="w-full" onClick={()=>showToast('Post published!')}><Send size={14}/>Publish Post</Button>
        </div>
      </div>
    </>
  )
}
