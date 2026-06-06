'use client'
import { PageBanner, Card, CardHeader } from '@/components/ui'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const C = ['#5d87ff','#49beff','#13deb9','#ffae1f','#fa896b']
const TIP = { contentStyle:{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,fontSize:11}}
const WEEK = [{d:'Mon',v:420},{d:'Tue',v:380},{d:'Wed',v:510},{d:'Thu',v:470},{d:'Fri',v:590},{d:'Sat',v:320},{d:'Sun',v:280}]
const PIE  = [{name:'Direct',value:40},{name:'Organic',value:30},{name:'Referral',value:20},{name:'Social',value:10}]
const SALES= [{m:'Jan',v:4200},{m:'Feb',v:3800},{m:'Mar',v:5600},{m:'Apr',v:4900},{m:'May',v:6300},{m:'Jun',v:5800}]

export default function ChartWidgetsPage() {
  return (
    <>
      <PageBanner title="Chart Widgets" description="Small dashboard chart widgets for KPIs and at-a-glance metrics"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Chart Widgets'}]}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Sparkline area */}
        {[{l:'Weekly Revenue',v:'$24,580',ch:'+12%',data:WEEK,c:C[0]},{l:'Active Users',v:'9,842',ch:'+5%',data:WEEK.map(d=>({...d,v:d.v*2.3|0})),c:C[2]},{l:'Conversion',v:'3.24%',ch:'-0.4%',data:WEEK.map(d=>({...d,v:d.v/60})),c:C[1]}].map((w,i)=>(
          <Card key={i}>
            <p className="text-xs font-medium mb-0.5" style={{color:'var(--muted)'}}>{w.l}</p>
            <p className="text-2xl font-black" style={{color:'var(--foreground)'}}>{w.v}</p>
            <p className="text-xs mb-3 font-semibold" style={{color:w.ch.startsWith('+')?'var(--success)':'var(--error)'}}>{w.ch} this week</p>
            <ResponsiveContainer width="100%" height={60}>
              <AreaChart data={w.data}>
                <defs><linearGradient id={`sg${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={w.c} stopOpacity={0.3}/><stop offset="95%" stopColor={w.c} stopOpacity={0}/></linearGradient></defs>
                <Area type="monotone" dataKey="v" stroke={w.c} fill={`url(#sg${i})`} strokeWidth={2} dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        ))}

        {/* Bar chart mini */}
        <Card>
          <CardHeader title="Daily Sales" subtitle="Last 7 days"/>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={WEEK} margin={{top:0,right:0,bottom:0,left:-20}}>
              <XAxis dataKey="d" tick={{fontSize:10,fill:'var(--muted)'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:'var(--muted)'}} axisLine={false} tickLine={false}/>
              <Tooltip {...TIP}/>
              <Bar dataKey="v" fill={C[0]} radius={[4,4,0,0]} maxBarSize={24}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie mini */}
        <Card>
          <CardHeader title="Traffic Sources" subtitle="This month"/>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart><Pie data={PIE} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
              {PIE.map((_,i)=><Cell key={i} fill={C[i]}/>)}
            </Pie><Tooltip {...TIP} formatter={(v:number)=>`${v}%`}/></PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
            {PIE.map((p,i)=><div key={i} className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full" style={{background:C[i]}}/><span style={{color:'var(--muted)'}}>{p.name} {p.value}%</span></div>)}
          </div>
        </Card>

        {/* Line chart */}
        <Card>
          <CardHeader title="Monthly Revenue" subtitle="6 month trend"/>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={SALES} margin={{top:5,right:5,bottom:5,left:-20}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:'var(--muted)'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:'var(--muted)'}} axisLine={false} tickLine={false}/>
              <Tooltip {...TIP}/>
              <Line type="monotone" dataKey="v" stroke={C[0]} strokeWidth={2.5} dot={false} activeDot={{r:4}}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}
