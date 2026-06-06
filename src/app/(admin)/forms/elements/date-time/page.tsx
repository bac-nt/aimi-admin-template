'use client'
import { PageBanner, Card, CardHeader, Button, Input } from '@/components/ui'
import { useState } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa']

function MiniCalendar({ value, onChange }: { value:Date|null; onChange:(d:Date)=>void }) {
  const [view, setView] = useState(new Date())
  const year  = view.getFullYear()
  const month = view.getMonth()
  const first = new Date(year,month,1).getDay()
  const days  = new Date(year,month+1,0).getDate()
  const today = new Date()

  return (
    <div className="p-1">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={()=>setView(new Date(year,month-1,1))} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface)]" style={{color:'var(--muted)'}}><ChevronLeft size={14}/></button>
        <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{MONTHS[month]} {year}</span>
        <button type="button" onClick={()=>setView(new Date(year,month+1,1))} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface)]" style={{color:'var(--muted)'}}><ChevronRight size={14}/></button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map(d=><div key={d} className="text-center text-[10px] font-bold py-1" style={{color:'var(--muted)'}}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({length:first},(_,i)=><div key={`e${i}`}/>)}
        {Array.from({length:days},(_,i)=>{
          const d = i+1
          const isToday = d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear()
          const isSelected = value && d===value.getDate()&&month===value.getMonth()&&year===value.getFullYear()
          return (
            <button key={d} type="button" onClick={()=>onChange(new Date(year,month,d))}
              className="w-8 h-8 rounded-xl text-xs font-semibold transition-all hover:bg-[var(--primary-light)] hover:text-[var(--primary)] mx-auto flex items-center justify-center"
              style={{
                background: isSelected?'var(--primary)':isToday?'var(--primary-light)':undefined,
                color: isSelected?'#fff':isToday?'var(--primary)':'var(--foreground)',
              }}>
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function DateTimePage() {
  const [date1,  setDate1]  = useState<Date|null>(null)
  const [date2,  setDate2]  = useState<Date|null>(new Date())
  const [time1,  setTime1]  = useState('09:00')
  const [time2,  setTime2]  = useState('17:00')
  const [dateStr,setDateStr]= useState('')
  const [dtStr,  setDtStr]  = useState('')

  const fmt = (d:Date|null) => d ? `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}` : 'Not selected'

  return (
    <>
      <PageBanner title="Date & Time" description="Date pickers, time inputs and date-range selectors"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Date & Time'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <Card>
          <CardHeader title="Interactive Date Picker" subtitle="Click a day to select"/>
          <MiniCalendar value={date1} onChange={setDate1}/>
          <div className="mt-3 pt-3 border-t text-sm flex items-center gap-2" style={{borderColor:'var(--border)'}}>
            <Calendar size={14} style={{color:'var(--primary)'}}/>
            <span style={{color:'var(--muted)'}}>Selected: </span>
            <strong style={{color:'var(--foreground)'}}>{fmt(date1)}</strong>
          </div>
        </Card>

        <Card>
          <CardHeader title="Pre-selected Date" subtitle="Calendar with a default value"/>
          <MiniCalendar value={date2} onChange={setDate2}/>
          <div className="mt-3 pt-3 border-t text-sm flex items-center gap-2" style={{borderColor:'var(--border)'}}>
            <Calendar size={14} style={{color:'var(--primary)'}}/>
            <span style={{color:'var(--muted)'}}>Selected: </span>
            <strong style={{color:'var(--foreground)'}}>{fmt(date2)}</strong>
          </div>
        </Card>

        <Card>
          <CardHeader title="Time Picker" subtitle="Hour and minute inputs"/>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Start Time</label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border" style={{borderColor:'var(--border)',background:'var(--card)'}}>
                <Clock size={14} style={{color:'var(--muted)'}}/>
                <input type="time" value={time1} onChange={e=>setTime1(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" style={{color:'var(--foreground)'}}/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>End Time</label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border" style={{borderColor:'var(--border)',background:'var(--card)'}}>
                <Clock size={14} style={{color:'var(--muted)'}}/>
                <input type="time" value={time2} onChange={e=>setTime2(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" style={{color:'var(--foreground)'}}/>
              </div>
            </div>
            <div className="p-3 rounded-xl" style={{background:'var(--surface)'}}>
              <p className="text-xs" style={{color:'var(--muted)'}}>Duration</p>
              <p className="font-bold mt-0.5" style={{color:'var(--foreground)'}}>{time1} → {time2}</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Native Date Input" subtitle="Browser native date picker"/>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Date only</label>
              <input type="date" value={dateStr} onChange={e=>setDateStr(e.target.value)} className="field w-full"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Date & Time</label>
              <input type="datetime-local" value={dtStr} onChange={e=>setDtStr(e.target.value)} className="field w-full"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Month picker</label>
              <input type="month" className="field w-full"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Week picker</label>
              <input type="week" className="field w-full"/>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-2">
          <CardHeader title="Date Range" subtitle="Start and end date for bookings or reporting"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Check-in Date</label>
              <input type="date" className="field w-full"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Check-out Date</label>
              <input type="date" className="field w-full"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Report Start</label>
              <input type="datetime-local" className="field w-full"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Report End</label>
              <input type="datetime-local" className="field w-full"/>
            </div>
          </div>
          <div className="flex justify-end mt-4"><Button>Apply Range</Button></div>
        </Card>
      </div>
    </>
  )
}
