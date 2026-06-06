'use client'
import { PageBanner, Card, CardHeader } from '@/components/ui'
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts'

const C = ['#5b6af6','#3abff8','#00c9a7','#f59e0b','#f43f5e','#8b5cf6']

const GOALS     = [{name:'Revenue',value:78,fill:C[0]},{name:'Orders',value:62,fill:C[1]},{name:'Customers',value:91,fill:C[2]},{name:'Satisfaction',value:85,fill:C[3]}]
const SKILLS    = [{name:'React',    value:95,fill:C[0]},{name:'TypeScript',value:88,fill:C[1]},{name:'Node.js', value:82,fill:C[2]},{name:'Design',   value:76,fill:C[3]},{name:'DevOps',  value:68,fill:C[4]}]

export default function RadialChartsPage() {
  return (
    <>
      <PageBanner title="Radial Bar Charts" description="Circular progress indicators and goal tracking"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Charts'},{label:'Radial Bar Charts'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
        {GOALS.map((g,i)=>(
          <Card key={i} className="flex flex-col items-center text-center py-6">
            <div className="relative" style={{width:120,height:120}}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius={35} outerRadius={55} data={[g]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0,100]} tick={false}/>
                  <RadialBar dataKey="value" cornerRadius={8} background={{fill:'var(--border)'}}/>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black" style={{color:g.fill}}>{g.value}%</span>
              </div>
            </div>
            <p className="font-bold mt-3" style={{color:'var(--foreground)'}}>{g.name}</p>
            <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>of quarterly goal</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Multi-Ring Radial Chart" subtitle="Stacked rings showing multiple metrics"/>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={220} height={220}>
              <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={95} data={SKILLS} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0,100]} tick={false}/>
                <RadialBar dataKey="value" cornerRadius={6} background={{fill:'var(--border)'}} label={false}/>
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {SKILLS.map((s,i)=>(
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold" style={{color:'var(--foreground)'}}>{s.name}</span>
                    <span className="font-bold" style={{color:s.fill}}>{s.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{background:'var(--border)'}}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{width:`${s.value}%`,background:s.fill}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Single Gauge — Customer Satisfaction" subtitle="NPS-style gauge visualization"/>
          <div className="flex flex-col items-center py-4">
            <div className="relative" style={{width:200,height:200}}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                  data={[{name:'Score',value:87,fill:C[2]}]} startAngle={200} endAngle={-20}>
                  <PolarAngleAxis type="number" domain={[0,100]} tick={false}/>
                  <RadialBar dataKey="value" cornerRadius={10} background={{fill:'var(--border)'}}/>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black" style={{color:C[2]}}>87</span>
                <span className="text-xs font-semibold" style={{color:'var(--muted)'}}>out of 100</span>
              </div>
            </div>
            <p className="font-bold mt-2" style={{color:'var(--foreground)'}}>Excellent</p>
            <p className="text-xs" style={{color:'var(--muted)'}}>Based on 1,284 responses this month</p>
          </div>
        </Card>
      </div>
    </>
  )
}
