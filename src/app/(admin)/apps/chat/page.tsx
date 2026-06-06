'use client'
import { useState, useRef, useEffect } from 'react'
import { Avatar, Button } from '@/components/ui'
import { CHAT_CONTACTS, INITIAL_MESSAGES } from '@/lib/data'
import { Search, Phone, Video, MoreVertical, Paperclip, Smile, Send, Check, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_COLOR: Record<string,string> = { online:'var(--success)', away:'var(--warning)', offline:'var(--border)' }

export default function ChatPage() {
  const [active, setActive] = useState(CHAT_CONTACTS[0])
  const [msgs, setMsgs]     = useState(INITIAL_MESSAGES)
  const [input, setInput]   = useState('')
  const [search, setSearch] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs])

  const send = () => {
    if (!input.trim()) return
    setMsgs(m => [...m, { id: Date.now(), from:'me', avatar:'MA', text:input.trim(), time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), self:true, read:false }])
    setInput('')
  }

  const filtered = CHAT_CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex h-[calc(100vh-130px)] rounded-2xl overflow-hidden border" style={{background:'var(--card)',borderColor:'var(--border)'}}>
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 flex flex-col border-r" style={{borderColor:'var(--border)'}}>
        <div className="p-4 border-b" style={{borderColor:'var(--border)'}}>
          <h2 className="font-black text-base mb-3" style={{color:'var(--foreground)'}}>Messages</h2>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{background:'var(--surface)'}}>
            <Search size={14} style={{color:'var(--muted)'}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search conversations…" className="bg-transparent text-sm outline-none w-full" style={{color:'var(--foreground)'}}/>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(c => (
            <button key={c.id} type="button" onClick={()=>setActive(c)}
              className={cn('w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--surface)]', active.id===c.id && 'bg-[var(--primary-light)]')}>
              <div className="relative flex-shrink-0">
                <Avatar name={c.name} size={40} color="var(--primary)"/>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-[var(--card)]" style={{background:STATUS_COLOR[c.status]}}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{c.name}</span>
                  <span className="text-[10px] flex-shrink-0 ml-1" style={{color:'var(--muted)'}}>{c.time}</span>
                </div>
                <p className="text-xs truncate" style={{color:'var(--muted)'}}>{c.lastMsg}</p>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{background:'var(--primary)'}}>{c.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b" style={{borderColor:'var(--border)'}}>
          <div className="relative">
            <Avatar name={active.name} size={38} color="var(--primary)"/>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-[var(--card)]" style={{background:STATUS_COLOR[active.status]}}/>
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{active.name}</p>
            <p className="text-xs capitalize" style={{color:STATUS_COLOR[active.status]}}>{active.status}</p>
          </div>
          <div className="flex gap-1">
            {[Phone, Video, MoreVertical].map((Icon, i) => (
              <button key={i} type="button" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{color:'var(--muted)'}}><Icon size={16}/></button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {msgs.map(m => (
            <div key={m.id} className={cn('flex gap-3', m.self && 'flex-row-reverse')}>
              <Avatar name={m.self ? 'Mathew Anderson' : active.name} size={32} color={m.self ? 'var(--secondary)' : 'var(--primary)'}/>
              <div className={cn('max-w-[65%]', m.self && 'items-end flex flex-col')}>
                <div className="px-4 py-2.5 rounded-2xl text-sm" style={{
                  background: m.self ? 'var(--primary)' : 'var(--surface)',
                  color: m.self ? '#fff' : 'var(--foreground)',
                  borderRadius: m.self ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                }}>
                  {m.text}
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[10px]" style={{color:'var(--muted)'}}>{m.time}</span>
                  {m.self && <CheckCheck size={12} style={{color:'var(--primary)'}}/>}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div className="px-4 py-3.5 border-t flex items-center gap-3" style={{borderColor:'var(--border)'}}>
          <button type="button" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--surface)] transition-colors flex-shrink-0" style={{color:'var(--muted)'}}><Paperclip size={16}/></button>
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border" style={{background:'var(--surface)',borderColor:'var(--border)'}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
              placeholder="Type a message…" className="flex-1 bg-transparent text-sm outline-none" style={{color:'var(--foreground)'}}/>
            <button type="button" className="hover:opacity-70" style={{color:'var(--muted)'}}><Smile size={16}/></button>
          </div>
          <button type="button" onClick={send}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90 active:scale-95 flex-shrink-0" style={{background:'var(--primary)'}}>
            <Send size={16}/>
          </button>
        </div>
      </div>
    </div>
  )
}
