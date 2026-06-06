'use client'
import { Card, CardHeader, Badge, Avatar, Progress } from '@/components/ui'
import { RECENT_TRANSACTIONS, DASHBOARD_STATS, MONTHLY_REVENUE } from '@/lib/data'
import { formatCurrency } from '@/lib/data'
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Package } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const STATUS_V: Record<string,'success'|'warning'|'error'> = { Completed:'success', Pending:'warning', Cancelled:'error' }

export default function ModernDashboard() {
  const stats = DASHBOARD_STATS
  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{background:'linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%)'}}>
        <div className="absolute right-0 top-0 w-48 h-48 rounded-full opacity-10" style={{background:'white',transform:'translate(30%,-30%)'}}/>
        <h1 className="font-black text-2xl mb-1">Good morning, Mathew! 👋</h1>
        <p className="opacity-80 text-sm">Here's what's happening with your store today.</p>
        <div className="flex gap-6 mt-4">
          {[{l:'Revenue',v:formatCurrency(stats.revenue.value)},{l:'Orders',v:stats.orders.value},{l:'Customers',v:stats.customers.value.toLocaleString('en-US')}].map(s=>(
            <div key={s.l}><p className="font-black text-xl">{s.v}</p><p className="text-xs opacity-70">{s.l}</p></div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {l:'Total Revenue',v:formatCurrency(stats.revenue.value),ch:stats.revenue.change,Icon:DollarSign,color:'var(--primary)'},
          {l:'Orders',v:stats.orders.value,ch:stats.orders.change,Icon:ShoppingCart,color:'var(--secondary)'},
          {l:'Customers',v:stats.customers.value.toLocaleString('en-US'),ch:stats.customers.change,Icon:Users,color:'var(--success)'},
          {l:'Avg Order',v:formatCurrency(stats.avgOrderValue.value),ch:stats.avgOrderValue.change,Icon:Package,color:'var(--warning)'},
        ].map(s=>(
          <Card key={s.l} className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>{s.l}</p>
              <p className="text-xl font-black" style={{color:'var(--foreground)'}}>{s.v}</p>
              <div className="flex items-center gap-1 mt-1">
                {s.ch>0?<TrendingUp size={12} style={{color:'var(--success)'}}/>:<TrendingDown size={12} style={{color:'var(--error)'}}/>}
                <span className="text-xs font-semibold" style={{color:s.ch>0?'var(--success)':'var(--error)'}}>{s.ch}%</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:s.color+'20'}}>
              <s.Icon size={18} style={{color:s.color}}/>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Revenue Overview" subtitle="Monthly revenue vs expenses"/>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="month" tick={{fontSize:11}} stroke="var(--border)"/>
              <YAxis tick={{fontSize:11}} stroke="var(--border)"/>
              <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10}}/>
              <Area type="monotone" dataKey="revenue" stroke="#5b6af6" fill="#eef0fe" strokeWidth={2}/>
              <Area type="monotone" dataKey="expenses" stroke="var(--error)" fill="var(--error-light)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <CardHeader title="Monthly Sales" subtitle="Units sold per month"/>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_REVENUE.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="month" tick={{fontSize:11}} stroke="var(--border)"/>
              <YAxis tick={{fontSize:11}} stroke="var(--border)"/>
              <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10}}/>
              <Bar dataKey="revenue" fill="var(--primary)" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card padding={false}>
        <div className="p-5 border-b" style={{borderColor:'var(--border)'}}><h3 className="font-bold" style={{color:'var(--foreground)'}}>Recent Transactions</h3></div>
        <div className="divide-y" style={{borderColor:'var(--border)'}}>
          {RECENT_TRANSACTIONS.map(t=>(
            <div key={t.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--surface)] transition-colors">
              <Avatar name={t.customer} size={36} color="var(--primary)"/>
              <div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{t.customer}</p><p className="text-xs truncate" style={{color:'var(--muted)'}}>{t.product}</p></div>
              <span className="font-bold text-sm" style={{color:'var(--foreground)'}}>{formatCurrency(t.amount)}</span>
              <Badge variant={STATUS_V[t.status]||'muted'} dot>{t.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
