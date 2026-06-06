'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Modal, Input, Select } from '@/components/ui'
import { Key, Plus, Eye, EyeOff, Copy, Trash2, RefreshCw, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

interface ApiKey { id:number; name:string; key:string; prefix:string; scope:string; lastUsed:string; created:string; status:'Active'|'Revoked'; calls:number }

const SCOPES = ['Full Access','Read Only','Write Only','Webhooks','Analytics','Custom']

const INIT_KEYS: ApiKey[] = [
  { id:1, name:'Production API',    key:'sk_live_xKj9mP3qR7nL2vS5wD8yF1',  prefix:'sk_live_',   scope:'Full Access', lastUsed:'2 min ago',   created:'Jan 15, 2025', status:'Active', calls:48291 },
  { id:2, name:'Development API',   key:'sk_test_aB4cE6fG8hI0jK2lM4nO6',  prefix:'sk_test_',   scope:'Full Access', lastUsed:'1 hr ago',    created:'Feb 3, 2025',  status:'Active', calls:12045 },
  { id:3, name:'Analytics Service', key:'sk_anlt_pQ9rS1tU3vW5xY7zA9bC1',  prefix:'sk_anlt_',   scope:'Analytics',   lastUsed:'Yesterday',   created:'Mar 1, 2025',  status:'Active', calls:3821  },
  { id:4, name:'Webhook Endpoint',  key:'sk_hook_dE2fG4hI6jK8lM0nO2pQ4',  prefix:'sk_hook_',   scope:'Webhooks',    lastUsed:'Mar 10, 2025',created:'Mar 10, 2025', status:'Revoked',calls:284   },
]

export default function ApiKeysPage() {
  const [keys,    setKeys]    = useState(INIT_KEYS)
  const [modal,   setModal]   = useState(false)
  const [shown,   setShown]   = useState<number[]>([])
  const [copied,  setCopied]  = useState<number|null>(null)
  const [toast,   setToast]   = useState<string|null>(null)
  const [form,    setForm]    = useState({name:'',scope:'Read Only'})
  const [newKey,  setNewKey]  = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const toggle = (id:number) => setShown(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id])

  const copy = (id:number, key:string) => {
    navigator.clipboard?.writeText(key).catch(()=>{})
    setCopied(id); setTimeout(()=>setCopied(null),2000)
    showToast('API key copied to clipboard!')
  }

  const generate = () => {
    if (!form.name.trim()) return
    const prefix = `sk_${form.scope.toLowerCase().replace(/\s+/g,'_').slice(0,4)}_`
    const key    = prefix + Array.from({length:24},()=>'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random()*62)]).join('')
    const newEntry: ApiKey = { id:Date.now(), name:form.name, key, prefix, scope:form.scope, lastUsed:'Never', created:'Just now', status:'Active', calls:0 }
    setKeys(ks=>[...ks,newEntry])
    setNewKey(key)
    setModal(false)
    showToast('API key generated!')
  }

  const revoke = (id:number) => {
    setKeys(ks=>ks.map(k=>k.id===id?{...k,status:'Revoked' as const}:k))
    showToast('API key revoked')
  }

  return (
    <>
      <PageBanner title="API Keys" breadcrumbs={[{label:'Home',href:'/'},{label:'Administration'},{label:'API Keys'}]}
        description="Manage API keys for programmatic access to your data"
        action={<Button onClick={()=>{setForm({name:'',scope:'Read Only'});setModal(true)}}><Plus size={14}/>Generate New Key</Button>}/>
      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}

      {/* Security notice */}
      <div className="flex items-start gap-3 p-4 rounded-2xl border mb-5" style={{background:'var(--warning-light)',borderColor:'var(--warning)44'}}>
        <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{color:'var(--warning)'}}/>
        <p className="text-sm" style={{color:'var(--muted)'}}>
          <strong style={{color:'var(--warning)'}}>Keep your API keys secret.</strong> Never expose them in client-side code or public repositories. Rotate keys regularly.
        </p>
      </div>

      {/* New key banner */}
      {newKey && (
        <div className="flex items-center gap-3 p-4 rounded-2xl border mb-5" style={{background:'var(--success-light)',borderColor:'var(--success)44'}}>
          <CheckCircle size={18} className="flex-shrink-0" style={{color:'var(--success)'}}/>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{color:'var(--success)'}}>New API key generated — copy it now, it won't be shown again</p>
            <p className="font-mono text-xs mt-0.5 truncate" style={{color:'var(--foreground)'}}>{newKey}</p>
          </div>
          <button type="button" onClick={()=>copy(0,newKey)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{background:'var(--success)',color:'#fff'}}><Copy size={12}/>Copy</button>
          <button type="button" onClick={()=>setNewKey(null)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[var(--success)]" style={{color:'var(--success)'}}><span>×</span></button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[{l:'Total Keys',v:keys.length,c:'var(--primary)'},{l:'Active',v:keys.filter(k=>k.status==='Active').length,c:'var(--success)'},{l:'Total API Calls',v:keys.reduce((s,k)=>s+k.calls,0).toLocaleString(),c:'var(--secondary)'}].map(s=>(
          <Card key={s.l}><p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      <div className="space-y-3">
        {keys.map(k=>(
          <Card key={k.id} className={k.status==='Revoked'?'opacity-60':''}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:k.status==='Active'?'var(--primary-light)':'var(--surface)'}}>
                <Key size={18} style={{color:k.status==='Active'?'var(--primary)':'var(--muted)'}}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold" style={{color:'var(--foreground)'}}>{k.name}</span>
                  <Badge variant={k.scope==='Full Access'?'error':k.scope==='Read Only'?'primary':'secondary'} className="text-[10px]">{k.scope}</Badge>
                  <Badge variant={k.status==='Active'?'success':'muted'} dot>{k.status}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-lg" style={{background:'var(--surface)',color:'var(--foreground)'}}>
                    {shown.includes(k.id) ? k.key : k.prefix + '•'.repeat(16)}
                  </div>
                  <button type="button" onClick={()=>toggle(k.id)} className="text-xs flex items-center gap-1" style={{color:'var(--muted)'}}>
                    {shown.includes(k.id)?<><EyeOff size={11}/>Hide</>:<><Eye size={11}/>Show</>}
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs" style={{color:'var(--muted)'}}>
                  <span className="flex items-center gap-1"><Clock size={10}/> Last used: {k.lastUsed}</span>
                  <span>Created: {k.created}</span>
                  <span>{k.calls.toLocaleString()} API calls</span>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button type="button" onClick={()=>copy(k.id,k.key)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:copied===k.id?'var(--success)':'var(--muted)'}}>{copied===k.id?<CheckCircle size={14}/>:<Copy size={14}/>}</button>
                {k.status==='Active'&&<button type="button" onClick={()=>revoke(k.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--warning-light)] hover:text-[var(--warning)] transition-colors" style={{color:'var(--muted)'}} title="Revoke"><RefreshCw size={14}/></button>}
                <button type="button" onClick={()=>{setKeys(ks=>ks.filter(x=>x.id!==k.id));showToast('Key deleted')}} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={14}/></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title="Generate API Key"
        description="Create a new API key with specific scope and permissions"
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={generate}><Key size={13}/>Generate Key</Button></>}>
        <div className="space-y-4">
          <Input label="Key Name *" placeholder="e.g. Production API, Mobile App" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} hint="A descriptive name to identify this key"/>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Scope / Permissions</label>
            <div className="grid grid-cols-2 gap-2">
              {SCOPES.map(s=>(
                <button key={s} type="button" onClick={()=>setForm(f=>({...f,scope:s}))}
                  className="py-2.5 px-3 rounded-xl border-2 text-sm font-semibold text-left transition-all"
                  style={form.scope===s?{borderColor:'var(--primary)',background:'var(--primary-light)',color:'var(--primary)'}:{borderColor:'var(--border)',color:'var(--muted)'}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
