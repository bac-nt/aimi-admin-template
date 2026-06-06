'use client'
import { Alert, Badge, Button, Card, PageBanner, Progress } from '@/components/ui'
import { Download, Search, TrendingUp, Globe, AlertCircle, Check, ExternalLink, Link2 } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const SEO_POSTS = [
  { id:1, title:'Getting Started with Next.js 15', slug:'/blog/nextjs-15', score:92, issues:0, keyword:'Next.js 15 tutorial', impressions:12400, clicks:840, ctr:6.8, position:4.2 },
  { id:2, title:'Tailwind CSS Best Practices',      slug:'/blog/tailwind-best', score:78, issues:2, keyword:'tailwind css tips', impressions:8200, clicks:410, ctr:5.0, position:7.1 },
  { id:3, title:'React 19 Full Breakdown',          slug:'/blog/react-19', score:65, issues:4, keyword:'react 19 features', impressions:5600, clicks:280, ctr:5.0, position:11.3 },
  { id:4, title:'TypeScript Advanced Patterns',     slug:'/blog/typescript', score:88, issues:1, keyword:'typescript patterns', impressions:9100, clicks:620, ctr:6.8, position:5.8 },
  { id:5, title:'SEO for Next.js Apps',             slug:'/blog/nextjs-seo', score:45, issues:7, keyword:'nextjs seo', impressions:3200, clicks:96,  ctr:3.0, position:18.4 },
]

const ISSUES = [
  { type:'error',   count:3, label:'Missing meta descriptions', posts:['React 19', 'SEO for Next.js', '+1'] },
  { type:'warning', count:5, label:'Short title tags (<30 chars)', posts:['Tailwind CSS', 'TypeScript', '+3'] },
  { type:'info',    count:8, label:'Images missing alt text', posts:['Next.js 15', 'React 19', '+6'] },
  { type:'warning', count:2, label:'Duplicate canonical URLs', posts:['Getting Started', '+1'] },
]

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? COLOR.success : score >= 60 ? COLOR.warning : COLOR.error
  const label = score >= 80 ? 'Good' : score >= 60 ? 'Needs Work' : 'Poor'
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border)" strokeWidth="3"/>
          <circle cx="18" cy="18" r="15" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${(score/100)*94} 94`} strokeLinecap="round"/>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black" style={{color}}>{score}</span>
      </div>
      <span className="text-xs font-semibold" style={{color}}>{label}</span>
    </div>
  )
}

export default function BlogSEOPage() {
  const [tab, setTab] = useState<'overview'|'posts'|'issues'>('overview')
  const avgScore = Math.round(SEO_POSTS.reduce((a,p)=>a+p.score,0)/SEO_POSTS.length)
  const totalIssues = SEO_POSTS.reduce((a,p)=>a+p.issues,0)

  return (
    <>
      <PageBanner title="SEO Manager" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'SEO'}]} description="Monitor and optimize your content for search engines"
        action={<Button variant="outline"><Download size={14}/>Export Report</Button>}/>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 animate-fade-up">
        {[
          {l:'Avg SEO Score',v:`${avgScore}/100`,c:avgScore>=80?COLOR.success:COLOR.warning},
          {l:'Total Issues',v:totalIssues,c:totalIssues>5?COLOR.error:COLOR.warning},
          {l:'Total Impressions',v:'38.5K',c:COLOR.primary},
          {l:'Total Clicks',v:'2,246',c:COLOR.secondary},
        ].map(s => (
          <Card key={s.l}><p className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-5">
        {(['overview','posts','issues'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize" style={tab===t?{background:'var(--primary)',color:'white'}:{background:'var(--surface)',color:'var(--muted)'}}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>SEO Score Distribution</h3>
            <div className="space-y-3">
              {[{l:'Excellent (80-100)',count:SEO_POSTS.filter(p=>p.score>=80).length,c:COLOR.success},{l:'Good (60-79)',count:SEO_POSTS.filter(p=>p.score>=60&&p.score<80).length,c:COLOR.warning},{l:'Poor (0-59)',count:SEO_POSTS.filter(p=>p.score<60).length,c:COLOR.error}].map(s=>(
                <div key={s.l}>
                  <div className="flex justify-between text-xs mb-1.5"><span style={{color:'var(--foreground)'}}>{s.l}</span><span className="font-bold" style={{color:s.c}}>{s.count} posts</span></div>
                  <Progress value={(s.count/SEO_POSTS.length)*100} color={s.c}/>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Quick Wins</h3>
            <div className="space-y-3">
              {[
                {icon:Check,text:'Add meta descriptions to 3 posts',color:COLOR.success,done:false},
                {icon:Search,text:'Target long-tail keywords in 5 posts',color:COLOR.primary,done:false},
                {icon:Globe,text:'Add Open Graph images to all posts',color:COLOR.secondary,done:true},
                {icon:Link2,text:'Build internal links between related posts',color:COLOR.warning,done:false},
                {icon:TrendingUp,text:'Update outdated content (3 posts)',color:COLOR.purple,done:false},
              ].map((item,i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{background:'var(--surface)'}}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0`} style={{background:item.color+'22'}}>
                    <item.icon size={14} style={{color:item.color}}/>
                  </div>
                  <span className={`text-sm flex-1 ${item.done?'line-through opacity-50':''}`} style={{color:'var(--foreground)'}}>{item.text}</span>
                  {item.done && <Check size={14} style={{color:COLOR.success}}/>}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'posts' && (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
                {['Post','Keyword','SEO Score','Impressions','Clicks','CTR','Position','Issues'].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'  ,borderBottom:'2px solid var(--border)'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{SEO_POSTS.map(p=>(
                <tr key={p.id} className="border-b hover:bg-[var(--surface)] transition-colors cursor-pointer" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                  <td className="px-5 py-3.5 max-w-[200px]">
                    <p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{p.title}</p>
                    <p className="text-xs truncate" style={{color:'var(--muted)'}}>{p.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{color:'var(--muted)'}}>{p.keyword}</td>
                  <td className="px-5 py-3.5"><ScoreBadge score={p.score}/></td>
                  <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{p.impressions.toLocaleString('en-US')}</td>
                  <td className="px-5 py-3.5 font-semibold" style={{color:'var(--foreground)'}}>{p.clicks.toLocaleString('en-US')}</td>
                  <td className="px-5 py-3.5"><span className="font-bold" style={{color:p.ctr>=6?COLOR.success:p.ctr>=4?COLOR.warning:COLOR.error}}>{p.ctr}%</span></td>
                  <td className="px-5 py-3.5"><span className="font-bold" style={{color:p.position<=5?COLOR.success:p.position<=10?COLOR.warning:COLOR.error}}>{p.position.toFixed(1)}</span></td>
                  <td className="px-5 py-3.5">
                    {p.issues===0 ? <Badge variant="success">Clean</Badge> : <Badge variant={p.issues>=5?'error':'warning'}>{p.issues} issues</Badge>}
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'issues' && (
        <div className="space-y-4">
          {ISSUES.map((issue,i) => (
            <Card key={i}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`var(--${issue.type==='error'?'error':issue.type==='warning'?'warning':'secondary'}-light)`}}>
                  <AlertCircle size={18} style={{color:`var(--${issue.type==='error'?'error':issue.type==='warning'?'warning':'secondary'})`}}/>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={issue.type==='error'?'error':issue.type==='warning'?'warning':'secondary'}>{issue.count} posts</Badge>
                    <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{issue.label}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {issue.posts.map(p => (
                      <span key={p} className="text-xs px-2 py-1 rounded-lg" style={{background:'var(--surface)',color:'var(--muted)'}}>{p}</span>
                    ))}
                  </div>
                </div>
                <Button size="sm" variant="outline">Fix Now</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
