'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Toggle } from '@/components/ui'
import { Globe, Eye, Smartphone, Monitor, Settings, Palette, Layout, Star, ShoppingCart, Search, Bell, User, Check } from 'lucide-react'
import { formatCurrency } from '@/lib/data'
import { PRODUCTS } from '@/lib/data'

const THEMES = [
  { id:'modern',  name:'Modern',   desc:'Clean minimal design',        primary:'#5d87ff', preview:'bg-gradient-to-br from-blue-50 to-indigo-100' },
  { id:'bold',    name:'Bold',     desc:'High contrast, strong type',  primary:'#1a1a2e', preview:'bg-gradient-to-br from-gray-900 to-gray-800'   },
  { id:'nature',  name:'Nature',   desc:'Earthy tones, organic feel',  primary:'#2d6a4f', preview:'bg-gradient-to-br from-green-50 to-emerald-100' },
  { id:'luxury',  name:'Luxury',   desc:'Premium gold accents',        primary:'#b45309', preview:'bg-gradient-to-br from-amber-50 to-yellow-100'  },
]

const LAYOUTS = ['2 columns','3 columns','4 columns','Masonry']

export default function ShopPage() {
  const [device,    setDevice]    = useState<'desktop'|'mobile'>('desktop')
  const [theme,     setTheme]     = useState('modern')
  const [layout,    setLayout]    = useState('3 columns')
  const [showFilters,setFilters]  = useState(true)
  const [showRatings,setRatings]  = useState(true)
  const [showPrices, setPrices]   = useState(true)
  const [toast,     setToast]     = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }
  const activeTheme = THEMES.find(t=>t.id===theme)||THEMES[0]

  return (
    <>
      <PageBanner title="Shop Configuration" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Shop'}]}
        description="Customize your storefront appearance and layout"
        action={<Button onClick={()=>showToast('Shop settings saved!')}><Check size={14}/>Save Changes</Button>}/>

      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Settings panel */}
        <div className="xl:col-span-1 space-y-4">
          {/* Theme */}
          <Card>
            <div className="flex items-center gap-2 mb-4"><Palette size={16} style={{color:'var(--primary)'}}/><h3 className="font-bold" style={{color:'var(--foreground)'}}>Theme</h3></div>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map(t=>(
                <button key={t.id} type="button" onClick={()=>setTheme(t.id)}
                  className={`rounded-xl border-2 overflow-hidden text-left transition-all hover:shadow-md ${theme===t.id?'border-[var(--primary)] shadow-md':'border-[var(--border)]'}`}>
                  <div className={`h-12 ${t.preview}`} style={{background:t.primary+'22'}}/>
                  <div className="p-2"><p className="font-bold text-xs" style={{color:'var(--foreground)'}}>{t.name}</p><p className="text-[10px]" style={{color:'var(--muted)'}}>{t.desc}</p></div>
                </button>
              ))}
            </div>
          </Card>

          {/* Layout */}
          <Card>
            <div className="flex items-center gap-2 mb-4"><Layout size={16} style={{color:'var(--primary)'}}/><h3 className="font-bold" style={{color:'var(--foreground)'}}>Product Grid</h3></div>
            <div className="grid grid-cols-2 gap-2">
              {LAYOUTS.map(l=>(
                <button key={l} type="button" onClick={()=>setLayout(l)}
                  className="py-2 px-3 rounded-xl border-2 text-xs font-semibold text-left transition-all"
                  style={layout===l?{borderColor:'var(--primary)',background:'var(--primary-light)',color:'var(--primary)'}:{borderColor:'var(--border)',color:'var(--muted)'}}>
                  {l}
                </button>
              ))}
            </div>
          </Card>

          {/* Display options */}
          <Card>
            <div className="flex items-center gap-2 mb-4"><Settings size={16} style={{color:'var(--primary)'}}/><h3 className="font-bold" style={{color:'var(--foreground)'}}>Display Options</h3></div>
            <div className="space-y-3">
              {[
                {l:'Show filter sidebar', v:showFilters,  fn:setFilters },
                {l:'Show star ratings',   v:showRatings,  fn:setRatings },
                {l:'Show prices',         v:showPrices,   fn:setPrices  },
              ].map((opt,i)=>(
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                  <span className="text-sm font-medium" style={{color:'var(--foreground)'}}>{opt.l}</span>
                  <Toggle checked={opt.v} onChange={opt.fn} size="sm"/>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <Card>
            <h3 className="font-bold mb-3" style={{color:'var(--foreground)'}}>Shop Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[{l:'Products',v:PRODUCTS.length},{l:'Active',v:PRODUCTS.filter(p=>p.status==='Active').length},{l:'Categories',v:5},{l:'Avg Rating',v:'4.5★'}].map(s=>(
                <div key={s.l} className="p-3 rounded-xl text-center" style={{background:'var(--surface)'}}>
                  <p className="text-lg font-black" style={{color:'var(--primary)'}}>{s.v}</p>
                  <p className="text-xs" style={{color:'var(--muted)'}}>{s.l}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div className="xl:col-span-2">
          <Card padding={false}>
            <div className="flex items-center justify-between p-4 border-b" style={{borderColor:'var(--border)'}}>
              <h3 className="font-bold" style={{color:'var(--foreground)'}}>Live Preview</h3>
              <div className="flex gap-1 p-1 rounded-xl" style={{background:'var(--surface)'}}>
                <button type="button" onClick={()=>setDevice('desktop')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={device==='desktop'?{background:'var(--primary)',color:'#fff'}:{color:'var(--muted)'}}><Monitor size={13}/>Desktop</button>
                <button type="button" onClick={()=>setDevice('mobile')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={device==='mobile'?{background:'var(--primary)',color:'#fff'}:{color:'var(--muted)'}}><Smartphone size={13}/>Mobile</button>
              </div>
            </div>

            {/* Storefront mockup */}
            <div className="p-4">
              <div className={`border rounded-2xl overflow-hidden transition-all ${device==='mobile'?'max-w-sm mx-auto':''}`} style={{borderColor:'var(--border)'}}>
                {/* Nav bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{background:activeTheme.primary,borderColor:'transparent'}}>
                  <span className="font-black text-white text-sm">Shop</span>
                  <div className="flex gap-3">
                    <Search size={15} className="text-white opacity-80"/>
                    <ShoppingCart size={15} className="text-white opacity-80"/>
                    <User size={15} className="text-white opacity-80"/>
                  </div>
                </div>

                <div className="flex" style={{background:'var(--surface)'}}>
                  {/* Sidebar filters */}
                  {showFilters && device==='desktop' && (
                    <div className="w-40 flex-shrink-0 p-3 border-r" style={{borderColor:'var(--border)',background:'var(--card)'}}>
                      <p className="text-[10px] font-bold uppercase mb-2" style={{color:'var(--muted)'}}>Category</p>
                      {['All','Electronics','Footwear','Clothing','Accessories'].map(c=>(
                        <div key={c} className="py-1 text-xs" style={{color:c==='All'?activeTheme.primary:'var(--muted)'}}>{c}</div>
                      ))}
                      <p className="text-[10px] font-bold uppercase mt-3 mb-2" style={{color:'var(--muted)'}}>Price</p>
                      <div className="h-1.5 rounded-full" style={{background:activeTheme.primary+'40'}}><div className="h-full w-3/4 rounded-full" style={{background:activeTheme.primary}}/></div>
                    </div>
                  )}

                  {/* Product grid */}
                  <div className={`flex-1 p-3 grid gap-2 ${device==='mobile'||layout==='2 columns'?'grid-cols-2':layout==='4 columns'?'grid-cols-3':'grid-cols-3'}`}>
                    {PRODUCTS.slice(0,device==='mobile'?4:6).map(p=>(
                      <div key={p.id} className="rounded-xl overflow-hidden border" style={{borderColor:'var(--border)',background:'var(--card)'}}>
                        <div className="h-20 overflow-hidden" style={{background:'var(--surface)'}}>
                          <img src={p.img} alt={p.name} className="w-full h-full object-cover"/>
                        </div>
                        <div className="p-2">
                          <p className="text-[10px] font-semibold truncate" style={{color:'var(--foreground)'}}>{p.name}</p>
                          {showRatings && <div className="text-[10px]" style={{color:'var(--warning)'}}>{'★'.repeat(Math.round(p.rating))}</div>}
                          {showPrices  && <p className="text-[10px] font-black mt-0.5" style={{color:activeTheme.primary}}>{formatCurrency(p.price)}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
