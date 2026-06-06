'use client'
import { PageBanner, Card, CardHeader } from '@/components/ui'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
const C = ['#5b6af6','#3abff8','#00c9a7','#f59e0b','#f43f5e','#8b5cf6']
const MONTHLY = [{m:'Jan',v:4200,p:3100},{m:'Feb',v:3800,p:4500},{m:'Mar',v:5600,p:3900},{m:'Apr',v:4900,p:5200},{m:'May',v:6300,p:4800},{m:'Jun',v:5800,p:6100},{m:'Jul',v:7200,p:5500},{m:'Aug',v:6600,p:7000},{m:'Sep',v:8100,p:6400},{m:'Oct',v:7500,p:7800},{m:'Nov',v:9200,p:8100},{m:'Dec',v:10400,p:8900}]
const TRAFFIC = [{m:'Jan',organic:2400,direct:1200,referral:800},{m:'Feb',organic:2100,direct:1400,referral:900},{m:'Mar',organic:2800,direct:1600,referral:1100},{m:'Apr',organic:3100,direct:1300,referral:1000},{m:'May',organic:3400,direct:1800,referral:1300},{m:'Jun',organic:3000,direct:2000,referral:1200}]

export default function AreaChartsPage() {
  const TIP = { contentStyle:{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,boxShadow:'var(--shadow-dropdown)',fontSize:12} }
  return (
    <>
      <PageBanner title="Area Charts" description="Show cumulative totals and volume trends over time"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Charts'},{label:'Area Charts'}]}/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Stacked Traffic Sources" subtitle="Organic, Direct and Referral breakdown"/>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={TRAFFIC} margin={{top:5,right:10,bottom:5,left:10}}>
              <defs>
                {['organic','direct','referral'].map((k,i)=>(
                  <linearGradient key={k} id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C[i]} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={C[i]} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false}/>
              <Tooltip {...TIP}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              {['organic','direct','referral'].map((k,i)=>(
                <Area key={k} type="monotone" dataKey={k} name={k[0].toUpperCase()+k.slice(1)} stackId="1"
                  stroke={C[i]} fill={`url(#g${i})`} strokeWidth={2}/>
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Monthly Revenue — Gradient Fill" subtitle="Single metric with gradient background"/>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={MONTHLY} margin={{top:5,right:10,bottom:5,left:10}}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C[0]} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={C[0]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false}/>
              <Tooltip {...TIP}/>
              <Area type="monotone" dataKey="v" name="Revenue" stroke={C[0]} fill="url(#revGrad)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Revenue vs Previous Year — Overlapping Areas" subtitle="Compare two periods at a glance"/>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY} margin={{top:5,right:10,bottom:5,left:10}}>
              <defs>
                <linearGradient id="g_cur" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C[0]} stopOpacity={0.25}/><stop offset="95%" stopColor={C[0]} stopOpacity={0}/></linearGradient>
                <linearGradient id="g_prv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C[1]} stopOpacity={0.25}/><stop offset="95%" stopColor={C[1]} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false} width={45}/>
              <Tooltip {...TIP}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Area type="monotone" dataKey="p" name="Last Year" stroke={C[1]} fill="url(#g_prv)" strokeWidth={1.5} strokeDasharray="4 4"/>
              <Area type="monotone" dataKey="v" name="This Year" stroke={C[0]} fill="url(#g_cur)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}
