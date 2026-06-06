'use client'
import { PageBanner, Card, CardHeader } from '@/components/ui'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
const C = ['#5b6af6','#3abff8','#00c9a7','#f59e0b','#f43f5e','#8b5cf6']
const MONTHLY = [{m:'Jan',v:4200,p:3100},{m:'Feb',v:3800,p:4500},{m:'Mar',v:5600,p:3900},{m:'Apr',v:4900,p:5200},{m:'May',v:6300,p:4800},{m:'Jun',v:5800,p:6100},{m:'Jul',v:7200,p:5500},{m:'Aug',v:6600,p:7000},{m:'Sep',v:8100,p:6400},{m:'Oct',v:7500,p:7800},{m:'Nov',v:9200,p:8100},{m:'Dec',v:10400,p:8900}]
const DAILY = [{d:'Mon',users:420,sessions:680},{d:'Tue',users:380,sessions:590},{d:'Wed',users:510,sessions:790},{d:'Thu',users:470,sessions:720},{d:'Fri',users:560,sessions:850},{d:'Sat',users:310,sessions:480},{d:'Sun',users:290,sessions:440}]

export default function LineChartsPage() {
  const TIP = { contentStyle:{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,boxShadow:'var(--shadow-dropdown)',fontSize:12} }
  return (
    <>
      <PageBanner title="Line Charts" description="Ideal for showing trends and changes over time"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Charts'},{label:'Line Charts'}]}/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Monthly Revenue vs Previous Year" subtitle="12-month comparison"/>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={MONTHLY} margin={{top:5,right:10,bottom:5,left:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false}/>
              <Tooltip {...TIP}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Line type="monotone" dataKey="v" name="This Year" stroke={C[0]} strokeWidth={2.5} dot={{r:3,fill:C[0]}} activeDot={{r:5}}/>
              <Line type="monotone" dataKey="p" name="Last Year" stroke={C[1]} strokeWidth={2} strokeDasharray="5 5" dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Weekly Users & Sessions" subtitle="Current week breakdown"/>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={DAILY} margin={{top:5,right:10,bottom:5,left:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="d" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false}/>
              <Tooltip {...TIP}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Line type="monotone" dataKey="users" name="Users" stroke={C[2]} strokeWidth={2.5} dot={{r:4,fill:C[2]}}/>
              <Line type="monotone" dataKey="sessions" name="Sessions" stroke={C[3]} strokeWidth={2.5} dot={{r:4,fill:C[3]}}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Full Year Trend — Smooth Curves" subtitle="Monotone interpolation for smooth display"/>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY} margin={{top:5,right:10,bottom:5,left:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false} width={45}/>
              <Tooltip {...TIP}/>
              <Line type="monotone" dataKey="v" name="Revenue" stroke={C[0]} strokeWidth={3} dot={false} activeDot={{r:5,fill:C[0]}}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}
