'use client'
import { PageBanner, Card, Button, Avatar } from '@/components/ui'
import { Bot, Send, Paperclip, Mic, Sparkles, RotateCcw, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const SUGGESTIONS = [
  'Summarize my recent emails',
  'Write a project proposal outline',
  'Explain React Server Components',
  'Generate a SQL query for user analytics',
]
interface AiMsg { id: number; role: 'user' | 'assistant'; text: string; time: string }
const INIT: AiMsg[] = [{ id:1, role:'assistant', text:"Hello! I'm your AI assistant. I can help with writing, code, analysis, and much more. What would you like to work on?", time:'Just now' }]

export default function AIChatPage() {
  const [msgs, setMsgs]   = useState<AiMsg[]>(INIT)
  const [input, setInput] = useState('')
  const [busy,  setBusy]  = useState(false)

  const send = (text?: string) => {
    const msg = (text || input).trim()
    if (!msg || busy) return
    const now = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
    setMsgs(m => [...m, { id:Date.now(), role:'user', text:msg, time:now }])
    setInput('')
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setMsgs(m => [...m, { id:Date.now()+1, role:'assistant',
        text:"I've analysed your request. Here's what I found:\n\nThis is a demo AI response. In production this connects to an LLM like GPT-4o or Claude via API, supporting streaming, markdown, and multi-turn context.\n\nWould you like me to elaborate?",
        time: new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}) }])
    }, 1200)
  }

  return (
    <>
      <PageBanner title="AI Chat" breadcrumbs={[{label:'Home',href:'/'},{label:'AI'},{label:'Chat'}]} description="Powered by advanced language models"/>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5" style={{height:'calc(100vh - 210px)'}}>
        <div className="xl:col-span-1 space-y-4">
          <Card>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'var(--primary-light)'}}><Sparkles size={18} style={{color:'var(--primary)'}}/></div>
              <div><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>AI Assistant</p><p className="text-xs" style={{color:'var(--success)'}}>● Online</p></div>
            </div>
            {[{l:'Model',v:'GPT-4o'},{l:'Context',v:'128K tokens'},{l:'Mode',v:'Assistant'}].map(s=>(
              <div key={s.l} className="flex justify-between text-xs py-1.5 border-b last:border-0" style={{borderColor:'var(--border)'}}>
                <span style={{color:'var(--muted)'}}>{s.l}</span><span className="font-semibold" style={{color:'var(--foreground)'}}>{s.v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{color:'var(--muted)'}}>Try asking</p>
            <div className="space-y-2">
              {SUGGESTIONS.map(s=><button key={s} onClick={()=>send(s)} className="w-full text-left text-xs p-2.5 rounded-xl border transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]" style={{borderColor:'var(--border)',color:'var(--muted)'}}>{s}</button>)}
            </div>
          </Card>
          <Button variant="ghost" className="w-full justify-center" onClick={()=>setMsgs(INIT)}><RotateCcw size={13}/>New Chat</Button>
        </div>

        <div className="xl:col-span-3 card flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b flex-shrink-0" style={{borderColor:'var(--border)'}}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:'var(--primary)'}}><Bot size={18} className="text-white"/></div>
            <div className="flex-1"><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>AI Assistant</p><p className="text-xs" style={{color:'var(--muted)'}}>Ask me anything</p></div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{background:'var(--surface)'}}>
            {msgs.map(m=>(
              <div key={m.id} className={`flex gap-3 ${m.role==='user'?'flex-row-reverse':''}`}>
                {m.role==='assistant'
                  ? <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 self-start" style={{background:'var(--primary)'}}><Bot size={14} className="text-white"/></div>
                  : <Avatar name="Me" src="https://randomuser.me/api/portraits/men/32.jpg" size="sm" className="self-start flex-shrink-0"/>
                }
                <div className={`max-w-[78%] flex flex-col ${m.role==='user'?'items-end':'items-start'}`}>
                  <div className="px-4 py-3 rounded-2xl text-sm whitespace-pre-line" style={m.role==='user'
                    ?{background:'var(--primary)',color:'white',borderRadius:'18px 4px 18px 18px'}
                    :{background:'var(--card)',color:'var(--foreground)',border:'1px solid var(--border)',borderRadius:'4px 18px 18px 18px'}
                  }>{m.text}</div>
                  <div className={`flex items-center gap-2 mt-1 ${m.role==='user'?'flex-row-reverse':''}`}>
                    <span className="text-[10px]" style={{color:'var(--muted)'}}>{m.time}</span>
                    {m.role==='assistant'&&<div className="flex gap-1">{[Copy,ThumbsUp,ThumbsDown].map((Icon,i)=><button key={i} className="w-5 h-5 rounded flex items-center justify-center hover:bg-[var(--border)] transition-colors" style={{color:'var(--muted)'}}><Icon size={10}/></button>)}</div>}
                  </div>
                </div>
              </div>
            ))}
            {busy&&(
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'var(--primary)'}}><Bot size={14} className="text-white"/></div>
                <div className="px-4 py-3.5 rounded-2xl" style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'4px 18px 18px 18px'}}>
                  <div className="flex gap-1">{[0,1,2].map(i=><span key={i} className="w-2 h-2 rounded-full bg-[var(--muted)] animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}</div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t flex-shrink-0" style={{borderColor:'var(--border)',background:'var(--card)'}}>
            <div className="flex items-end gap-2 px-4 py-3 rounded-2xl border" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
              <button style={{color:'var(--muted)'}} className="flex-shrink-0 mb-0.5"><Paperclip size={17}/></button>
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Message AI… (Enter to send)" className="flex-1 bg-transparent text-sm outline-none resize-none max-h-28" style={{color:'var(--foreground)'}} rows={1}/>
              <button style={{color:'var(--muted)'}} className="flex-shrink-0 mb-0.5"><Mic size={17}/></button>
              <button onClick={()=>send()} disabled={!input.trim()||busy} className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-all hover:brightness-110 active:scale-95 disabled:opacity-40" style={{background:'var(--primary)'}}><Send size={14}/></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
