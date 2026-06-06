'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS, BLOG_POSTS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import {
  ShoppingCart, Heart, Star, ArrowRight, Search, Truck, Shield, RefreshCw,
  Headphones, ChevronRight, Play, Check, Zap, Globe, Users, Package,
  TrendingUp, Instagram, Twitter, Facebook, Youtube, Mail
} from 'lucide-react'

const HERO_SLIDES = [
  {
    badge: 'New Collection 2025',
    title: 'Discover\nYour Style',
    sub: 'Explore premium products crafted for the modern lifestyle. Free shipping on orders over $50.',
    cta: 'Shop Now',
    img: 'https://picsum.photos/seed/hero1/800/600',
    accent: '#5d87ff',
  },
  {
    badge: 'Best Sellers',
    title: 'Top Picks\nThis Season',
    sub: 'Hand-curated selection of our most-loved products. Limited time offers available.',
    cta: 'Explore',
    img: 'https://picsum.photos/seed/hero2/800/600',
    accent: '#13deb9',
  },
]

const CATEGORIES = [
  { name:'Electronics',  icon:'💻', count:148, color:'#5d87ff', img:'https://picsum.photos/seed/cat1/300/200' },
  { name:'Footwear',     icon:'👟', count:92,  color:'#13deb9', img:'https://picsum.photos/seed/cat2/300/200' },
  { name:'Clothing',     icon:'👕', count:215, color:'#ffae1f', img:'https://picsum.photos/seed/cat3/300/200' },
  { name:'Sports',       icon:'⚽', count:73,  color:'#fa896b', img:'https://picsum.photos/seed/cat4/300/200' },
  { name:'Accessories',  icon:'⌚', count:61,  color:'#7c3aed', img:'https://picsum.photos/seed/cat5/300/200' },
  { name:'Books',        icon:'📚', count:89,  color:'#49beff', img:'https://picsum.photos/seed/cat6/300/200' },
]

const FEATURES = [
  { icon: Truck,      title: 'Free Shipping',      desc: 'On all orders over $50. Express delivery available.' },
  { icon: Shield,     title: 'Secure Payment',      desc: '256-bit SSL encryption. Your data is always safe.' },
  { icon: RefreshCw,  title: '30-Day Returns',      desc: 'Not happy? Return anything within 30 days.' },
  { icon: Headphones, title: '24/7 Support',        desc: 'Our team is always here to help you.' },
]

const TESTIMONIALS = [
  { name:'Sarah Johnson',  role:'Verified Buyer',  text:'Absolutely love the quality! Fast shipping and great packaging. Will definitely order again.', rating:5, avatar:'SJ', product:'Nike Air Max 270' },
  { name:'Michael Chen',   role:'Premium Member',  text:"Best online shopping experience I've had. The product exactly matches the description.", rating:5, avatar:'MC', product:'MacBook Air M3' },
  { name:'Emma Wilson',    role:'Verified Buyer',  text:'Incredible selection and competitive prices. Customer service was super responsive.', rating:5, avatar:'EW', product:'Sony WH-1000XM5' },
]

const STATS = [
  { label:'Products',      value:'10,000+', icon:Package   },
  { label:'Happy Customers',value:'50,000+', icon:Users    },
  { label:'Countries',     value:'45+',     icon:Globe     },
  { label:'Orders Shipped', value:'1.2M+',  icon:TrendingUp},
]

export default function HomepagePage() {
  const [slide,    setSlide]    = useState(0)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart,     setCart]     = useState<number[]>([])
  const [cartAnim, setCartAnim] = useState<number|null>(null)
  const [email,    setEmail]    = useState('')
  const [subbed,   setSubbed]   = useState(false)

  const toggleWishlist = (id:number) => setWishlist(w => w.includes(id) ? w.filter(x=>x!==id) : [...w,id])
  const addToCart = (id:number) => {
    setCart(c=>[...c,id])
    setCartAnim(id)
    setTimeout(()=>setCartAnim(null),600)
  }

  const hero = HERO_SLIDES[slide]
  const featured = PRODUCTS.filter(p=>p.status==='Active').slice(0,8)
  const newArrivals = PRODUCTS.slice(2,6)
  const posts = BLOG_POSTS.filter(p=>p.status==='Published').slice(0,3)

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:'var(--foreground)',background:'var(--surface)'}}>

      {/* ── TOPBAR ─────────────────────────────────────── */}
      <div className="text-center text-xs py-2.5 text-white font-medium" style={{background:'linear-gradient(90deg,var(--primary),var(--secondary))'}}>
        🎉 Free shipping on orders over $50 — Limited time offer!&nbsp;
        <span className="underline cursor-pointer font-bold">Shop Now →</span>
      </div>

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav className="border-b" style={{background:'var(--card)',borderColor:'var(--border)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 h-16">
          <div className="font-black text-xl" style={{color:'var(--primary)'}}>Aimi</div>
          <div className="hidden md:flex items-center gap-6 flex-1">
            {['Home','Shop','Categories','Blog','About','Contact'].map(n=>(
              <a key={n} href="#" className="text-sm font-semibold transition-colors hover:text-[var(--primary)]" style={{color:'var(--foreground)'}}>{n}</a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border text-sm" style={{borderColor:'var(--border)',color:'var(--muted)'}}>
              <Search size={13}/><span>Search…</span>
            </div>
            <button type="button" className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{color:'var(--foreground)'}}>
              <ShoppingCart size={18}/>
              {cart.length>0&&<span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{background:'var(--error)'}}>{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center min-h-[480px]">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border" style={{borderColor:hero.accent+'44',background:hero.accent+'10',color:hero.accent}}>
              <Zap size={11} fill="currentColor"/>{hero.badge}
            </div>
            <h1 className="text-5xl sm:text-6xl font-black leading-none tracking-tight" style={{color:'var(--foreground)'}}>
              {hero.title.split('\n').map((line,i)=>(
                <span key={i} className={i===1?'block':'block'} style={i===1?{color:hero.accent}:{}}>{line}</span>
              ))}
            </h1>
            <p className="text-base leading-relaxed" style={{color:'var(--muted)'}}>{hero.sub}</p>
            <div className="flex items-center gap-3">
              <button type="button" className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-95" style={{background:hero.accent}}>
                {hero.cta}<ArrowRight size={15}/>
              </button>
              <button type="button" className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm border transition-all hover:bg-[var(--surface)]" style={{borderColor:'var(--border)',color:'var(--foreground)'}}>
                <Play size={14} fill="currentColor"/>Watch Video
              </button>
            </div>
            <div className="flex items-center gap-6 pt-2">
              {[['50K+','Happy Customers'],['10K+','Products'],['4.9★','Rating']].map(([v,l])=>(
                <div key={l}><p className="text-xl font-black" style={{color:'var(--foreground)'}}>{v}</p><p className="text-xs" style={{color:'var(--muted)'}}>{l}</p></div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden relative" style={{background:'var(--surface)'}}>
              <img src={hero.img} alt="Hero" className="w-full h-full object-cover"/>
              <div className="absolute inset-0" style={{background:`linear-gradient(135deg,${hero.accent}22,transparent)`}}/>
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 px-4 py-3 rounded-2xl shadow-xl" style={{background:'var(--card)'}}>
              <p className="text-xs font-bold" style={{color:'var(--foreground)'}}>🔥 Flash Sale — 40% Off</p>
              <p className="text-[10px]" style={{color:'var(--muted)'}}>Ends in 2h 34m 18s</p>
            </div>
          </div>
        </div>
        {/* Slide dots */}
        <div className="flex justify-center gap-2 mt-6">
          {HERO_SLIDES.map((_,i)=>(
            <button key={i} type="button" onClick={()=>setSlide(i)} className="rounded-full transition-all" style={{width:i===slide?24:8,height:8,background:i===slide?'var(--primary)':'var(--border)'}}/>
          ))}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────── */}
      <section className="border-y" style={{borderColor:'var(--border)',background:'var(--card)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({icon:Icon,title,desc})=>(
            <div key={title} className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'var(--primary-light)',color:'var(--primary)'}}>
                <Icon size={18}/>
              </div>
              <div><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{title}</p><p className="text-xs leading-tight mt-0.5" style={{color:'var(--muted)'}}>{desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:'var(--primary)'}}>Browse</p>
            <h2 className="text-3xl font-black" style={{color:'var(--foreground)'}}>Shop by Category</h2>
          </div>
          <button type="button" className="text-sm font-semibold flex items-center gap-1 hover:opacity-70" style={{color:'var(--primary)'}}>View all<ChevronRight size={14}/></button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(cat=>(
            <button key={cat.name} type="button" className="group relative rounded-2xl overflow-hidden aspect-square hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div className="absolute inset-0" style={{background:`linear-gradient(to top,${cat.color}cc,transparent 50%)`}}/>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <p className="text-lg">{cat.icon}</p>
                <p className="font-black text-sm text-white">{cat.name}</p>
                <p className="text-[10px] text-white/70">{cat.count} items</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ──────────────────────────── */}
      <section className="py-14" style={{background:'var(--card)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:'var(--primary)'}}>Curated</p>
              <h2 className="text-3xl font-black" style={{color:'var(--foreground)'}}>Featured Products</h2>
            </div>
            <div className="flex gap-2">
              {['All','New','Sale','Popular'].map(f=>(
                <button key={f} type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={f==='All'?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>{f}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map(p=>(
              <div key={p.id} className="group rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  {p.original>p.price&&<div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{background:'var(--error)'}}>-{Math.round((1-p.price/p.original)*100)}%</div>}
                  {p.stock===0&&<div className="absolute inset-0 flex items-center justify-center" style={{background:'rgba(0,0,0,0.5)'}}><span className="text-white text-xs font-bold px-3 py-1.5 rounded-full" style={{background:'var(--error)'}}>Out of Stock</span></div>}
                  <button type="button" onClick={()=>toggleWishlist(p.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
                    style={{background:'var(--card)',color:wishlist.includes(p.id)?'var(--error)':'var(--muted)'}}>
                    <Heart size={14} fill={wishlist.includes(p.id)?'currentColor':'none'}/>
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{color:'var(--muted)'}}>{p.brand}</p>
                  <p className="font-bold text-sm mb-2 line-clamp-2 leading-snug" style={{color:'var(--foreground)'}}>{p.name}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({length:5}).map((_,i)=>(
                      <Star key={i} size={11} fill={i<Math.floor(p.rating)?'var(--warning)':'none'} style={{color:'var(--warning)'}}/>
                    ))}
                    <span className="text-[10px] ml-1" style={{color:'var(--muted)'}}>({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-base" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</span>
                      {p.original>p.price&&<span className="text-xs line-through ml-1.5" style={{color:'var(--muted)'}}>{formatCurrency(p.original)}</span>}
                    </div>
                    <button type="button" disabled={p.stock===0} onClick={()=>addToCart(p.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 disabled:opacity-40"
                      style={{background:cartAnim===p.id?'var(--success)':'var(--primary)'}}>
                      {cartAnim===p.id?<Check size={14}/>:<ShoppingCart size={14}/>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12" style={{background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)'}}>
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10" style={{background:'var(--primary)',transform:'translate(30%,-30%)'}}/>
          <div className="absolute right-24 bottom-0 w-48 h-48 rounded-full opacity-5" style={{background:'var(--secondary)',transform:'translateY(40%)'}}/>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{background:'rgba(255,255,255,0.1)',color:'#fff'}}>
                ⚡ Flash Sale
              </div>
              <h2 className="text-4xl font-black text-white leading-tight">Up to<br/><span style={{color:'#ffae1f'}}>50% Off</span><br/>Selected Items</h2>
              <p className="text-white/60 text-sm">Don't miss out on these exclusive deals. Offer ends Sunday midnight.</p>
              <button type="button" className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:opacity-90" style={{background:'var(--warning)',color:'#000'}}>
                Claim Deal<ArrowRight size={15}/>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.slice(0,4).map((p,i)=>(
                <div key={i} className="rounded-2xl p-3 text-center hover:scale-105 transition-transform cursor-pointer" style={{background:'rgba(255,255,255,0.08)'}}>
                  <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-xl mx-auto mb-2"/>
                  <p className="text-white text-xs font-bold truncate">{p.name.split(' ').slice(0,2).join(' ')}</p>
                  <p style={{color:'#ffae1f'}} className="font-black text-sm">{formatCurrency(p.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ────────────────────────────────── */}
      <section className="py-14" style={{background:'var(--card)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:'var(--secondary)'}}>Just In</p>
              <h2 className="text-3xl font-black" style={{color:'var(--foreground)'}}>New Arrivals</h2>
            </div>
            <button type="button" className="text-sm font-semibold flex items-center gap-1 hover:opacity-70" style={{color:'var(--primary)'}}>See all<ChevronRight size={14}/></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map((p,i)=>(
              <div key={p.id} className="group flex items-center gap-4 p-4 rounded-2xl border hover:shadow-md transition-all cursor-pointer" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"/>
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{background:'var(--success)'}}>NEW</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate" style={{color:'var(--foreground)'}}>{p.name}</p>
                  <div className="flex items-center gap-0.5 my-1">
                    {Array.from({length:5}).map((_,i)=>(
                      <Star key={i} size={9} fill={i<Math.floor(p.rating)?'var(--warning)':'none'} style={{color:'var(--warning)'}}/>
                    ))}
                  </div>
                  <p className="font-black text-sm" style={{color:'var(--primary)'}}>{formatCurrency(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────── */}
      <section className="py-14" style={{background:'var(--primary)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
            {STATS.map(({label,value,icon:Icon})=>(
              <div key={label} className="space-y-2">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto" style={{background:'rgba(255,255,255,0.15)'}}>
                  <Icon size={22}/>
                </div>
                <p className="text-3xl font-black">{value}</p>
                <p className="text-white/70 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:'var(--primary)'}}>From the Blog</p>
            <h2 className="text-3xl font-black" style={{color:'var(--foreground)'}}>Latest Articles</h2>
          </div>
          <button type="button" className="text-sm font-semibold flex items-center gap-1 hover:opacity-70" style={{color:'var(--primary)'}}>View blog<ChevronRight size={14}/></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {posts.map((post,i)=>(
            <article key={post.id} className={`group rounded-3xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer ${i===0?'sm:col-span-1 sm:row-span-1':''}`} style={{background:'var(--card)',borderColor:'var(--border)'}}>
              <div className={`overflow-hidden ${i===0?'h-52':'h-40'}`}>
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{background:'var(--primary-light)',color:'var(--primary)'}}>{post.cat}</span>
                  <span className="text-[10px]" style={{color:'var(--muted)'}}>{post.date}</span>
                </div>
                <h3 className="font-black text-sm leading-snug mb-2" style={{color:'var(--foreground)'}}>{post.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{color:'var(--muted)'}}>By {post.author}</span>
                  <span className="text-xs font-bold flex items-center gap-1" style={{color:'var(--primary)'}}>Read <ArrowRight size={10}/></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section className="py-14" style={{background:'var(--card)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'var(--primary)'}}>Reviews</p>
            <h2 className="text-3xl font-black" style={{color:'var(--foreground)'}}>What Customers Say</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {Array.from({length:5}).map((_,i)=><Star key={i} size={16} fill="var(--warning)" style={{color:'var(--warning)'}}/>)}
              <span className="ml-2 text-sm font-bold" style={{color:'var(--foreground)'}}>4.9 out of 5</span>
              <span className="text-sm ml-1" style={{color:'var(--muted)'}}>· 12,483 reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t=>(
              <div key={t.name} className="p-6 rounded-3xl border" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({length:t.rating}).map((_,i)=><Star key={i} size={13} fill="var(--warning)" style={{color:'var(--warning)'}}/>)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{color:'var(--foreground)'}}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{background:'var(--primary)'}}>{t.avatar}</div>
                  <div>
                    <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{t.name}</p>
                    <p className="text-xs" style={{color:'var(--muted)'}}>Purchased: {t.product}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{background:'var(--success-light)',color:'var(--success)'}}>✓ Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center" style={{background:'linear-gradient(135deg,var(--primary-light),var(--secondary-light))'}}>
          <div className="absolute inset-0 opacity-5" style={{backgroundImage:'radial-gradient(circle at 2px 2px,var(--primary) 1px,transparent 0)',backgroundSize:'32px 32px'}}/>
          <div className="relative max-w-xl mx-auto space-y-5">
            <div className="text-5xl">📬</div>
            <h2 className="text-3xl font-black" style={{color:'var(--foreground)'}}>Stay in the loop</h2>
            <p style={{color:'var(--muted)'}}>Get exclusive deals, new arrivals and style tips delivered to your inbox.</p>
            {subbed ? (
              <div className="flex items-center justify-center gap-2 text-[var(--success)] font-bold">
                <Check size={18}/> You're subscribed! Welcome aboard 🎉
              </div>
            ) : (
              <div className="flex gap-2 max-w-sm mx-auto">
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email…"
                  className="flex-1 px-4 py-3 rounded-2xl border text-sm outline-none focus:border-[var(--primary)]"
                  style={{background:'var(--card)',borderColor:'var(--border)',color:'var(--foreground)'}}/>
                <button type="button" onClick={()=>{if(email)setSubbed(true)}}
                  className="px-5 py-3 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{background:'var(--primary)'}}>
                  <Mail size={15}/>
                </button>
              </div>
            )}
            <p className="text-xs" style={{color:'var(--muted)'}}>No spam. Unsubscribe any time.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="border-t" style={{borderColor:'var(--border)',background:'var(--card)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            <div className="lg:col-span-2 space-y-4">
              <div className="font-black text-2xl" style={{color:'var(--primary)'}}>Aimi</div>
              <p className="text-sm leading-relaxed" style={{color:'var(--muted)'}}>Your go-to destination for premium products. We curate the best from around the world, delivered to your door.</p>
              <div className="flex gap-3">
                {[{Icon:Instagram,c:'#e1306c'},{Icon:Twitter,c:'#1da1f2'},{Icon:Facebook,c:'#4267b2'},{Icon:Youtube,c:'#ff0000'}].map(({Icon,c},i)=>(
                  <button key={i} type="button" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{background:c+'18',color:c}}>
                    <Icon size={15}/>
                  </button>
                ))}
              </div>
            </div>
            {[
              { title:'Shop', links:['All Products','New Arrivals','Best Sellers','Sale Items','Gift Cards'] },
              { title:'Company', links:['About Us','Careers','Press','Partners','Affiliates'] },
              { title:'Help', links:['FAQ','Shipping','Returns','Track Order','Contact Us'] },
            ].map(col=>(
              <div key={col.title}>
                <p className="font-black text-sm mb-4" style={{color:'var(--foreground)'}}>{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map(l=>(
                    <li key={l}><a href="#" className="text-sm hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t gap-3" style={{borderColor:'var(--border)'}}>
            <p className="text-xs" style={{color:'var(--muted)'}}>© 2025 Aimi Store. All rights reserved.</p>
            <div className="flex gap-4">
              {['Privacy Policy','Terms of Service','Cookie Policy'].map(l=>(
                <a key={l} href="#" className="text-xs hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
