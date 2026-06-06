'use client'
import { useState } from 'react'
import { Button, Input, Modal, PageBanner, SearchBar, Toast } from '@/components/ui'
import { NOTES, NOTE_COLORS } from '@/lib/data'
import { Plus, Search, Trash2, Edit3, Tag, Pin } from 'lucide-react'
import type { Note } from '@/types'

export default function NotesPage() {
  const [notes,   setNotes]   = useState<Note[]>(NOTES)
  const [search,  setSearch]  = useState('')
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState<Note|null>(null)
  const [form,    setForm]    = useState({ title:'', content:'', color: NOTE_COLORS[0].bg, tags:'' })
  const [toast,   setToast]   = useState<string|null>(null)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const openNew  = () => { setEditing(null); setForm({ title:'', content:'', color: NOTE_COLORS[0].bg, tags:'' }); setModal(true) }
  const openEdit = (n:Note) => { setEditing(n); setForm({ title:n.title, content:n.content, color:n.color, tags:n.tags.join(', ') }); setModal(true) }

  const save = () => {
    if (!form.title.trim()) return
    const tags = form.tags.split(',').map(t=>t.trim()).filter(Boolean)
    if (editing) {
      setNotes(ns=>ns.map(n=>n.id===editing.id?{...n,...form,tags,date:'Just now'}:n))
      showToast('Note updated!')
    } else {
      setNotes(ns=>[{id:Date.now(),...form,tags,pinned:false,date:'Just now'},...ns])
      showToast('Note created!')
    }
    setModal(false)
  }

  const togglePin = (id:number) => setNotes(ns=>ns.map(n=>n.id===id?{...n,pinned:!n.pinned}:n))
  const del = (id:number) => { setNotes(ns=>ns.filter(n=>n.id!==id)); showToast('Note deleted') }

  const filtered = notes.filter(n=>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )
  const pinned = filtered.filter(n=>n.pinned)
  const others = filtered.filter(n=>!n.pinned)

  return (
    <>
      <PageBanner title="Notes" breadcrumbs={[{label:'Home',href:'/'},{label:'Notes'}]}
        description="Capture ideas, tasks and reminders"
        action={<Button onClick={openNew}><Plus size={14}/>New Note</Button>}/>

      {<Toast message={toast}/>}

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>

      {pinned.length > 0 && (
        <>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{color:'var(--muted)'}}>📌 Pinned</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {pinned.map(n=>(<NoteCard key={n.id} note={n} onEdit={openEdit} onDelete={del} onPin={togglePin}/>))}
          </div>
        </>
      )}

      {others.length > 0 && (
        <>
          {pinned.length>0 && <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{color:'var(--muted)'}}>Other Notes</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {others.map(n=>(<NoteCard key={n.id} note={n} onEdit={openEdit} onDelete={del} onPin={togglePin}/>))}
          </div>
        </>
      )}

      {filtered.length===0 && (
        <div className="text-center py-20"><p className="text-4xl mb-3">📝</p><p className="font-semibold" style={{color:'var(--muted)'}}>No notes yet</p></div>
      )}

      <Modal open={modal} onClose={()=>setModal(false)} title={editing?'Edit Note':'New Note'}
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>{editing?'Update':'Create'} Note</Button></>}>
        <div className="space-y-3">
          <Input label="Title *" placeholder="Note title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Content</label>
            <textarea rows={5} value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))}
              placeholder="Write your note…" className="field w-full resize-none"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Color</label>
            <div className="flex gap-2">
              {NOTE_COLORS.map(c=>(
                <button key={c.name} type="button" onClick={()=>setForm(f=>({...f,color:c.bg}))}
                  className="w-7 h-7 rounded-lg border-2 transition-transform hover:scale-110"
                  style={{background:c.bg, borderColor: form.color===c.bg ? c.text : 'transparent'}}
                  title={c.name}/>
              ))}
            </div>
          </div>
          <Input label="Tags (comma separated)" placeholder="work, ideas, todo" value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))}/>
        </div>
      </Modal>
    </>
  )
}

function NoteCard({ note, onEdit, onDelete, onPin }: { note:Note; onEdit:(n:Note)=>void; onDelete:(id:number)=>void; onPin:(id:number)=>void }) {
  return (
    <div className="rounded-2xl p-5 border group relative transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
      style={{background:note.color, borderColor:'rgba(0,0,0,0.08)'}}
      onClick={()=>onEdit(note)}>
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button type="button" onClick={e=>{e.stopPropagation();onPin(note.id)}}
          className="w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
          style={{background:'rgba(255,255,255,0.8)',color:note.pinned?'var(--warning)':'var(--muted)'}} title={note.pinned?'Unpin':'Pin'}>
          <Pin size={13}/>
        </button>
        <button type="button" onClick={e=>{e.stopPropagation();onDelete(note.id)}}
          className="w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
          style={{background:'rgba(255,255,255,0.8)',color:'var(--error)'}} title="Delete">
          <Trash2 size={13}/>
        </button>
      </div>
      <h3 className="font-bold text-sm mb-2 pr-16 line-clamp-1" style={{color:'#1a1a2e'}}>{note.title}</h3>
      <p className="text-xs leading-relaxed line-clamp-4 mb-3" style={{color:'rgba(0,0,0,0.6)'}}>{note.content}</p>
      <div className="flex items-center justify-between mt-auto">
        {note.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {note.tags.slice(0,2).map(t=>(
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{background:'rgba(0,0,0,0.1)',color:'rgba(0,0,0,0.6)'}}>#{t}</span>
            ))}
          </div>
        )}
        <span className="text-[10px] ml-auto" style={{color:'rgba(0,0,0,0.4)'}}>{note.date}</span>
      </div>
    </div>
  )
}
