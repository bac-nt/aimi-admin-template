'use client'
import { PageBanner, Button, Toggle, Select } from '@/components/ui'
import { SeoFields, type SeoData } from '@/components/ui/SeoFields'
import { Bold, Italic, List, Image, Link2, Code, AlignLeft, AlignCenter, AlignRight, Plus, X, Upload, Check } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const TOOLBAR = [
  [Bold, Italic, Code],
  [AlignLeft, AlignCenter, AlignRight],
  [List, Link2, Image],
]

export default function BlogCreatePage() {
  const [tags,    setTags]   = useState(['Next.js', 'React'])
  const [tagInput,setTag]    = useState('')
  const [sticky,  setSticky] = useState(false)
  const [saving,  setSaving] = useState(false)
  const [done,    setDone]   = useState(false)
  const [errors,  setErrors] = useState<Record<string,string>>({})
  const [seo,     setSeo]    = useState<SeoData>({ metaTitle:'', metaDesc:'', slug:'', keywords:'' })
  const [form,    setForm]   = useState({
    title:'', excerpt:'', category:'Development',
    status:'Published', visibility:'Public', sticky:false,
  })

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) { setTags(ts => [...ts, t]); setTag('') }
  }

  // Auto-fill SEO slug from title
  const handleTitleChange = (val: string) => {
    setForm(f => ({ ...f, title: val }))
    if (errors.title) setErrors(e => ({ ...e, title:'' }))
    setSeo(s => ({
      ...s,
      slug: s.slug || val.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''),
      metaTitle: s.metaTitle || val,
    }))
  }

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.title.trim()) e.title = 'Post title is required'
    return e
  }

  const publish = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 1200))
    setSaving(false); setDone(true)
  }

  const saveDraft = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false); setDone(true)
  }

  const reset = () => {
    setDone(false)
    setForm({ title:'', excerpt:'', category:'Development', status:'Published', visibility:'Public', sticky:false })
    setTags([]); setErrors({}); setSeo({ metaTitle:'', metaDesc:'', slug:'', keywords:'' })
  }

  if (done) {
    return (
      <>
        <PageBanner title="Create Post" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'Posts',href:'/apps/blog/posts'},{label:'Create'}]}/>
        <div className="max-w-md mx-auto mt-10 card p-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background:'var(--success-light)'}}>
            <Check size={28} style={{color:'var(--success)'}}/>
          </div>
          <h2 className="text-xl font-black mb-2" style={{color:'var(--foreground)'}}>Post Published!</h2>
          <p className="text-sm mb-6" style={{color:'var(--muted)'}}>Your post has been published successfully.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={reset}><Plus size={14}/>New Post</Button>
            <Link href="/apps/blog/posts"><Button variant="outline">View Posts</Button></Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageBanner title="Create Post" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'Posts',href:'/apps/blog/posts'},{label:'Create'}]}/>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* ── Main ── */}
        <div className="xl:col-span-2 space-y-5">
          <div className="card p-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Post Title *</label>
              <input
                className={`field w-full text-lg font-semibold ${errors.title ? 'border-[var(--error)]' : ''}`}
                placeholder="Enter your post title…"
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
              />
              {errors.title && <p className="text-xs mt-1" style={{color:'var(--error)'}}>{errors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Excerpt</label>
              <textarea className="field w-full resize-none" rows={2} placeholder="Short description shown in listings…"
                value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))}/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Content</label>
              <div className="border rounded-xl overflow-hidden" style={{borderColor:'var(--border)'}}>
                <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
                  <div className="relative w-28">
                    <Select options={[{value:'Paragraph',label:'Paragraph'},{value:'H1',label:'H1'},{value:'H2',label:'H2'}]} value="Paragraph" onChange={()=>{}}/>
                  </div>
                  {TOOLBAR.map((group,gi)=>(
                    <div key={gi} className="flex gap-0.5 mr-1.5">
                      {group.map((Icon,i)=>(
                        <button key={i} type="button" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--primary-light)] hover:text-[var(--primary)]" style={{color:'var(--muted)'}}><Icon size={14}/></button>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="p-5 min-h-[280px] text-sm cursor-text" contentEditable suppressContentEditableWarning style={{color:'var(--muted)'}}>
                  Start writing your post content here…
                </div>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="card p-5">
            <h3 className="font-bold text-sm mb-4" style={{color:'var(--foreground)'}}>Featured Image</h3>
            <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-light)]" style={{borderColor:'var(--border)'}}>
              <Upload size={22} className="mb-2" style={{color:'var(--primary)'}}/>
              <p className="text-sm font-medium" style={{color:'var(--primary)'}}>Click to upload or drag & drop</p>
              <p className="text-xs mt-1" style={{color:'var(--muted)'}}>PNG, JPG up to 10MB</p>
              <input type="file" className="hidden" accept="image/*"/>
            </label>
          </div>

          {/* SEO */}
          <SeoFields
            value={seo}
            onChange={setSeo}
            titlePlaceholder="e.g. Getting Started with Next.js 15 — Complete Guide"
            slugPlaceholder="getting-started-nextjs-15"
          />

          <div className="flex gap-3">
            <Button loading={saving} onClick={publish}>
              {!saving && <Check size={14}/>}{saving ? 'Publishing…' : 'Publish Post'}
            </Button>
            <Button variant="ghost" onClick={saveDraft} disabled={saving}>Save Draft</Button>
            <Button variant="outline" disabled={saving}>Preview</Button>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}>Publish Settings</h3>
            <Select label="Status" options={[{value:'Published',label:'Published'},{value:'Draft',label:'Draft'},{value:'Scheduled',label:'Scheduled'}]} value={form.status} onChange={v=>setForm(f=>({...f,status:v}))}/>
            <Select label="Visibility" options={[{value:'Public',label:'Public'},{value:'Private',label:'Private'},{value:'Password Protected',label:'Password Protected'}]} value={form.visibility} onChange={v=>setForm(f=>({...f,visibility:v}))}/>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>Sticky Post</span>
              <Toggle checked={sticky} onChange={setSticky}/>
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}>Category & Tags</h3>
            <Select label="Category" options={[{value:'Development',label:'Development'},{value:'Design',label:'Design'},{value:'DevOps',label:'DevOps'},{value:'Tutorial',label:'Tutorial'}]} value={form.category} onChange={v=>setForm(f=>({...f,category:v}))}/>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color:'var(--foreground)'}}>Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map(tg=>(
                  <span key={tg} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>
                    {tg}<button type="button" onClick={()=>setTags(ts=>ts.filter(x=>x!==tg))}><X size={9}/></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={tagInput} onChange={e=>setTag(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTag()}}} className="field flex-1 text-xs" placeholder="Add tag…"/>
                <Button variant="outline" size="sm" onClick={addTag}><Plus size={12}/></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
