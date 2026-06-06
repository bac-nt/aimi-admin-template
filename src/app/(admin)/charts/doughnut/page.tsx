'use client'
import { PageBanner, Card, CardHeader, Badge } from '@/components/ui'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

const C = ['#5b6af6','#3abff8','#00c9a7','#f59e0b','#f43f5e','#8b5cf6']
const TIP = { contentStyle:{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,fontSize:12}}

const SALES_BY_CAT    = [{name:'Electronics',value:480,amt:52400},{name:'Clothing',value:320,amt:28900},{name:'Sports',value:210,amt:18200},{name:'Footwear',value:380,amt:41300},{name:'Accessories',value:170,amt:12800}]
const REVENUE_BY_CH   = [{name:'Online Store',value:58},{name:'Mobile App',value:27},{name:'Marketplace',value:15}]
const CUSTOMER_SEG    = [{name:'New',value:34},{name:'Returning',value:48},{name:'VIP',value:18}]

export default function DoughnutPage() {
  const [active, setActive] = useState<number|null>(null)
  const total = SALES_BY_CAT.reduce((s,d)=>s+d.value,0)

  return (
    <>
      <PageBanner title="Doughnut & Pie Charts" description="Proportional data and part-to-whole relationships"
        breadcrumbs={[{label:'Home',href:'/'},{label:'Charts'},{label:'Doughnut & Pie'}]}/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Big doughnut */}
        <Card className="lg:col-span-2">
          <CardHeader title="Sales by Category — Interactive Doughnut" subtitle="Hover a slice to highlight details"/>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <ResponsiveContainer width={280} height={280}>
              <PieChart>
                <Pie data={SALES_BY_CAT} cx="50%" cy="50%" innerRadius={70} outerRadius={110}
                  paddingAngle={3} dataKey="value"
                  onMouseEnter={(_,i)=>setActive(i)} onMouseLeave={()=>setActive(null)}>
                  {SALES_BY_CAT.map((_,i)=>(
                    <Cell key={i} fill={C[i]} opacity={active===null||active===i?1:0.4}
                      stroke={active===i?C[i]:'transparent'} strokeWidth={active===i?3:0}/>
                  ))}
                </Pie>
                <Tooltip {...TIP}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {SALES_BY_CAT.map((d,i)=>(
                <div key={i} className="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer"
                  style={{background:active===i?C[i]+'15':'var(--surface)',border:`1px solid ${active===i?C[i]+'44':'var(--border)'}`}}
                  onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{background:C[i]}}/>
                    <span className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{d.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm" style={{color:C[i]}}>{d.value}</p>
                    <p className="text-xs" style={{color:'var(--muted)'}}>{Math.round(d.value/total*100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Two small pies */}
        <div className="space-y-5">
          <Card>
            <CardHeader title="Revenue Channels" subtitle="% of total revenue"/>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={REVENUE_BY_CH} cx="50%" cy="50%" outerRadius={65} paddingAngle={3} dataKey="value">
                  {REVENUE_BY_CH.map((_,i)=><Cell key={i} fill={C[i]}/>)}
                </Pie>
                <Tooltip {...TIP} formatter={(v:number)=>`${v}%`}/>
                <Legend iconType="circle" wrapperStyle={{fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <CardHeader title="Customer Segments" subtitle="New vs returning vs VIP"/>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={CUSTOMER_SEG} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {CUSTOMER_SEG.map((_,i)=><Cell key={i} fill={[C[2],C[0],C[3]][i]}/>)}
                </Pie>
                <Tooltip {...TIP} formatter={(v:number)=>`${v}%`}/>
                <Legend iconType="circle" wrapperStyle={{fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </>
  )
}
