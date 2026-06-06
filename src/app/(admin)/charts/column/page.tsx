'use client'
import { PageBanner, Card, CardHeader } from '@/components/ui'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
const C = ['#5b6af6','#3abff8','#00c9a7','#f59e0b','#f43f5e','#8b5cf6']
const MONTHLY = [{m:'Jan',v:4200,p:3100},{m:'Feb',v:3800,p:4500},{m:'Mar',v:5600,p:3900},{m:'Apr',v:4900,p:5200},{m:'May',v:6300,p:4800},{m:'Jun',v:5800,p:6100},{m:'Jul',v:7200,p:5500},{m:'Aug',v:6600,p:7000},{m:'Sep',v:8100,p:6400},{m:'Oct',v:7500,p:7800},{m:'Nov',v:9200,p:8100},{m:'Dec',v:10400,p:8900}]
const CATS = [{name:'Electronics',sales:480,returns:24},{name:'Clothing',sales:320,returns:48},{name:'Sports',sales:210,returns:12},{name:'Footwear',sales:380,returns:31},{name:'Accessories',sales:170,returns:8}]

export default function ColumnChartsPage() {
  const TIP = { contentStyle:{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,boxShadow:'var(--shadow-dropdown)',fontSize:12} }
  return (
    <>
      <PageBanner title="Column (Bar) Charts" description="Compare values across categories and time periods"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Charts'},{label:'Column Charts'}]}/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Monthly Revenue" subtitle="Grouped bars — this year vs last year"/>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={MONTHLY.slice(0,8)} margin={{top:5,right:10,bottom:5,left:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false}/>
              <Tooltip {...TIP}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Bar dataKey="v" name="This Year" fill={C[0]} radius={[4,4,0,0]} maxBarSize={28}/>
              <Bar dataKey="p" name="Last Year" fill={C[1]} radius={[4,4,0,0]} maxBarSize={28}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Sales vs Returns by Category" subtitle="Stacked bar comparison"/>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={CATS} layout="vertical" margin={{top:5,right:30,bottom:5,left:60}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false}/>
              <XAxis type="number" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="name" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false}/>
              <Tooltip {...TIP}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Bar dataKey="sales"   name="Sales"   fill={C[0]} radius={[0,4,4,0]} maxBarSize={22} stackId="a"/>
              <Bar dataKey="returns" name="Returns" fill={C[4]} radius={[0,4,4,0]} maxBarSize={22} stackId="a"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Full Year — Single Series Rounded Bars" subtitle="Clean column chart with top-radius"/>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY} margin={{top:5,right:10,bottom:5,left:10}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={{stroke:'var(--border)'}} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--muted)' as any}} axisLine={false} tickLine={false} width={45}/>
              <Tooltip {...TIP}/>
              {MONTHLY.map((_,i)=>(
                <Bar key={i} dataKey="v" name="Revenue" fill={C[0]} radius={[6,6,0,0]} maxBarSize={40}/>
              )).slice(0,1)}
              <Bar dataKey="v" name="Revenue" radius={[6,6,0,0]} maxBarSize={40}
                fill="transparent"
                label={false}>
                {MONTHLY.map((_,i)=>(
                  <Cell key={i} fill={`hsl(${210 + i*10},80%,${55+i*2}%)`}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}
