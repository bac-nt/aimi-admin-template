'use client'
import { PageBanner, Card, Button, Toggle } from '@/components/ui'
import { useState } from 'react'
export default function Page() {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <PageBanner title="Form Layout" breadcrumbs={[{label:'Home',href:'/'},{label:'Forms'},{label:'Form Layout'}]} description="Standard form layout"/>
      <div className="max-w-2xl space-y-5">
        <Card>
          <h3 className="font-bold mb-5" style={{color:'var(--foreground)'}}>Form Layout Example</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>First Name</label><input className="field w-full" placeholder="John"/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Last Name</label><input className="field w-full" placeholder="Doe"/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Email</label><input type="email" className="field w-full" placeholder="john@example.com"/></div>
            <div><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Phone</label><input type="tel" className="field w-full" placeholder="+1 234 567"/></div>
            <div className="sm:col-span-2"><label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Message</label><textarea className="field w-full resize-none" rows={3} placeholder="Your message..."/></div>
            <div className="sm:col-span-2 flex items-center justify-between py-1">
              <span className="text-sm font-semibold" style={{color:'var(--foreground)'}}>Subscribe to newsletter</span>
              <Toggle checked={toggle} onChange={setToggle}/>
            </div>
          </div>
          <div className="flex gap-3 mt-5"><Button>Submit</Button><Button variant="ghost">Reset</Button></div>
        </Card>
      </div>
    </>
  )
}
