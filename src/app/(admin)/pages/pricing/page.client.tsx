'use client'
import { PageBanner, Badge, Toggle } from '@/components/ui'
import { Check, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const PLANS = [
  {name:'Starter',     mo:9,  yr:7,  desc:'For individuals',     highlight:false, features:[{t:'5 Projects',inc:true},{t:'10 GB Storage',inc:true},{t:'Basic Analytics',inc:true},{t:'Email Support',inc:true},{t:'API Access',inc:false},{t:'Custom Domain',inc:false},{t:'White Label',inc:false}]},
  {name:'Professional',mo:29, yr:24, desc:'For growing teams',    highlight:true,  features:[{t:'Unlimited Projects',inc:true},{t:'100 GB Storage',inc:true},{t:'Advanced Analytics',inc:true},{t:'Priority Support',inc:true},{t:'API Access',inc:true},{t:'Custom Domain',inc:true},{t:'White Label',inc:false}]},
  {name:'Enterprise',  mo:79, yr:65, desc:'For large orgs',       highlight:false, features:[{t:'Unlimited Projects',inc:true},{t:'1 TB Storage',inc:true},{t:'Enterprise Analytics',inc:true},{t:'Dedicated Support',inc:true},{t:'API Access',inc:true},{t:'Custom Domain',inc:true},{t:'White Label',inc:true}]},
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)
  return (
    <>
      <PageBanner title="Pricing Plans" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Pricing'}]}/>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black mb-2" style={{color:'var(--foreground)'}}>Simple, Transparent Pricing</h1>
        <p className="max-w-md mx-auto mb-6" style={{color:'var(--muted)'}}>Choose the plan that works best for you. All plans include a 14-day free trial.</p>
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm font-semibold`} style={{color:!yearly?'var(--foreground)':'var(--muted)'}}>Monthly</span>
          <Toggle checked={yearly} onChange={setYearly}/>
          <span className="text-sm font-semibold flex items-center gap-2" style={{color:yearly?'var(--foreground)':'var(--muted)'}}>Yearly <Badge variant="success">Save 20%</Badge></span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {PLANS.map((p,i)=>(
          <div key={i} className="card relative" style={p.highlight?{borderColor:'var(--primary)',borderWidth:2,transform:'scale(1.02)'}:{}}>
            {p.highlight&&<div className="absolute -top-4 left-1/2 -translate-x-1/2"><Badge variant="primary" className="px-3 py-1 text-xs font-bold shadow-md"><Zap size={11} className="inline mr-1"/>Most Popular</Badge></div>}
            <div className="p-6 border-b" style={{borderColor:'var(--border)'}}>
              <h3 className="font-black text-lg mb-1" style={{color:'var(--foreground)'}}>{p.name}</h3>
              <p className="text-xs mb-4" style={{color:'var(--muted)'}}>{p.desc}</p>
              <div className="flex items-baseline gap-1"><span className="text-4xl font-black" style={{color:'var(--foreground)'}}>${yearly?p.yr:p.mo}</span><span style={{color:'var(--muted)'}}>/mo</span></div>
              {yearly&&<p className="text-xs mt-1" style={{color:'var(--success)'}}>Save ${(p.mo-p.yr)*12}/year</p>}
              <button className="w-full py-2.5 rounded-xl text-sm font-semibold mt-5 border transition-all hover:opacity-90" style={p.highlight?{background:'var(--primary)',color:'white',borderColor:'var(--primary)'}:{background:'transparent',color:'var(--primary)',borderColor:'var(--primary)'}}>Get Started Free</button>
            </div>
            <div className="p-5 space-y-3">
              {p.features.map((f,j)=>(
                <div key={j} className="flex items-center gap-2.5">
                  {f.inc?<Check size={16} style={{color:'var(--success)',flexShrink:0}}/>:<X size={16} style={{color:'var(--border)',flexShrink:0}}/>}
                  <span className="text-sm" style={{color:f.inc?'var(--foreground)':'var(--muted)'}}>{f.t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
