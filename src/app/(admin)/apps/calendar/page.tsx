'use client'
import { useState } from 'react'
import { Toast, PageBanner, Card, Badge, Button, Modal, Input, Select } from '@/components/ui'
import { CALENDAR_EVENTS } from '@/lib/data'
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react'
import type { CalendarEvent } from '@/types'

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function CalendarPage() {
  const today = new Date()
  const [date,   setDate]  = useState(new Date())
  const [events, setEvents]= useState<CalendarEvent[]>(CALENDAR_EVENTS)
  const [modal,  setModal] = useState(false)
  const [toast,  setToast] = useState<string|null>(null)
  const [form,   setForm]  = useState({ title:'', start:'', end:'', type:'meeting', color:'var(--primary)', desc:'' })

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const year  = date.getFullYear()
  const month = date.getMonth()
  const first = new Date(year, month, 1).getDay()
  const days  = new Date(year, month+1, 0).getDate()

  const eventsInMonth = events.filter(e => {
    const d = new Date(e.start)
    return d.getFullYear()===year && d.getMonth()===month
  })

  const eventsOnDay = (day: number) => eventsInMonth.filter(e => new Date(e.start).getDate() === day)

  const save = () => {
    if (!form.title.trim()) return
    setEvents(es=>[...es,{id:Date.now(),recurring:false,...form}])
    setModal(false); showToast('Event created!')
  }

  return (
    <>
      <PageBanner title="Calendar" breadcrumbs={[{label:'Home',href:'/'},{label:'Calendar'}]}
        description="Schedule and manage your events"
        action={<Button onClick={()=>setModal(true)}><Plus size={14}/>New Event</Button>}/>
      {<Toast message={toast}/>}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Calendar grid */}
        <div className="xl:col-span-3">
          <Card>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg" style={{color:'var(--foreground)'}}>{MONTHS[month]} {year}</h2>
              <div className="flex gap-1">
                {[{Icon:ChevronLeft,fn:()=>setDate(new Date(year,month-1,1))},{Icon:ChevronRight,fn:()=>setDate(new Date(year,month+1,1))}].map(({Icon,fn},i)=>(
                  <button key={i} type="button" onClick={fn} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}><Icon size={16}/></button>
                ))}
              </div>
            </div>
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d=><div key={d} className="text-center text-xs font-bold py-2" style={{color:'var(--muted)'}}>{d}</div>)}
            </div>
            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({length:first},(_,i)=><div key={`e${i}`}/>)}
              {Array.from({length:days},(_,i)=>{
                const day = i+1
                const isToday = day===today.getDate()&&month===today.getMonth()&&year===today.getFullYear()
                const dayEvents = eventsOnDay(day)
                return (
                  <div key={day} className="min-h-[80px] p-1.5 rounded-xl border transition-colors hover:bg-[var(--surface)] cursor-pointer"
                    style={{borderColor:isToday?'var(--primary)':'var(--border)',background:isToday?'var(--primary-light)':undefined}}>
                    <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-1 ${isToday?'text-white':''}` }
                      style={{background:isToday?'var(--primary)':undefined,color:isToday?undefined:'var(--foreground)'}}>
                      {day}
                    </span>
                    {dayEvents.slice(0,2).map(e=>(
                      <div key={e.id} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md mb-0.5 truncate text-white" style={{background:e.color}}>{e.title}</div>
                    ))}
                    {dayEvents.length>2 && <div className="text-[9px]" style={{color:'var(--muted)'}}>+{dayEvents.length-2} more</div>}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Events sidebar */}
        <div className="space-y-3">
          <Card>
            <h3 className="font-bold mb-3" style={{color:'var(--foreground)'}}>Upcoming Events</h3>
            <div className="space-y-3">
              {events.slice(0,5).map(e=>(
                <div key={e.id} className="flex gap-3 p-3 rounded-xl" style={{background:'var(--surface)'}}>
                  <div className="w-1 rounded-full flex-shrink-0" style={{background:e.color}}/>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{e.title}</p>
                    <div className="flex items-center gap-1 text-xs mt-0.5" style={{color:'var(--muted)'}}><Clock size={10}/>{new Date(e.start).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false})}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title="New Event"
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>Create Event</Button></>}>
        <div className="space-y-3">
          <Input label="Title *" placeholder="Event title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start" type="datetime-local" value={form.start} onChange={e=>setForm(f=>({...f,start:e.target.value}))}/>
            <Input label="End" type="datetime-local" value={form.end} onChange={e=>setForm(f=>({...f,end:e.target.value}))}/>
          </div>
          <Select label="Type" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} options={['meeting','event','task','personal'].map(v=>({value:v,label:v[0].toUpperCase()+v.slice(1)}))}/>
          <Input label="Description" value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))}/>
        </div>
      </Modal>
    </>
  )
}
