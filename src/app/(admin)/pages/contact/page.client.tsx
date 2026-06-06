'use client'
import { PageBanner, Card, Button, Input, Textarea, Select, Alert } from '@/components/ui'
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare, Globe, Twitter, Github, Linkedin } from 'lucide-react'
import { useState } from 'react'

const CONTACT_INFO = [
  { icon:Mail,    label:'Email',    value:'hello@modernize.dev',     sub:'We reply within 24h',        color:'var(--primary)'   },
  { icon:Phone,   label:'Phone',    value:'+1 (555) 123-4567',       sub:'Mon–Fri, 9am–6pm PST',       color:'var(--success)'   },
  { icon:MapPin,  label:'Address',  value:'123 Design St, SF CA',    sub:'San Francisco, CA 94105',    color:'var(--warning)'   },
  { icon:Clock,   label:'Hours',    value:'Mon–Fri 9am–6pm',         sub:'Pacific Standard Time',      color:'var(--secondary)' },
]
const DEPT_OPTIONS = [
  {value:'sales',   label:'Sales'},
  {value:'support', label:'Technical Support'},
  {value:'billing', label:'Billing'},
  {value:'other',   label:'Other'},
]

export default function ContactPage() {
  const [sent, setSent]       = useState(false)
  const [dept, setDept]       = useState('support')
  const [form, setForm]       = useState({name:'',email:'',subject:'',message:''})
  const [errors, setErrors]   = useState<Record<string,string>>({})

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const submit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSent(true)
    setForm({name:'',email:'',subject:'',message:''})
    setErrors({})
  }

  return (
    <>
      <PageBanner title="Contact Us" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Contact'}]} description="We are here to help — reach out anytime"/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Contact form */}
        <div className="xl:col-span-2">
          <Card>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'var(--primary-light)'}}><MessageSquare size={18} style={{color:'var(--primary)'}}/></div>
              <div><h2 className="font-bold" style={{color:'var(--foreground)'}}>Send a Message</h2><p className="text-xs" style={{color:'var(--muted)'}}>Fill out the form and we will get back to you ASAP</p></div>
            </div>

            {sent && (
              <Alert variant="success" title="Message sent!" dismissible className="mb-5">
                Thank you! We will respond to your inquiry within 24 hours.
              </Alert>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name *" placeholder="John Doe" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} error={errors.name}/>
              <Input label="Email Address *" type="email" placeholder="john@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} error={errors.email}/>
              <div>
                <Select label="Department" options={DEPT_OPTIONS} value={dept} onChange={setDept}/>
              </div>
              <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}/>
              <div className="sm:col-span-2">
                <Textarea label="Message *" rows={5} placeholder="Describe your question or issue in detail..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} error={errors.message}/>
              </div>
              <div className="sm:col-span-2 flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center" style={{background:'var(--primary)',borderColor:'var(--primary)'}}><Check size={10} className="text-white"/></div>
                  <span className="text-xs" style={{color:'var(--muted)'}}>I agree to the privacy policy and terms</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Button onClick={submit}><Send size={14}/>Send Message</Button>
              <Button variant="ghost" onClick={()=>{setForm({name:'',email:'',subject:'',message:''});setErrors({});setSent(false)}}>Clear Form</Button>
            </div>
          </Card>
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          {CONTACT_INFO.map(c=>(
            <Card key={c.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:c.color+'22'}}><c.icon size={18} style={{color:c.color}}/></div>
              <div><p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{color:'var(--muted)'}}>{c.label}</p><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{c.value}</p><p className="text-xs" style={{color:'var(--muted)'}}>{c.sub}</p></div>
            </Card>
          ))}
          <Card>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{color:'var(--muted)'}}>Follow Us</p>
            <div className="flex gap-2">
              {[{Icon:Twitter,label:'Twitter',color:'#1da1f2'},{Icon:Github,label:'GitHub',color:'var(--foreground)'},{Icon:Linkedin,label:'LinkedIn',color:'#0077b5'},{Icon:Globe,label:'Website',color:'var(--primary)'}].map(s=>(
                <button key={s.label} className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all hover:scale-105" style={{borderColor:'var(--border)',background:'var(--surface)'}}>
                  <s.Icon size={18} style={{color:s.color}}/>
                  <span className="text-[10px] font-medium" style={{color:'var(--muted)'}}>{s.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
