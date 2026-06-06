'use client'
import React from 'react'
import { PageBanner, Card, Button, Input, Select, Toggle, Toast } from '@/components/ui'
import { useState } from 'react'
import { Check, User, Package, CreditCard, CheckCircle } from 'lucide-react'

const STEPS = [
  { id:1, label:'Account',  Icon:User },
  { id:2, label:'Plan',     Icon:Package },
  { id:3, label:'Payment',  Icon:CreditCard },
  { id:4, label:'Confirm',  Icon:CheckCircle },
]

const PLANS = [
  { id:'starter',    name:'Starter',    price:0,   features:['1 user','5 GB storage','Community support'] },
  { id:'pro',        name:'Pro',        price:12,  features:['5 users','50 GB storage','Priority support','Advanced analytics'] },
  { id:'enterprise', name:'Enterprise', price:49,  features:['Unlimited users','1 TB storage','Dedicated support','Custom integrations','SSO'] },
]

export default function WizardPage() {
  const [step,  setStep]  = useState(1)
  const [toast, setToast] = useState<string|null>(null)
  const [form,  setForm]  = useState({ name:'', email:'', company:'', plan:'pro', billing:'monthly', cardName:'', cardNum:'', expiry:'', cvv:'', agree:false })
  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const selected = PLANS.find(p=>p.id===form.plan)!
  const price    = form.billing==='annual' ? Math.round(selected.price*10) : selected.price

  const set = (k:keyof typeof form, v:string|boolean) => setForm(f=>({...f,[k]:v}))

  return (
    <>
      <Toast message={toast}/>
      <PageBanner title="Form Wizard" description="Multi-step guided form with progress indicator and step validation"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Wizard'}]}/>

      {/* Step indicator */}
      <div className="flex items-center mb-8 max-w-2xl">
        {STEPS.map((s,i)=>(
          <React.Fragment key={s.id}>
            <div key={s.id} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative"
                style={{background:step>s.id?'var(--success)':step===s.id?'var(--primary)':'var(--surface)',border:`2px solid ${step>=s.id?step>s.id?'var(--success)':'var(--primary)':'var(--border)'}`,color:step>=s.id?'#fff':'var(--muted)'}}>
                {step>s.id?<Check size={16}/>:<s.Icon size={16}/>}
              </div>
              <span className="text-[11px] font-bold whitespace-nowrap hidden sm:block" style={{color:step===s.id?'var(--primary)':step>s.id?'var(--success)':'var(--muted)'}}>{s.label}</span>
            </div>
            {i<STEPS.length-1 && (
              <div key={`l${i}`} className="flex-1 h-0.5 mx-2 mt-[-12px] sm:mt-[-18px] transition-all duration-500"
                style={{background:step>s.id?'var(--success)':'var(--border)'}}/>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="max-w-2xl">
        {/* Step 1 */}
        {step===1 && (
          <Card>
            <h2 className="text-lg font-black mb-1" style={{color:'var(--foreground)'}}>Create your account</h2>
            <p className="text-sm mb-5" style={{color:'var(--muted)'}}>Fill in your basic information to get started.</p>
            <div className="space-y-4">
              <Input label="Full Name *" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="John Doe"/>
              <Input label="Email Address *" type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="john@example.com"/>
              <Input label="Company" value={form.company} onChange={e=>set('company',e.target.value)} placeholder="Acme Inc. (optional)"/>
            </div>
          </Card>
        )}

        {/* Step 2 */}
        {step===2 && (
          <Card>
            <h2 className="text-lg font-black mb-1" style={{color:'var(--foreground)'}}>Choose your plan</h2>
            <p className="text-sm mb-4" style={{color:'var(--muted)'}}>Select the plan that best fits your needs.</p>
            <div className="flex gap-2 mb-5 p-1 rounded-xl w-fit" style={{background:'var(--surface)'}}>
              {['monthly','annual'].map(b=>(
                <button key={b} type="button" onClick={()=>set('billing',b)} className="px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all"
                  style={form.billing===b?{background:'var(--card)',color:'var(--foreground)',boxShadow:'0 1px 4px rgba(0,0,0,0.1)'}:{color:'var(--muted)'}}>
                  {b}{b==='annual'&&<span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{background:'var(--success-light)',color:'var(--success)'}}>-17%</span>}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {PLANS.map(plan=>(
                <button key={plan.id} type="button" onClick={()=>set('plan',plan.id)}
                  className="w-full text-left p-4 rounded-2xl border-2 transition-all hover:border-[var(--primary)]"
                  style={{borderColor:form.plan===plan.id?'var(--primary)':'var(--border)',background:form.plan===plan.id?'var(--primary-light)':'var(--card)'}}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-black" style={{color:'var(--foreground)'}}>{plan.name}</p>
                      <ul className="mt-1.5 space-y-0.5">
                        {plan.features.map(f=><li key={f} className="text-xs flex items-center gap-1.5" style={{color:'var(--muted)'}}><Check size={10} style={{color:'var(--success)'}} className="flex-shrink-0"/>{f}</li>)}
                      </ul>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-black text-xl" style={{color:form.plan===plan.id?'var(--primary)':'var(--foreground)'}}>{plan.price===0?'Free':`$${form.billing==='annual'?plan.price*10:plan.price}`}</p>
                      {plan.price>0 && <p className="text-xs" style={{color:'var(--muted)'}}>per {form.billing==='annual'?'year':'month'}</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 3 */}
        {step===3 && (
          <Card>
            <h2 className="text-lg font-black mb-1" style={{color:'var(--foreground)'}}>Payment details</h2>
            <p className="text-sm mb-5" style={{color:'var(--muted)'}}>Your payment is secured and encrypted.</p>
            {selected.price===0 ? (
              <div className="p-6 rounded-2xl text-center" style={{background:'var(--success-light)'}}>
                <Check size={32} className="mx-auto mb-2" style={{color:'var(--success)'}}/>
                <p className="font-bold" style={{color:'var(--success)'}}>No payment required for Starter plan!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Input label="Cardholder Name" value={form.cardName} onChange={e=>set('cardName',e.target.value)} placeholder="John Doe"/>
                <Input label="Card Number" value={form.cardNum} onChange={e=>set('cardNum',e.target.value)} placeholder="1234 5678 9012 3456"/>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Expiry" value={form.expiry} onChange={e=>set('expiry',e.target.value)} placeholder="MM/YY"/>
                  <Input label="CVV" value={form.cvv} onChange={e=>set('cvv',e.target.value)} placeholder="123"/>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Step 4 */}
        {step===4 && (
          <Card>
            <h2 className="text-lg font-black mb-1" style={{color:'var(--foreground)'}}>Confirm & Launch</h2>
            <p className="text-sm mb-5" style={{color:'var(--muted)'}}>Review your details before confirming.</p>
            <div className="space-y-2 mb-5">
              {[{l:'Name',v:form.name||'—'},{l:'Email',v:form.email||'—'},{l:'Plan',v:selected.name},{l:'Billing',v:form.billing},{l:'Price',v:price===0?'Free':`$${price}/${form.billing==='annual'?'yr':'mo'}`}].map(r=>(
                <div key={r.l} className="flex justify-between py-2.5 border-b" style={{borderColor:'var(--border)'}}>
                  <span className="text-sm" style={{color:'var(--muted)'}}>{r.l}</span>
                  <span className="text-sm font-semibold capitalize" style={{color:'var(--foreground)'}}>{r.v}</span>
                </div>
              ))}
            </div>
            <label className="flex items-start gap-3 cursor-pointer mb-5">
              <input type="checkbox" checked={form.agree} onChange={e=>set('agree',e.target.checked)} className="w-4 h-4 mt-0.5 rounded accent-[var(--primary)]"/>
              <p className="text-sm" style={{color:'var(--muted)'}}>I agree to the <a href="#" style={{color:'var(--primary)'}}>Terms of Service</a> and <a href="#" style={{color:'var(--primary)'}}>Privacy Policy</a>.</p>
            </label>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          <Button variant="ghost" onClick={()=>setStep(s=>s-1)} disabled={step===1}>← Back</Button>
          {step<4
            ? <Button onClick={()=>setStep(s=>s+1)}>Next →</Button>
            : <Button disabled={!form.agree} onClick={()=>showToast('Account created! Welcome aboard 🎉')}><Check size={14}/>Confirm & Start</Button>}
        </div>
      </div>
    </>
  )
}
