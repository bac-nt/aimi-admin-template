'use client'
import { Shield, Award, Globe, Users, Truck, Heart, Star, ArrowRight, CheckCircle, Linkedin, Twitter, Github } from 'lucide-react'

const TEAM = [
  { name:'Sarah Johnson', role:'CEO & Co-Founder', bio:'10+ years in e-commerce. Passionate about building products people love.', avatar:'SJ', color:'var(--primary)', social:'@sarah' },
  { name:'Michael Chen', role:'CTO & Co-Founder', bio:'Full-stack architect. Previously led engineering at Stripe and Shopify.', avatar:'MC', color:'var(--secondary)', social:'@mchen' },
  { name:'Emma Wilson', role:'Head of Design', bio:'Award-winning designer. Crafts beautiful, accessible user experiences.', avatar:'EW', color:'var(--success)', social:'@emma' },
  { name:'James Murphy', role:'Head of Marketing', bio:'Growth expert. Scaled multiple DTC brands from 0 to $10M ARR.', avatar:'JM', color:'var(--warning)', social:'@james' },
  { name:'Lara Kim', role:'Head of Ops', bio:'Operations virtuoso. Ensures every order ships on time, every time.', avatar:'LK', color:'var(--purple)', social:'@lara' },
  { name:'Sunil Patel', role:'Lead Engineer', bio:'Infrastructure specialist. Keeps the platform fast and reliable 24/7.', avatar:'SP', color:'var(--error)', social:'@sunil' },
]
const VALUES = [
  { icon:Heart,    title:'Customer First', desc:'Every decision starts with asking: how does this help our customers? We obsess over experience, quality and service.' },
  { icon:Shield,   title:'Trust & Quality', desc:"We vet every product and supplier rigorously. If we wouldn't buy it ourselves, we won't sell it." },
  { icon:Globe,    title:'Sustainability',  desc:'Committed to reducing our carbon footprint. We offset 100% of shipping emissions and use eco-friendly packaging.' },
  { icon:Award,    title:'Excellence',      desc:'We set high standards for ourselves and our partners. Good enough is never good enough for us.' },
]
const MILESTONES = [
  { year:'2018', title:'Founded', desc:'Started in a garage with 50 products and a dream.' },
  { year:'2019', title:'First 10K customers', desc:"Reached a milestone we'll never forget." },
  { year:'2021', title:'$10M Revenue', desc:'Profitable and growing. Expanded to 3 warehouses.' },
  { year:'2023', title:'45 Countries', desc:'Gone global. International shipping on every continent.' },
  { year:'2024', title:'1M+ Orders', desc:'Served over a million happy customers worldwide.' },
  { year:'2025', title:'Aimi v2', desc:'Rebuilt from the ground up. Faster, smarter, better.' },
]

export default function AboutPage() {
  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:'var(--foreground)',background:'var(--surface)'}}>

      {/* Nav */}
      <nav className="border-b" style={{background:'var(--card)',borderColor:'var(--border)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 h-16">
          <div className="font-black text-xl" style={{color:'var(--primary)'}}>Aimi</div>
          {['Shop','Blog','About','Contact'].map(n=>(
            <a key={n} href="#" className="text-sm font-semibold transition-colors hover:text-[var(--primary)] hidden md:block" style={{color:n==='About'?'var(--primary)':'var(--muted)'}}>{n}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center" style={{background:'linear-gradient(135deg,#0a0a1a,#111827)'}}>
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'radial-gradient(circle at 1px 1px,white 1px,transparent 0)',backgroundSize:'24px 24px'}}/>
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{background:'var(--primary)'}}/>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full blur-3xl opacity-10" style={{background:'var(--secondary)'}}/>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-2" style={{background:'rgba(93,135,255,0.15)',color:'var(--primary)',border:'1px solid rgba(93,135,255,0.3)'}}>
            Our Story
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-none">We believe in<br/><span style={{color:'var(--primary)'}}>better shopping</span></h1>
          <p className="text-white/60 text-lg leading-relaxed">Built by shoppers, for shoppers. We're on a mission to make premium products accessible, the shopping experience delightful, and delivery reliable.</p>
          <div className="flex items-center justify-center gap-6 pt-4">
            {[{v:'50K+',l:'Customers'},{v:'10K+',l:'Products'},{v:'4.9★',l:'Rating'},{v:'45',l:'Countries'}].map(s=>(
              <div key={s.l} className="text-center">
                <p className="text-2xl font-black text-white">{s.v}</p>
                <p className="text-white/50 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{background:'var(--primary-light)',color:'var(--primary)'}}>Our Mission</div>
            <h2 className="text-4xl font-black leading-tight" style={{color:'var(--foreground)'}}>Commerce that puts people first</h2>
            <p className="text-base leading-relaxed" style={{color:'var(--muted)'}}>We started Aimi because we were frustrated with online shopping. Too many middlemen, too little transparency, and too much compromise on quality.</p>
            <p className="text-base leading-relaxed" style={{color:'var(--muted)'}}>So we built something different: a platform that connects customers directly with trusted brands, backed by a team that actually cares about your experience.</p>
            <div className="space-y-3">
              {['Curated selection — quality over quantity','Transparent pricing — no hidden fees','Carbon-neutral shipping on every order','30-day no-questions-asked returns'].map(item=>(
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={17} style={{color:'var(--success)',flexShrink:0}}/>
                  <span className="text-sm font-medium" style={{color:'var(--foreground)'}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['https://picsum.photos/seed/about1/400/300','https://picsum.photos/seed/about2/400/300','https://picsum.photos/seed/about3/400/300','https://picsum.photos/seed/about4/400/300'].map((img,i)=>(
              <div key={i} className="aspect-square rounded-3xl overflow-hidden" style={{transform:i===1||i===2?'translateY(20px)':undefined}}>
                <img src={img} alt="" className="w-full h-full object-cover"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{background:'var(--card)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{background:'var(--primary-light)',color:'var(--primary)'}}>What we stand for</div>
            <h2 className="text-4xl font-black" style={{color:'var(--foreground)'}}>Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({icon:Icon,title,desc})=>(
              <div key={title} className="p-6 rounded-3xl border hover:shadow-lg transition-all" style={{borderColor:'var(--border)',background:'var(--surface)'}}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{background:'var(--primary-light)',color:'var(--primary)'}}>
                  <Icon size={22}/>
                </div>
                <h3 className="font-black text-base mb-2" style={{color:'var(--foreground)'}}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{color:'var(--muted)'}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{background:'var(--primary-light)',color:'var(--primary)'}}>The team</div>
          <h2 className="text-4xl font-black" style={{color:'var(--foreground)'}}>People behind Aimi</h2>
          <p className="text-base mt-3" style={{color:'var(--muted)'}}>A small team of passionate builders, designers and operators.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map(m=>(
            <div key={m.name} className="group p-6 rounded-3xl border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{background:'var(--card)',borderColor:'var(--border)'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black flex-shrink-0" style={{background:m.color}}>{m.avatar}</div>
                <div>
                  <h3 className="font-black text-sm" style={{color:'var(--foreground)'}}>{m.name}</h3>
                  <p className="text-xs font-semibold" style={{color:m.color}}>{m.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{color:'var(--muted)'}}>{m.bio}</p>
              <div className="flex gap-2">
                {[{Icon:Twitter},{Icon:Linkedin},{Icon:Github}].map(({Icon},i)=>(
                  <button key={i} type="button" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}>
                    <Icon size={13}/>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{background:'var(--card)'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{background:'var(--primary-light)',color:'var(--primary)'}}>Journey</div>
            <h2 className="text-4xl font-black" style={{color:'var(--foreground)'}}>Our Story So Far</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[60px] top-0 bottom-0 w-px" style={{background:'var(--border)'}}/>
            <div className="space-y-8">
              {MILESTONES.map((m,i)=>(
                <div key={i} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="text-xs font-black" style={{color:'var(--primary)'}}>{m.year}</span>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-3 h-3 rounded-full border-2 mt-0.5 transition-all group-hover:scale-150" style={{background:'var(--primary)',borderColor:'var(--card)',boxShadow:`0 0 0 3px var(--primary-light)`}}/>
                  </div>
                  <div className="flex-1 pb-4">
                    <h3 className="font-black text-sm mb-1" style={{color:'var(--foreground)'}}>{m.title}</h3>
                    <p className="text-xs" style={{color:'var(--muted)'}}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="rounded-3xl p-12 text-center text-white relative overflow-hidden" style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))'}}>
          <div className="absolute right-0 top-0 w-48 h-48 rounded-full opacity-10" style={{background:'white',transform:'translate(30%,-30%)'}}/>
          <div className="relative space-y-4">
            <h2 className="text-4xl font-black">Ready to start shopping?</h2>
            <p className="text-white/80">Join 50,000+ happy customers who trust Aimi.</p>
            <button type="button" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all hover:opacity-90 hover:shadow-lg" style={{background:'white',color:'var(--primary)'}}>
              Shop Now <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      </section>

      <div className="border-t py-6 text-center text-xs" style={{borderColor:'var(--border)',background:'var(--card)',color:'var(--muted)'}}>
        © 2025 Aimi. All rights reserved.
      </div>
    </div>
  )
}
