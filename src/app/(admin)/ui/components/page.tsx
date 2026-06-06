'use client'
import { PageBanner, Card, CardHeader, Badge, Button, Input, Toggle, Progress, Avatar, Alert, Divider, Spinner, StarRating } from '@/components/ui'
import { useState } from 'react'
import { Download, Plus, Trash2, Check, Bell, Info, AlertTriangle, XCircle, CheckCircle, Heart, Star } from 'lucide-react'

export default function UIComponentsPage() {
  const [tog1, setTog1] = useState(true)
  const [tog2, setTog2] = useState(false)

  return (
    <>
      <PageBanner title="UI Components" description="Complete component library — badges, buttons, inputs, alerts and more"
        breadcrumbs={[{label:'Home',href:'/'},{label:'UI Components'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">

        {/* Badges */}
        <Card>
          <CardHeader title="Badges"/>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {(['primary','secondary','success','warning','error','muted','purple'] as const).map(v=>(
                <Badge key={v} variant={v} className="capitalize">{v}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {(['primary','success','warning','error'] as const).map(v=>(
                <Badge key={v} variant={v} dot className="capitalize">{v}</Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader title="Buttons"/>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="success" size="sm">Success</Button>
              <Button variant="error" size="sm">Error</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm"><Plus size={12}/>Add</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="primary" size="sm" loading>Loading</Button>
              <Button variant="outline" size="sm" disabled>Disabled</Button>
            </div>
          </div>
        </Card>

        {/* Avatars */}
        <Card>
          <CardHeader title="Avatars"/>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {[24,32,40,48,56].map(s=>(
                <Avatar key={s} name="John Doe" size={s} color="var(--primary)"/>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Avatar name="Alice B"   color="var(--secondary)"/>
              <Avatar name="Charlie D" color="var(--success)"/>
              <Avatar name="Eve F"     color="var(--warning)"/>
              <Avatar name="Grace H"   color="var(--error)"/>
              <Avatar name="Ivan J"    color="var(--purple)"/>
            </div>
          </div>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader title="Progress Bars"/>
          <div className="space-y-4">
            {[{v:85,c:'var(--primary)',l:'Revenue Target'},{v:62,c:'var(--success)',l:'User Growth'},{v:41,c:'var(--warning)',l:'Storage Used'},{v:23,c:'var(--error)',l:'Error Rate'}].map(p=>(
              <div key={p.l}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{color:'var(--foreground)'}}>{p.l}</span>
                  <span className="font-bold" style={{color:p.c}}>{p.v}%</span>
                </div>
                <Progress value={p.v} color={p.c} height={8}/>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader title="Alerts"/>
          <div className="space-y-3">
            <Alert variant="info">This is an informational message.</Alert>
            <Alert variant="success">Your changes were saved successfully!</Alert>
            <Alert variant="warning">Your trial expires in 3 days.</Alert>
            <Alert variant="error">Failed to connect. Please retry.</Alert>
          </div>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader title="Inputs"/>
          <div className="space-y-3">
            <Input label="Default" placeholder="Enter value…"/>
            <Input label="With hint" placeholder="username" hint="No spaces or special characters"/>
            <Input label="With error" placeholder="email" error="This email is already taken"/>
            <Input label="Disabled" placeholder="Read only" disabled value="admin@aimi.com"/>
          </div>
        </Card>

        {/* Toggles */}
        <Card>
          <CardHeader title="Toggles"/>
          <div className="space-y-4">
            <Toggle checked={tog1} onChange={setTog1} label="Notifications enabled" size="md"/>
            <Toggle checked={tog2} onChange={setTog2} label="Dark mode" size="md"/>
            <Toggle checked={true} onChange={()=>{}} label="Disabled on"  size="sm" disabled/>
            <Toggle checked={false} onChange={()=>{}} label="Disabled off" size="sm" disabled/>
          </div>
        </Card>

        {/* Star Rating */}
        <Card>
          <CardHeader title="Star Ratings"/>
          <div className="space-y-3">
            {[5,4.5,4,3.5,3].map(r=>(
              <div key={r} className="flex items-center gap-3">
                <StarRating value={r} size={16}/>
                <span className="text-sm font-bold" style={{color:'var(--foreground)'}}>{r}</span>
                <span className="text-xs" style={{color:'var(--muted)'}}>out of 5</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Spinners */}
        <Card>
          <CardHeader title="Spinners & Loading"/>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {[16,24,32,40].map(s=>(
                <Spinner key={s} size={s}/>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {(['var(--primary)','var(--success)','var(--warning)','var(--error)'] as const).map(c=>(
                <Spinner key={c} size={24} color={c}/>
              ))}
            </div>
          </div>
        </Card>

        {/* Dividers */}
        <Card>
          <CardHeader title="Dividers"/>
          <div className="space-y-4">
            <Divider/>
            <Divider label="or"/>
            <Divider label="Section Break"/>
            <p className="text-xs" style={{color:'var(--muted)'}}>Dividers separate content sections cleanly.</p>
          </div>
        </Card>

        {/* Cards */}
        <Card className="xl:col-span-1">
          <CardHeader title="Card Variants" subtitle="Used throughout the dashboard"/>
          <div className="space-y-3">
            {[{t:'Info Card',d:'Standard card with header and content',c:'var(--primary)'},{t:'Stat Card',d:'Used for KPI metrics display',c:'var(--success)'},{t:'Action Card',d:'Card with interactive elements',c:'var(--warning)'}].map(c=>(
              <div key={c.t} className="p-3.5 rounded-xl border flex items-start gap-3" style={{borderColor:'var(--border)'}}>
                <div className="w-2 rounded-full flex-shrink-0 self-stretch" style={{background:c.c}}/>
                <div><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{c.t}</p><p className="text-xs" style={{color:'var(--muted)'}}>{c.d}</p></div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </>
  )
}
