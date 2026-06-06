'use client'
import { PageBanner, Card, CardHeader, Button } from '@/components/ui'
import { useState } from 'react'
import { Volume2, Sun, DollarSign, Users } from 'lucide-react'

function Slider({ value, onChange, min=0, max=100, step=1, color='var(--primary)', disabled=false, label, showValue=true }:
  { value:number; onChange:(v:number)=>void; min?:number; max?:number; step?:number; color?:string; disabled?:boolean; label?:string; showValue?:boolean }) {
  const pct = ((value-min)/(max-min))*100
  return (
    <div className={disabled?'opacity-50':''}>
      {(label||showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>{label}</span>}
          {showValue && <span className="text-sm font-bold tabular-nums" style={{color}}>{value}</span>}
        </div>
      )}
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 rounded-full" style={{background:'var(--border)'}}/>
        <div className="absolute h-1.5 rounded-full transition-all" style={{width:`${pct}%`,background:color}}/>
        <input type="range" min={min} max={max} step={step} value={value} disabled={disabled}
          onChange={e=>onChange(+e.target.value)}
          className="absolute w-full h-1.5 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          style={{zIndex:1}}/>
        <div className="absolute w-5 h-5 rounded-full border-2 shadow-md transition-all" style={{
          left:`calc(${pct}% - 10px)`, background:'var(--card)', borderColor:color,
          boxShadow:`0 0 0 4px ${color}22`,
        }}/>
      </div>
    </div>
  )
}

function RangeSlider({ value, onChange, min=0, max=100, label }:
  { value:[number,number]; onChange:(v:[number,number])=>void; min?:number; max?:number; label?:string }) {
  const lo = ((value[0]-min)/(max-min))*100
  const hi = ((value[1]-min)/(max-min))*100
  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>{label}</span>
          <span className="text-sm font-bold" style={{color:'var(--primary)'}}>${value[0]} – ${value[1]}</span>
        </div>
      )}
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 rounded-full" style={{background:'var(--border)'}}/>
        <div className="absolute h-1.5 rounded-full" style={{left:`${lo}%`,width:`${hi-lo}%`,background:'var(--primary)'}}/>
        {[0,1].map(idx=>(
          <input key={idx} type="range" min={min} max={max} value={value[idx]}
            onChange={e=>{const nv=[...value] as [number,number]; nv[idx]=+e.target.value; if(idx===0&&nv[0]>nv[1])return; if(idx===1&&nv[1]<nv[0])return; onChange(nv)}}
            className="absolute w-full h-1.5 opacity-0 cursor-pointer" style={{zIndex:idx+1}}/>
        ))}
        {[lo,hi].map((pct,i)=>(
          <div key={i} className="absolute w-5 h-5 rounded-full border-2 shadow-md" style={{left:`calc(${pct}% - 10px)`,background:'var(--card)',borderColor:'var(--primary)',boxShadow:'0 0 0 4px var(--primary-light)',zIndex:10}}/>
        ))}
      </div>
    </div>
  )
}

export default function SliderPage() {
  const [vol,    setVol]   = useState(65)
  const [bright, setBright]= useState(80)
  const [budget, setBudget]= useState(3500)
  const [team,   setTeam]  = useState(12)
  const [range,  setRange] = useState<[number,number]>([200,800])
  const [quality,setQual]  = useState(3)
  const [opacity,setOpac]  = useState(75)
  const [speed,  setSpeed] = useState(5)

  return (
    <>
      <PageBanner title="Sliders & Range" description="Numeric range inputs with custom thumb, colors and dual-handle ranges"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Sliders'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Basic Sliders" subtitle="With icon and value display"/>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Volume2 size={16} style={{color:'var(--muted)',flexShrink:0}}/>
              <div className="flex-1"><Slider value={vol} onChange={setVol} label="Volume"/></div>
            </div>
            <div className="flex items-center gap-3">
              <Sun size={16} style={{color:'var(--muted)',flexShrink:0}}/>
              <div className="flex-1"><Slider value={bright} onChange={setBright} label="Brightness" color="var(--warning)"/></div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign size={16} style={{color:'var(--muted)',flexShrink:0}}/>
              <div className="flex-1"><Slider value={budget} onChange={setBudget} min={0} max={10000} step={100} label="Budget" color="var(--success)"/></div>
            </div>
            <div className="flex items-center gap-3">
              <Users size={16} style={{color:'var(--muted)',flexShrink:0}}/>
              <div className="flex-1"><Slider value={team} onChange={setTeam} min={1} max={50} label="Team Size" color="var(--secondary)"/></div>
            </div>
            <Slider value={50} onChange={()=>{}} disabled label="Disabled Slider"/>
          </div>
        </Card>

        <Card>
          <CardHeader title="Color Variants"/>
          <div className="space-y-6">
            {[
              {v:75,c:'var(--primary)',l:'Primary'},
              {v:60,c:'var(--success)',l:'Success'},
              {v:45,c:'var(--warning)',l:'Warning'},
              {v:30,c:'var(--error)',  l:'Error'},
              {v:85,c:'var(--secondary)',l:'Secondary'},
              {v:55,c:'var(--purple)', l:'Purple'},
            ].map((s,i)=><Slider key={i} value={s.v} onChange={()=>{}} color={s.c} label={s.l}/>)}
          </div>
        </Card>

        <Card>
          <CardHeader title="Range Slider (Dual Handle)" subtitle="Select minimum and maximum price"/>
          <div className="space-y-6">
            <RangeSlider value={range} onChange={setRange} min={0} max={2000} label="Price Range"/>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl text-center" style={{background:'var(--surface)'}}>
                <p className="text-xs" style={{color:'var(--muted)'}}>Min Price</p>
                <p className="font-black text-lg" style={{color:'var(--primary)'}}>${range[0]}</p>
              </div>
              <div className="p-3 rounded-xl text-center" style={{background:'var(--surface)'}}>
                <p className="text-xs" style={{color:'var(--muted)'}}>Max Price</p>
                <p className="font-black text-lg" style={{color:'var(--primary)'}}>${range[1]}</p>
              </div>
            </div>
            <Button className="w-full">Apply Filter</Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Stepped & Labeled" subtitle="Discrete step values with marks"/>
          <div className="space-y-6">
            <div>
              <Slider value={quality} onChange={setQual} min={1} max={5} step={1} label="Quality Level" color="var(--purple)"/>
              <div className="flex justify-between text-[10px] mt-1" style={{color:'var(--muted)'}}>
                {['Poor','Fair','Good','Very Good','Excellent'].map(l=><span key={l}>{l}</span>)}
              </div>
            </div>
            <div>
              <Slider value={opacity} onChange={setOpac} label="Opacity %" color="var(--secondary)"/>
              <div className="h-8 rounded-lg mt-2 border" style={{borderColor:'var(--border)',background:`rgba(93,135,255,${opacity/100})`}}/>
            </div>
            <Slider value={speed} onChange={setSpeed} min={1} max={10} step={1} label="Playback Speed" color="var(--success)"/>
          </div>
        </Card>
      </div>
    </>
  )
}
