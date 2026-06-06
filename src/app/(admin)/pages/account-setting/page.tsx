'use client'
import { useState } from 'react'
import { Toast, PageBanner, Card, CardHeader, Button, Input, Tabs, Toggle, Select } from '@/components/ui'
import { User, Lock, Bell, Save, Eye, EyeOff, Upload, Globe, Palette, Shield, CreditCard } from 'lucide-react'

export default function AccountSettingPage() {
  const [toast,    setToast]   = useState<string|null>(null)
  const [showPw,   setShowPw]  = useState(false)
  const [pwForm,   setPwForm]  = useState({ current:'', next:'', confirm:'' })
  const [profile,  setProfile] = useState({ name:'Mathew Anderson', email:'admin@aimi.com', phone:'+1 555-0100', bio:'Admin at Aimi. Passionate about great UI.', website:'https://aimi.com', company:'Aimi Inc.', role:'Super Admin' })
  const [notifs,   setNotifs]  = useState({ email:true, push:true, orders:true, comments:true, security:true, newsletter:false, sms:false, desktop:true })
  const [prefs,    setPrefs]   = useState({ language:'en', timezone:'UTC-5', dateFormat:'MM/DD/YYYY', currency:'USD', theme:'light' })

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const pwStrength = [pwForm.next.length >= 8, /[A-Z]/.test(pwForm.next), /[0-9]/.test(pwForm.next), /[^A-Za-z0-9]/.test(pwForm.next)]
  const pwScore = pwStrength.filter(Boolean).length

  const TABS = [
    {
      label: 'Profile',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Avatar card */}
          <Card>
            <CardHeader title="Profile Photo"/>
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-white text-4xl font-black" style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))'}}>MA</div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{background:'var(--primary)'}}><Upload size={13}/></div>
              </div>
              <div className="text-center">
                <p className="font-bold" style={{color:'var(--foreground)'}}>Mathew Anderson</p>
                <p className="text-xs" style={{color:'var(--muted)'}}>Super Admin</p>
              </div>
              <Button variant="outline" size="sm" className="w-full"><Upload size={13}/>Upload New Photo</Button>
              <p className="text-xs text-center" style={{color:'var(--muted)'}}>PNG, JPG, GIF · Max 2MB</p>
            </div>
          </Card>

          {/* Info card */}
          <Card className="lg:col-span-2">
            <CardHeader title="Personal Information" subtitle="Update your name, bio and contact details"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name *" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))}/>
              <Input label="Username" value="mathew.anderson" disabled hint="Username cannot be changed"/>
              <Input label="Email Address *" type="email" value={profile.email} onChange={e=>setProfile(p=>({...p,email:e.target.value}))}/>
              <Input label="Phone Number" type="tel" value={profile.phone} onChange={e=>setProfile(p=>({...p,phone:e.target.value}))}/>
              <Input label="Company" value={profile.company} onChange={e=>setProfile(p=>({...p,company:e.target.value}))}/>
              <Input label="Website" type="url" value={profile.website} onChange={e=>setProfile(p=>({...p,website:e.target.value}))}/>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Bio</label>
                <textarea rows={3} value={profile.bio} onChange={e=>setProfile(p=>({...p,bio:e.target.value}))} className="field w-full resize-none" placeholder="Tell us about yourself..."/>
              </div>
            </div>
            <div className="flex justify-end mt-5 pt-4 border-t gap-2" style={{borderColor:'var(--border)'}}>
              <Button variant="ghost">Cancel</Button>
              <Button onClick={()=>showToast('Profile saved successfully!')}><Save size={14}/>Save Changes</Button>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: 'Security',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-3xl">
          {/* Change password */}
          <Card className="lg:col-span-2">
            <CardHeader title="Change Password" subtitle="Use a strong password of at least 12 characters"/>
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
              <div className="sm:col-span-2">
                <Input label="Current Password" type={showPw?'text':'password'} value={pwForm.current}
                  onChange={e=>setPwForm(f=>({...f,current:e.target.value}))}
                  right={<button type="button" onClick={()=>setShowPw(v=>!v)} style={{color:'var(--muted)'}}>{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</button>}/>
              </div>
              <Input label="New Password" type={showPw?'text':'password'} value={pwForm.next} onChange={e=>setPwForm(f=>({...f,next:e.target.value}))}/>
              <Input label="Confirm New Password" type={showPw?'text':'password'} value={pwForm.confirm}
                onChange={e=>setPwForm(f=>({...f,confirm:e.target.value}))}
                error={pwForm.confirm && pwForm.confirm!==pwForm.next ? 'Passwords do not match' : undefined}/>
            </div>
            {pwForm.next && (
              <div className="mt-3 max-w-lg">
                <div className="flex gap-1 mb-2">
                  {[0,1,2,3].map(i=>(
                    <div key={i} className="flex-1 h-1.5 rounded-full transition-all" style={{background: i<pwScore ? ['var(--error)','var(--warning)','var(--warning)','var(--success)'][pwScore-1] : 'var(--border)'}}/>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {[{l:'8+ characters',ok:pwForm.next.length>=8},{l:'Uppercase letter',ok:/[A-Z]/.test(pwForm.next)},{l:'Number',ok:/[0-9]/.test(pwForm.next)},{l:'Special character',ok:/[^A-Za-z0-9]/.test(pwForm.next)}].map((r,i)=>(
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <span style={{color:r.ok?'var(--success)':'var(--muted)'}}>{r.ok?'✓':'○'}</span>
                      <span style={{color:r.ok?'var(--foreground)':'var(--muted)'}}>{r.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4">
              <Button onClick={()=>showToast('Password updated successfully!')}><Lock size={14}/>Update Password</Button>
            </div>
          </Card>

          {/* 2FA */}
          <Card>
            <CardHeader title="Two-Factor Authentication" subtitle="Add an extra layer of security"/>
            <div className="flex items-start gap-3 p-4 rounded-xl mb-4" style={{background:'var(--success-light)'}}>
              <Shield size={18} style={{color:'var(--success)'}} className="flex-shrink-0 mt-0.5"/>
              <div><p className="font-semibold text-sm" style={{color:'var(--success)'}}>2FA is enabled</p><p className="text-xs" style={{color:'var(--muted)'}}>Your account is protected with authenticator app</p></div>
            </div>
            <Button variant="outline" className="w-full">Manage 2FA Settings</Button>
          </Card>

          {/* Sessions */}
          <Card>
            <CardHeader title="Active Sessions" subtitle="Devices logged into your account"/>
            {[{device:'Chrome / macOS',loc:'San Francisco',time:'Active now',current:true},{device:'Safari / iPhone',loc:'San Francisco',time:'2 hours ago',current:false}].map((s,i)=>(
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{s.device}</p><p className="text-xs" style={{color:'var(--muted)'}}>{s.loc} · {s.time}</p></div>
                {s.current ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background:'var(--success-light)',color:'var(--success)'}}>Current</span> : <button type="button" className="text-xs font-semibold hover:opacity-70" style={{color:'var(--error)'}}>Revoke</button>}
              </div>
            ))}
          </Card>
        </div>
      ),
    },
    {
      label: 'Notifications',
      content: (
        <div className="max-w-xl space-y-4">
          <Card>
            <CardHeader title="Email & Push" subtitle="Control how you receive alerts"/>
            <div className="space-y-3">
              {[
                {k:'email'    as const, l:'Email Notifications',   d:'Receive updates and alerts by email'},
                {k:'push'     as const, l:'Push Notifications',    d:'Browser push notifications'},
                {k:'desktop'  as const, l:'Desktop Notifications', d:'System-level desktop alerts'},
                {k:'sms'      as const, l:'SMS Alerts',            d:'Text message for critical events'},
              ].map(n=>(
                <div key={n.k} className="flex items-center justify-between p-3.5 rounded-xl border" style={{borderColor:'var(--border)'}}>
                  <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{n.l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{n.d}</p></div>
                  <Toggle checked={notifs[n.k]} onChange={v=>setNotifs(ns=>({...ns,[n.k]:v}))} size="sm"/>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Activity Alerts" subtitle="Choose which activities trigger notifications"/>
            <div className="space-y-3">
              {[
                {k:'orders'    as const, l:'New Orders',       d:'When a customer places an order'},
                {k:'comments'  as const, l:'Comments',         d:'New comments on your blog posts'},
                {k:'security'  as const, l:'Security Alerts',  d:'Login from unrecognized device'},
                {k:'newsletter'as const, l:'Newsletter',       d:'Weekly tips and product updates'},
              ].map(n=>(
                <div key={n.k} className="flex items-center justify-between p-3.5 rounded-xl border" style={{borderColor:'var(--border)'}}>
                  <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{n.l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{n.d}</p></div>
                  <Toggle checked={notifs[n.k]} onChange={v=>setNotifs(ns=>({...ns,[n.k]:v}))} size="sm"/>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex justify-end"><Button onClick={()=>showToast('Notification preferences saved!')}><Save size={14}/>Save Preferences</Button></div>
        </div>
      ),
    },
    {
      label: 'Preferences',
      content: (
        <div className="max-w-lg space-y-5">
          <Card>
            <CardHeader title="Regional Settings" subtitle="Language, timezone and formats"/>
            <div className="space-y-4">
              <Select label="Language" value={prefs.language} onChange={e=>setPrefs(p=>({...p,language:e.target.value}))}
                options={[{value:'en',label:'English (US)'},{value:'vi',label:'Tiếng Việt'},{value:'fr',label:'Français'},{value:'de',label:'Deutsch'},{value:'ja',label:'日本語'}]}/>
              <Select label="Timezone" value={prefs.timezone} onChange={e=>setPrefs(p=>({...p,timezone:e.target.value}))}
                options={['UTC-12','UTC-8','UTC-7','UTC-6','UTC-5','UTC+0','UTC+1','UTC+7','UTC+9'].map(tz=>({value:tz,label:tz}))}/>
              <Select label="Date Format" value={prefs.dateFormat} onChange={e=>setPrefs(p=>({...p,dateFormat:e.target.value}))}
                options={['MM/DD/YYYY','DD/MM/YYYY','YYYY-MM-DD'].map(v=>({value:v,label:v}))}/>
              <Select label="Currency" value={prefs.currency} onChange={e=>setPrefs(p=>({...p,currency:e.target.value}))}
                options={[{value:'USD',label:'USD — US Dollar'},{value:'EUR',label:'EUR — Euro'},{value:'GBP',label:'GBP — British Pound'},{value:'VND',label:'VND — Vietnamese Dong'}]}/>
            </div>
          </Card>
          <div className="flex justify-end gap-2">
            <Button variant="ghost">Reset to Default</Button>
            <Button onClick={()=>showToast('Preferences saved!')}><Save size={14}/>Save Preferences</Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      <Toast message={toast}/>
      <PageBanner title="Account Settings" description="Manage your profile, security and preferences"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Administration'},{label:'Account Settings'}]}
        action={<Button onClick={()=>showToast('All settings saved!')}><Save size={14}/>Save All</Button>}/>
      <Tabs items={TABS} variant="card"/>
    </>
  )
}
