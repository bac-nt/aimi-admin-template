'use client'
import { PageBanner, Card, CardHeader, Badge, Button, Alert, Progress, Avatar, Divider } from '@/components/ui'
import { Download, Share2, Printer, Edit, Star, Heart, BookOpen, Clock, Eye, ThumbsUp } from 'lucide-react'

export default function SamplePage() {
  return (
    <>
      <PageBanner title="Sample Page" description="A general purpose page template showcasing all common content patterns"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Sample Page'}]}
        action={<div className="flex gap-2"><Button variant="outline"><Printer size={14}/>Print</Button><Button><Edit size={14}/>Edit Page</Button></div>}/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Main content */}
        <div className="xl:col-span-2 space-y-5">

          {/* Hero image block */}
          <Card padding={false} className="overflow-hidden">
            <div className="h-56 flex items-end relative" style={{background:'linear-gradient(135deg,var(--primary) 0%,var(--secondary) 50%,var(--success) 100%)'}}>
              <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',backgroundSize:'24px 24px'}}/>
              <div className="relative p-6">
                <Badge variant="primary" className="mb-2 bg-white/20 text-white border-0">Featured Article</Badge>
                <h1 className="text-2xl font-black text-white mb-1">Building a Modern Admin Dashboard</h1>
                <p className="text-white/80 text-sm">A comprehensive guide to Next.js, TypeScript and Tailwind CSS</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-3.5 border-b" style={{borderColor:'var(--border)'}}>
              <Avatar name="Mathew Anderson" size={32} color="var(--primary)"/>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>Mathew Anderson</p>
                <p className="text-xs" style={{color:'var(--muted)'}}>March 28, 2025 · 8 min read</p>
              </div>
              <div className="flex items-center gap-3 text-xs" style={{color:'var(--muted)'}}>
                <span className="flex items-center gap-1"><Eye size={12}/>4,200</span>
                <span className="flex items-center gap-1"><ThumbsUp size={12}/>128</span>
                <span className="flex items-center gap-1"><Star size={12}/>84</span>
              </div>
            </div>
          </Card>

          {/* Typography block */}
          <Card>
            <CardHeader title="Typography & Content" subtitle="Standard heading and paragraph styles"/>
            <div className="prose max-w-none space-y-4">
              <h2 className="text-xl font-black" style={{color:'var(--foreground)'}}>Introduction</h2>
              <p className="text-sm leading-relaxed" style={{color:'var(--muted)'}}>
                This sample page demonstrates the standard content layout used across the admin dashboard. 
                It showcases typography, images, alerts, badges, and other UI patterns you'll use when building pages.
              </p>
              <h3 className="text-base font-bold" style={{color:'var(--foreground)'}}>Key Principles</h3>
              <p className="text-sm leading-relaxed" style={{color:'var(--muted)'}}>
                Good admin interfaces balance information density with clarity. Use cards to group related content, 
                badges to surface status at a glance, and progressive disclosure to avoid overwhelming users.
              </p>
              <Alert variant="info">
                <strong>Pro Tip:</strong> Use the PageBanner component on every page for consistent breadcrumb navigation and title hierarchy.
              </Alert>
              <h3 className="text-base font-bold" style={{color:'var(--foreground)'}}>Content Structure</h3>
              <ul className="space-y-2 text-sm" style={{color:'var(--muted)'}}>
                {['Use H2 for major sections, H3 for sub-sections','Keep paragraphs short — 3 to 4 sentences maximum','Lead with the most important information','Use alerts sparingly for truly important notices'].map((item,i)=>(
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5" style={{background:'var(--primary)'}}>{i+1}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Alert variant="success">This template is ready to customize. Replace this placeholder content with your page's real content.</Alert>
            </div>
          </Card>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{l:'Page Views',v:'12,840',c:'var(--primary)'},{l:'Avg. Time',v:'4m 32s',c:'var(--secondary)'},{l:'Bounce Rate',v:'34%',c:'var(--success)'},{l:'Conversions',v:'8.4%',c:'var(--warning)'}].map(s=>(
              <Card key={s.l} className="text-center">
                <p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p>
                <p className="text-xs mt-1" style={{color:'var(--muted)'}}>{s.l}</p>
              </Card>
            ))}
          </div>

          {/* Media block */}
          <Card>
            <CardHeader title="Media & Images"/>
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3,4,5,6].map(i=>(
                <div key={i} className="aspect-video rounded-xl overflow-hidden" style={{background:'var(--surface)'}}>
                  <img src={`https://picsum.photos/seed/sample${i}/400/240`} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card>
            <CardHeader title="Page Info"/>
            <div className="space-y-3">
              {[{l:'Status',v:'Published',vc:'var(--success)'},{l:'Visibility',v:'Public',vc:'var(--foreground)'},{l:'Author',v:'Mathew Anderson',vc:'var(--foreground)'},{l:'Last Updated',v:'Mar 28, 2025',vc:'var(--muted)'}].map(r=>(
                <div key={r.l} className="flex justify-between py-2.5 border-b last:border-0 text-sm" style={{borderColor:'var(--border)'}}>
                  <span style={{color:'var(--muted)'}}>{r.l}</span>
                  <span className="font-semibold" style={{color:r.vc}}>{r.v}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Tags"/>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js','TypeScript','Tailwind','Dashboard','Admin','UI/UX','React'].map(t=>(
                <Badge key={t} variant="primary">{t}</Badge>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Table of Contents"/>
            <nav className="space-y-1">
              {['Introduction','Key Principles','Content Structure','Stats & Metrics','Media & Images'].map((item,i)=>(
                <a key={i} href="#" className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}>
                  <span className="w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center flex-shrink-0" style={{background:'var(--primary-light)',color:'var(--primary)'}}>{i+1}</span>
                  {item}
                </a>
              ))}
            </nav>
          </Card>

          <Card>
            <CardHeader title="Related Pages"/>
            {['About Page','Contact Page','Blog Listing','Pricing Page'].map((p,i)=>(
              <a key={i} href="#" className="flex items-center gap-2.5 py-2.5 border-b last:border-0 hover:text-[var(--primary)] transition-colors" style={{borderColor:'var(--border)',color:'var(--muted)'}}>
                <BookOpen size={13} style={{flexShrink:0}}/>
                <span className="text-sm">{p}</span>
              </a>
            ))}
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1"><Share2 size={14}/>Share</Button>
            <Button variant="outline" className="flex-1"><Download size={14}/>Export</Button>
          </div>
        </div>
      </div>
    </>
  )
}
