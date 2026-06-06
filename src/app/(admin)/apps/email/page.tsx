'use client'
import { Badge, Avatar, Button } from '@/components/ui'
import { EMAILS } from '@/lib/data'
import type { EmailMessage } from '@/types'
import { Search, Star, Edit, Reply, Trash2, Archive, MoreVertical, RefreshCw, Paperclip, Send, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const FOLDERS = [
  { id:'inbox',   label:'Inbox',  count:4 },
  { id:'starred', label:'Starred',count:2 },
  { id:'sent',    label:'Sent',   count:0 },
  { id:'draft',   label:'Drafts', count:1 },
  { id:'trash',   label:'Trash',  count:0 },
]
const TAG_VARIANT: Record<string, 'primary'|'secondary'|'warning'|'success'> = {
  Work:'primary', Meeting:'secondary', Finance:'warning', Dev:'success',
}

export default function EmailPage() {
  const [folder,  setFolder]  = useState('inbox')
  const [sel,     setSel]     = useState<EmailMessage>(EMAILS[0])
  const [search,  setSearch]  = useState('')
  const [compose, setCompose] = useState(false)
  const [emails,  setEmails]  = useState(EMAILS)
  const [reply,   setReply]   = useState('')
  const [to,      setTo]      = useState('')
  const [subj,    setSubj]    = useState('')
  const [body,    setBody]    = useState('')

  const filtered = emails.filter(e => {
    if (folder === 'starred') return e.starred
    return (
      e.from.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase())
    )
  })

  const toggleStar = (id: number) =>
    setEmails(es => es.map(e => e.id === id ? { ...e, starred: !e.starred } : e))
  const markRead = (id: number) =>
    setEmails(es => es.map(e => e.id === id ? { ...e, read: true } : e))

  return (
    <>
      <div className="card flex overflow-hidden" style={{ height: 'calc(100vh - 136px)' }}>
        {/* Folder sidebar */}
        <div className="w-52 border-r flex flex-col flex-shrink-0 p-3" style={{ borderColor: 'var(--border)' }}>
          <Button onClick={() => setCompose(true)} className="w-full justify-center mb-4">
            <Edit size={14} />Compose
          </Button>
          <div className="space-y-0.5 mb-4">
            {FOLDERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFolder(f.id)}
                className={cn('w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all', folder === f.id ? 'text-white' : 'hover:bg-[var(--surface)]')}
                style={folder === f.id ? { background: 'var(--primary)' } : { color: 'var(--muted)' }}
              >
                {f.label}
                {f.count > 0 && (
                  <span className={cn('ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full', folder === f.id ? 'bg-white/25 text-white' : 'bg-[var(--primary-light)] text-[var(--primary)]')}>
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] font-bold uppercase tracking-wider px-2 mb-2" style={{ color: 'var(--muted)' }}>Labels</p>
            {['Work', 'Dev', 'Design', 'Finance'].map(t => (
              <button key={t} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--surface)]" style={{ color: 'var(--foreground)' }}>
                <span className={cn('w-2 h-2 rounded-full', t === 'Work' ? 'bg-[var(--primary)]' : t === 'Dev' ? 'bg-[var(--success)]' : t === 'Design' ? 'bg-purple-500' : 'bg-[var(--warning)]')} />
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Email list */}
        <div className="w-72 border-r flex flex-col flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <Search size={13} style={{ color: 'var(--muted)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="bg-transparent text-xs outline-none w-full" style={{ color: 'var(--foreground)' }} />
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>{filtered.length} messages</span>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface)]" style={{ color: 'var(--muted)' }}><RefreshCw size={13} /></button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(e => (
              <button
                key={e.id}
                onClick={() => { setSel(e); markRead(e.id) }}
                className={cn('w-full text-left p-3.5 transition-colors border-b border-l-2', sel?.id === e.id ? 'bg-[var(--primary-light)] border-l-[var(--primary)]' : 'border-l-transparent hover:bg-[var(--surface)]')}
                style={{ borderBottomColor: 'var(--border)' }}
              >
                <div className="flex items-start gap-2.5">
                  <Avatar src={`https://randomuser.me/api/portraits/men/${e.id + 2}.jpg`} name={e.from} size="xs" className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className={cn('text-xs truncate', !e.read ? 'font-bold' : 'font-medium')} style={{ color: 'var(--foreground)' }}>{e.from}</p>
                      <span className="text-[10px] flex-shrink-0 ml-1" style={{ color: 'var(--muted)' }}>{e.time}</span>
                    </div>
                    <p className={cn('text-[11px] truncate mb-1', !e.read ? 'font-semibold' : '')} style={{ color: !e.read ? 'var(--foreground)' : 'var(--muted)' }}>{e.subject}</p>
                    <p className="text-[10px] truncate" style={{ color: 'var(--muted)' }}>{e.preview}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Badge variant={TAG_VARIANT[e.tag] || 'primary'} className="text-[9px] px-1.5">{e.tag}</Badge>
                      {e.starred && <Star size={10} className="fill-amber-400 text-amber-400" />}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Read pane */}
        {sel ? (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-5 py-3 border-b flex items-center gap-2 flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-bold text-sm flex-1 min-w-0 truncate" style={{ color: 'var(--foreground)' }}>{sel.subject}</h3>
              <button onClick={() => toggleStar(sel.id)} className={cn('w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--surface)]', sel.starred ? 'text-amber-400' : '')} style={sel.starred ? {} : { color: 'var(--muted)' }}>
                <Star size={15} fill={sel.starred ? 'currentColor' : 'none'} />
              </button>
              {[Reply, Archive, Trash2, MoreVertical].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface)] transition-colors" style={{ color: 'var(--muted)' }}><Icon size={15} /></button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex items-start gap-3 mb-5">
                <Avatar src={`https://randomuser.me/api/portraits/men/${sel.id + 2}.jpg`} name={sel.from} size="md" />
                <div className="flex-1">
                  <div className="flex justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{sel.from}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{sel.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{sel.time}</p>
                      <Badge variant={TAG_VARIANT[sel.tag] || 'primary'} className="text-[10px]">{sel.tag}</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-5 text-sm leading-relaxed whitespace-pre-line" style={{ background: 'var(--surface)', color: 'var(--foreground)' }}>{sel.body}</div>
            </div>
            <div className="p-4 border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
              <div className="rounded-xl border p-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>Reply to {sel.from}</p>
                <textarea value={reply} onChange={e => setReply(e.target.value)} className="w-full bg-transparent text-sm outline-none resize-none" rows={3} placeholder="Write your reply..." style={{ color: 'var(--foreground)' }} />
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" onClick={() => setReply('')}><Send size={12} />Send</Button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--border)] transition-colors" style={{ color: 'var(--muted)' }}><Paperclip size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--muted)' }}>
            <div className="text-center"><Edit size={40} className="mx-auto mb-2 opacity-20" /><p className="text-sm">Select an email</p></div>
          </div>
        )}
      </div>

      {/* Compose modal */}
      {compose && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setCompose(false)}>
          <div className="card w-full max-w-lg animate-fade-up overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-3.5 flex items-center justify-between" style={{ background: 'var(--primary)' }}>
              <h3 className="font-bold text-white text-sm">New Message</h3>
              <button onClick={() => setCompose(false)} className="text-white/70 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-4 space-y-3">
              <input value={to} onChange={e => setTo(e.target.value)} className="field w-full" placeholder="To: recipient@example.com" />
              <input value={subj} onChange={e => setSubj(e.target.value)} className="field w-full" placeholder="Subject line..." />
              <textarea value={body} onChange={e => setBody(e.target.value)} className="field w-full resize-none" rows={7} placeholder="Write your message..." />
            </div>
            <div className="px-4 pb-4 flex items-center gap-2">
              <Button size="sm" onClick={() => setCompose(false)}><Send size={13} />Send</Button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface)]" style={{ color: 'var(--muted)' }}><Paperclip size={15} /></button>
              <button onClick={() => setCompose(false)} className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)]" style={{ color: 'var(--error)' }}><Trash2 size={15} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
