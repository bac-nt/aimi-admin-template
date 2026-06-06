'use client'
import { PageBanner, Card, CardHeader, Button, Input, Select, Toast } from '@/components/ui'
import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

type FieldState = 'idle'|'valid'|'error'

function validate(field: string, value: string): string {
  switch(field) {
    case 'name':     return value.trim().length<2?'Must be at least 2 characters':'';
    case 'email':    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)?'Enter a valid email address':'';
    case 'phone':    return value&&!/^\+?[\d\s\-()]{7,}$/.test(value)?'Enter a valid phone number':'';
    case 'password': return value.length<8?'Minimum 8 characters required':'';
    case 'confirm':  return '';  // handled separately
    case 'website':  return value&&!/^https?:\/\/.+/.test(value)?'Must start with http:// or https://':'';
    case 'age':      return isNaN(+value)||+value<18||+value>120?'Must be between 18 and 120':'';
    default: return value.trim()?'':'This field is required';
  }
}

export default function ValidationPage() {
  const [toast, setToast] = useState<string|null>(null)
  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const [vals, setVals] = useState({ name:'',email:'',phone:'',password:'',confirm:'',website:'',age:'',country:'' })
  const [touched, setTouched] = useState<Record<string,boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const getError = (k: keyof typeof vals) => {
    if (!touched[k] && !submitted) return ''
    if (k==='confirm') return vals.confirm!==vals.password?'Passwords do not match':''
    if (k==='country') return !vals.country?'Please select a country':''
    return validate(k, vals[k])
  }
  const getState = (k: keyof typeof vals): FieldState => {
    if (!touched[k] && !submitted) return 'idle'
    return getError(k)?'error':'valid'
  }

  const handleBlur = (k: keyof typeof vals) => setTouched(t=>({...t,[k]:true}))
  const set = (k: keyof typeof vals, v: string) => setVals(f=>({...f,[k]:v}))

  const handleSubmit = () => {
    setSubmitted(true)
    setTouched(Object.fromEntries(Object.keys(vals).map(k=>[k,true])))
    const anyError = Object.keys(vals).some(k=>getError(k as keyof typeof vals))
    if (!anyError) showToast('Form submitted successfully!')
  }

  const fieldIcon = (state: FieldState) => state==='valid'
    ? <CheckCircle size={14} style={{color:'var(--success)'}}/>
    : state==='error'
    ? <XCircle size={14} style={{color:'var(--error)'}}/>
    : null

  const pwScore = [vals.password.length>=8,/[A-Z]/.test(vals.password),/[0-9]/.test(vals.password),/[^A-Za-z0-9]/.test(vals.password)].filter(Boolean).length
  const PW_COLORS = ['','var(--error)','var(--warning)','var(--warning)','var(--success)']
  const PW_LABELS = ['','Weak','Fair','Good','Strong']

  return (
    <>
      <Toast message={toast}/>
      <PageBanner title="Form Validation" description="Real-time field validation with error messages, success states and strength meters"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Validation'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Registration Form" subtitle="All fields validate on blur"/>
          <div className="space-y-4">
            <Input label="Full Name *" value={vals.name} onChange={e=>set('name',e.target.value)} onBlur={()=>handleBlur('name')}
              error={getError('name')} right={fieldIcon(getState('name'))} placeholder="John Doe"/>
            <Input label="Email Address *" type="email" value={vals.email} onChange={e=>set('email',e.target.value)} onBlur={()=>handleBlur('email')}
              error={getError('email')} right={fieldIcon(getState('email'))} placeholder="john@example.com"/>
            <Input label="Phone Number" type="tel" value={vals.phone} onChange={e=>set('phone',e.target.value)} onBlur={()=>handleBlur('phone')}
              error={getError('phone')} right={fieldIcon(getState('phone'))} placeholder="+1 555-0100" hint="Optional"/>
            <Select label="Country *" value={vals.country} onChange={e=>{set('country',e.target.value);handleBlur('country')}}
              error={getError('country')} options={[{value:'',label:'Select your country'},{value:'us',label:'United States'},{value:'uk',label:'United Kingdom'},{value:'vn',label:'Vietnam'},{value:'de',label:'Germany'}]}/>
            <Input label="Website" value={vals.website} onChange={e=>set('website',e.target.value)} onBlur={()=>handleBlur('website')}
              error={getError('website')} right={fieldIcon(getState('website'))} placeholder="https://example.com"/>
            <Input label="Age *" type="number" value={vals.age} onChange={e=>set('age',e.target.value)} onBlur={()=>handleBlur('age')}
              error={getError('age')} right={fieldIcon(getState('age'))} placeholder="25"/>
            <Button className="w-full" onClick={handleSubmit}>Validate & Submit</Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Password Strength" subtitle="Real-time strength indicator"/>
          <div className="space-y-4">
            <Input label="Password *" type="password" value={vals.password} onChange={e=>set('password',e.target.value)} onBlur={()=>handleBlur('password')}
              error={getError('password')} placeholder="Min 8 characters"/>
            {vals.password && (
              <div>
                <div className="flex gap-1.5 mb-1.5">
                  {[1,2,3,4].map(i=>(
                    <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300"
                      style={{background:i<=pwScore?PW_COLORS[pwScore]:'var(--border)'}}/>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs font-semibold" style={{color:PW_COLORS[pwScore]}}>{PW_LABELS[pwScore]}</p>
                  <p className="text-xs" style={{color:'var(--muted)'}}>{pwScore}/4 requirements met</p>
                </div>
                <div className="mt-2 space-y-1">
                  {[{l:'At least 8 characters',ok:vals.password.length>=8},{l:'Uppercase letter (A-Z)',ok:/[A-Z]/.test(vals.password)},{l:'Number (0-9)',ok:/[0-9]/.test(vals.password)},{l:'Special character',ok:/[^A-Za-z0-9]/.test(vals.password)}].map((r,i)=>(
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span style={{color:r.ok?'var(--success)':'var(--muted)'}}>{r.ok?'✓':'○'}</span>
                      <span style={{color:r.ok?'var(--foreground)':'var(--muted)'}}>{r.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Input label="Confirm Password *" type="password" value={vals.confirm} onChange={e=>set('confirm',e.target.value)} onBlur={()=>handleBlur('confirm')}
              error={getError('confirm')} right={fieldIcon(getState('confirm'))} placeholder="Repeat password"/>
          </div>
        </Card>
      </div>
    </>
  )
}
