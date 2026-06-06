'use client'
import { useState } from 'react'
import { Toast, PageBanner, Card, Badge, Button, Modal, Input, Select } from '@/components/ui'
import { KANBAN_COLUMNS } from '@/lib/data'
import { Plus, MoreHorizontal, Edit, Trash2, User } from 'lucide-react'
import type { KanbanColumn, KanbanItem } from '@/types'
import { cn } from '@/lib/utils'

const PRIORITY_V: Record<string,'error'|'warning'|'primary'> = { high:'error', medium:'warning', low:'primary' }
const TAG_COLORS: Record<string,string> = { dev:'var(--primary-light)', design:'var(--purple-light)', qa:'var(--success-light)', docs:'var(--secondary-light)', ui:'var(--warning-light)' }

export default function KanbanPage() {
  const [cols, setCols] = useState<KanbanColumn[]>(KANBAN_COLUMNS)
  const [modal, setModal] = useState(false)
  const [targetCol, setTargetCol] = useState<string>('todo')
  const [form, setForm] = useState({ title:'', priority:'medium' as 'high'|'medium'|'low', assignee:'MA', desc:'' })
  const [toast, setToast] = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const addCard = () => {
    if (!form.title.trim()) return
    setCols(cs=>cs.map(c=>c.id===targetCol ? {...c,items:[...c.items,{id:`k${Date.now()}`,tags:[],...form}]} : c))
    setModal(false); showToast('Card added!')
    setForm({title:'',priority:'medium',assignee:'MA',desc:''})
  }

  const delCard = (colId:string, itemId:string) => {
    setCols(cs=>cs.map(c=>c.id===colId?{...c,items:c.items.filter(i=>i.id!==itemId)}:c))
    showToast('Card removed')
  }

  return (
    <>
      <PageBanner title="Kanban Board" breadcrumbs={[{label:'Home',href:'/'},{label:'Kanban'}]}
        description="Visualize your workflow and track progress"
        action={<Button onClick={()=>setModal(true)}><Plus size={14}/>Add Card</Button>}/>

      {<Toast message={toast}/>}

      <div className="flex gap-4 overflow-x-auto pb-4" style={{minHeight:'calc(100vh - 200px)'}}>
        {cols.map(col => (
          <div key={col.id} className="flex-shrink-0 w-72 flex flex-col rounded-2xl" style={{background:'var(--surface)'}}>
            {/* Column header */}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full" style={{background:col.color}}/>
                <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{col.title}</span>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{background:'var(--border)',color:'var(--muted)'}}>{col.items.length}</span>
              </div>
              <button type="button" onClick={()=>{setTargetCol(col.id);setModal(true)}}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--card)] transition-colors" style={{color:'var(--muted)'}}>
                <Plus size={14}/>
              </button>
            </div>

            {/* Cards */}
            <div className="flex-1 px-3 pb-3 space-y-3 overflow-y-auto">
              {col.items.map(item => (
                <div key={item.id} className="card p-4 group cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <p className="font-semibold text-sm leading-snug" style={{color:'var(--foreground)'}}>{item.title}</p>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button type="button" onClick={()=>delCard(col.id,item.id)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}>
                        <Trash2 size={11}/>
                      </button>
                    </div>
                  </div>
                  {item.desc && <p className="text-xs mb-2.5 line-clamp-2" style={{color:'var(--muted)'}}>{item.desc}</p>}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {item.tags.map(t=>(
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{background:TAG_COLORS[t]||'var(--surface)',color:'var(--foreground)'}}>{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge variant={PRIORITY_V[item.priority]} className="text-[9px] capitalize">{item.priority}</Badge>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{background:'var(--secondary)'}}>{item.assignee}</div>
                  </div>
                </div>
              ))}
              {col.items.length === 0 && (
                <div className="h-20 rounded-xl border-2 border-dashed flex items-center justify-center text-xs" style={{borderColor:'var(--border)',color:'var(--muted)'}}>
                  Drop cards here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title="Add Card"
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={addCard}>Add Card</Button></>}>
        <div className="space-y-3">
          <Input label="Title *" placeholder="Card title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
          <Input label="Description" placeholder="Brief description" value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))}/>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Priority" value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value as typeof f.priority}))}
              options={[{value:'high',label:'High'},{value:'medium',label:'Medium'},{value:'low',label:'Low'}]}/>
            <Select label="Column" value={targetCol} onChange={e=>setTargetCol(e.target.value)}
              options={KANBAN_COLUMNS.map(c=>({value:c.id,label:c.title}))}/>
          </div>
        </div>
      </Modal>
    </>
  )
}
