'use client'
import { Card, CardHeader, Badge, Progress } from '@/components/ui'
import { DASHBOARD_STATS, MONTHLY_REVENUE, PRODUCTS, ORDERS } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { TrendingUp, ShoppingCart, Package, Users, Star, ArrowUpRight } from 'lucide-react'
import { PieChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, Cell } from 'recharts'

export default function EcommerceDashboard() {
  const s = DASHBOARD_STATS
  const topProducts = PRODUCTS.slice(0,5)
  const recentOrders = ORDERS.slice(0,5)
  const COLORS = ['#5d87ff','#49beff','#13deb9','#ffae1f','#fa896b']
  const catData = [
    {name:'Electronics',value:48},{name:'Footwear',value:32},{name:'Clothing',value:27},{name:'Sports',value:15},
  ]
  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {l:'Revenue',    v:formatCurrency(s.revenue.value),    ch:s.revenue.change,    Icon:TrendingUp, c:'var(--primary)'  },
          {l:'Orders',     v:s.orders.value,                     ch:s.orders.change,     Icon:ShoppingCart,c:'var(--secondary)'},
          {l:'Products',   v:PRODUCTS.length,                    ch:5.2,                 Icon:Package,    c:'var(--warning)'  },
          {l:'Customers',  v:s.customers.value.toLocaleString('en-US'), ch:s.customers.change,  Icon:Users,      c:'var(--success)'  },
        ].map(st=>(
          <Card key={st.l} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:st.c+'18'}}><st.Icon size={20} style={{color:st.c}}/></div>
            <div><p className="text-xs font-medium" style={{color:'var(--muted)'}}>{st.l}</p><p className="text-xl font-black" style={{color:'var(--foreground)'}}>{st.v}</p>
            <div className="flex items-center gap-1"><ArrowUpRight size={11} style={{color:'var(--success)'}}/><span className="text-xs font-semibold" style={{color:'var(--success)'}}>{st.ch}%</span></div></div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Revenue Trend" subtitle="Last 12 months"/>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={MONTHLY_REVENUE}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="month" tick={{fontSize:11}} stroke="var(--border)"/>
                <YAxis tick={{fontSize:11}} stroke="var(--border)"/>
                <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10}}/>
                <Area type="monotone" dataKey="revenue" stroke="#5b6af6" fill="#eef0fe" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <Card>
          <CardHeader title="Sales by Category"/>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart><Pie data={catData} cx="50%" cy="50%" outerRadius={60} dataKey="value">{catData.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip/></PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {catData.map((c,i)=>(
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:COLORS[i]}}/>
                <span className="flex-1" style={{color:'var(--foreground)'}}>{c.name}</span>
                <Progress value={Math.round(c.value/catData[0].value*100)} height={4} className="w-16" color={COLORS[i]}/>
                <span style={{color:'var(--muted)'}}>{c.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card padding={false}>
          <div className="p-4 border-b" style={{borderColor:'var(--border)'}}><h3 className="font-bold" style={{color:'var(--foreground)'}}>Top Products</h3></div>
          {topProducts.map((p,i)=>(
            <div key={p.id} className="flex items-center gap-3 px-4 py-3 border-b last:border-0 hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
              <span className="font-black text-sm w-5 text-center" style={{color:'var(--muted)'}}>{i+1}</span>
              <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0"/>
              <div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{p.name}</p><div className="flex items-center gap-1"><Star size={10} style={{color:'var(--warning)'}}/><span className="text-xs" style={{color:'var(--muted)'}}>{p.rating}</span></div></div>
              <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{formatCurrency(p.price)}</span>
            </div>
          ))}
        </Card>
        <Card padding={false}>
          <div className="p-4 border-b" style={{borderColor:'var(--border)'}}><h3 className="font-bold" style={{color:'var(--foreground)'}}>Recent Orders</h3></div>
          {recentOrders.map(o=>(
            <div key={o.id} className="flex items-center gap-3 px-4 py-3 border-b last:border-0 hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
              <div className="flex-1 min-w-0"><p className="font-bold text-xs" style={{color:'var(--primary)'}}>{o.id}</p><p className="text-xs truncate" style={{color:'var(--foreground)'}}>{o.customer}</p></div>
              <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{formatCurrency(o.total)}</span>
              <Badge variant={o.status==='Delivered'?'success':o.status==='Cancelled'?'error':o.status==='Pending'?'warning':'primary'} dot className="text-[10px]">{o.status}</Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
