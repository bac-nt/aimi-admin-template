'use client'
import { PageBanner, Card, Button } from '@/components/ui'
import { useState } from 'react'
import { ChevronDown, Search, MessageSquare, Mail, BookOpen } from 'lucide-react'

const FAQS = [
  { cat:'Getting Started', items:[
    { q:'How do I create my first product?', a:'Navigate to Ecommerce → Catalog → Add Product. Fill in the product name, description, price, and upload images. Set the inventory count and click Publish Product.' },
    { q:'How do I invite team members?', a:'Go to Administration → IAM & Access → Members tab. Click "Invite Member", enter their email address, select a role, and send the invitation.' },
    { q:'Can I import products from a CSV?', a:'Yes! On the Product List page, click the import button in the toolbar. Download our CSV template, fill in your product data, and upload it back. Up to 1,000 products per import.' },
    { q:'How do I set up shipping zones?', a:'Go to Ecommerce → Checkout → Shipping tab. Create shipping zones by country or region, then add rates per zone. You can set flat rate, weight-based, or free shipping thresholds.' },
  ]},
  { cat:'Orders & Payments', items:[
    { q:'How do I process a refund?', a:'Go to Orders, find the order, and click View. Scroll to the items section and click "Refund". Select the items to refund, choose refund to original payment method or store credit, and confirm.' },
    { q:'What payment gateways are supported?', a:'We support Stripe, PayPal, Square, Razorpay, and manual bank transfer. Each gateway can be configured in Ecommerce → Checkout → Payment tab.' },
    { q:'Can I accept partial payments?', a:"Yes, split payments and deposits are supported for custom orders. Enable 'Deposit Payments' in your checkout settings and set the deposit percentage." },
    { q:'How are taxes calculated?', a:"Tax rates are calculated based on the customer's shipping address. Configure your tax rules in Ecommerce → Checkout → Tax tab. You can set rates by country, state, or product category."},
  ]},
  { cat:'Blog & Content', items:[
    { q:'How do I schedule a blog post?', a:'When creating or editing a post, set the Status to "Scheduled" and pick a publish date and time. The post will automatically go live at the specified time.' },
    { q:'Can I use custom URLs for posts?', a:"Yes. The slug field in the post editor lets you set a custom URL. Edit the auto-generated slug to anything you like — it will update the post's permalink." },
    { q:'How do I add SEO metadata?', a:'Each post and product has an SEO section at the bottom of the editor. Fill in the meta title, description, and OG image. The Blog SEO and Product SEO pages show your overall SEO coverage.' },
  ]},
  { cat:'Account & Billing', items:[
    { q:'How do I change my password?', a:'Go to Account Settings → Security tab. Enter your current password, then your new password twice. Passwords must be at least 12 characters with uppercase, number, and special character.' },
    { q:'Can I have multiple admins?', a:'Yes. Each role in IAM & Access has different permissions. You can create custom roles and assign any combination of read/write/delete permissions per module.' },
    { q:'How do I cancel my subscription?', a:'Go to Account Settings → Billing tab and click "Cancel Plan". Your access continues until the end of your billing period. Data is retained for 30 days after cancellation.' },
  ]},
]

export default function FAQPage() {
  const [open,   setOpen]   = useState<string|null>(null)
  const [search, setSearch] = useState('')
  const [cat,    setCat]    = useState('All')

  const cats = ['All', ...FAQS.map(f=>f.cat)]
  const filtered = FAQS
    .filter(f => cat==='All' || f.cat===cat)
    .map(f => ({
      ...f,
      items: f.items.filter(i =>
        !search || i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter(f => f.items.length > 0)

  const totalItems = FAQS.reduce((a,f)=>a+f.items.length,0)

  return (
    <>
      <PageBanner title="FAQ" description="Find answers to frequently asked questions"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'FAQ'}]}/>

      {/* Hero search */}
      <div className="rounded-2xl p-8 mb-6 text-center" style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))'}}>
        <h2 className="text-white font-black text-2xl mb-2">How can we help?</h2>
        <p className="text-white/80 text-sm mb-5">Search {totalItems} answers across {FAQS.length} categories</p>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl max-w-md mx-auto" style={{background:'rgba(255,255,255,0.15)',backdropFilter:'blur(8px)'}}>
          <Search size={16} className="text-white/70 flex-shrink-0"/>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search questions…"
            className="flex-1 bg-transparent text-white placeholder-white/60 text-sm outline-none"/>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {cats.map(c=>(
          <button key={c} type="button" onClick={()=>setCat(c)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={cat===c?{background:'var(--primary)',color:'#fff'}:{background:'var(--card)',color:'var(--muted)',border:'1px solid var(--border)'}}>
            {c}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {filtered.map(section=>(
          <Card key={section.cat} padding={false}>
            <div className="px-5 py-4 border-b flex items-center gap-2" style={{borderColor:'var(--border)'}}>
              <BookOpen size={15} style={{color:'var(--primary)'}}/>
              <h3 className="font-black text-sm" style={{color:'var(--foreground)'}}>{section.cat}</h3>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>{section.items.length}</span>
            </div>
            {section.items.map((item, i)=>{
              const id = `${section.cat}-${i}`
              const isOpen = open===id
              return (
                <div key={i} className="border-b last:border-0" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <button type="button" onClick={()=>setOpen(isOpen?null:id)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-[var(--surface)] transition-colors">
                    <span className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{item.q}</span>
                    <ChevronDown size={15} className={`flex-shrink-0 transition-transform duration-200 ${isOpen?'rotate-180':''}`} style={{color:'var(--muted)'}}/>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm leading-relaxed animate-fade-in" style={{color:'var(--muted)'}}>
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </Card>
        ))}
        {filtered.length===0 && (
          <div className="lg:col-span-2 text-center py-12">
            <Search size={32} className="mx-auto mb-3" style={{color:'var(--border)'}}/>
            <p className="font-semibold" style={{color:'var(--muted)'}}>No results for "{search}"</p>
          </div>
        )}
      </div>

      {/* Still need help */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center gap-6 p-2">
          <div className="text-5xl">🤝</div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-black text-base mb-1" style={{color:'var(--foreground)'}}>Still have questions?</h3>
            <p className="text-sm" style={{color:'var(--muted)'}}>Our support team is available 24/7. Typical response time is under 2 hours.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline"><Mail size={14}/>Email Us</Button>
            <Button><MessageSquare size={14}/>Live Chat</Button>
          </div>
        </div>
      </Card>
    </>
  )
}
