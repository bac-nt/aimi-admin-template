'use client'
import { PageBanner, Card, CardHeader, Button } from '@/components/ui'
import { Toggle } from '@/components/ui'
import { useState } from 'react'
import { Wifi, Bluetooth, Bell, Moon, Shield, Eye, Globe, Zap } from 'lucide-react'

function Switch({ checked, onChange, label, desc, disabled=false, color='var(--primary)', size='md' as 'sm'|'md'|'lg' }:
  { checked:boolean; onChange:(v:boolean)=>void; label?:string; desc?:string; disabled?:boolean; color?:string; size?:'sm'|'md'|'lg' }) {
  const dims = { sm:{w:32,h:18,dot:12}, md:{w:44,h:24,dot:18}, lg:{w:56,h:30,dot:22} }[size]
  const offset = checked ? dims.w-dims.dot-3 : 3
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none ${disabled?'opacity-50 cursor-not-allowed':''}`}>
      <button type="button" disabled={disabled} onClick={()=>!disabled&&onChange(!checked)}
        className="relative flex-shrink-0 rounded-full transition-all duration-200"
        style={{width:dims.w,height:dims.h,background:checked?color:'var(--border)',boxShadow:checked?`0 0 0 3px ${color}22`:undefined}}>
        <span className="absolute top-[3px] rounded-full bg-white shadow-md transition-all duration-200"
          style={{width:dims.dot,height:dims.dot,left:offset}}/>
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

export default function SwitchPage() {
  const [s, setS] = useState({
    wifi:true, bluetooth:false, notifications:true, darkMode:false,
    privacy:true, dataSharing:false, updates:true, analytics:false,
  })
  const [airplane, setAirplane] = useState(false)
  const toggle = (k:keyof typeof s) => setS(p=>({...p,[k]:!p[k]}))

  return (
    <>
      <PageBanner title="Toggle Switches" description="Boolean on/off inputs with multiple sizes, colors and icon styles"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Switches'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Basic Switches" subtitle="Default, disabled and sized variants"/>
          <div className="space-y-5">
            <Switch checked={true}  onChange={()=>{}} label="Enabled (default on)"/>
            <Switch checked={false} onChange={()=>{}} label="Disabled state" disabled/>
            <Switch checked={true}  onChange={()=>{}} label="Disabled checked" disabled/>
            <div className="pt-2 border-t" style={{borderColor:'var(--border)'}}>
              <p className="text-xs font-bold uppercase mb-3" style={{color:'var(--muted)'}}>Sizes</p>
              <div className="space-y-4">
                <Switch checked={true} onChange={()=>{}} label="Small"  size="sm"/>
                <Switch checked={true} onChange={()=>{}} label="Medium" size="md"/>
                <Switch checked={true} onChange={()=>{}} label="Large"  size="lg"/>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Color Variants"/>
          <div className="space-y-5">
            {[
              {l:'Primary',   c:'var(--primary)'},
              {l:'Success',   c:'var(--success)'},
              {l:'Warning',   c:'var(--warning)'},
              {l:'Error',     c:'var(--error)'},
              {l:'Secondary', c:'var(--secondary)'},
              {l:'Purple',    c:'var(--purple)'},
            ].map(({l,c},i)=>(
              <Switch key={i} checked={true} onChange={()=>{}} label={l} color={c}/>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Connectivity Settings" subtitle="System-style settings panel"/>
          <div className="space-y-0 divide-y" style={{borderColor:'var(--border)'}}>
            {[
              {k:'wifi' as const,          l:'Wi-Fi',           d:'Connect to wireless networks',   Icon:Wifi},
              {k:'bluetooth' as const,     l:'Bluetooth',       d:'Pair with nearby devices',        Icon:Bluetooth},
              {k:'notifications' as const, l:'Notifications',   d:'Allow push alerts',               Icon:Bell},
              {k:'darkMode' as const,      l:'Dark Mode',       d:'Switch to dark theme',            Icon:Moon},
            ].map(({k,l,d,Icon})=>(
              <div key={k} className="flex items-center justify-between py-4" style={{borderColor:'var(--border)'}}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:s[k]?'var(--primary)':'var(--surface)',color:s[k]?'#fff':'var(--muted)',transition:'all 0.2s'}}>
                    <Icon size={16}/>
                  </div>
                  <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{d}</p></div>
                </div>
                <Switch checked={s[k]} onChange={()=>toggle(k)} size="sm"/>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Privacy & Security"/>
          <div className="space-y-0 divide-y" style={{borderColor:'var(--border)'}}>
            {[
              {k:'privacy' as const,     l:'Private Profile',   d:'Hide from search results',   Icon:Eye,    c:'var(--success)'},
              {k:'dataSharing' as const, l:'Data Sharing',      d:'Allow usage analytics',       Icon:Globe,  c:'var(--warning)'},
              {k:'updates' as const,     l:'Auto Updates',      d:'Install updates automatically',Icon:Zap,   c:'var(--primary)'},
              {k:'analytics' as const,   l:'Analytics',         d:'Help improve the product',    Icon:Shield, c:'var(--secondary)'},
            ].map(({k,l,d,Icon,c})=>(
              <div key={k} className="flex items-center justify-between py-4" style={{borderColor:'var(--border)'}}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:c+'18',color:c}}>
                    <Icon size={16}/>
                  </div>
                  <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{d}</p></div>
                </div>
                <Switch checked={s[k]} onChange={()=>toggle(k)} color={c} size="sm"/>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4"><Button>Save Settings</Button></div>
        </Card>
      </div>
    </>
  )
}
