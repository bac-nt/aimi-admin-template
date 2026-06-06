'use client'
import { PageBanner, Card, CardHeader, Button, Toggle, StarRating, Select} from '@/components/ui'
import { useState } from 'react'
import { Search, Eye, EyeOff, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FormElementsPage() {
  const [showPw, setShowPw]   = useState(false)
  const [toggle, setToggle]   = useState(true)
  const [rating, setRating]   = useState(3)
  const [range, setRange]     = useState(65)
  const [checks, setChecks]   = useState([true,false,false])
  const [radio, setRadio]     = useState(0)
  const [date, setDate]       = useState('')
  const [time, setTime]       = useState('')
  const [color, setColor]     = useState('#5d87ff')

  return (
    <>
      <PageBanner title="Form Elements" breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Elements'}]}/>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Text inputs */}
        <Card>
          <CardHeader title="Text Inputs" subtitle="Various input styles and states"/>
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Default Input</label><input className="field w-full" placeholder="Enter text here..."/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>With Icon</label>
              <div className="relative"><Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{color:'var(--muted)'}}/><input className="field w-full pl-9" placeholder="Search..."/></div>
            </div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Password</label>
              <div className="relative"><input type={showPw?'text':'password'} className="field w-full pr-10" placeholder="Password"/><button onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{color:'var(--muted)'}}>{showPw?<EyeOff size={15}/>:<Eye size={15}/>}</button></div>
            </div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Disabled</label><input className="field w-full opacity-50 cursor-not-allowed" placeholder="Disabled input" disabled/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>With Error</label><input className="field w-full" style={{borderColor:'var(--error)'}} placeholder="Error state" defaultValue="invalid@"/><p className="text-xs mt-1" style={{color:'var(--error)'}}>Please enter a valid email address.</p></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Textarea</label><textarea className="field w-full resize-none" rows={3} placeholder="Write something..."/></div>
          </div>
        </Card>
        {/* Select & Autocomplete */}
        <Card>
          <CardHeader title="Select & Date/Time" subtitle="Dropdown selectors and pickers"/>
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Select</label><div className="relative"><Select options={[{value:'Choose an option',label:'Choose an option'},{value:'Option 1',label:'Option 1'},{value:'Option 2',label:'Option 2'},{value:'Option 3',label:'Option 3'}]} value="" onChange={()=>{}}/></div></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Multi-Select</label><div className="relative"><Select options={[{value:'Option 1',label:'Option 1'},{value:'Option 2',label:'Option 2'},{value:'Option 3',label:'Option 3'},{value:'Option 4',label:'Option 4'}]} value="" onChange={()=>{}}/></div></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Date Picker</label><input type="date" className="field w-full" value={date} onChange={e=>setDate(e.target.value)}/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Time Picker</label><input type="time" className="field w-full" value={time} onChange={e=>setTime(e.target.value)}/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Date & Time</label><input type="datetime-local" className="field w-full"/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Color Picker</label><div className="flex items-center gap-3"><input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-12 h-10 rounded-lg border cursor-pointer" style={{borderColor:'var(--border)'}}/><span className="text-sm font-mono" style={{color:'var(--foreground)'}}>{color}</span></div></div>
          </div>
        </Card>
        {/* Checkboxes & Radios */}
        <Card>
          <CardHeader title="Checkboxes & Radios" subtitle="Selection controls"/>
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold mb-3" style={{color:'var(--foreground)'}}>Checkboxes</p>
              <div className="space-y-2">
                {['Option A — Primary blue','Option B — Unchecked state','Option C — Third option'].map((label,i)=>(
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <div onClick={()=>setChecks(cs=>cs.map((x,j)=>j===i?!x:x))} className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0" style={{background:checks[i]?'var(--primary)':'transparent',borderColor:checks[i]?'var(--primary)':'var(--border)'}}>
                      {checks[i]&&<Check size={12} className="text-white"/>}
                    </div>
                    <span className="text-sm" style={{color:'var(--foreground)'}}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3" style={{color:'var(--foreground)'}}>Radio Buttons</p>
              <div className="space-y-2">
                {['Small — compact layout','Medium — standard layout','Large — spacious layout'].map((label,i)=>(
                  <label key={i} className="flex items-center gap-3 cursor-pointer" onClick={()=>setRadio(i)}>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0" style={{borderColor:radio===i?'var(--primary)':'var(--border)'}}>
                      {radio===i&&<div className="w-2.5 h-2.5 rounded-full" style={{background:'var(--primary)'}}/>}
                    </div>
                    <span className="text-sm" style={{color:'var(--foreground)'}}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>
        {/* Sliders, Toggles, Rating */}
        <Card>
          <CardHeader title="Sliders, Toggles & Rating" subtitle="Interactive controls"/>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold mb-3" style={{color:'var(--foreground)'}}>Range Slider</p>
              <input type="range" min={0} max={100} value={range} onChange={e=>setRange(Number(e.target.value))} className="w-full accent-[var(--primary)]"/>
              <div className="flex justify-between text-xs mt-1" style={{color:'var(--muted)'}}><span>0%</span><span className="font-semibold" style={{color:'var(--primary)'}}>{range}%</span><span>100%</span></div>
              <div className="mt-2" style={{height:8,background:'var(--border)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:`${range}%`,background:'var(--primary)',borderRadius:4,transition:'width 0.1s'}}/></div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3" style={{color:'var(--foreground)'}}>Toggle Switches</p>
              <div className="space-y-3">
                {[{l:'Enable notifications',v:toggle},{l:'Dark mode',v:false},{l:'Auto-save',v:true},{l:'Beta features',v:false}].map((t,i)=>(
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm" style={{color:'var(--foreground)'}}>{t.l}</span>
                    <Toggle checked={i===0?toggle:t.v} onChange={v=>i===0&&setToggle(v)}/>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2" style={{color:'var(--foreground)'}}>Star Rating</p>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">{[1,2,3,4,5].map(s=><button key={s} onClick={()=>setRating(s)} className="hover:scale-110 transition-transform"><StarRating value={s<=rating?s:0} max={1} size={24}/></button>)}</div>
                <span className="text-lg font-black" style={{color:'var(--foreground)'}}>{rating}.0</span>
              </div>
            </div>
          </div>
        </Card>
        {/* Form validation */}
        <Card className="xl:col-span-2">
          <CardHeader title="Complete Form Example" subtitle="With validation and submission"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>First Name *</label><input className="field w-full" placeholder="John" required/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Last Name *</label><input className="field w-full" placeholder="Doe" required/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Email Address *</label><input type="email" className="field w-full" placeholder="john@example.com" required/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Phone Number</label><input type="tel" className="field w-full" placeholder="+1 234 567 8900"/></div>
            <div className="md:col-span-2"><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Message</label><textarea className="field w-full resize-none" rows={4} placeholder="Your message here..."/></div>
            <div className="md:col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded border-2 flex items-center justify-center" style={{background:'var(--primary)',borderColor:'var(--primary)'}}><Check size={10} className="text-white"/></div>
                <span className="text-sm" style={{color:'var(--muted)'}}>I agree to the Terms of Service and Privacy Policy</span>
              </label>
            </div>
            <div className="md:col-span-2 flex gap-3"><Button>Submit Form</Button><Button variant="ghost">Reset</Button></div>
          </div>
        </Card>
      </div>
    </>
  )
}
