'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, StarRating, Modal, Toast, SearchBar, FilterTabs, Toolbar, EmptyState, StatCard } from '@/components/ui'
import { PRODUCTS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { Plus, Eye, Edit, Trash2, Grid, List, ShoppingBag, TrendingUp, Package } from 'lucide-react'
import Link from 'next/link'

type ProductItem = typeof PRODUCTS[0]

export default function ProductListPage() {
  const [products,  setProducts] = useState<ProductItem[]>(PRODUCTS)
  const [search,    setSearch]   = useState('')
  const [cat,       setCat]      = useState('All')
  const [view,      setView]     = useState<'grid'|'list'>('list')
  const [deleteId,  setDeleteId] = useState<number|null>(null)
  const [toast,     setToast]    = useState<string|null>(null)

  const cats    = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  const filtered = products.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    const mc = cat === 'All' || p.category === cat
    return ms && mc
  })

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const handleDelete = (id: number) => { setProducts(ps => ps.filter(p => p.id !== id)); setDeleteId(null); showToast('Product deleted') }

  const active   = products.filter(p => p.status === 'Active').length
  const lowStock = products.filter(p => p.stock < 10).length

  return (
    <>
      <Toast message={toast}/>
      <PageBanner title="Products" description="Manage your product catalog"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Products'}]}
        action={<Link href="/apps/ecommerce/add-product"><Button><Plus size={14}/>Add Product</Button></Link>}/>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 animate-fade-up">
        <StatCard label="Total Products"  value={products.length}  color="var(--primary)"   icon={Package}/>
        <StatCard label="Active"          value={active}           color="var(--success)"   icon={ShoppingBag}/>
        <StatCard label="Low Stock"       value={lowStock}         color="var(--warning)"   icon={TrendingUp}/>
        <StatCard label="Categories"      value={cats.length - 1}  color="var(--secondary)" icon={Grid}/>
      </div>

      <Card padding={false}>
        <Toolbar>
          <SearchBar value={search} onChange={setSearch} placeholder="Search products…"/>
          <FilterTabs options={cats} active={cat} onChange={setCat}/>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs" style={{color:'var(--muted)'}}>{filtered.length} products</span>
            <div className="flex border rounded-xl overflow-hidden" style={{borderColor:'var(--border)'}}>
              <button type="button" onClick={()=>setView('grid')} className="px-2.5 py-2 transition-colors" style={view==='grid'?{background:'var(--primary)',color:'#fff'}:{color:'var(--muted)'}}><Grid size={14}/></button>
              <button type="button" onClick={()=>setView('list')} className="px-2.5 py-2 transition-colors" style={view==='list'?{background:'var(--primary)',color:'#fff'}:{color:'var(--muted)'}}><List size={14}/></button>
            </div>
          </div>
        </Toolbar>

        {filtered.length === 0 ? (
          <EmptyState icon="📦" title="No products found" desc={search ? `No results for "${search}"` : 'Add your first product'} action={<Link href="/apps/ecommerce/add-product"><Button size="sm"><Plus size={12}/>Add Product</Button></Link>}/>
        ) : view === 'grid' ? (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="card group overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                <div className="relative h-44 overflow-hidden" style={{background:'var(--surface)'}}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute top-2.5 left-2.5"><Badge variant="primary">{p.category}</Badge></div>
                  {p.original > p.price && <div className="absolute top-2.5 right-2.5"><Badge variant="error">-{Math.round((1-p.price/p.original)*100)}%</Badge></div>}
                  {p.stock === 0 && <div className="absolute inset-0 flex items-center justify-center" style={{background:'rgba(0,0,0,0.4)'}}><span className="text-white text-xs font-bold px-3 py-1 rounded-full" style={{background:'var(--error)'}}>Out of Stock</span></div>}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link href="/apps/ecommerce/add-product"><button type="button" className="w-9 h-9 rounded-xl bg-white flex items-center justify-center hover:scale-110 transition-transform" style={{color:'var(--primary)'}}><Edit size={14}/></button></Link>
                    <button type="button" onClick={()=>setDeleteId(p.id)} className="w-9 h-9 rounded-xl bg-white flex items-center justify-center hover:scale-110 transition-transform" style={{color:'var(--error)'}}><Trash2 size={14}/></button>
                  </div>
                </div>
                <div className="p-3.5">
                  <p className="font-bold text-sm mb-1 truncate" style={{color:'var(--foreground)'}}>{p.name}</p>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-black text-sm" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</span>
                    {p.original > p.price && <span className="text-xs line-through" style={{color:'var(--muted)'}}>{formatCurrency(p.original)}</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <StarRating value={p.rating} size={12}/>
                    <span className="text-xs" style={{color:p.stock<10?'var(--warning)':'var(--muted)'}}>{p.stock} in stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
                {['Product','SKU','Category','Price','Stock','Rating','Status','Actions'].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.map(p=>(
                  <tr key={p.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={p.img} alt={p.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0"/>
                        <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{p.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs" style={{color:'var(--muted)'}}>{p.sku}</td>
                    <td className="px-5 py-3.5"><Badge variant="primary">{p.category}</Badge></td>
                    <td className="px-5 py-3.5">
                      <p className="font-bold" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</p>
                      {p.original>p.price && <p className="text-xs line-through" style={{color:'var(--muted)'}}>{formatCurrency(p.original)}</p>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-sm" style={{color:p.stock===0?'var(--error)':p.stock<10?'var(--warning)':'var(--foreground)'}}>{p.stock}</span>
                    </td>
                    <td className="px-5 py-3.5"><StarRating value={p.rating} size={12}/></td>
                    <td className="px-5 py-3.5"><Badge variant={p.status==='Active'?'success':'muted'} dot>{p.status}</Badge></td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <Link href="/apps/ecommerce/add-product"><button type="button" className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Edit size={12}/></button></Link>
                        <button type="button" onClick={()=>setDeleteId(p.id)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="p-4 border-t flex items-center justify-between" style={{borderColor:'var(--border)'}}>
          <p className="text-xs" style={{color:'var(--muted)'}}>Showing {filtered.length} of {products.length} products</p>
        </div>
      </Card>

      <Modal open={!!deleteId} onClose={()=>setDeleteId(null)} title="Delete Product"
        footer={<><Button variant="ghost" onClick={()=>setDeleteId(null)}>Cancel</Button><Button variant="error" onClick={()=>deleteId&&handleDelete(deleteId)}><Trash2 size={14}/>Delete</Button></>}>
        <p className="text-sm" style={{color:'var(--muted)'}}>This action cannot be undone. The product will be permanently removed from your catalog.</p>
      </Modal>
    </>
  )
}
