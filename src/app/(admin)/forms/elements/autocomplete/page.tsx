'use client'
import { PageBanner, Card, CardHeader } from '@/components/ui'
import { useState, useRef, useEffect } from 'react'
import { Search, X, Check, ChevronDown } from 'lucide-react'

const COUNTRIES = ['Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh','Belgium','Brazil','Canada','Chile','China','Colombia','Croatia','Czech Republic','Denmark','Egypt','Finland','France','Germany','Greece','Hungary','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kenya','Malaysia','Mexico','Morocco','Netherlands','New Zealand','Nigeria','Norway','Pakistan','Peru','Philippines','Poland','Portugal','Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain','Sweden','Switzerland','Thailand','Turkey','Ukraine','United Arab Emirates','United Kingdom','United States','Venezuela','Vietnam']
const SKILLS = ['React','TypeScript','Next.js','Node.js','Python','Go','Rust','Vue.js','Angular','GraphQL','PostgreSQL','MongoDB','Redis','Docker','Kubernetes','AWS','Azure','GCP','Tailwind CSS','Figma']
const TAGS   = ['design','development','marketing','finance','operations','hr','legal','sales','support','engineering','product','analytics','security','infrastructure','devops']

function Autocomplete({ options, placeholder, label, multi=false }: { options:string[]; placeholder?:string; label:string; multi?:boolean }) {
  const [query,   setQuery]    = useState('')
  const [open,    setOpen]     = useState(false)
  const [selected,setSelected] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase())).slice(0,8)

  useEffect(() => {
    const handler = (e:MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggle = (opt:string) => {
    if (multi) setSelected(s => s.includes(opt) ? s.filter(x=>x!==opt) : [...s,opt])
    else { setSelected([opt]); setQuery(opt); setOpen(false) }
  }

  return (
    <div className="w-full" ref={ref}>
      <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>{label}</label>
      {multi && selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selected.map(s=>(
            <span key={s} className="flex items-center gap-1 pl-2.5 pr-1 py-0.5 rounded-full text-xs font-semibold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>
              {s}
              <button type="button" onClick={()=>setSelected(x=>x.filter(v=>v!==s))} className="w-4 h-4 rounded-full hover:bg-[var(--primary)] hover:text-white flex items-center justify-center">×</button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border cursor-text transition-all"
          style={{background:'var(--card)',borderColor:open?'var(--primary)':'var(--border)',boxShadow:open?'0 0 0 3px rgba(93,135,255,0.12)':undefined}}
          onClick={()=>setOpen(true)}>
          <Search size={14} style={{color:'var(--muted)',flexShrink:0}}/>
          <input value={query} onChange={e=>{setQuery(e.target.value);setOpen(true)}} onFocus={()=>setOpen(true)}
            placeholder={multi&&selected.length>0?'Add more…':placeholder}
            className="flex-1 bg-transparent text-sm outline-none" style={{color:'var(--foreground)'}}/>
          {query && <button type="button" onClick={()=>{setQuery('');if(!multi)setSelected([])}} style={{color:'var(--muted)'}}><X size={13}/></button>}
          {!query && <ChevronDown size={13} style={{color:'var(--muted)',flexShrink:0}}/>}
        </div>
        {open && filtered.length > 0 && (
          <div className="absolute z-50 w-full mt-1.5 rounded-xl border overflow-hidden shadow-xl animate-slide-down"
            style={{background:'var(--card)',borderColor:'var(--border)',boxShadow:'var(--shadow-dropdown)'}}>
            {filtered.map(opt=>(
              <button key={opt} type="button" onClick={()=>toggle(opt)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors flex items-center justify-between"
                style={{color:selected.includes(opt)?'var(--primary)':'var(--foreground)'}}>
                {opt}
                {selected.includes(opt) && <Check size={13} style={{color:'var(--primary)'}}/>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AutocompletePage() {
  return (
    <>
      <PageBanner title="Autocomplete" description="Type-ahead search inputs with single and multi-select"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Autocomplete'}]}/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Single Select Autocomplete" subtitle="Type to filter and click to select one option"/>
          <div className="space-y-4">
            <Autocomplete options={COUNTRIES} label="Country" placeholder="Search countries…"/>
            <Autocomplete options={SKILLS}   label="Tech Stack" placeholder="Search technologies…"/>
          </div>
        </Card>
        <Card>
          <CardHeader title="Multi Select Autocomplete" subtitle="Select multiple options with tag display"/>
          <div className="space-y-4">
            <Autocomplete options={SKILLS} label="Select Skills" placeholder="Add a skill…" multi/>
            <Autocomplete options={TAGS}   label="Content Tags"  placeholder="Add tags…"    multi/>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Features" subtitle="Built-in behaviors"/>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[{l:'Real-time filtering',d:'Results update as you type'},{l:'Keyboard friendly',d:'Tab, Enter, Escape support'},{l:'Click outside to close',d:'Dismiss on outside click'},{l:'Tag management',d:'Remove tags with × button'}].map(f=>(
              <div key={f.l} className="p-3.5 rounded-xl border" style={{borderColor:'var(--border)'}}>
                <p className="font-bold text-sm mb-0.5" style={{color:'var(--foreground)'}}>{f.l}</p>
                <p className="text-xs" style={{color:'var(--muted)'}}>{f.d}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
