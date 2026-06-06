'use client'
import { useState, useMemo } from 'react'
import { PageBanner, Card, Badge, Button } from '@/components/ui'
import { PRODUCTS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { Search, X, SlidersHorizontal } from 'lucide-react'

export default function SearchableTablePage() {
  const [query,   setQuery]   = useState('')
  const [catFilter, setCat]   = useState('All')
  const [showFilters, setShowF] = useState(false)
  const [priceMax, setPriceMax] = useState(2000)

  const cats = ['All', ...Array.from(new Set(PRODUCTS.map(p=>p.category)))]

  const results = useMemo(() => {
    const q = query.toLowerCase()
    return PRODUCTS.filter(p => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      const matchC = catFilter==='All' || p.category===catFilter
      const matchP = p.price <= priceMax
      return matchQ && matchC && matchP
    })
  }, [query, catFilter, priceMax])

  // Highlight matching text
  const highlight = (text: string) => {
    if (!query) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0,idx)}
        <mark style={{background:'var(--warning-light)',color:'var(--warning)',borderRadius:3,padding:'0 2px'}}>{text.slice(idx,idx+query.length)}</mark>
        {text.slice(idx+query.length)}
      </>
    )
  }

  return (
    <>
      <PageBanner title="Searchable Table" description="Full-text search across all columns with real-time highlighting"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Tables'},{label:'Searchable Table'}]}/>

      <Card padding={false}>
        {/* Search bar */}
        <div className="p-4 border-b" style={{borderColor:'var(--border)'}}>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border flex-1 max-w-lg transition-all focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(93,135,255,0.12)]" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
              <Search size={15} style={{color:'var(--muted)'}}/>
              <input value={query} onChange={e=>setQuery(e.target.value)}
                placeholder="Search by name, SKU, brand, category…"
                className="flex-1 bg-transparent text-sm outline-none" style={{color:'var(--foreground)'}}/>
              {query && <button type="button" onClick={()=>setQuery('')} style={{color:'var(--muted)'}}><X size={14}/></button>}
            </div>
            <button type="button" onClick={()=>setShowF(v=>!v)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors"
              style={{borderColor:showFilters?'var(--primary)':'var(--border)', color:showFilters?'var(--primary)':'var(--muted)', background:showFilters?'var(--primary-light)':'transparent'}}>
              <SlidersHorizontal size={14}/>Filters{showFilters?' ▲':' ▼'}
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t animate-fade-in" style={{borderColor:'var(--border)'}}>
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{color:'var(--muted)'}}>Category</p>
                <div className="flex gap-1.5 flex-wrap">
                  {cats.map(c=>(
                    <button key={c} type="button" onClick={()=>setCat(c)}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                      style={catFilter===c?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{color:'var(--muted)'}}>Max Price: <strong style={{color:'var(--primary)'}}>${priceMax}</strong></p>
                <input type="range" min={10} max={2000} value={priceMax} onChange={e=>setPriceMax(+e.target.value)} className="w-48 accent-[var(--primary)]"/>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="px-5 py-2.5 border-b text-xs" style={{borderColor:'var(--border)',background:'var(--surface)'}}>
          {query ? (
            <span style={{color:'var(--foreground)'}}>
              Found <strong style={{color:'var(--primary)'}}>{results.length}</strong> results for "<strong>{query}</strong>"
            </span>
          ) : <span style={{color:'var(--muted)'}}>Showing all {results.length} products</span>}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
              {['Product','SKU','Brand','Category','Price','Stock','Status'].map(h=>(
                <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {results.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-16 text-center animate-fade-in">
                  <Search size={32} className="mx-auto mb-3" style={{color:'var(--border)'}}/>
                  <p className="font-semibold" style={{color:'var(--muted)'}}>No results found</p>
                  <p className="text-xs mt-1" style={{color:'var(--muted)'}}>Try a different search term</p>
                </td></tr>
              ) : results.map(p=>(
                <tr key={p.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={p.img} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0"/>
                      <span className="font-semibold" style={{color:'var(--foreground)'}}>{highlight(p.name)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs" style={{color:'var(--muted)'}}>{highlight(p.sku)}</td>
                  <td className="px-5 py-3.5 text-sm" style={{color:'var(--foreground)'}}>{highlight(p.brand)}</td>
                  <td className="px-5 py-3.5"><Badge variant="primary">{highlight(p.category)}</Badge></td>
                  <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3.5 font-semibold" style={{color:p.stock===0?'var(--error)':p.stock<20?'var(--warning)':'var(--success)'}}>{p.stock}</td>
                  <td className="px-5 py-3.5"><Badge variant={p.status==='Active'?'success':'muted'} dot>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
