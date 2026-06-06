'use client'
import { useState } from 'react'
import { Check, X, ArrowRight, Zap, HelpCircle, ChevronDown } from 'lucide-react'

const PLANS = [
  { id:'starter', name:'Starter', badge:null, monthly:0, annual:0, color:'var(--secondary)', bg:'var(--secondary-light)',
    desc:'Perfect for individuals just getting started.',
    features:['Up to 100 products','5 GB storage','Basic analytics dashboard','Email support (48h)','Standard checkout','Community forum access'],
    unavailable:['Custom domain','API access','Priority support','Advanced analytics','Bulk import/export','Multi-currency']
  },
  { id:'pro', name:'Pro', badge:'Most Popular', monthly:29, annual:24, color:'var(--primary)', bg:'var(--primary-light)',
    desc:'Everything you need to run a serious online store.',
    features:['Up to 1,000 products','50 GB storage','Advanced analytics','Priority email & chat (4h)','Custom domain','Full API access','Bulk import/export','Multi-currency (12)'],
    unavailable:['Dedicated account manager','Custom integrations','White-label option']
  },
  { id:'enterprise', name:'Enterprise', badge:'Best Value', monthly:79, annual:65, color:'var(--purple)', bg:'var(--purple-light)',
    desc:'For high-volume stores that demand the best.',
    features:['Unlimited products','1 TB storage','Full analytics suite','Dedicated support (1h SLA)','Custom domain','Full API access','Custom integrations','Multi-currency (150+)','Dedicated account manager','White-label option','SSO & team roles'],
    unavailable:[]
  },
]

const COMPARISON = [
  { feature:'Products', starter:'100', pro:'1,000', enterprise:'Unlimited' },
  { feature:'Storage', starter:'5 GB', pro:'50 GB', enterprise:'1 TB' },
  { feature:'API Access', starter:false, pro:true, enterprise:true },
  { feature:'Custom Domain', starter:false, pro:true, enterprise:true },
  { feature:'Priority Support', starter:false, pro:true, enterprise:true },
  { feature:'Analytics', starter:'Basic', pro:'Advanced', enterprise:'Full Suite' },
  { feature:'Multi-currency', starter:false, pro:'12 currencies', enterprise:'150+ currencies' },
  { feature:'SLA', starter:false, pro:'Business hours', enterprise:'1 hour response' },
  { feature:'Onboarding', starter:'Self-serve', pro:'Guided setup', enterprise:'White-glove' },
  { feature:'Contract', starter:'Monthly', pro:'Monthly/Annual', enterprise:'Custom' },
]

const FAQS = [
  { q:'Can I change plans at any time?', a:'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately. Downgrades happen at the end of your billing cycle.' },
  { q:'Is there a free trial?', a:'All paid plans come with a 14-day free trial. No credit card required to start. Cancel anytime during the trial with no charges.' },
  { q:'What payment methods do you accept?', a:'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfer for Enterprise plans.' },
  { q:'Do you offer discounts for nonprofits?', a:'Yes, we offer a 40% discount for registered non-profit organizations. Contact our sales team with your registration details.' },
  { q:'What happens to my data if I cancel?', a:'Your data is retained for 30 days after cancellation so you can export everything. After 30 days, it is permanently deleted.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number|null>(null)

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:'var(--foreground)',background:'var(--surface)'}}>

      {/* Nav */}
      <nav className="border-b" style={{background:'var(--card)',borderColor:'var(--border)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 h-16">
          <div className="font-black text-xl" style={{color:'var(--primary)'}}>Aimi</div>
          {['Shop','Blog','About','Contact'].map(n=>(
            <a key={n} href="#" className="text-sm font-semibold hidden md:block hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}>{n}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div className="py-20 text-center" style={{background:'linear-gradient(to bottom,var(--surface),var(--card))'}}>
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>
            <Zap size={11} fill="currentColor"/> Transparent Pricing
          </div>
          <h1 className="text-5xl font-black leading-none" style={{color:'var(--foreground)'}}>Simple pricing,<br/><span style={{color:'var(--primary)'}}>no surprises</span></h1>
          <p className="text-base" style={{color:'var(--muted)'}}>Start free, scale as you grow. All plans include a 14-day trial.</p>
          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl border" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
            <button type="button" onClick={()=>setAnnual(false)}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
              style={!annual?{background:'var(--card)',color:'var(--foreground)',boxShadow:'0 1px 4px rgba(0,0,0,0.08)'}:{color:'var(--muted)'}}>Monthly</button>
            <button type="button" onClick={()=>setAnnual(true)}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              style={annual?{background:'var(--card)',color:'var(--foreground)',boxShadow:'0 1px 4px rgba(0,0,0,0.08)'}:{color:'var(--muted)'}}>
              Annual
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{background:'var(--success-light)',color:'var(--success)'}}>Save 17%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan=>(
            <div key={plan.id} className={`relative rounded-3xl border-2 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col`}
              style={{borderColor:plan.id==='pro'?plan.color:'var(--border)',background:'var(--card)'}}>
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-black text-white" style={{background:plan.color}}>
                  {plan.badge}
                </div>
              )}
              <div className={`p-7 ${plan.badge?'pt-12':''}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold mb-4" style={{background:plan.bg,color:plan.color}}>
                  {plan.name}
                </div>
                <div className="mb-2">
                  <span className="text-5xl font-black" style={{color:'var(--foreground)'}}>
                    {(annual?plan.annual:plan.monthly)===0?'Free':`$${annual?plan.annual:plan.monthly}`}
                  </span>
                  {(annual?plan.annual:plan.monthly)>0&&<span className="text-sm ml-1" style={{color:'var(--muted)'}}>/ month</span>}
                </div>
                {annual&&plan.monthly>0&&<p className="text-xs font-semibold mb-1" style={{color:'var(--success)'}}>Save ${(plan.monthly-plan.annual)*12}/year</p>}
                <p className="text-sm mb-6" style={{color:'var(--muted)'}}>{plan.desc}</p>
                <button type="button" className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                  style={plan.id==='pro'?{background:plan.color,color:'#fff'}:{background:plan.bg,color:plan.color,border:`1px solid ${plan.color}44`}}>
                  {plan.monthly===0?'Get Started Free':'Start Free Trial'} <ArrowRight size={14}/>
                </button>
              </div>
              <div className="px-7 pb-7 flex-1 space-y-3 border-t pt-6" style={{borderColor:'var(--border)'}}>
                {plan.features.map(f=>(
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={15} className="flex-shrink-0 mt-0.5" style={{color:plan.color}}/>
                    <span style={{color:'var(--foreground)'}}>{f}</span>
                  </div>
                ))}
                {plan.unavailable.map(f=>(
                  <div key={f} className="flex items-start gap-2.5 text-sm opacity-40">
                    <X size={15} className="flex-shrink-0 mt-0.5" style={{color:'var(--muted)'}}/>
                    <span style={{color:'var(--muted)'}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs font-semibold" style={{color:'var(--muted)'}}>
          {['✅ No credit card required','🔒 256-bit SSL security','🔄 Cancel anytime','📞 24/7 support','🇺🇸 US-based servers'].map(b=>(
            <span key={b}>{b}</span>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-20">
          <h2 className="text-3xl font-black text-center mb-10" style={{color:'var(--foreground)'}}>Full Feature Comparison</h2>
          <div className="rounded-3xl border overflow-hidden" style={{borderColor:'var(--border)'}}>
            <div className="grid grid-cols-4 text-sm font-black py-4 px-5 border-b" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
              <div style={{color:'var(--muted)'}}>Feature</div>
              {PLANS.map(p=><div key={p.id} className="text-center" style={{color:p.color}}>{p.name}</div>)}
            </div>
            {COMPARISON.map((row,i)=>(
              <div key={i} className="grid grid-cols-4 text-sm py-3.5 px-5 border-b last:border-0 hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                <div className="font-semibold" style={{color:'var(--foreground)'}}>{row.feature}</div>
                {(['starter','pro','enterprise'] as const).map(k=>(
                  <div key={k} className="text-center">
                    {row[k]===true?<Check size={16} className="mx-auto" style={{color:'var(--success)'}}/>:row[k]===false?<X size={16} className="mx-auto" style={{color:'var(--border)'}}/>:<span style={{color:'var(--foreground)'}}>{row[k]}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10" style={{color:'var(--foreground)'}}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq,i)=>(
              <div key={i} className="rounded-2xl border overflow-hidden" style={{borderColor:'var(--border)',background:'var(--card)'}}>
                <button type="button" onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--surface)] transition-colors">
                  <span className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{faq.q}</span>
                  <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${openFaq===i?'rotate-180':''}`} style={{color:'var(--muted)'}}/>
                </button>
                {openFaq===i&&<div className="px-5 pb-5 text-sm leading-relaxed" style={{color:'var(--muted)'}}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl p-12 text-center text-white" style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))'}}>
          <h2 className="text-3xl font-black mb-3">Start your free trial today</h2>
          <p className="text-white/80 mb-7">No credit card. No commitment. Cancel any time.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" className="px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:opacity-90 flex items-center gap-2 justify-center" style={{background:'white',color:'var(--primary)'}}>Start Free Trial <ArrowRight size={15}/></button>
            <button type="button" className="px-8 py-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 justify-center" style={{background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.3)'}}>Talk to Sales</button>
          </div>
        </div>
      </div>

      <div className="border-t py-6 text-center text-xs" style={{borderColor:'var(--border)',background:'var(--card)',color:'var(--muted)'}}>
        © 2025 Aimi · All rights reserved
      </div>
    </div>
  )
}
