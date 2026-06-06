'use client'
import React, { PageBanner, Card, CardHeader, Button, Input, Select, Toggle, Toast } from '@/components/ui'
import { useState } from 'react'
import { Save, User, Mail, Phone, Globe, MapPin } from 'lucide-react'

function HField({ label, required=false, children, hint }: { label:string; required?:boolean; children:React.ReactNode; hint?:string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-3.5 border-b last:border-0" style={{borderColor:'var(--border)'}}>
      <label className="sm:w-44 sm:flex-shrink-0 text-sm font-semibold pt-2.5 flex items-center gap-0.5" style={{color:'var(--foreground)'}}>
        {label}{required && <span style={{color:'var(--error)'}}>*</span>}
      </label>
      <div className="flex-1">
        {children}
        {hint && <p className="text-xs mt-1" style={{color:'var(--muted)'}}>{hint}</p>}
      </div>
    </div>
  )
}

export default function HorizontalFormPage() {
  const [toast, setToast] = useState<string|null>(null)
  const [form, setForm] = useState({ name:'', email:'', phone:'', website:'', country:'us', city:'', bio:'', newsletter:false, public:true })
  const [errors, setErrors] = useState<Record<string,string>>({})
  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Invalid email format'
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const save = () => { if (validate()) showToast('Profile saved successfully!') }

  return (
    <>
      <Toast message={toast}/>
      <PageBanner title="Horizontal Form" description="Side-by-side label and input layout, ideal for compact settings pages"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Horizontal'}]}
        action={<Button onClick={save}><Save size={14}/>Save Changes</Button>}/>

      <div className="max-w-3xl space-y-5">
        <Card>
          <CardHeader title="Personal Information" subtitle="Your public profile details"/>
          <HField label="Full Name" required hint="This is shown publicly on your profile">
            <Input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="John Doe" error={errors.name} left={<User size={14}/>}/>
          </HField>
          <HField label="Email Address" required hint="Used for login and notifications">
            <Input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="john@example.com" error={errors.email} left={<Mail size={14}/>}/>
          </HField>
          <HField label="Phone Number" hint="Optional, used for account recovery">
            <Input type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+1 555-0100" left={<Phone size={14}/>}/>
          </HField>
          <HField label="Website" hint="Your personal or company website">
            <Input type="url" value={form.website} onChange={e=>setForm(f=>({...f,website:e.target.value}))} placeholder="https://example.com" left={<Globe size={14}/>}/>
          </HField>
          <HField label="Bio" hint="Max 200 characters">
            <textarea rows={3} value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} placeholder="Tell us a little about yourself…" className="field w-full resize-none"/>
          </HField>
        </Card>

        <Card>
          <CardHeader title="Location" subtitle="Used to show relevant local content"/>
          <HField label="Country">
            <Select value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))}
              options={[{value:'us',label:'United States'},{value:'uk',label:'United Kingdom'},{value:'vn',label:'Vietnam'},{value:'de',label:'Germany'},{value:'fr',label:'France'},{value:'jp',label:'Japan'}]}/>
          </HField>
          <HField label="City" hint="Your city for local time and events">
            <Input value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} placeholder="San Francisco" left={<MapPin size={14}/>}/>
          </HField>
        </Card>

        <Card>
          <CardHeader title="Preferences" subtitle="Control your communication preferences"/>
          <HField label="Newsletter" hint="Get weekly tips and product updates">
            <Toggle checked={form.newsletter} onChange={v=>setForm(f=>({...f,newsletter:v}))} label={form.newsletter?'Subscribed':'Not subscribed'}/>
          </HField>
          <HField label="Public Profile" hint="Allow others to find your profile">
            <Toggle checked={form.public} onChange={v=>setForm(f=>({...f,public:v}))} label={form.public?'Visible to everyone':'Only visible to you'}/>
          </HField>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="ghost">Reset</Button>
          <Button variant="outline">Preview</Button>
          <Button onClick={save}><Save size={14}/>Save Changes</Button>
        </div>
      </div>
    </>
  )
}
