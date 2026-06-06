'use client'
import { useState } from 'react'
import { Avatar, Badge, Button, Card, Input, Modal, PageBanner, SearchBar, Select, Toast } from '@/components/ui'
import { CONTACTS } from '@/lib/data'
import { Search, Plus, Edit, Trash2, Mail, Phone, MapPin, Grid, List } from 'lucide-react'
import type { Contact } from '@/types'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(CONTACTS)
  const [search, setSearch] = useState('')
  const [view,   setView]   = useState<'grid'|'list'>('grid')
  const [modal,  setModal]  = useState(false)
  const [toast,  setToast]  = useState<string|null>(null)
  const [form,   setForm]   = useState({ name:'', email:'', phone:'', company:'', role:'', city:'', country:'USA' })

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()))

  const save = () => {
    if (!form.name.trim()) return
    setContacts(cs=>[...cs,{id:Date.now(),...form,avatar:form.name.split(' ').map(n=>n[0]).join('').toUpperCase(),status:'active',tags:[]}])
    setModal(false); showToast('Contact added!')
  }

  return (
    <>
      <PageBanner title="Contacts" breadcrumbs={[{label:'Home',href:'/'},{label:'Contacts'}]}
        description="Manage your business contacts"
        action={<div className="flex gap-2"><Button variant="outline" onClick={()=>setView(v=>v==='grid'?'list':'grid')}>{view==='grid'?<List size={14}/>:<Grid size={14}/>}{view==='grid'?'List':'Grid'}</Button><Button onClick={()=>setModal(true)}><Plus size={14}/>Add Contact</Button></div>}/>
      {<Toast message={toast}/>}

      <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>

      {view==='grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(c=>(
            <Card key={c.id} className="text-center hover:shadow-md transition-all hover:-translate-y-0.5">
              <Avatar name={c.name} size={56} color="var(--primary)" className="mx-auto mb-3"/>
              <h3 className="font-bold" style={{color:'var(--foreground)'}}> {c.name}</h3>
              <p className="text-xs mb-1" style={{color:'var(--muted)'}}> {c.role} @ {c.company}</p>
              <Badge variant={c.status==='active'?'success':'muted'} dot className="mb-3">{c.status}</Badge>
              <div className="space-y-1 text-xs" style={{color:'var(--muted)'}}><div className="flex items-center justify-center gap-1.5"><Mail size={11}/>{c.email}</div><div className="flex items-center justify-center gap-1.5"><Phone size={11}/>{c.phone}</div></div>
              <div className="flex gap-1 justify-center mt-3 pt-3 border-t" style={{borderColor:'var(--border)'}}><button type="button" onClick={()=>{setContacts(cs=>cs.filter(x=>x.id!==c.id));showToast('Deleted')}} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={13}/></button></div>
            </Card>
          ))}
        </div>
      ) : (
        <Card padding={false}>
          <div className="overflow-x-auto"><table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}> {['Name','Company','Email','Phone','City','Status','Actions'].map(h=>(<th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}> {h}</th>))}</tr></thead>
            <tbody>{filtered.map(c=>(<tr key={c.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer group" style={{borderColor:'rgba(232,237,242,0.7)'}}>
              <td className="px-5 py-3.5"><div className="flex items-center gap-3"><Avatar name={c.name} size={32}/><div><p className="font-semibold" style={{color:'var(--foreground)'}}> {c.name}</p><p className="text-xs" style={{color:'var(--muted)'}}> {c.role}</p></div></div></td>
              <td className="px-5 py-3.5 text-sm" style={{color:'var(--foreground)'}}> {c.company}</td>
              <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}> {c.email}</td>
              <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}> {c.phone}</td>
              <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}> {c.city}, {c.country}</td>
              <td className="px-5 py-3.5"><Badge variant={c.status==='active'?'success':'muted'} dot className="capitalize">{c.status}</Badge></td>
              <td className="px-5 py-3.5"><button type="button" onClick={()=>{setContacts(cs=>cs.filter(x=>x.id!==c.id));showToast('Deleted')}} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={13}/></button></td>
            </tr>))}</tbody>
          </table></div>
        </Card>
      )}

      <Modal open={modal} onClose={()=>setModal(false)} title="Add Contact"
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>Save Contact</Button></>}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3"><Input label="Name *" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/><Input label="Email" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
          <div className="grid grid-cols-2 gap-3"><Input label="Phone" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/><Input label="Company" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))}/></div>
          <div className="grid grid-cols-2 gap-3"><Input label="Role" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))}/><Input label="City" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))}/></div>
        </div>
      </Modal>
    </>
  )
}
