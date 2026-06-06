'use client'
import { useState } from 'react'
import { PageBanner, Card, CardHeader, Button, Input, Tabs, Toggle, Alert } from '@/components/ui'
import { User, Lock, Bell, Globe, Palette, CreditCard, Upload, Save, Eye, EyeOff } from 'lucide-react'

export default function AccountSettingPage() {
  const [toast, setToast] = useState<string|null>(null)
  const [showPw, setShowPw] = useState(false)
  const [profile, setProfile] = useState({ name:'Mathew Anderson', email:'admin@modernize.com', phone:'+1 555-0100', bio:'Admin at Modernize. Passionate about great UI.', website:'https://modernize.com', timezone:'UTC-5', language:'en' })
  const [notifs, setNotifs] = useState({ email:true, push:true, orders:true, comments:true, security:true, newsletter:false })

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const TABS = [
    { label:'Profile', content:(
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1">
          <CardHeader title="Avatar"/>
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black" style={{background:'var(--primary)'}}>MA</div>
            <Button variant="outline" size="sm"><Upload size={13}/>Upload Photo</Button>
            <p className="text-xs text-center" style={{color:'var(--muted)'}}>PNG, JPG max 2MB</p>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Personal Information"/>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name *"   value={profile.name}    onChange={e=>setProfile(p=>({...p,name:e.target.value}))}    className="col-span-2 sm:col-span-1"/>
            <Input label="Email *"       value={profile.email}   onChange={e=>setProfile(p=>({...p,email:e.target.value}))}   type="email" className="col-span-2 sm:col-span-1"/>
            <Input label="Phone"         value={profile.phone}   onChange={e=>setProfile(p=>({...p,phone:e.target.value}))}   className="col-span-2 sm:col-span-1"/>
            <Input label="Website"       value={profile.website} onChange={e=>setProfile(p=>({...p,website:e.target.value}))} className="col-span-2 sm:col-span-1"/>
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Bio</label>
              <textarea rows={3} value={profile.bio} onChange={e=>setProfile(p=>({...p,bio:e.target.value}))} className="field w-full resize-none"/>
            </div>
          </div>
          <div className="flex justify-end mt-4"><Button onClick={()=>showToast('Profile saved!')}><Save size={14}/>Save Changes</Button></div>
        </Card>
      </div>
    )},
    { label:'Password', content:(
      <Card className="max-w-lg">
        <CardHeader title="Change Password" subtitle="Use a strong password with 12+ characters"/>
        <div className="space-y-4">
          <Input label="Current Password" type={showPw?'text':'password'} placeholder="••••••••"
            right={<button type="button" onClick={()=>setShowPw(v=>!v)}>{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</button>}/>
          <Input label="New Password" type={showPw?'text':'password'} placeholder="••••••••"
            hint="Min 12 characters, uppercase, number, special char"/>
          <Input label="Confirm Password" type={showPw?'text':'password'} placeholder="••••••••"/>
          <div className="p-3 rounded-xl space-y-1.5" style={{background:'var(--surface)'}}>
            {[{l:'12+ characters',ok:true},{l:'Uppercase letter',ok:true},{l:'Number',ok:true},{l:'Special character',ok:false}].map((p,i)=>(
              <div key={i} className="flex items-center gap-2 text-xs"><span style={{color:p.ok?'var(--success)':'var(--muted)'}}>{p.ok?'✓':'○'}</span><span style={{color:p.ok?'var(--foreground)':'var(--muted)'}}>{p.l}</span></div>
            ))}
          </div>
          <Button className="w-full" onClick={()=>showToast('Password updated!')}><Lock size={14}/>Update Password</Button>
        </div>
      </Card>
    )},
    { label:'Notifications', content:(
      <Card className="max-w-xl">
        <CardHeader title="Notification Preferences" subtitle="Choose what you want to be notified about"/>
        <div className="space-y-3">
          {[
            {k:'email' as const,    l:'Email Notifications',  d:'Receive updates via email'},
            {k:'push' as const,     l:'Push Notifications',   d:'Browser push notifications'},
            {k:'orders' as const,   l:'New Orders',           d:'Alert when new order is placed'},
            {k:'comments' as const, l:'Comments',             d:'New blog comments'},
            {k:'security' as const, l:'Security Alerts',      d:'Login from new device'},
            {k:'newsletter' as const,l:'Newsletter',          d:'Weekly digest and tips'},
          ].map(n=>(
            <div key={n.k} className="flex items-center justify-between p-3.5 rounded-xl border" style={{borderColor:'var(--border)'}}>
              <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{n.l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{n.d}</p></div>
              <Toggle checked={notifs[n.k]} onChange={v=>setNotifs(ns=>({...ns,[n.k]:v}))} size="sm"/>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4"><Button onClick={()=>showToast('Preferences saved!')}><Save size={14}/>Save Preferences</Button></div>
      </Card>
    )},
    { label:'Preferences', content:(
      <Card className="max-w-lg">
        <CardHeader title="App Preferences"/>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Language</label>
            <select className="field w-full" value={profile.language} onChange={e=>setProfile(p=>({...p,language:e.target.value}))}>
              <option value="en">English</option><option value="vi">Tiếng Việt</option><option value="fr">Français</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Timezone</label>
            <select className="field w-full" value={profile.timezone} onChange={e=>setProfile(p=>({...p,timezone:e.target.value}))}>
              {['UTC-12','UTC-8','UTC-7','UTC-6','UTC-5','UTC+0','UTC+1','UTC+7','UTC+9'].map(tz=><option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>
          <div className="flex justify-end"><Button onClick={()=>showToast('Preferences saved!')}><Save size={14}/>Save</Button></div>
        </div>
      </Card>
    )},
  ]

  return (
    <>
      <PageBanner title="Account Settings" breadcrumbs={[{label:'Home',href:'/'},{label:'Administration'},{label:'Account Settings'}]}/>
      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}
      <Tabs items={TABS} variant="card"/>
    </>
  )
}
