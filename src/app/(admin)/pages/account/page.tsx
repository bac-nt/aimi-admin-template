'use client'
import { PageBanner, Button, Toggle, Avatar } from '@/components/ui'
import { User, Lock, Bell, Shield, Camera, Eye, EyeOff, Check } from 'lucide-react'
import { useState } from 'react'

const TABS = [{id:'profile',label:'Profile',Icon:User},{id:'security',label:'Security',Icon:Lock},{id:'notifications',label:'Notifications',Icon:Bell},{id:'privacy',label:'Privacy',Icon:Shield}]

export default function AccountPage() {
  const [tab,    setTab]   = useState('profile')
  const [showPw, setShowPw]= useState(false)
  const [saved,  setSaved] = useState(false)
  const [notifs, setNotifs]= useState({email:true,push:false,sms:true,newsletter:false,product:true,security:true})
  const save = () => {setSaved(true);setTimeout(()=>setSaved(false),2500)}

  return (
    <>
      <PageBanner title="Account Settings" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Account'}]}/>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="card p-3 h-fit">
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all mb-0.5" style={tab===t.id?{background:'var(--primary-light)',color:'var(--primary)'}:{color:'var(--muted)'}}>
              <t.Icon size={17}/>{t.label}
            </button>
          ))}
        </div>
        <div className="xl:col-span-3">
          {tab==='profile'&&(
            <div className="card p-6">
              <h3 className="font-bold mb-5" style={{color:'var(--foreground)'}}>Profile Information</h3>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{borderColor:'var(--border)'}}>
                <div className="relative">
                  <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" name="Mathew Anderson" size="xl" className="rounded-[var(--radius-lg)]"/>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{background:'var(--primary)'}}><Camera size={13}/></button>
                </div>
                <div><p className="font-bold" style={{color:'var(--foreground)'}}>Mathew Anderson</p><p className="text-sm" style={{color:'var(--muted)'}}>Administrator · San Francisco, CA</p><button className="text-xs font-semibold mt-1" style={{color:'var(--primary)'}}>Change photo</button></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[['First Name','Mathew'],['Last Name','Anderson'],['Email','admin@modernize.com'],['Phone','+1 234 567 8900'],['Job Title','Full Stack Developer'],['Company','Modernize Inc.']].map(([l,v])=>(
                  <div key={l}><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>{l}</label><input className="field w-full" defaultValue={v}/></div>
                ))}
              </div>
              <div className="mb-5"><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Bio</label><textarea className="field w-full resize-none" rows={3} defaultValue="Full-stack developer with 8+ years of experience."/></div>
              <div className="flex gap-3">{saved?<Button variant="success"><Check size={14}/>Saved!</Button>:<Button onClick={save}>Save Changes</Button>}<Button variant="ghost">Cancel</Button></div>
            </div>
          )}
          {tab==='security'&&(
            <div className="card p-6">
              <h3 className="font-bold mb-5" style={{color:'var(--foreground)'}}>Change Password</h3>
              <div className="max-w-sm space-y-4 mb-6">
                {[['Current Password',false],['New Password',showPw],['Confirm Password',false]].map(([l,show],i)=>(
                  <div key={i}><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>{l as string}</label><div className="relative"><input type={show?'text':'password'} className="field w-full pr-10" placeholder="••••••••"/>{i===1&&<button onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{color:'var(--muted)'}}>{showPw?<EyeOff size={15}/>:<Eye size={15}/>}</button>}</div></div>
                ))}
                <Button>Update Password</Button>
              </div>
              <div className="border-t pt-5" style={{borderColor:'var(--border)'}}>
                <h4 className="font-bold mb-3" style={{color:'var(--foreground)'}}>Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 rounded-xl" style={{background:'var(--surface)'}}>
                  <div><p className="font-medium text-sm" style={{color:'var(--foreground)'}}>Authenticator App</p><p className="text-xs" style={{color:'var(--muted)'}}>Use an authenticator app for extra security</p></div>
                  <Toggle checked={false} onChange={()=>{}}/>
                </div>
              </div>
            </div>
          )}
          {tab==='notifications'&&(
            <div className="card p-6">
              <h3 className="font-bold mb-5" style={{color:'var(--foreground)'}}>Notification Preferences</h3>
              <div className="space-y-3">
                {(Object.entries(notifs) as [keyof typeof notifs,boolean][]).map(([k,v])=>(
                  <div key={k} className="flex items-center justify-between p-4 rounded-xl border" style={{borderColor:'var(--border)'}}>
                    <div><p className="font-medium text-sm capitalize" style={{color:'var(--foreground)'}}>{k.replace(/([A-Z])/g,' $1')} Notifications</p><p className="text-xs" style={{color:'var(--muted)'}}>Receive {k} notifications</p></div>
                    <Toggle checked={v} onChange={()=>setNotifs(n=>({...n,[k]:!v}))}/>
                  </div>
                ))}
              </div>
              <div className="mt-5"><Button onClick={save}>{saved?'Saved!':'Save Preferences'}</Button></div>
            </div>
          )}
          {tab==='privacy'&&(
            <div className="card p-6">
              <h3 className="font-bold mb-5" style={{color:'var(--foreground)'}}>Privacy Settings</h3>
              <div className="space-y-3 mb-6">
                {[['Public Profile','Allow others to view your profile',true],['Search Visibility','Appear in search results',true],['Activity Status','Show when you were last active',false],['Data Analytics','Help improve by sharing usage data',true]].map(([l,d,v],i)=>(
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border" style={{borderColor:'var(--border)'}}>
                    <div><p className="font-medium text-sm" style={{color:'var(--foreground)'}}>{l as string}</p><p className="text-xs" style={{color:'var(--muted)'}}>{d as string}</p></div>
                    <Toggle checked={v as boolean} onChange={()=>{}}/>
                  </div>
                ))}
              </div>
              <div className="p-4 border rounded-xl" style={{borderColor:'var(--error)',background:'var(--error-light)'}}>
                <p className="font-bold text-sm mb-1" style={{color:'var(--error)'}}>Danger Zone</p>
                <p className="text-xs mb-3" style={{color:'var(--error)'}}>Once deleted, there is no going back.</p>
                <Button variant="error" size="sm">Delete Account</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
