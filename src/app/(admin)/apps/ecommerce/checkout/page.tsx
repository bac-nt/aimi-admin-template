'use client'
import { useState } from 'react'
import { Toast, PageBanner, Card, CardHeader, Badge, Button, Toggle, Input, Select } from '@/components/ui'
import { CreditCard, Truck, Shield, Percent, Settings, Globe, Check, Plus, Trash2, Eye } from 'lucide-react'

interface PayGateway { id:string; name:string; icon:string; enabled:boolean; fee:string; methods:string[] }
interface ShipMethod { id:number; name:string; desc:string; price:number; enabled:boolean; days:string }

const INIT_GATEWAYS: PayGateway[] = [
  { id:'stripe',  name:'Stripe',  icon:'💳', enabled:true,  fee:'2.9% + $0.30', methods:['Visa','Mastercard','Amex','Google Pay','Apple Pay'] },
  { id:'paypal',  name:'PayPal',  icon:'🅿️', enabled:true,  fee:'3.5% + $0.49', methods:['PayPal Balance','Credit Card'] },
  { id:'venmo',   name:'Venmo',   icon:'💙', enabled:false, fee:'1.9% + $0.10', methods:['Venmo Balance','Bank Account'] },
  { id:'crypto',  name:'Crypto',  icon:'₿',  enabled:false, fee:'1.0%',         methods:['Bitcoin','Ethereum','USDC'] },
]
const INIT_SHIPPING: ShipMethod[] = [
  { id:1, name:'Free Shipping',    desc:'Orders over $75',         price:0,     enabled:true,  days:'5-7 business days' },
  { id:2, name:'Standard',         desc:'Economy ground shipping', price:5.99,  enabled:true,  days:'5-7 business days' },
  { id:3, name:'Express',          desc:'Priority air mail',       price:14.99, enabled:true,  days:'2-3 business days' },
  { id:4, name:'Overnight',        desc:'Next day delivery',       price:29.99, enabled:false, days:'1 business day'    },
]

export default function CheckoutPage() {
  const [gateways, setGateways] = useState(INIT_GATEWAYS)
  const [shipping, setShipping] = useState(INIT_SHIPPING)
  const [taxEnabled, setTax]    = useState(true)
  const [taxRate,    setRate]   = useState('8.5')
  const [toast,      setToast]  = useState<string|null>(null)
  const [guestCheckout, setGuest] = useState(true)
  const [orderNotes,  setNotes]   = useState(true)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  return (
    <>
      <PageBanner title="Checkout Settings" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Checkout'}]}
        description="Configure payment gateways, shipping methods and checkout behaviour"
        action={<Button onClick={()=>showToast('Checkout settings saved!')}><Check size={14}/>Save Settings</Button>}/>

      {<Toast message={toast}/>}

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 animate-fade-up">
        {[
          {l:'Active Gateways', v:gateways.filter(g=>g.enabled).length, c:'var(--primary)',   i:CreditCard },
          {l:'Ship Methods',    v:shipping.filter(s=>s.enabled).length, c:'var(--secondary)', i:Truck      },
          {l:'Tax Rate',        v:taxEnabled?`${taxRate}%`:'Off',       c:'var(--warning)',   i:Percent    },
          {l:'Guest Checkout',  v:guestCheckout?'On':'Off',             c:'var(--success)',   i:Globe      },
        ].map(s=>(
          <Card key={s.l} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'var(--primary-light)'}}>
              <s.i size={18} style={{color:'var(--primary)'}}/>
            </div>
            <div><p className="text-xs" style={{color:'var(--muted)'}}>{s.l}</p><p className="font-black text-lg" style={{color:s.c}}>{s.v}</p></div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Payment Gateways */}
        <Card>
          <CardHeader title="Payment Gateways" subtitle="Enable and configure payment processors" action={<Button variant="outline"><Plus size={12}/>Add</Button>}/>
          <div className="space-y-3">
            {gateways.map(g=>(
              <div key={g.id} className="p-4 rounded-xl border transition-all" style={{borderColor:g.enabled?'var(--primary)44':'var(--border)',background:g.enabled?'var(--primary-light)':'transparent'}}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{g.name}</p>
                      <p className="text-xs" style={{color:'var(--muted)'}}>Fee: {g.fee}</p>
                    </div>
                  </div>
                  <Toggle checked={g.enabled} onChange={v=>setGateways(gs=>gs.map(x=>x.id===g.id?{...x,enabled:v}:x))}/>
                </div>
                {g.enabled && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t" style={{borderColor:'var(--border)'}}>
                    {g.methods.map(m=><span key={m} className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>{m}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Shipping */}
        <Card>
          <CardHeader title="Shipping Methods" subtitle="Set available delivery options and rates"/>
          <div className="space-y-3">
            {shipping.map(s=>(
              <div key={s.id} className="p-4 rounded-xl border transition-all" style={{borderColor:s.enabled?'var(--success)44':'var(--border)',background:s.enabled?'var(--success-light)':'transparent'}}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'var(--surface)'}}>
                      <Truck size={16} style={{color:'var(--muted)'}}/>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{s.name}</p>
                        {s.price===0&&<Badge variant="success" className="text-[9px]">FREE</Badge>}
                      </div>
                      <p className="text-xs" style={{color:'var(--muted)'}}>{s.desc} · {s.days}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{s.price===0?'Free':`$${s.price.toFixed(2)}`}</span>
                    <Toggle checked={s.enabled} onChange={v=>setShipping(ss=>ss.map(x=>x.id===s.id?{...x,enabled:v}:x))} size="sm"/>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm"><Plus size={13}/>Add Shipping Method</Button>
          </div>
        </Card>

        {/* Tax Settings */}
        <Card>
          <CardHeader title="Tax Configuration" subtitle="Configure tax rates for your region"/>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl border" style={{borderColor:'var(--border)'}}>
              <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>Enable Tax Calculation</p><p className="text-xs" style={{color:'var(--muted)'}}>Automatically add tax to orders</p></div>
              <Toggle checked={taxEnabled} onChange={setTax} size="sm"/>
            </div>
            {taxEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <Input label="Default Tax Rate (%)" type="number" step="0.1" min="0" max="100" value={taxRate} onChange={e=>setRate(e.target.value)}/>
                <Select label="Tax Display" options={[{value:'excl',label:'Excluding tax'},{value:'incl',label:'Including tax'}]}/>
                <Input label="Tax Name" placeholder="e.g. VAT, GST, Sales Tax" defaultValue="Sales Tax" className="col-span-2"/>
              </div>
            )}
            <div className="p-3 rounded-xl border" style={{borderColor:'var(--border)',background:'var(--surface)'}}>
              <p className="text-xs" style={{color:'var(--muted)'}}>💡 For multi-region tax rules, use a tax service like TaxJar or Avalara.</p>
            </div>
          </div>
        </Card>

        {/* Checkout Options */}
        <Card>
          <CardHeader title="Checkout Options" subtitle="Control the checkout experience"/>
          <div className="space-y-3">
            {[
              {l:'Guest Checkout',      d:'Allow purchases without account',    v:guestCheckout, fn:setGuest},
              {l:'Order Notes',         d:'Let customers add delivery notes',   v:orderNotes,    fn:setNotes},
              {l:'Address Validation',  d:'Validate shipping addresses',        v:true,          fn:()=>{}  },
              {l:'Email Confirmation',  d:'Send order confirmation emails',     v:true,          fn:()=>{}  },
              {l:'Stock Reservation',   d:'Reserve stock during checkout',      v:true,          fn:()=>{}  },
            ].map((opt,i)=>(
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border" style={{borderColor:'var(--border)'}}>
                <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{opt.l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{opt.d}</p></div>
                <Toggle checked={opt.v} onChange={opt.fn} size="sm"/>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
