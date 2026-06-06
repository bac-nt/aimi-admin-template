'use client'
import React, { PageBanner, Card, CardHeader, Button } from '@/components/ui'
import { useState } from 'react'
import { CreditCard, Truck, Store, Check } from 'lucide-react'

function Radio({ checked, onChange, label, desc, disabled=false, color='var(--primary)' }:
  { checked:boolean; onChange:()=>void; label?:string; desc?:string; disabled?:boolean; color?:string }) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer select-none ${disabled?'opacity-50 cursor-not-allowed':''}`}>
      <button type="button" disabled={disabled} onClick={()=>!disabled&&onChange()}
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
        style={{marginTop:2, borderColor:checked?color:'var(--border)', background:checked?color:'var(--card)', boxShadow:checked?`0 0 0 3px ${color}22`:undefined}}>
        {checked && <span className="w-2 h-2 rounded-full bg-white"/>}
      </button>
      {label && (
        <div>
          <p className="text-sm font-medium" style={{color:disabled?'var(--muted)':'var(--foreground)'}}>{label}</p>
          {desc && <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>{desc}</p>}
        </div>
      )}
    </label>
  )
}

function RadioCard({ checked, onChange, label, desc, icon:Icon, value }:
  { checked:boolean; onChange:(v:string)=>void; label:string; desc?:string; icon:React.ElementType; value:string }) {
  return (
    <button type="button" onClick={()=>onChange(value)}
      className="w-full text-left p-4 rounded-2xl border-2 transition-all hover:border-[var(--primary)]"
      style={{borderColor:checked?'var(--primary)':'var(--border)', background:checked?'var(--primary-light)':'var(--card)'}}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{background:checked?'var(--primary)':'var(--surface)',color:checked?'#fff':'var(--muted)'}}>
          <Icon size={18}/>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{label}</p>
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              style={{borderColor:checked?'var(--primary)':'var(--border)',background:checked?'var(--primary)':'transparent'}}>
              {checked && <Check size={11} color="#fff" strokeWidth={3}/>}
            </div>
          </div>
          {desc && <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>{desc}</p>}
        </div>
      </div>
    </button>
  )
}

export default function RadioPage() {
  const [plan,      setPlan]     = useState('pro')
  const [gender,    setGender]   = useState('')
  const [color,     setColor]    = useState('blue')
  const [delivery,  setDelivery] = useState('standard')
  const [payment,   setPayment]  = useState('card')

  return (
    <>
      <PageBanner title="Radio Buttons" description="Single-select radio inputs in various styles and layouts"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Radio Buttons'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Basic Radio Group"/>
          <div className="space-y-3.5">
            {[{v:'male',l:'Male'},{v:'female',l:'Female'},{v:'other',l:'Non-binary / Other'},{v:'prefer',l:'Prefer not to say',disabled:false}].map(o=>(
              <Radio key={o.v} checked={gender===o.v} onChange={()=>setGender(o.v)} label={o.l}/>
            ))}
            <Radio checked={false} onChange={()=>{}} label="Disabled option" disabled/>
          </div>
        </Card>

        <Card>
          <CardHeader title="Color Variants"/>
          <div className="space-y-3.5">
            {[{v:'blue',l:'Primary',c:'var(--primary)'},{v:'green',l:'Success',c:'var(--success)'},{v:'yellow',l:'Warning',c:'var(--warning)'},{v:'red',l:'Error',c:'var(--error)'},{v:'teal',l:'Secondary',c:'var(--secondary)'},{v:'purple',l:'Purple',c:'var(--purple)'}].map(o=>(
              <Radio key={o.v} checked={color===o.v} onChange={()=>setColor(o.v)} label={o.l} color={o.c}/>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Pricing Plan Selector" subtitle="Common use case for plan selection"/>
          <div className="space-y-3">
            {[{v:'starter',l:'Starter',d:'1 user · 5GB · Basic features',p:'Free'},{v:'pro',l:'Pro',d:'5 users · 50GB · Advanced features',p:'$12/mo'},{v:'enterprise',l:'Enterprise',d:'Unlimited · 1TB · All features',p:'$49/mo'}].map(o=>(
              <button key={o.v} type="button" onClick={()=>setPlan(o.v)}
                className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all"
                style={{borderColor:plan===o.v?'var(--primary)':'var(--border)',background:plan===o.v?'var(--primary-light)':'var(--card)'}}>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{borderColor:plan===o.v?'var(--primary)':'var(--border)',background:plan===o.v?'var(--primary)':'transparent'}}>
                  {plan===o.v&&<span className="w-2 h-2 rounded-full bg-white"/>}
                </div>
                <div className="flex-1"><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{o.l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{o.d}</p></div>
                <span className="font-black text-sm" style={{color:plan===o.v?'var(--primary)':'var(--foreground)'}}>{o.p}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Delivery Method — Card Radio" subtitle="Radio with icon cards"/>
          <div className="space-y-3">
            <RadioCard checked={delivery==='express'} onChange={setDelivery} value="express" label="Express Delivery" desc="Arrives in 1-2 business days · $9.99" icon={Truck}/>
            <RadioCard checked={delivery==='standard'} onChange={setDelivery} value="standard" label="Standard Shipping" desc="Arrives in 5-7 business days · Free" icon={Truck}/>
            <RadioCard checked={delivery==='pickup'} onChange={setDelivery} value="pickup" label="Store Pickup" desc="Available today · Free" icon={Store}/>
          </div>
        </Card>
      </div>
    </>
  )
}
