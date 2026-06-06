'use client'
import { PageBanner, Card, Badge, Button, StarRating, Select, Modal } from '@/components/ui'
import { PRODUCTS } from '@/lib/data'
import { Search, Plus, Eye, Edit, Trash2, Grid, List, Check } from 'lucide-react'
import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

type ProductItem = typeof PRODUCTS[0] & { id: number }

export default function ProductListPage() {
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('All')
  const [view, setView]       = useState<'grid'|'list'>('list')
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS as ProductItem[])
  const [deleteId, setDeleteId] = useState<number|null>(null)
  const [toast, setToast]     = useState<string|null>(null)

  const cats = ['All',...Array.from(new Set(products.map(p=>p.category)))]
  const filtered = products.filter(p=>{
    const ms = p.name.toLowerCase().includes(search.toLowerCase())
    const mc = cat==='All' || p.category===cat
    return ms && mc
  })

  const handleDelete = (id: number) => {
    setProducts(ps => ps.filter(p => p.id !== id))
    setDeleteId(null)
    showToast('Product deleted successfully')
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold animate-fade-up shadow-lg" style={{background:'var(--success)'}}>
          <Check size={16}/>{toast}
        </div>
      )}

      <PageBanner title="Product List" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'List'}]}/>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border w-56" style={{background:'var(--card)',borderColor:'var(--border)'}}>
          <Search size={14} style={{color:'var(--muted)'}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="bg-transparent text-sm outline-none w-full" style={{color:'var(--foreground)'}}/>
        </div>
        <div className="relative w-40">
          <Select options={cats.map(c=>({value:c,label:c}))} value={cat} onChange={setCat}/>
        </div>
        <div className="flex border rounded-xl overflow-hidden ml-auto" style={{borderColor:'var(--border)'}}>
          <button onClick={()=>setView('grid')} className="px-3 py-2 transition-colors" style={view==='grid'?{background:'var(--primary)',color:'white'}:{color:'var(--muted)'}}><Grid size={15}/></button>
          <button onClick={()=>setView('list')} className="px-3 py-2 transition-colors" style={view==='list'?{background:'var(--primary)',color:'white'}:{color:'var(--muted)'}}><List size={15}/></button>
        </div>
        <Link href="/apps/ecommerce/add-product">
          <Button><Plus size={14}/>Add Product</Button>
        </Link>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-4 text-sm" style={{color:'var(--muted)'}}>
        <span><strong style={{color:'var(--foreground)'}}>{filtered.length}</strong> products</span>
        {cat !== 'All' && <Badge variant="primary">{cat}</Badge>}
        {search && <span>matching "<strong style={{color:'var(--foreground)'}}>{search}</strong>"</span>}
      </div>

      {view==='grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p=>(
            <div key={p.id} className="card group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="relative h-48 overflow-hidden" style={{background:'var(--surface)'}}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute top-3 left-3"><Badge variant="primary">{p.category}</Badge></div>
                {p.original > p.price && <div className="absolute top-3 right-3"><Badge variant="error">-{Math.round((1-p.price/p.original)*100)}%</Badge></div>}
                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="w-9 h-9 rounded-xl bg-white flex items-center justify-center transition-all hover:scale-110" style={{color:'var(--primary)'}}><Eye size={14}/></button>
                  <Link href="/apps/ecommerce/add-product"><button className="w-9 h-9 rounded-xl bg-white flex items-center justify-center transition-all hover:scale-110" style={{color:'var(--secondary)'}}><Edit size={14}/></button></Link>
                  <button onClick={()=>setDeleteId(p.id)} className="w-9 h-9 rounded-xl bg-white flex items-center justify-center transition-all hover:scale-110" style={{color:'var(--error)'}}><Trash2 size={14}/></button>
                </div>
              </div>
              <div className="p-4">
                <p className="font-bold text-sm mb-1" style={{color:'var(--foreground)'}}>{p.name}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-black" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</span>
                  <span className="text-xs line-through" style={{color:'var(--muted)'}}>{formatCurrency(p.original)}</span>
                </div>
                <StarRating value={p.rating} size={12}/>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr style={{borderBottom:`1px solid var(--border)`}}>
                {['Product','Category','Regular Price','Sale Price','Rating','Stock','Actions'].map(h=>(
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase" style={{color:'var(--muted)',background:'var(--surface)'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{filtered.map(p=>(
                <tr key={p.id} className="border-b hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" style={{background:'var(--surface)'}}/>
                      <span className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><Badge variant="primary">{p.category}</Badge></td>
                  <td className="px-5 py-3.5 text-xs line-through" style={{color:'var(--muted)'}}>{formatCurrency(p.original)}</td>
                  <td className="px-5 py-3.5 font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3.5"><StarRating value={p.rating} size={12}/></td>
                  <td className="px-5 py-3.5"><Badge variant="success">In Stock</Badge></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Eye size={12}/></button>
                      <Link href="/apps/ecommerce/add-product"><button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}><Edit size={12}/></button></Link>
                      <button onClick={()=>setDeleteId(p.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="p-4 border-t flex items-center justify-between" style={{borderColor:'var(--border)'}}>
            <p className="text-xs" style={{color:'var(--muted)'}}>Showing {filtered.length} of {products.length} products</p>
          </div>
        </Card>
      )}

      {/* Delete confirmation modal */}
      <Modal open={!!deleteId} onClose={()=>setDeleteId(null)} title="Delete Product"
        footer={
          <>
            <Button variant="ghost" onClick={()=>setDeleteId(null)}>Cancel</Button>
            <Button variant="error" onClick={()=>deleteId&&handleDelete(deleteId)}><Trash2 size={14}/>Delete</Button>
          </>
        }>
        <p className="text-sm" style={{color:'var(--muted)'}}>
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}
