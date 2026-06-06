'use client'
import { PageBanner, Card, CardHeader, Button } from '@/components/ui'
import { useState } from 'react'
import { Check, Minus } from 'lucide-react'

function Checkbox({ checked, onChange, label, desc, disabled=false, indeterminate=false, color='var(--primary)', size=18 }:
  { checked:boolean; onChange:(v:boolean)=>void; label?:string; desc?:string; disabled?:boolean; indeterminate?:boolean; color?:string; size?:number }) {
  const active = checked || indeterminate
  return (
    <label className={`flex items-start gap-3 cursor-pointer select-none group ${disabled?'opacity-50 cursor-not-allowed':''}`}>
      <button type="button" disabled={disabled} onClick={()=>!disabled&&onChange(!checked)}
        className="flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all"
        style={{
          width:size, height:size, marginTop:2,
          background: active ? color : 'var(--card)',
          borderColor: active ? color : 'var(--border)',
          boxShadow: active ? `0 0 0 3px ${color}22` : undefined,
        }}>
        {indeterminate
          ? <Minus size={size*0.6} color="#fff" strokeWidth={3}/>
          : checked ? <Check size={size*0.6} color="#fff" strokeWidth={3}/> : null
        }
      </button>
      {label && (
        <div>
          <p className="text-sm font-medium leading-tight" style={{color:disabled?'var(--muted)':'var(--foreground)'}}>{label}</p>
          {desc && <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>{desc}</p>}
        </div>
      )}
    </label>
  )
}

export default function CheckboxPage() {
  const [basic, setBasic] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [fruits, setFruits] = useState({apple:true,banana:false,cherry:true,mango:false,grape:true})
  const [permissions, setPermissions] = useState({read:true,write:true,delete:false,admin:false})
  const [agree, setAgree] = useState(false)
  const [notify, setNotify] = useState({email:true,sms:false,push:true})

  const fruitVals = Object.values(fruits)
  const allFruits = fruitVals.every(Boolean)
  const someFruits = fruitVals.some(Boolean) && !allFruits
  const toggleAllFruits = () => setFruits(f => Object.fromEntries(Object.keys(f).map(k=>[k,!allFruits])) as typeof f)

  return (
    <>
      <PageBanner title="Checkboxes" description="Custom checkbox inputs with groups, states and indeterminate support"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Checkboxes'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Basic Checkboxes" subtitle="Default checked, unchecked, and disabled states"/>
          <div className="space-y-4">
            <Checkbox checked={basic} onChange={setBasic} label="Unchecked by default"/>
            <Checkbox checked={checked2} onChange={setChecked2} label="Checked by default"/>
            <Checkbox checked={false} onChange={()=>{}} label="Disabled unchecked" disabled/>
            <Checkbox checked={true}  onChange={()=>{}} label="Disabled checked"   disabled/>
            <Checkbox checked={false} onChange={()=>{}} label="Indeterminate state" indeterminate/>
          </div>
        </Card>

        <Card>
          <CardHeader title="Color Variants"/>
          <div className="space-y-4">
            {[
              {l:'Primary',   c:'var(--primary)'},
              {l:'Success',   c:'var(--success)'},
              {l:'Warning',   c:'var(--warning)'},
              {l:'Error',     c:'var(--error)'},
              {l:'Secondary', c:'var(--secondary)'},
              {l:'Purple',    c:'var(--purple)'},
            ].map(({l,c},i)=>(
              <Checkbox key={i} checked={true} onChange={()=>{}} label={l} color={c}/>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Checkbox Group — Select All" subtitle="Parent checkbox controls all children"/>
          <div className="space-y-3">
            <Checkbox
              checked={allFruits} indeterminate={someFruits}
              onChange={toggleAllFruits}
              label="Select All Fruits"
              desc={`${fruitVals.filter(Boolean).length} of ${fruitVals.length} selected`}/>
            <div className="ml-6 space-y-3 border-l-2 pl-4" style={{borderColor:'var(--border)'}}>
              {(Object.keys(fruits) as (keyof typeof fruits)[]).map(k=>(
                <Checkbox key={k} checked={fruits[k]} onChange={v=>setFruits(f=>({...f,[k]:v}))}
                  label={k.charAt(0).toUpperCase()+k.slice(1)}/>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Permissions Matrix" subtitle="Role-based access control checkboxes"/>
          <div className="space-y-3">
            {(Object.keys(permissions) as (keyof typeof permissions)[]).map(k=>(
              <Checkbox key={k} checked={permissions[k]} onChange={v=>setPermissions(p=>({...p,[k]:v}))}
                label={k.charAt(0).toUpperCase()+k.slice(1)+' access'}
                desc={{read:'View and read all content',write:'Create and edit records',delete:'Remove records permanently',admin:'Full system access'}[k]}
                color={k==='delete'||k==='admin'?'var(--error)':'var(--primary)'}/>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Notification Preferences" subtitle="With description per option"/>
          <div className="space-y-3">
            {[
              {k:'email' as const, l:'Email notifications',     d:'Get updates in your inbox'},
              {k:'push'  as const, l:'Push notifications',      d:'Browser & mobile alerts'},
              {k:'sms'   as const, l:'SMS text messages',       d:'Text alerts for urgent events'},
            ].map(n=>(
              <div key={n.k} className="p-3.5 rounded-xl border" style={{borderColor:'var(--border)'}}>
                <Checkbox checked={notify[n.k]} onChange={v=>setNotify(p=>({...p,[n.k]:v}))}
                  label={n.l} desc={n.d}/>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Large Checkbox" subtitle="Bigger touch target for mobile"/>
          <div className="space-y-4">
            <Checkbox checked={agree} onChange={setAgree} size={24}
              label="I agree to the Terms of Service and Privacy Policy"
              desc="By checking this you accept all terms"/>
            <Button className="w-full" disabled={!agree}>Continue</Button>
          </div>
        </Card>
      </div>
    </>
  )
}
