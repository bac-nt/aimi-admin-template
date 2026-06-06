'use client'
import { Alert, Badge, Button, Card, PageBanner, Progress } from '@/components/ui'
import { Download, Search, TrendingUp, Globe, AlertCircle, Check, ShoppingBag, Tag, Star } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const SEO_PRODUCTS = [
  { id:1, name:'MacBook Air Pro',    slug:'/products/macbook-air-pro',  score:91, issues:0, keyword:'macbook air pro 2025', impressions:24000, clicks:1440, ctr:6.0, position:3.2 },
  { id:2, name:'Stylish Headphones', slug:'/products/stylish-headphones',score:76, issues:2, keyword:'wireless headphones',  impressions:18000, clicks:720,  ctr:4.0, position:8.1 },
  { id:3, name:'Gaming Console',     slug:'/products/gaming-console',   score:58, issues:5, keyword:'gaming console deals', impressions:9200,  clicks:184,  ctr:2.0, position:14.3},
  { id:4, name:'Summer Dress',       slug:'/products/summer-dress',     score:85, issues:1, keyword:'summer dress women',   impressions:31000, clicks:1860, ctr:6.0, position:5.0 },
  { id:5, name:'Programming Bible',  slug:'/products/programming-bible',score:44, issues:7, keyword:'programming book',     impressions:5500,  clicks:110,  ctr:2.0, position:19.1},
]

const ISSUES_DATA = [
  { type:'error',   count:4, label:'Missing product meta descriptions', tip:'Each product needs unique meta desc 140-160 chars' },
  { type:'warning', count:6, label:'Product titles too short or generic', tip:'Include brand, model, and key features in title' },
  { type:'info',    count:12, label:'Product images missing alt text', tip:'Add descriptive alt text with target keywords' },
  { type:'warning', count:3, label:'Duplicate schema markup detected', tip:'Ensure each product has unique structured data' },
  { type:'error',   count:2, label:'Missing price in structured data', tip:'Add Price property to Product schema' },
]

const SCHEMA_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "...",
  "image": ["url1", "url2"],
  "brand": { "@type": "Brand", "name": "Brand" },
  "offers": {
    "@type": "Offer",
    "price": "99.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "89"
  }
}`

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? COLOR.success : score >= 60 ? COLOR.warning : COLOR.error
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border)" strokeWidth="3"/>
          <circle cx="18" cy="18" r="15" fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${(score/100)*94} 94`} strokeLinecap="round"/>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black" style={{color}}>{score}</span>
      </div>
      <span className="text-xs font-semibold" style={{color}}>{score>=80?'Good':score>=60?'Fair':'Poor'}</span>
    </div>
  )
}

export default function EcommerceSEOPage() {
  const [tab, setTab] = useState<'overview'|'products'|'issues'|'schema'>('overview')
  const avgScore = Math.round(SEO_PRODUCTS.reduce((a,p)=>a+p.score,0)/SEO_PRODUCTS.length)
  const totalClicks = SEO_PRODUCTS.reduce((a,p)=>a+p.clicks,0)
  const totalImpressions = SEO_PRODUCTS.reduce((a,p)=>a+p.impressions,0)
  const avgCTR = (totalClicks/totalImpressions*100).toFixed(1)

  return (
    <>
      <PageBanner title="Ecommerce SEO" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'SEO'}]} description="Optimize product pages for search engines"
        action={<Button variant="outline"><Download size={14}/>Export Report</Button>}/>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 animate-fade-up">
        {[
          {l:'Avg SEO Score', v:`${avgScore}/100`, c:avgScore>=80?COLOR.success:COLOR.warning},
          {l:'Total Clicks',  v:totalClicks.toLocaleString('en-US'), c:COLOR.primary},
          {l:'Impressions',   v:`${(totalImpressions/1000).toFixed(0)}K`, c:COLOR.secondary},
          {l:'Avg CTR',       v:`${avgCTR}%`, c:COLOR.success},
        ].map(s=>(
          <Card key={s.l}><p className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      <div className="flex gap-1.5 mb-5">
        {(['overview','products','issues','schema'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize" style={tab===t?{background:'var(--primary)',color:'white'}:{background:'var(--surface)',color:'var(--muted)'}}>{t}</button>
        ))}
      </div>

      {tab==='overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>SEO Checklist</h3>
            <div className="space-y-3">
              {[
                {label:'Product structured data (JSON-LD)', done:true},
                {label:'Canonical URLs on all product pages', done:true},
                {label:'Open Graph tags for social sharing', done:true},
                {label:'Breadcrumb schema markup', done:true},
                {label:'Meta robots on out-of-stock pages', done:false},
                {label:'Faceted navigation handling (noindex)', done:false},
                {label:'Paginated category pages (rel=next/prev)', done:false},
                {label:'Hreflang for international versions', done:false},
              ].map((item,i)=>(
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{background:'var(--surface)'}}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{background:item.done?'var(--success)':'var(--border)'}}>
                    {item.done && <Check size={12} className="text-white"/>}
                  </div>
                  <span className={`text-sm flex-1 ${item.done?'':'opacity-60'}`} style={{color:'var(--foreground)'}}>{item.label}</span>
                  {!item.done && <Badge variant="warning">Fix</Badge>}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Top Performing Products</h3>
            <div className="space-y-3">
              {[...SEO_PRODUCTS].sort((a,b)=>b.clicks-a.clicks).slice(0,5).map((p,i)=>(
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-xs font-black w-5" style={{color:'var(--muted)'}}>{i+1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{color:'var(--foreground)'}}>{p.name}</p>
                    <div className="flex gap-3 text-xs" style={{color:'var(--muted)'}}>
                      <span>{p.clicks.toLocaleString('en-US')} clicks</span>
                      <span>Pos: {p.position}</span>
                    </div>
                  </div>
                  <ScoreBadge score={p.score}/>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab==='products' && (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
                {['Product','Target Keyword','SEO Score','Impressions','Clicks','CTR','Avg Position','Issues'].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{SEO_PRODUCTS.map(p=>(
                <tr key={p.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <td className="px-5 py-3.5 max-w-[180px]">
                    <p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{p.name}</p>
                    <p className="text-xs truncate" style={{color:'var(--muted)'}}>{p.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs max-w-[160px]" style={{color:'var(--muted)'}}>{p.keyword}</td>
                  <td className="px-5 py-3.5"><ScoreBadge score={p.score}/></td>
                  <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{p.impressions.toLocaleString('en-US')}</td>
                  <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{p.clicks.toLocaleString('en-US')}</td>
                  <td className="px-5 py-3.5"><span className="font-bold" style={{color:p.ctr>=5?COLOR.success:p.ctr>=3?COLOR.warning:COLOR.error}}>{p.ctr}%</span></td>
                  <td className="px-5 py-3.5"><span className="font-bold" style={{color:p.position<=5?COLOR.success:p.position<=10?COLOR.warning:COLOR.error}}>{p.position}</span></td>
                  <td className="px-5 py-3.5">
                    {p.issues===0?<Badge variant="success">Clean</Badge>:<Badge variant={p.issues>=5?'error':'warning'}>{p.issues} issues</Badge>}
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Card>
      )}

      {tab==='issues' && (
        <div className="space-y-4">
          {ISSUES_DATA.map((issue,i)=>(
            <Card key={i}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`var(--${issue.type==='error'?'error':issue.type==='warning'?'warning':'secondary'}-light)`}}>
                  <AlertCircle size={18} style={{color:`var(--${issue.type==='error'?'error':issue.type==='warning'?'warning':'secondary'})`}}/>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={issue.type==='error'?'error':issue.type==='warning'?'warning':'secondary'}>{issue.count} products</Badge>
                    <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{issue.label}</p>
                  </div>
                  <p className="text-xs" style={{color:'var(--muted)'}}>{issue.tip}</p>
                </div>
                <Button size="sm" variant="outline">Fix Now</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab==='schema' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <h3 className="font-bold mb-2" style={{color:'var(--foreground)'}}>Product Schema Template</h3>
            <p className="text-xs mb-3" style={{color:'var(--muted)'}}>Add this JSON-LD to your product pages for rich results in Google Search.</p>
            <div className="rounded-xl p-4 overflow-x-auto" style={{background:'var(--surface)'}}>
              <pre className="text-xs font-mono" style={{color:'var(--foreground)'}}>{SCHEMA_TEMPLATE}</pre>
            </div>
            <Button className="mt-4" size="sm" variant="outline">Copy Template</Button>
          </Card>
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Schema Coverage</h3>
            <div className="space-y-4">
              {[
                {l:'Product Schema',        pct:80, c:COLOR.success},
                {l:'BreadcrumbList Schema', pct:95, c:COLOR.success},
                {l:'AggregateRating',       pct:60, c:COLOR.warning},
                {l:'Offer / Price',         pct:75, c:COLOR.warning},
                {l:'Review Schema',         pct:30, c:COLOR.error},
              ].map(s=>(
                <div key={s.l}>
                  <div className="flex justify-between text-xs mb-1.5"><span style={{color:'var(--foreground)'}}>{s.l}</span><span className="font-bold" style={{color:s.c}}>{s.pct}%</span></div>
                  <Progress value={s.pct} color={s.c}/>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
