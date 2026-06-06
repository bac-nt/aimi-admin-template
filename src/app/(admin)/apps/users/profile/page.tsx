'use client'
import { PageBanner, Card, Badge, Button, Input } from '@/components/ui'
import { USER_PROFILE, BLOG_POSTS } from '@/lib/data'
import { MapPin, Globe, Twitter, Github, Linkedin, Edit, Check } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const u = USER_PROFILE
  const [editing, setEditing] = useState(false)
  const [saved,   setSaved]   = useState(false)

  const save = () => { setEditing(false); setSaved(true); setTimeout(()=>setSaved(false),2000) }

  return (
    <>
      <PageBanner title="My Profile" breadcrumbs={[{label:'Home',href:'/'},{label:'Users'},{label:'Profile'}]}
        action={editing ? <Button onClick={save}
        description="View and edit your personal profile"><Check size={14}/>Save Changes</Button> : <Button variant="outline" onClick={()=>setEditing(true)}><Edit size={14}/>Edit Profile</Button>}/>
      {saved && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>Profile saved!</div>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Profile card */}
        <Card className="text-center">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-4" style={{background:'var(--primary)'}}>{u.avatar}</div>
          <h2 className="font-black text-lg" style={{color:'var(--foreground)'}}>{u.name}</h2>
          <p className="text-sm mb-2" style={{color:'var(--muted)'}}>{u.role}</p>
          <Badge variant="success" dot className="mb-4">Active</Badge>
          <p className="text-sm mb-4 leading-relaxed" style={{color:'var(--muted)'}}>{u.bio}</p>
          <div className="space-y-2 text-xs mb-4">
            {[{Icon:MapPin,v:u.location},{Icon:Globe,v:u.website}].map(({Icon,v},i)=>(
              <div key={i} className="flex items-center justify-center gap-1.5" style={{color:'var(--muted)'}}><Icon size={12}/>{v}</div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t" style={{borderColor:'var(--border)'}}>
            {[{l:'Posts',v:u.posts},{l:'Followers',v:u.followers},{l:'Following',v:u.following}].map(s=>(
              <div key={s.l}><p className="font-black" style={{color:'var(--foreground)'}}>{s.v.toLocaleString('en-US')}</p><p className="text-xs" style={{color:'var(--muted)'}}>{s.l}</p></div>
            ))}
          </div>
        </Card>

        {/* Details */}
        <div className="xl:col-span-2 space-y-5">
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={u.name} disabled={!editing}/>
              <Input label="Username" defaultValue={u.username} disabled={!editing}/>
              <Input label="Email" type="email" defaultValue={u.email} disabled={!editing}/>
              <Input label="Phone" defaultValue={u.phone} disabled={!editing}/>
              <Input label="Location" defaultValue={u.location} disabled={!editing}/>
              <Input label="Website" defaultValue={u.website} disabled={!editing}/>
              <div className="col-span-2"><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Bio</label><textarea rows={3} defaultValue={u.bio} disabled={!editing} className="field w-full resize-none"/></div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {u.skills.map(s=><Badge key={s} variant="primary" className="text-sm">{s}</Badge>)}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Recent Posts</h3>
            <div className="space-y-3">
              {BLOG_POSTS.slice(0,3).map(p=>(
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--surface)] transition-colors cursor-pointer">
                  <img src={p.img} alt={p.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0"/>
                  <div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{p.title}</p><p className="text-xs" style={{color:'var(--muted)'}}>{p.date} · {p.views.toLocaleString('en-US')} views</p></div>
                  <Badge variant="success">{p.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
