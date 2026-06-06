'use client'
import { PageBanner, Card, Badge, Button, Input, Toggle } from '@/components/ui'
import { Search, Plus, Check, ExternalLink, Settings, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const INTEGRATIONS = [
  { id:'stripe',   name:'Stripe',     cat:'Payments',   desc:'Accept payments online with the most popular payment gateway.', color:'#6772e5', connected:true,  logo:'💳' },
  { id:'slack',    name:'Slack',      cat:'Messaging',  desc:'Send notifications and alerts directly to your Slack channels.', color:'#4a154b', connected:true,  logo:'💬' },
  { id:'github',   name:'GitHub',     cat:'DevOps',     desc:'Sync your repositories and track issues from the dashboard.',    color:'#24292e', connected:false, logo:'🐙' },
  { id:'aws',      name:'AWS S3',     cat:'Storage',    desc:'Store and retrieve any amount of data from anywhere on the web.',color:'#ff9900', connected:true,  logo:'☁️' },
  { id:'google',   name:'Google Analytics',cat:'Analytics',desc:'Track website traffic and user behavior with GA4.',           color:'#e37400', connected:false, logo:'📊' },
  { id:'zapier',   name:'Zapier',     cat:'Automation', desc:'Automate workflows between your favorite apps and services.',    color:'#ff4a00', connected:false, logo:'⚡' },
  { id:'twilio',   name:'Twilio',     cat:'SMS',        desc:'Send SMS notifications and implement two-factor authentication.', color:'#f22f46', connected:false, logo:'📱' },
  { id:'sendgrid', name:'SendGrid',   cat:'Email',      desc:'Reliable email delivery at scale for transactional emails.',     color:'#1a82e2', connected:true,  logo:'📧' },
  { id:'typeform', name:'Typeform',   cat:'Forms',      desc:'Create beautiful forms, surveys and quizzes.',                   color:'#262627', connected:false, logo:'📝' },
]
const CATS = ['All','Payments','Messaging','DevOps','Storage','Analytics','Automation','SMS','Email','Forms']

export default function IntegrationsPage() {
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('All')
  const [data, setData]       = useState(INTEGRATIONS)
  const [selected, setSelected] = useState<typeof INTEGRATIONS[0]|null>(null)

  const toggle = (id: string) => setData(d=>d.map(i=>i.id===id?{...i,connected:!i.connected}:i))
  const filtered = data.filter(i=>{
    const ms = i.name.toLowerCase().includes(search.toLowerCase())
    const mc = cat==='All'||i.cat===cat
    return ms&&mc
  })
  const connected = data.filter(i=>i.connected).length
  return (
    <>
      <PageBanner title="Integrations" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Integrations'}]} description={`${connected} of ${data.length} integrations connected`}/>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[{l:'Connected',v:connected,c:COLOR.success},{l:'Available',v:data.length,c:COLOR.primary},{l:'Categories',v:CATS.length-1,c:COLOR.secondary},{l:'API Calls Today',v:'14.2k',c:COLOR.warning}].map(s=>(
          <Card key={s.l}><p className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <Input placeholder="Search integrations..." startIcon={<Search size={14}/>} value={search} onChange={e=>setSearch(e.target.value)} className="w-56"/>
        <div className="flex gap-1.5 flex-wrap">
          {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={cat===c?{background:'var(--primary)',color:'white'}:{background:'var(--surface)',color:'var(--muted)'}}>{c}</button>)}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(int=>(
          <div key={int.id} className="card hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:int.color+'22'}}>{int.logo}</div>
                <div>
                  <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{int.name}</p>
                  <Badge variant="muted" className="text-[9px]">{int.cat}</Badge>
                </div>
              </div>
              <Toggle checked={int.connected} onChange={()=>toggle(int.id)} size="sm"/>
            </div>
            <p className="text-xs mb-3 line-clamp-2" style={{color:'var(--muted)'}}>{int.desc}</p>
            <div className="flex items-center gap-2">
              {int.connected
                ? <Badge variant="success" dot>Connected</Badge>
                : <Badge variant="muted" dot>Not connected</Badge>
              }
              <div className="flex gap-1 ml-auto">
                <button onClick={()=>setSelected(int)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}><Settings size={13}/></button>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}><ExternalLink size={13}/></button>
              </div>
            </div>
          </div>
        ))}
        {/* Add new */}
        <button className="card border-2 border-dashed flex flex-col items-center justify-center py-8 gap-2 transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-light)] group" style={{borderColor:'var(--border)'}}>
          <Plus size={28} className="group-hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}/>
          <p className="text-sm font-medium group-hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}>Request Integration</p>
        </button>
      </div>

      {/* Settings modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={()=>setSelected(null)}>
          <div className="card w-full max-w-md animate-fade-up" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{borderColor:'var(--border)'}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:selected.color+'22'}}>{selected.logo}</div>
              <div><p className="font-bold" style={{color:'var(--foreground)'}}>{selected.name} Settings</p><p className="text-xs" style={{color:'var(--muted)'}}>Configure your integration</p></div>
            </div>
            <div className="space-y-4">
              <Input label="API Key" type="password" placeholder="sk_live_••••••••••••" defaultValue="sk_live_test_key"/>
              <Input label="Webhook URL" placeholder="https://your-app.com/webhook" defaultValue="https://modernize.dev/webhooks/stripe"/>
              <div className="flex items-center justify-between"><span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>Enable webhook</span><Toggle checked={selected.connected} onChange={()=>toggle(selected.id)}/></div>
            </div>
            <div className="flex gap-2 mt-5"><Button><Check size={14}/>Save Changes</Button><Button variant="ghost" onClick={()=>setSelected(null)}>Cancel</Button></div>
          </div>
        </div>
      )}
    </>
  )
}
