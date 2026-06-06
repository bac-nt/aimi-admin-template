'use client'
import { PageBanner, Card, CardHeader, Badge, Button, Avatar, Progress, StatCard } from '@/components/ui'
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Package, Star, Heart, Eye, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/data'

export default function CardsPage() {
  return (
    <>
      <PageBanner title="Card Widgets" description="Pre-built card components for dashboards and data display"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Card Widgets'}]}/>

      <div className="space-y-8">
        {/* Stat cards */}
        <section>
          <h2 className="font-black text-base mb-4" style={{color:'var(--foreground)'}}>Stat Cards</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Revenue"  value={formatCurrency(84290)} color="var(--primary)"   icon={DollarSign}  trend={12.5}/>
            <StatCard label="Total Orders"   value={1284}                  color="var(--secondary)" icon={ShoppingCart} trend={8.3}/>
            <StatCard label="Active Users"   value="9,842"                 color="var(--success)"  icon={Users}        trend={5.1}/>
            <StatCard label="Products"       value={348}                   color="var(--warning)"  icon={Package}      trend={-2.4}/>
          </div>
        </section>

        {/* Profile cards */}
        <section>
          <h2 className="font-black text-base mb-4" style={{color:'var(--foreground)'}}>Profile Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{name:'Sarah Johnson',role:'Product Designer',posts:142,followers:'12.4K',following:389,color:'var(--primary)'},{name:'Michael Chen',role:'Full Stack Dev',posts:89,followers:'8.2K',following:215,color:'var(--secondary)'},{name:'Emma Wilson',role:'Marketing Lead',posts:203,followers:'24.1K',following:512,color:'var(--success)'}].map(u=>(
              <Card key={u.name} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-3" style={{background:u.color}}>{u.name.split(' ').map(n=>n[0]).join('')}</div>
                <h3 className="font-black" style={{color:'var(--foreground)'}}>{u.name}</h3>
                <p className="text-xs mb-3" style={{color:'var(--muted)'}}>{u.role}</p>
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b mb-3" style={{borderColor:'var(--border)'}}>
                  {[{l:'Posts',v:u.posts},{l:'Followers',v:u.followers},{l:'Following',v:u.following}].map(s=>(
                    <div key={s.l}><p className="font-black text-sm" style={{color:'var(--foreground)'}}>{s.v}</p><p className="text-[10px]" style={{color:'var(--muted)'}}>{s.l}</p></div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">View Profile</Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Product cards */}
        <section>
          <h2 className="font-black text-base mb-4" style={{color:'var(--foreground)'}}>Product Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[{name:'Wireless Headphones',price:99,original:149,rating:4.5,reviews:284,img:'https://picsum.photos/seed/prod1/300/200',badge:'Sale'},{name:'Smart Watch Pro',price:299,original:299,rating:4.8,reviews:512,img:'https://picsum.photos/seed/prod2/300/200',badge:'New'},{name:'Laptop Stand',price:49,original:79,rating:4.2,reviews:138,img:'https://picsum.photos/seed/prod3/300/200',badge:'Sale'},{name:'Mechanical Keyboard',price:149,original:149,rating:4.7,reviews:367,img:'https://picsum.photos/seed/prod4/300/200',badge:null}].map(p=>(
              <Card key={p.name} padding={false} className="overflow-hidden group">
                <div className="relative h-40 overflow-hidden" style={{background:'var(--surface)'}}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  {p.badge && <Badge variant={p.badge==='Sale'?'error':'primary'} className="absolute top-2 left-2">{p.badge}</Badge>}
                  <button type="button" className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{background:'var(--card)'}}><Heart size={14} style={{color:'var(--muted)'}}/></button>
                </div>
                <div className="p-3.5">
                  <p className="font-bold text-sm mb-1.5 truncate" style={{color:'var(--foreground)'}}>{p.name}</p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star size={11} style={{color:'var(--warning)'}} fill="var(--warning)"/>
                    <span className="text-xs font-semibold" style={{color:'var(--foreground)'}}>{p.rating}</span>
                    <span className="text-xs" style={{color:'var(--muted)'}}>({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div><span className="font-black text-sm" style={{color:'var(--foreground)'}}>${p.price}</span>{p.original>p.price&&<span className="text-xs line-through ml-1" style={{color:'var(--muted)'}}>${p.original}</span>}</div>
                    <button type="button" className="w-8 h-8 rounded-xl flex items-center justify-center text-white" style={{background:'var(--primary)'}}><ShoppingCart size={13}/></button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Progress cards */}
        <section>
          <h2 className="font-black text-base mb-4" style={{color:'var(--foreground)'}}>Progress Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[{l:'Monthly Goal',v:78,c:'var(--primary)'},{l:'User Retention',v:91,c:'var(--success)'},{l:'Budget Used',v:54,c:'var(--warning)'},{l:'Error Rate',v:12,c:'var(--error)'}].map(p=>(
              <Card key={p.l}>
                <div className="flex justify-between items-start mb-3">
                  <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{p.l}</p>
                  <span className="font-black" style={{color:p.c}}>{p.v}%</span>
                </div>
                <Progress value={p.v} color={p.c} height={6}/>
                <p className="text-xs mt-2" style={{color:'var(--muted)'}}>{p.v>=80?'On track ✓':p.v>=50?'In progress':'Needs attention'}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
