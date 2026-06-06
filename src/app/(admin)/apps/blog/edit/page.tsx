'use client'
import { PageBanner, Button, Badge, Toggle, Select } from '@/components/ui'
import { SeoFields, type SeoData } from '@/components/ui/SeoFields'
import { Bold, Italic, List, Image, Link2, Code, Plus, X, Upload, Check } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function BlogEditPage() {
  const [tags,   setTags]   = useState(['Next.js','React','TypeScript'])
  const [tagIn,  setTagIn]  = useState('')
  const [sticky, setSticky] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [seo,    setSeo]    = useState<SeoData>({
    metaTitle: 'Getting Started with Next.js 15 — Complete Guide',
    metaDesc:  'A comprehensive guide covering Next.js 15 App Router, Server Components, and Turbopack.',
    slug:      'getting-started-nextjs-15',
    keywords:  'nextjs 15 tutorial',
  })

  const addTag = () => {
    const t = tagIn.trim()
    if (t && !tags.includes(t)) { setTags(ts => [...ts, t]); setTagIn('') }
  }

  const handleUpdate = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1200))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <>
      {/* Toast */}
      {saved && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold animate-fade-up shadow-lg" style={{background:'var(--success)'}}>
          <Check size={16}/>Post updated successfully
        </div>
      )}

      <PageBanner title="Edit Post" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'Posts',href:'/apps/blog/posts'},{label:'Edit'}]}
        action={<div className="flex gap-2"
        description="Edit and update existing blog posts"><Button variant="outline">Preview</Button><Button loading={saving} onClick={()=>{setSaving(true);setTimeout(()=>{setSaving(false);setSaved(true)},1000)}}><Check size={14}/>Update Post</Button></div>}/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold" style={{color:'var(--foreground)'}}>Post Content</h3>
              <Badge variant="warning">Draft</Badge>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Title *</label>
              <input className="field w-full text-base font-semibold" defaultValue="Getting Started with Next.js 15 — Complete Guide"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Excerpt</label>
              <textarea className="field w-full resize-none" rows={2} defaultValue="A comprehensive guide covering Next.js 15 App Router, Server Components, and Turbopack."/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Content</label>
              <div className="border rounded-xl overflow-hidden" style={{borderColor:'var(--border)'}}>
                <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
                  <div className="relative w-28">
                    <Select options={[{value:'Paragraph',label:'Paragraph'},{value:'H1',label:'H1'},{value:'H2',label:'H2'}]} value="Paragraph" onChange={()=>{}}/>
                  </div>
                  {[Bold,Italic,Code,List,Link2,Image].map((Icon,i)=>(
                    <button key={i} type="button" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}><Icon size={14}/></button>
                  ))}
                </div>
                <div className="p-5 min-h-[240px] text-sm cursor-text" contentEditable suppressContentEditableWarning style={{color:'var(--foreground)'}}>
                  <p>Next.js 15 brings significant improvements with enhanced performance. This guide covers everything you need to know…</p>
                  <p className="mt-3">The new Turbopack bundler delivers up to 700% faster local server startup and 10x faster HMR.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="card p-5">
            <h3 className="font-bold text-sm mb-3" style={{color:'var(--foreground)'}}>Featured Image</h3>
            <div className="relative rounded-xl overflow-hidden" style={{height:180,background:'var(--surface)'}}>
              <div className="w-full h-full flex items-center justify-center" style={{background:'linear-gradient(135deg,var(--primary-light),var(--secondary-light))'}}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm font-medium" style={{color:'var(--muted)'}}>blog-cover.jpg</p>
                </div>
              </div>
              <label className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer" style={{background:'rgba(0,0,0,0.4)'}}>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-white border border-white/50 text-sm font-semibold">
                  <Upload size={14}/>Change Image
                </div>
                <input type="file" className="hidden" accept="image/*"/>
              </label>
            </div>
          </div>

          {/* SEO - pre-filled, open by default */}
          <SeoFields
            value={seo}
            onChange={setSeo}
            defaultOpen={true}
            titlePlaceholder="SEO title…"
            slugPlaceholder="post-url-slug"
          />

          <div className="flex gap-3">
            <Button loading={saving} onClick={()=>{setSaving(true);setTimeout(()=>{setSaving(false);setSaved(true)},1000)}}>
              {!saving && <Check size={14}/>}{saving ? 'Updating…' : 'Update Post'}
            </Button>
            <Button variant="ghost" disabled={saving}>Save Draft</Button>
            <Button variant="outline" disabled={saving}>Preview</Button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}>Settings</h3>
            <Select label="Status" options={[{value:'Published',label:'Published'},{value:'Draft',label:'Draft'},{value:'Scheduled',label:'Scheduled'}]} value="Published" onChange={()=>{}}/>
            <Select label="Category" options={[{value:'Development',label:'Development'},{value:'Design',label:'Design'},{value:'DevOps',label:'DevOps'}]} value="Development" onChange={()=>{}}/>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>Sticky</span>
              <Toggle checked={sticky} onChange={setSticky} size="sm"/>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-sm mb-3" style={{color:'var(--foreground)'}}>Tags</h3>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map(tg=>(
                <span key={tg} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>
                  {tg}<button type="button" onClick={()=>setTags(ts=>ts.filter(x=>x!==tg))}><X size={9}/></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagIn} onChange={e=>setTagIn(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTag()}}} className="field flex-1 text-xs" placeholder="Add tag…"/>
              <Button variant="outline" size="sm" onClick={addTag}><Plus size={12}/></Button>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-sm mb-3" style={{color:'var(--foreground)'}}>Post Stats</h3>
            {[{l:'Views',v:'4,218'},{l:'Likes',v:'128'},{l:'Comments',v:'24'},{l:'Published',v:'Jan 15, 2025'}].map(s=>(
              <div key={s.l} className="flex justify-between text-sm py-1.5 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                <span style={{color:'var(--muted)'}}>{s.l}</span>
                <span className="font-semibold" style={{color:'var(--foreground)'}}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
