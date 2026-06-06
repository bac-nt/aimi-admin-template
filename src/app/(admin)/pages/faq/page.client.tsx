'use client'
import { PageBanner, Accordion, Card } from '@/components/ui'
import { Search, MessageSquare, Book, Settings, CreditCard } from 'lucide-react'
import { useState } from 'react'

const FAQS = {
  General: [
    { q:'What is Modernize Admin?',                    a:'Modernize Admin is a professional Next.js 15 admin dashboard template featuring 90+ UI components, 6 chart types, and a complete design system built with Tailwind CSS and Radix UI primitives.' },
    { q:'Is Modernize Admin free to use?',             a:'Modernize Admin offers both free and pro versions. The free version includes essential features, while the Pro version unlocks advanced components, premium support, and future updates.' },
    { q:'Which browsers are supported?',               a:'Modernize Admin supports all modern browsers including Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported. Mobile browsers are fully supported with responsive design.' },
    { q:'Can I use it for commercial projects?',       a:'Yes! The Pro license allows unlimited commercial usage. You can use it for client projects, SaaS applications, and internal tools without any royalty fees.' },
  ],
  Technical: [
    { q:'What tech stack does Modernize Admin use?',   a:'Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, Recharts, Radix UI, Zustand for state management, and Plus Jakarta Sans font.' },
    { q:'How do I customize the color theme?',         a:'All colors are defined as CSS variables in globals.css. Simply update the --primary, --secondary, and semantic color variables to match your brand. The dark mode tokens update automatically.' },
    { q:'Does it support dark mode?',                  a:'Yes! Dark mode is fully implemented using CSS variables and the next-themes library. Toggle between light and dark mode from the topbar. All components adapt automatically.' },
    { q:'How do I add new pages?',                     a:'Create a new folder inside src/app/ with a page.tsx file. Wrap the content with <> and use the <PageBanner> component for the header. Follow the existing patterns for consistency.' },
  ],
  Billing: [
    { q:'What payment methods are accepted?',          a:'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual enterprise plans.' },
    { q:'Is there a refund policy?',                   a:'Yes! We offer a 14-day money-back guarantee. If you are not satisfied with the product, contact support within 14 days of purchase for a full refund.' },
    { q:'Can I upgrade my license later?',             a:'Absolutely! You can upgrade from a single license to a team or enterprise plan at any time. You will only be charged the difference.' },
  ],
  Support: [
    { q:'How do I get support?',                       a:'Pro users get priority email support with a 24-hour response time. Community support is available through our GitHub Discussions page for all users.' },
    { q:'Is documentation available?',                 a:'Comprehensive documentation is available at docs.modernize.dev covering installation, customization, component API references, and code examples.' },
    { q:'Are updates included?',                       a:'Yes! All future updates within the major version are included with your license. We release new features and improvements regularly.' },
  ],
}

const ICONS:Record<string,React.ElementType> = { General:Book, Technical:Settings, Billing:CreditCard, Support:MessageSquare }

export default function FAQPage() {
  const [search, setSearch]   = useState('')
  const [active, setActive]   = useState('General')
  const cats = Object.keys(FAQS)

  const currentFAQs = FAQS[active as keyof typeof FAQS].filter(f=>
    f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageBanner title="FAQ" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'FAQ'}]} description="Frequently asked questions"/>
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h2 className="text-2xl font-black mb-2" style={{color:'var(--foreground)'}}>How can we help you?</h2>
        <p className="mb-5" style={{color:'var(--muted)'}}>Search our knowledge base or browse categories below.</p>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border shadow-sm" style={{background:'var(--card)',borderColor:'var(--border)'}}>
          <Search size={18} style={{color:'var(--muted)'}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for answers..." className="bg-transparent text-base outline-none w-full" style={{color:'var(--foreground)'}}/>
        </div>
      </div>
      {/* Category tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {cats.map(cat => {
          const Icon = ICONS[cat] || Book
          return (
            <button key={cat} onClick={()=>setActive(cat)} className="card p-4 text-center transition-all hover:shadow-md hover:-translate-y-0.5 duration-200" style={active===cat?{borderColor:'var(--primary)',background:'var(--primary-light)'}:{}}>
              <Icon size={24} className="mx-auto mb-2" style={{color:active===cat?'var(--primary)':'var(--muted)'}}/>
              <p className="text-sm font-semibold" style={{color:active===cat?'var(--primary)':'var(--foreground)'}}>{cat}</p>
              <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>{FAQS[cat as keyof typeof FAQS].length} questions</p>
            </button>
          )
        })}
      </div>
      {/* Accordion */}
      <div className="max-w-3xl mx-auto">
        {currentFAQs.length > 0 ? (
          <Accordion items={currentFAQs.map(f=>({q:f.q,a:f.a}))}/>
        ) : (
          <div className="card p-10 text-center" style={{color:'var(--muted)'}}>
            <Search size={40} className="mx-auto mb-3 opacity-30"/><p className="font-medium">No results found for &ldquo;{search}&rdquo;</p><p className="text-sm mt-1">Try different keywords or browse a category</p>
          </div>
        )}
      </div>
      {/* Still need help */}
      <div className="max-w-3xl mx-auto mt-8">
        <div className="card p-6 text-center" style={{background:'var(--primary-light)'}}>
          <MessageSquare size={32} className="mx-auto mb-3" style={{color:'var(--primary)'}}/><h3 className="font-bold text-lg mb-1" style={{color:'var(--foreground)'}}>Still need help?</h3><p className="text-sm mb-4" style={{color:'var(--muted)'}}>Our support team is ready to assist you.</p>
          <button className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{background:'var(--primary)'}}>Contact Support</button>
        </div>
      </div>
    </>
  )
}
