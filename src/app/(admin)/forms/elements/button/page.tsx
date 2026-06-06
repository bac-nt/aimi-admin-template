'use client'
import { PageBanner, Card, CardHeader, Button, Badge } from '@/components/ui'
import { useState } from 'react'
import { Download, Plus, Trash2, Edit, Check, X, ArrowRight, Star, Heart, Loader, Bell, Send, Upload, RefreshCw } from 'lucide-react'

export default function ButtonPage() {
  const [loading, setLoading] = useState(false)
  const [liked,   setLiked]   = useState(false)
  const [saved,   setSaved]   = useState(false)

  const simulateLoad = () => { setLoading(true); setTimeout(()=>setLoading(false),2000) }

  return (
    <>
      <PageBanner title="Button Variants" description="All button styles, sizes, states and icon combinations"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Button'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Variants"/>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Sizes"/>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="With Icons"/>
          <div className="flex flex-wrap gap-3">
            <Button><Plus size={14}/>Create New</Button>
            <Button variant="outline"><Download size={14}/>Download</Button>
            <Button variant="error"><Trash2 size={14}/>Delete</Button>
            <Button variant="success"><Check size={14}/>Approve</Button>
            <Button variant="secondary"><Upload size={14}/>Upload</Button>
            <Button>Next Step<ArrowRight size={14}/></Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="States"/>
          <div className="flex flex-wrap gap-3">
            <Button loading={loading} onClick={simulateLoad}><RefreshCw size={14}/>{loading?'Loading…':'Click to Load'}</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
            <Button
              variant={liked?'error':'outline'}
              onClick={()=>setLiked(v=>!v)}>
              <Heart size={14} fill={liked?'currentColor':'none'}/>{liked?'Liked':'Like'}
            </Button>
            <Button
              variant={saved?'success':'outline'}
              onClick={()=>setSaved(v=>!v)}>
              <Star size={14} fill={saved?'currentColor':'none'}/>{saved?'Saved':'Save'}
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Icon Only"/>
          <div className="flex flex-wrap gap-2">
            {[
              {Icon:Plus,     variant:'primary'   as const},
              {Icon:Edit,     variant:'outline'   as const},
              {Icon:Trash2,   variant:'error'     as const},
              {Icon:Download, variant:'secondary' as const},
              {Icon:Bell,     variant:'ghost'     as const},
              {Icon:Send,     variant:'success'   as const},
            ].map(({Icon,variant},i)=>(
              <button key={i} type="button"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-85 active:scale-95"
                style={{background:variant==='primary'?'var(--primary)':variant==='secondary'?'var(--secondary)':variant==='error'?'var(--error)':variant==='success'?'var(--success)':'var(--surface)',color:['outline','ghost'].includes(variant)?'var(--muted)':'#fff',border:variant==='outline'?'1px solid var(--border)':undefined}}>
                <Icon size={16}/>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Full Width & Groups"/>
          <div className="space-y-3">
            <Button className="w-full"><Send size={14}/>Send Message</Button>
            <Button variant="outline" className="w-full"><Upload size={14}/>Upload File</Button>
            <div className="flex">
              <button type="button" className="flex-1 py-2.5 text-sm font-semibold rounded-l-xl border border-r-0 hover:bg-[var(--surface)] transition-colors" style={{borderColor:'var(--border)',color:'var(--foreground)'}}>Cancel</button>
              <button type="button" className="flex-1 py-2.5 text-sm font-semibold rounded-r-xl text-white" style={{background:'var(--primary)'}}>Confirm</button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
