'use client'
import { PageBanner, Button, Toggle, Select } from '@/components/ui'
import { SeoFields, type SeoData } from '@/components/ui/SeoFields'
import { Upload, Plus, X, Bold, Italic, List, Code, Check } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function AddProductPage() {
  const [status,  setStatus]  = useState(true)
  const [tags,    setTags]    = useState<string[]>(['Electronics', 'Featured'])
  const [tagInput,setTagIn]   = useState('')
  const [done,    setDone]    = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [errors,  setErrors]  = useState<Record<string,string>>({})
  const [seo,     setSeo]     = useState<SeoData>({ metaTitle:'', metaDesc:'', slug:'', keywords:'' })
  const [form,    setForm]    = useState({
    name:'', excerpt:'', price:'', salePrice:'',
    sku:'', stock:'0', stockStatus:'In Stock',
    category:'', status:'Published', visibility:'Public', weight:'',
  })

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) { setTags(ts => [...ts, t]); setTagIn('') }
  }

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim()) e.name = 'Product name is required'
    if (!form.price)       e.price = 'Price is required'
    else if (isNaN(+form.price) || +form.price < 0) e.price = 'Enter a valid price'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 1200))
    setSaving(false); setDone(true)
  }

  const handleDraft = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false); setDone(true)
  }

  const reset = () => {
    setDone(false)
    setForm({ name:'', excerpt:'', price:'', salePrice:'', sku:'', stock:'0', stockStatus:'In Stock', category:'', status:'Published', visibility:'Public', weight:'' })
    setTags([]); setErrors({}); setSeo({ metaTitle:'', metaDesc:'', slug:'', keywords:'' })
  }

  // Auto-fill slug from product name
  const handleNameChange = (val: string) => {
    setForm(f => ({ ...f, name: val }))
    if (errors.name) setErrors(e => ({ ...e, name:'' }))
    if (!seo.slug) {
      setSeo(s => ({ ...s, slug: val.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'') }))
    }
  }

  if (done) {
    return (
      <>
        <PageBanner title="Add Product" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Products',href:'/apps/ecommerce/list'},{label:'Add Product'}]}/>
        <div className="max-w-md mx-auto mt-10 card p-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background:'var(--success-light)'}}>
            <Check size={28} style={{color:'var(--success)'}}/>
          </div>
          <h2 className="text-xl font-black mb-2" style={{color:'var(--foreground)'}}>Product Created!</h2>
          <p className="text-sm mb-6" style={{color:'var(--muted)'}}>Your product has been saved successfully.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={reset}><Plus size={14}/>Add Another</Button>
            <Link href="/apps/ecommerce/list"><Button variant="outline">View Products</Button></Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageBanner title="Add Product" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Products',href:'/apps/ecommerce/list'},{label:'Add Product'}]}/>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* ── Main ── */}
        <div className="xl:col-span-2 space-y-5">
          {/* General */}
          <div className="card p-6 space-y-4">
            <h3 className="font-bold" style={{color:'var(--foreground)'}}>General Information</h3>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Product Name *</label>
              <input
                className={`field w-full ${errors.name ? 'border-[var(--error)]' : ''}`}
                placeholder="Product Name"
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
              />
              {errors.name && <p className="text-xs mt-1" style={{color:'var(--error)'}}>{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Short Description</label>
              <textarea className="field w-full resize-none" rows={2} placeholder="Brief product description..."
                value={form.excerpt} onChange={e=>setForm(f=>({...f,excerpt:e.target.value}))}/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Full Description</label>
              <div className="border rounded-xl overflow-hidden" style={{borderColor:'var(--border)'}}>
                <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
                  <div className="relative w-28">
                    <Select options={[{value:'Paragraph',label:'Paragraph'},{value:'H1',label:'H1'},{value:'H2',label:'H2'},{value:'H3',label:'H3'}]} value="Paragraph" onChange={()=>{}}/>
                  </div>
                  {[Bold,Italic,List,Code].map((Icon,i)=>(
                    <button key={i} type="button" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}><Icon size={14}/></button>
                  ))}
                </div>
                <div className="p-4 min-h-[160px] text-sm cursor-text" contentEditable suppressContentEditableWarning style={{color:'var(--muted)'}}>
                  Type product description here...
                </div>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="card p-6">
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Media</h3>
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-light)]" style={{borderColor:'var(--border)'}}>
              <Upload size={22} className="mb-2" style={{color:'var(--primary)'}}/>
              <p className="text-sm font-medium" style={{color:'var(--primary)'}}>Drag & drop or click to upload</p>
              <p className="text-xs mt-1" style={{color:'var(--muted)'}}>PNG, JPG, WEBP up to 10MB</p>
              <input type="file" className="hidden" multiple accept="image/*"/>
            </label>
          </div>

          {/* Pricing */}
          <div className="card p-6 space-y-4">
            <h3 className="font-bold" style={{color:'var(--foreground)'}}>Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Regular Price ($) *</label>
                <input type="number" className={`field w-full ${errors.price ? 'border-[var(--error)]' : ''}`} placeholder="0.00"
                  value={form.price} onChange={e=>{setForm(f=>({...f,price:e.target.value}));setErrors(er=>({...er,price:''}))}}/>
                {errors.price && <p className="text-xs mt-1" style={{color:'var(--error)'}}>{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Sale Price ($)</label>
                <input type="number" className="field w-full" placeholder="0.00"
                  value={form.salePrice} onChange={e=>setForm(f=>({...f,salePrice:e.target.value}))}/>
              </div>
            </div>
            {form.salePrice && form.price && +form.salePrice < +form.price && (
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{background:'var(--success-light)'}}>
                <Check size={14} style={{color:'var(--success)'}}/>
                <p className="text-xs" style={{color:'var(--success)'}}>
                  {Math.round((1 - +form.salePrice / +form.price)*100)}% discount applied
                </p>
              </div>
            )}
          </div>

          {/* Inventory */}
          <div className="card p-6 space-y-4">
            <h3 className="font-bold" style={{color:'var(--foreground)'}}>Inventory & Shipping</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>SKU</label>
                <input className="field w-full" placeholder="e.g. PROD-001" value={form.sku} onChange={e=>setForm(f=>({...f,sku:e.target.value}))}/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Stock Quantity</label>
                <input type="number" className="field w-full" placeholder="0" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))}/>
              </div>
            </div>
            <Select label="Stock Status" options={[{value:'In Stock',label:'In Stock'},{value:'Out of Stock',label:'Out of Stock'},{value:'On Backorder',label:'On Backorder'}]} value={form.stockStatus} onChange={v=>setForm(f=>({...f,stockStatus:v}))}/>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Weight (kg)</label>
              <input type="number" className="field w-full" placeholder="0.00" value={form.weight} onChange={e=>setForm(f=>({...f,weight:e.target.value}))}/>
            </div>
          </div>

          {/* SEO */}
          <SeoFields
            value={seo}
            onChange={setSeo}
            titlePlaceholder="e.g. Buy MacBook Air Pro — Best Price 2025"
            slugPlaceholder="macbook-air-pro"
          />

          {/* Actions */}
          <div className="flex gap-3">
            <Button loading={saving} onClick={handleSubmit}>
              {!saving && <Check size={14}/>}{saving ? 'Saving…' : 'Publish Product'}
            </Button>
            <Button variant="ghost" onClick={handleDraft} disabled={saving}>Save Draft</Button>
            <Button variant="outline" disabled={saving}>Preview</Button>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">
          {/* Thumbnail */}
          <div className="card p-5">
            <h3 className="font-bold text-sm mb-4" style={{color:'var(--foreground)'}}>Thumbnail</h3>
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-light)]" style={{borderColor:'var(--border)'}}>
              <Upload size={20} className="mb-2" style={{color:'var(--primary)'}}/>
              <p className="text-xs text-center font-medium px-4" style={{color:'var(--primary)'}}>Click to upload thumbnail</p>
              <input type="file" className="hidden" accept="image/png,image/jpg,image/jpeg"/>
            </label>
          </div>

          {/* Publish settings */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}>Publish Settings</h3>
              <Toggle checked={status} onChange={setStatus}/>
            </div>
            <Select label="Status" options={[{value:'Published',label:'Published'},{value:'Draft',label:'Draft'},{value:'Scheduled',label:'Scheduled'}]} value={form.status} onChange={v=>setForm(f=>({...f,status:v}))}/>
            <Select label="Visibility" options={[{value:'Public',label:'Public'},{value:'Private',label:'Private'},{value:'Password Protected',label:'Password Protected'}]} value={form.visibility} onChange={v=>setForm(f=>({...f,visibility:v}))}/>
          </div>

          {/* Product Details */}
          <div className="card p-5 space-y-4">
            <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}>Product Details</h3>
            <Select label="Category" options={[{value:'',label:'Select category'},{value:'Electronics',label:'Electronics'},{value:'Fashion',label:'Fashion'},{value:'Books',label:'Books'},{value:'Toys',label:'Toys'},{value:'Sports',label:'Sports'}]} value={form.category} onChange={v=>setForm(f=>({...f,category:v}))}/>
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
                <input value={tagInput} onChange={e=>setTagIn(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTag()}}} className="field flex-1 text-xs" placeholder="Add tag… (Enter)"/>
                <Button variant="outline" size="sm" onClick={addTag}><Plus size={12}/></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
