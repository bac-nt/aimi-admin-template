'use client'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui'
import { Send, Sparkles, RefreshCw, Copy, ThumbsUp, ThumbsDown, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Msg { id:number; role:'user'|'assistant'; text:string; time:string }

const SUGGESTIONS = [
  'Write a product description for a wireless keyboard',
  'Analyze our Q1 sales data and suggest improvements',
  'Draft a customer support email for a delayed order',
  'Create a social media post for our new product launch',
]

const INIT: Msg[] = [
  { id:1, role:'assistant', text:"Hi! I'm your AI assistant powered by Claude. I can help you write content, analyze data, answer questions, and much more. What can I help you with today?", time:'Now' }
]

export default function AiChatPage() {
  const [msgs,   setMsgs]   = useState<Msg[]>(INIT)
  const [input,  setInput]  = useState('')
  const [loading,setLoading]= useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}) },[msgs])

  const RESPONSES: Record<string,string> = {
    default: "That's a great question! Based on your input, I'd suggest focusing on key metrics like conversion rate, average order value, and customer lifetime value. Would you like me to elaborate on any specific aspect?",
    product: "Here's a product description:\n\n**Premium Wireless Mechanical Keyboard**\n\nExperience the perfect blend of performance and aesthetics with our wireless mechanical keyboard. Featuring Cherry MX switches, 75% compact layout, and 40-hour battery life. Connect to up to 3 devices simultaneously via Bluetooth 5.0. Available in Space Gray and Arctic White.",
    email: "Subject: Update on Your Order #[ORDER_ID]\n\nDear [Customer Name],\n\nThank you for your patience. We wanted to personally reach out regarding your recent order. Due to unexpected demand, your order has been slightly delayed and will arrive by [NEW_DATE].\n\nAs a token of our appreciation, we've added a 15% discount to your next order.\n\nBest regards,\nCustomer Support Team",
  }

  const send = () => {
    if (!input.trim() || loading) return
    const userMsg = { id:Date.now(), role:'user' as const, text:input, time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) }
    setMsgs(m=>[...m,userMsg])
    setInput('')
    setLoading(true)
    setTimeout(()=>{
      const key = input.toLowerCase().includes('product')?'product':input.toLowerCase().includes('email')?'email':'default'
      setMsgs(m=>[...m,{ id:Date.now()+1, role:'assistant', text:RESPONSES[key], time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) }])
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))'}}><Sparkles size={18}/></div>
          <div><h1 className="font-black text-base" style={{color:'var(--foreground)'}}>AI Assistant</h1><p className="text-xs" style={{color:'var(--muted)'}}>Powered by Claude · Always available</p></div>
        </div>
        <Button variant="ghost" size="sm" onClick={()=>setMsgs(INIT)}><RefreshCw size={13}/>New Chat</Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl border p-4 space-y-4 mb-4" style={{background:'var(--card)',borderColor:'var(--border)'}}>
        {msgs.map(m=>(
          <div key={m.id} className={cn('flex gap-3', m.role==='user'&&'flex-row-reverse')}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              style={{background:m.role==='assistant'?'linear-gradient(135deg,var(--primary),var(--secondary))':'var(--muted)'}}>
              {m.role==='assistant'?<Sparkles size={14}/>:<User size={14}/>}
            </div>
            <div className={cn('max-w-[75%] space-y-1', m.role==='user'&&'items-end flex flex-col')}>
              <div className="px-4 py-3 rounded-2xl text-sm whitespace-pre-line" style={{
                background:m.role==='assistant'?'var(--surface)':'var(--primary)',
                color:m.role==='assistant'?'var(--foreground)':'#fff',
                borderRadius:m.role==='assistant'?'4px 18px 18px 18px':'18px 4px 18px 18px',
              }}>{m.text}</div>
              {m.role==='assistant'&&(
                <div className="flex items-center gap-1 px-1">
                  <span className="text-[10px]" style={{color:'var(--muted)'}}>{m.time}</span>
                  <button type="button" className="w-5 h-5 rounded flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}><Copy size={10}/></button>
                  <button type="button" className="w-5 h-5 rounded flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}><ThumbsUp size={10}/></button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading&&(
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))'}}><Sparkles size={14}/></div>
            <div className="px-4 py-3 rounded-2xl" style={{background:'var(--surface)',borderRadius:'4px 18px 18px 18px'}}>
              <div className="flex gap-1.5 items-center h-5">{[0,1,2].map(i=><div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{background:'var(--primary)',animationDelay:`${i*150}ms`}}/>)}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Suggestions */}
      {msgs.length<=2&&(
        <div className="flex gap-2 flex-wrap mb-3">
          {SUGGESTIONS.map(s=>(
            <button key={s} type="button" onClick={()=>setInput(s)} className="text-xs px-3 py-2 rounded-xl border transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]" style={{borderColor:'var(--border)',color:'var(--muted)'}}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-3 p-3 rounded-2xl border" style={{background:'var(--card)',borderColor:'var(--border)'}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()}
          placeholder="Ask me anything…" className="flex-1 bg-transparent text-sm outline-none" style={{color:'var(--foreground)'}}/>
        <button type="button" onClick={send} disabled={!input.trim()||loading}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 flex-shrink-0" style={{background:'var(--primary)'}}>
          <Send size={16}/>
        </button>
      </div>
    </div>
  )
}
