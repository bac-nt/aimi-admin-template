'use client'
import { PageBanner, Card, Badge, Progress } from '@/components/ui'
import { AreaChartWidget } from '@/components/charts'
import { COLOR } from '@/config/tokens'
import { Globe, Target, Users, Award, Linkedin, Twitter, Github } from 'lucide-react'

const TEAM = [
  { name:'James Wilson',    role:'CEO & Founder',      img:'https://randomuser.me/api/portraits/men/32.jpg',  skills:['Strategy','Product','Leadership'] },
  { name:'Sarah Chen',      role:'CTO',                img:'https://randomuser.me/api/portraits/women/44.jpg', skills:['Architecture','React','Node.js'] },
  { name:'Marcus Johnson',  role:'Design Lead',        img:'https://randomuser.me/api/portraits/men/45.jpg',  skills:['UI/UX','Figma','Branding'] },
  { name:'Emma Rodriguez',  role:'Head of Marketing',  img:'https://randomuser.me/api/portraits/women/32.jpg', skills:['SEO','Content','Growth'] },
]
const VALUES = [
  { icon:Target, title:'Mission',     desc:'Build tools that help developers ship faster without compromising quality.',     color:COLOR.primary   },
  { icon:Users,  title:'Community',   desc:'We believe in open source and giving back to the developer community.',          color:COLOR.success   },
  { icon:Globe,  title:'Accessibility',desc:'Every product we build follows WCAG guidelines and works for everyone.',        color:COLOR.secondary },
  { icon:Award,  title:'Excellence',  desc:'We are obsessed with quality — from code to design to documentation.',           color:COLOR.warning   },
]
const MILESTONES = [
  { year:'2020', label:'Company Founded',    desc:'Started as a small open-source project'  },
  { year:'2021', label:'1K Stars on GitHub', desc:'Community grew to 1,000 developers'       },
  { year:'2022', label:'Series A Funding',   desc:'Raised $2M to accelerate growth'          },
  { year:'2023', label:'10K Active Users',   desc:'Reached milestone of 10,000 paying users' },
  { year:'2024', label:'Enterprise Launch',  desc:'Launched enterprise tier for large teams'  },
  { year:'2025', label:'Next.js 16 Release', desc:'Full rewrite with latest tech stack'       },
]

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'About Us'}]}/>

      {/* Mission statement */}
      <div className="card p-8 text-center mb-5" style={{background:'linear-gradient(135deg,var(--primary-light),var(--secondary-light))'}}>
        <Badge variant="primary" className="mb-3">Our Story</Badge>
        <h2 className="text-3xl font-black mb-3" style={{color:'var(--foreground)'}}>Building the future of<br/>admin interfaces</h2>
        <p className="max-w-xl mx-auto" style={{color:'var(--muted)'}}>We started in 2020 with a simple mission: make admin dashboards beautiful, performant, and accessible to every developer, regardless of skill level.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[{v:'12K+',l:'Active Users',c:COLOR.primary},{v:'90+',l:'Components',c:COLOR.secondary},{v:'4.9/5',l:'Avg Rating',c:COLOR.warning},{v:'99.9%',l:'Uptime SLA',c:COLOR.success}].map(s=>(
          <Card key={s.l} className="text-center"><p className="text-3xl font-black mb-1" style={{color:s.c}}>{s.v}</p><p className="text-xs" style={{color:'var(--muted)'}}>{s.l}</p></Card>
        ))}
      </div>

      {/* Values + Growth chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        <Card>
          <h2 className="font-black text-xl mb-4" style={{color:'var(--foreground)'}}>Our Values</h2>
          <div className="space-y-3">
            {VALUES.map(v=>(
              <div key={v.title} className="flex gap-3 p-3.5 rounded-xl" style={{background:'var(--surface)'}}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:v.color+'22'}}><v.icon size={18} style={{color:v.color}}/></div>
                <div><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{v.title}</p><p className="text-xs" style={{color:'var(--muted)'}}>{v.desc}</p></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-black text-xl mb-1" style={{color:'var(--foreground)'}}>Company Growth</h2>
          <p className="text-xs mb-4" style={{color:'var(--muted)'}}>Users over time</p>
          <AreaChartWidget series={[{name:'Users',data:[200,800,2100,5400,8900,12000]}]} categories={['2020','2021','2022','2023','2024','2025']} colors={[COLOR.primary]} height={200}/>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[{l:'YoY Growth',v:'142%',c:COLOR.success},{l:'Retention',v:'94%',c:COLOR.primary},{l:'NPS Score',v:'72',c:COLOR.warning}].map(s=>(
              <div key={s.l} className="text-center p-2.5 rounded-xl" style={{background:'var(--surface)'}}>
                <p className="font-black text-lg" style={{color:s.c}}>{s.v}</p>
                <p className="text-[10px]" style={{color:'var(--muted)'}}>{s.l}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Team */}
      <h2 className="font-black text-xl mb-4" style={{color:'var(--foreground)'}}>Meet the Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {TEAM.map(m=>(
          <Card key={m.name} className="text-center">
            <img src={m.img} alt={m.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"/>
            <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}>{m.name}</h3>
            <p className="text-xs font-medium mb-3" style={{color:'var(--primary)'}}>{m.role}</p>
            <div className="flex flex-wrap gap-1 justify-center mb-3">{m.skills.map(s=><Badge key={s} variant="muted" className="text-[10px]">{s}</Badge>)}</div>
            <div className="flex justify-center gap-2">{[Linkedin,Twitter,Github].map((Icon,i)=><button key={i} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}><Icon size={13}/></button>)}</div>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      <Card>
        <h2 className="font-black text-xl mb-6" style={{color:'var(--foreground)'}}>Our Journey</h2>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{background:'var(--border)'}}/>
          <div className="space-y-6">
            {MILESTONES.map((m,i)=>(
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 z-10" style={{background:`var(--${i%2===0?'primary':'secondary'})`}}>{m.year.slice(2)}</div>
                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{m.label}</p>
                    <Badge variant={i%2===0?'primary':'secondary'} className="text-[10px]">{m.year}</Badge>
                  </div>
                  <p className="text-xs" style={{color:'var(--muted)'}}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  )
}
