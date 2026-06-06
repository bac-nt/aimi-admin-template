'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Modal, Toggle, Alert } from '@/components/ui'
import { Zap, Settings, ExternalLink, Check, RefreshCw, AlertCircle } from 'lucide-react'

type Status = 'connected' | 'error' | 'inactive'

interface Integration {
  id: string
  name: string
  category: string
  description: string
  icon: string
  color: string
  status: Status
  plan: 'free' | 'pro' | 'enterprise'
  lastSync?: string
  docsUrl?: string
}

const INTEGRATIONS: Integration[] = [
  // Analytics
  { id:'ga4',        name:'Google Analytics',  category:'Analytics',  description:'Track traffic and user behaviour with GA4.',              icon:'📊', color:'#e37400', status:'connected', plan:'free',       lastSync:'2 min ago' },
  { id:'mixpanel',   name:'Mixpanel',           category:'Analytics',  description:'Event-based product analytics and funnels.',             icon:'🔮', color:'#7856ff', status:'inactive',  plan:'pro'                              },
  { id:'hotjar',     name:'Hotjar',             category:'Analytics',  description:'Heatmaps, session recordings, surveys.',                  icon:'🔥', color:'#f3683c', status:'inactive',  plan:'pro'                              },
  // Marketing
  { id:'mailchimp',  name:'Mailchimp',          category:'Marketing',  description:'Email campaigns and audience management.',               icon:'📧', color:'#ffe01b', status:'connected', plan:'free',       lastSync:'1 hr ago'  },
  { id:'hubspot',    name:'HubSpot',            category:'Marketing',  description:'CRM, email and marketing automation.',                   icon:'🧡', color:'#ff7a59', status:'error',     plan:'pro',        lastSync:'Failed'    },
  { id:'klaviyo',    name:'Klaviyo',            category:'Marketing',  description:'E-commerce email and SMS marketing platform.',           icon:'💌', color:'#29b474', status:'inactive',  plan:'pro'                              },
  // Payment
  { id:'stripe',     name:'Stripe',            category:'Payments',   description:'Accept card payments globally.',                          icon:'💳', color:'#635bff', status:'connected', plan:'free',       lastSync:'Live'      },
  { id:'paypal',     name:'PayPal',             category:'Payments',   description:'Online payments, invoicing and subscriptions.',          icon:'🅿️', color:'#009cde', status:'inactive',  plan:'free'                             },
  { id:'razorpay',   name:'Razorpay',           category:'Payments',   description:'All-in-one payment gateway for South Asia.',             icon:'💰', color:'#3395ff', status:'inactive',  plan:'pro'                              },
  // Shipping
  { id:'shippo',     name:'Shippo',             category:'Shipping',   description:'Multi-carrier shipping rates and labels.',                icon:'📦', color:'#5a00c8', status:'inactive',  plan:'pro'                              },
  { id:'fedex',      name:'FedEx',              category:'Shipping',   description:'Real-time shipping rates and package tracking.',          icon:'🚚', color:'#4d148c', status:'inactive',  plan:'enterprise'                       },
  { id:'easypost',   name:'EasyPost',           category:'Shipping',   description:'Unified shipping API for all major carriers.',           icon:'✉️', color:'#2684ff', status:'inactive',  plan:'pro'                              },
  // Comms
  { id:'slack',      name:'Slack',              category:'Communication', description:'Get order and alert notifications in Slack.',         icon:'💬', color:'#611f69', status:'connected', plan:'free',       lastSync:'Real-time' },
  { id:'twilio',     name:'Twilio',             category:'Communication', description:'SMS, WhatsApp and voice notifications.',              icon:'📱', color:'#f22f46', status:'inactive',  plan:'pro'                              },
  // Storage
  { id:'s3',         name:'Amazon S3',          category:'Storage',    description:'Scalable cloud storage for media and files.',             icon:'🪣', color:'#ff9900', status:'connected', plan:'free',       lastSync:'Auto-sync' },
  { id:'cloudinary', name:'Cloudinary',         category:'Storage',    description:'Image and video optimisation at scale.',                  icon:'☁️', color:'#3448c5', status:'inactive',  plan:'pro'                              },
]

const CATEGORIES = ['All', ...Array.from(new Set(INTEGRATIONS.map(i => i.category)))]

const STATUS_INFO: Record<Status, { label: string; variant: 'success'|'error'|'muted' }> = {
  connected: { label: 'Connected',  variant: 'success' },
  error:     { label: 'Error',      variant: 'error'   },
  inactive:  { label: 'Inactive',   variant: 'muted'   },
}
const PLAN_V: Record<string,'primary'|'secondary'|'purple'> = { free:'primary', pro:'secondary', enterprise:'purple' }

export default function IntegrationsPage() {
  const [items,    setItems]    = useState(INTEGRATIONS)
  const [cat,      setCat]      = useState('All')
  const [modal,    setModal]    = useState<Integration|null>(null)
  const [toast,    setToast]    = useState<string|null>(null)
  const [loading,  setLoading]  = useState<string|null>(null)

  const filtered = items.filter(i => cat === 'All' || i.category === cat)
  const connected = items.filter(i => i.status === 'connected').length
  const errors    = items.filter(i => i.status === 'error').length

  const connect = (id: string) => {
    setLoading(id)
    setTimeout(() => {
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'connected', lastSync: 'Just now' } : i))
      setModal(null)
      setLoading(null)
      const name = items.find(i => i.id === id)?.name
      setToast(`${name} connected successfully!`)
      setTimeout(() => setToast(null), 3000)
    }, 1200)
  }

  const disconnect = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'inactive', lastSync: undefined } : i))
    setModal(null)
    const name = items.find(i => i.id === id)?.name
    setToast(`${name} disconnected.`)
    setTimeout(() => setToast(null), 3000)
  }

  const retry = (id: string) => {
    setLoading(id)
    setTimeout(() => {
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'connected', lastSync: 'Just now' } : i))
      setLoading(null)
      setToast('Reconnected successfully!')
      setTimeout(() => setToast(null), 3000)
    }, 1000)
  }

  return (
    <>
      <PageBanner
        title="Integrations"
        breadcrumbs={[{ label:'Home', href:'/' }, { label:'Administration' }, { label:'Integrations' }]}
        description="Connect your favourite tools and services to extend your workflow"
      />

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-fade-in">
          <Alert variant="success" onClose={() => setToast(null)}>{toast}</Alert>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { l:'Available', v: items.length,   c:'var(--primary)'   },
          { l:'Connected', v: connected,       c:'var(--success)'   },
          { l:'Errors',    v: errors,          c: errors > 0 ? 'var(--error)' : 'var(--muted)' },
        ].map(s => (
          <Card key={s.l}>
            <p className="text-xs font-medium mb-0.5" style={{ color:'var(--muted)' }}>{s.l}</p>
            <p className="text-2xl font-black" style={{ color: s.c }}>{s.v}</p>
          </Card>
        ))}
      </div>

      {/* Error banner */}
      {errors > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl border mb-5" style={{ background:'var(--error-light)', borderColor:'rgba(250,137,107,0.35)' }}>
          <AlertCircle size={18} className="flex-shrink-0" style={{ color:'var(--error)' }}/>
          <p className="text-sm flex-1" style={{ color:'var(--error)' }}>
            <strong>{errors} integration{errors > 1 ? 's have' : ' has'} connection errors.</strong> Check config or re-connect.
          </p>
          <Button size="sm" variant="error" onClick={() => items.filter(i=>i.status==='error').forEach(i=>retry(i.id))}>
            <RefreshCw size={12}/>Retry All
          </Button>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {CATEGORIES.map(c => (
          <button key={c} type="button" onClick={() => setCat(c)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={cat===c
              ? { background:'var(--primary)', color:'#fff' }
              : { background:'var(--surface)', color:'var(--muted)', border:'1px solid var(--border)' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtered.map(item => (
          <Card key={item.id} className="hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={() => setModal(item)}>
            <div className="flex items-start gap-3 mb-3">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                style={{ background: item.color + '18', border: `1.5px solid ${item.color}33` }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-bold text-sm truncate" style={{ color:'var(--foreground)' }}>{item.name}</h3>
                  <Badge variant={PLAN_V[item.plan]} className="text-[9px] uppercase tracking-wide">{item.plan}</Badge>
                </div>
                <p className="text-[10px] mt-0.5" style={{ color:'var(--muted)' }}>{item.category}</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed mb-4" style={{ color:'var(--muted)' }}>{item.description}</p>

            <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor:'var(--border)' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{
                  background: item.status==='connected' ? 'var(--success)' : item.status==='error' ? 'var(--error)' : 'var(--border)'
                }}/>
                <span className="text-xs" style={{ color:'var(--muted)' }}>
                  {item.status === 'connected' && item.lastSync
                    ? item.lastSync
                    : STATUS_INFO[item.status].label
                  }
                </span>
              </div>
              {item.status === 'connected' ? (
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color:'var(--success)' }}>
                  <Check size={11}/> Active
                </div>
              ) : item.status === 'error' ? (
                <button type="button" onClick={e => { e.stopPropagation(); retry(item.id) }}
                  className="text-xs font-semibold flex items-center gap-1 hover:opacity-80"
                  style={{ color:'var(--error)' }}>
                  {loading===item.id ? <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"/> : <RefreshCw size={11}/>}
                  Retry
                </button>
              ) : (
                <button type="button"
                  className="text-xs font-semibold hover:opacity-80 transition-opacity"
                  style={{ color:'var(--primary)' }}>
                  Connect
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Detail modal */}
      {modal && (
        <Modal
          open={!!modal}
          onClose={() => setModal(null)}
          title={modal.name}
          description={modal.description}
          size="md"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModal(null)}>Close</Button>
              {modal.status === 'connected'
                ? <Button variant="error" onClick={() => disconnect(modal.id)}>Disconnect</Button>
                : modal.status === 'error'
                  ? <Button loading={loading===modal.id} onClick={() => retry(modal.id)}><RefreshCw size={13}/>Retry Connection</Button>
                  : <Button loading={loading===modal.id} onClick={() => connect(modal.id)}><Zap size={13}/>Connect</Button>
              }
            </>
          }
        >
          <div className="space-y-4">
            {/* Icon + status */}
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background:'var(--surface)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: modal.color + '20', border: `2px solid ${modal.color}44` }}>
                {modal.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold" style={{ color:'var(--foreground)' }}>{modal.name}</span>
                  <Badge variant={PLAN_V[modal.plan]}>{modal.plan}</Badge>
                </div>
                <Badge variant={STATUS_INFO[modal.status].variant} dot>{STATUS_INFO[modal.status].label}</Badge>
                {modal.lastSync && <p className="text-xs mt-1" style={{ color:'var(--muted)' }}>Last sync: {modal.lastSync}</p>}
              </div>
            </div>

            {/* Config (demo) */}
            {modal.status === 'connected' && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm" style={{ color:'var(--foreground)' }}>Settings</h4>
                {[
                  { l:'Sync automatically', s:'Push changes in real-time', v:true },
                  { l:'Error notifications', s:'Alert via Slack on failure', v:true },
                  { l:'Test mode',           s:'Use sandbox credentials',   v:false },
                ].map((cfg, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor:'var(--border)' }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color:'var(--foreground)' }}>{cfg.l}</p>
                      <p className="text-xs" style={{ color:'var(--muted)' }}>{cfg.s}</p>
                    </div>
                    <Toggle checked={cfg.v} onChange={() => {}} size="sm"/>
                  </div>
                ))}
              </div>
            )}

            {modal.status === 'inactive' && (
              <div className="p-4 rounded-xl border" style={{ borderColor:'var(--border)', background:'var(--surface)' }}>
                <p className="text-xs" style={{ color:'var(--muted)' }}>
                  Connect your {modal.name} account to enable this integration. You'll need your API key or OAuth credentials.
                </p>
              </div>
            )}

            {modal.status === 'error' && (
              <Alert variant="error">
                Connection failed. Check your API credentials or network. Click Retry to reconnect.
              </Alert>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}
