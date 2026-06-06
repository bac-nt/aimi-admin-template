'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare, Headphones, ShoppingBag, FileText } from 'lucide-react'

const CONTACT_OPTIONS = [
  { icon:MessageSquare, title:'Live Chat', desc:'Chat with us in real-time', action:'Start Chat', time:'Avg. response: 2 min', color:'var(--primary)' },
  { icon:Mail,          title:'Email',     desc:'Send us a detailed message', action:'Send Email', time:'Response within 24h', color:'var(--secondary)' },
  { icon:Phone,         title:'Phone',     desc:'Speak to our support team', action:'Call Now',  time:'Mon–Fri 9AM–6PM',   color:'var(--success)' },
]
const FAQS = [
  { q:'How do I track my order?', a:"Visit Order Tracking and enter your order ID. You'll get real-time updates from dispatch to doorstep." },
  { q:'What is your return policy?', a:'We offer 30-day hassle-free returns on all items. Just initiate a return in your account dashboard.' },
  { q:'Do you ship internationally?', a:'Yes! We ship to 45+ countries. Rates and delivery times vary by destination.' },
  { q:'How do I cancel an order?', a:'Orders can be cancelled within 1 hour of placing them. Contact us immediately via chat for fastest response.' },
]
const TOPICS = ['Order & Shipping','Returns & Refunds','Product Question','Account & Billing','Technical Issue','Partnership','Press & Media','Other']

export default function ContactPage() {
  const [form,  setForm]  = useState({ name:'', email:'', topic:'Order & Shipping', message:'' })
  const [sent,  setSent]  = useState(false)
  const [sending,setSending] = useState(false)
  const [openFaq,setOpenFaq] = useState<number|null>(null)

  const handleSubmit = () => {
    if (!form.name||!form.email||!form.message) return
    setSending(true)
    setTimeout(()=>{ setSending(false); setSent(true) },1400)
  }

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:'var(--foreground)',background:'var(--surface)'}}>

      {/* Nav */}
      <nav className="border-b" style={{background:'var(--card)',borderColor:'var(--border)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 h-16">
          <div className="font-black text-xl" style={{color:'var(--primary)'}}>Aimi</div>
          {['Shop','Blog','About','Contact'].map(n=>(
            <a key={n} href="#" className="text-sm font-semibold transition-colors hover:text-[var(--primary)] hidden md:block" style={{color:n==='Contact'?'var(--primary)':'var(--muted)'}}>{n}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div className="py-16 text-center" style={{background:'linear-gradient(135deg,var(--primary-light),var(--secondary-light))'}}>
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h1 className="text-4xl font-black" style={{color:'var(--foreground)'}}>How can we help?</h1>
          <p style={{color:'var(--muted)'}}>Our support team is available 24/7. We typically respond within 2 hours.</p>
          {/* Quick contact options */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {CONTACT_OPTIONS.map(o=>(
              <button key={o.title} type="button" className="p-4 rounded-2xl border hover:shadow-lg transition-all hover:-translate-y-0.5 text-center group" style={{background:'var(--card)',borderColor:'var(--border)'}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all" style={{background:o.color+'15',color:o.color}}>
                  <o.icon size={18}/>
                </div>
                <p className="font-black text-sm" style={{color:'var(--foreground)'}}>{o.title}</p>
                <p className="text-[10px] mt-0.5" style={{color:'var(--muted)'}}>{o.time}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border p-8" style={{background:'var(--card)',borderColor:'var(--border)'}}>
            <h2 className="text-2xl font-black mb-2" style={{color:'var(--foreground)'}}>Send us a message</h2>
            <p className="text-sm mb-7" style={{color:'var(--muted)'}}>Fill in the form below and we'll get back to you as soon as possible.</p>

            {sent ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{background:'var(--success-light)',color:'var(--success)'}}>
                  <Check size={36}/>
                </div>
                <h3 className="text-xl font-black" style={{color:'var(--foreground)'}}>Message sent!</h3>
                <p style={{color:'var(--muted)'}}>Thanks {form.name}! We'll reply to {form.email} within 24 hours.</p>
                <button type="button" onClick={()=>setSent(false)} className="text-sm font-semibold" style={{color:'var(--primary)'}}>Send another message →</button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Full Name *</label>
                    <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="John Doe"
                      className="field w-full"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Email Address *</label>
                    <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="john@example.com"
                      className="field w-full"/>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Topic</label>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map(t=>(
                      <button key={t} type="button" onClick={()=>setForm(f=>({...f,topic:t}))}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                        style={form.topic===t?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Message *</label>
                  <textarea rows={6} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                    placeholder="Describe your question or issue in detail. Include your order number if relevant."
                    className="field w-full resize-none"/>
                </div>

                <button type="button" onClick={handleSubmit} disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
                  style={{background:'var(--primary)'}}>
                  {sending ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>Sending…</>
                  ) : (
                    <><Send size={15}/>Send Message</>
                  )}
                </button>
                <p className="text-xs text-center" style={{color:'var(--muted)'}}>By submitting you agree to our Privacy Policy. We'll never spam you.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact info */}
          <div className="rounded-3xl border p-6 space-y-5" style={{background:'var(--card)',borderColor:'var(--border)'}}>
            <h3 className="font-black text-base" style={{color:'var(--foreground)'}}>Contact Info</h3>
            {[{Icon:Mail,l:'Email',v:'support@aimi.com',c:'var(--primary)'},{Icon:Phone,l:'Phone',v:'+1 (555) 000-0100',c:'var(--success)'},{Icon:MapPin,l:'Address',v:'123 Commerce St, San Francisco, CA 94107',c:'var(--secondary)'},{Icon:Clock,l:'Hours',v:'Mon–Fri 9AM–6PM PST',c:'var(--warning)'}].map(({Icon,l,v,c})=>(
              <div key={l} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:c+'15',color:c}}><Icon size={16}/></div>
                <div><p className="text-xs font-bold" style={{color:'var(--muted)'}}>{l}</p><p className="text-sm font-semibold" style={{color:'var(--foreground)'}}>{v}</p></div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="rounded-3xl border overflow-hidden" style={{background:'var(--card)',borderColor:'var(--border)'}}>
            <div className="px-5 py-4 border-b" style={{borderColor:'var(--border)'}}>
              <h3 className="font-black text-sm" style={{color:'var(--foreground)'}}>Quick Answers</h3>
            </div>
            {FAQS.map((faq,i)=>(
              <div key={i} className="border-b last:border-0" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                <button type="button" onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  className="w-full text-left px-5 py-3.5 flex justify-between items-start gap-2 hover:bg-[var(--surface)] transition-colors">
                  <span className="text-xs font-semibold" style={{color:'var(--foreground)'}}>{faq.q}</span>
                  <span className="flex-shrink-0 text-lg leading-none" style={{color:'var(--muted)'}}>{openFaq===i?'−':'+'}</span>
                </button>
                {openFaq===i && <div className="px-5 pb-4 text-xs leading-relaxed" style={{color:'var(--muted)'}}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t py-6 text-center text-xs" style={{borderColor:'var(--border)',background:'var(--card)',color:'var(--muted)'}}>
        © 2025 Aimi · <a href="#" style={{color:'var(--primary)'}}>Privacy</a> · <a href="#" style={{color:'var(--primary)'}}>Terms</a>
      </div>
    </div>
  )
}
