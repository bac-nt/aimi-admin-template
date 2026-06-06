'use client'
import React, { useState } from 'react'
import { Badge, Button, Card, Modal, PageBanner, SearchBar, Toast } from '@/components/ui'
import { MEDIA_FILES } from '@/lib/data'
import { Upload, Search, Grid, List, Image, FileText, Film, Archive, File, Trash2, Download, Eye, Copy, X } from 'lucide-react'

type MediaFile = typeof MEDIA_FILES[0]
const TYPE_ICON: Record<string, React.ElementType> = { image:Image, pdf:FileText, video:Film, zip:Archive, excel:FileText }
const TYPE_V:    Record<string,'primary'|'secondary'|'error'|'warning'|'muted'> = { image:'primary', pdf:'error', video:'secondary', zip:'warning', excel:'success' as any }

export default function MediaPage() {
  const [files,    setFiles]    = useState(MEDIA_FILES)
  const [search,   setSearch]   = useState('')
  const [type,     setType]     = useState('All')
  const [view,     setView]     = useState<'grid'|'list'>('grid')
  const [selected, setSelected] = useState<number[]>([])
  const [preview,  setPreview]  = useState<MediaFile|null>(null)
  const [toast,    setToast]    = useState<string|null>(null)
  const [drag,     setDrag]     = useState(false)

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const types = ['All',...Array.from(new Set(files.map(f=>f.type)))]
  const filtered = files
    .filter(f => type==='All' || f.type===type)
    .filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  const toggleSel = (id:number) => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s,id])
  const delSelected = () => { setFiles(fs=>fs.filter(f=>!selected.includes(f.id))); setSelected([]); showToast(`${selected.length} file(s) deleted`) }

  return (
    <>
      <PageBanner title="Media Library" breadcrumbs={[{label:'Home',href:'/'},{label:'Blog'},{label:'Media'}]}
        description="Upload and manage all your media files"
        action={<Button><Upload size={14}/>Upload Files</Button>}/>
      {<Toast message={toast}/>}

      {/* Drop zone */}
      <div className={`mb-5 border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${drag?'border-[var(--primary)] bg-[var(--primary-light)]':'border-[var(--border)]'}`}
        onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);showToast('Upload simulated!')}}>
        <Upload size={28} className="mx-auto mb-2" style={{color:drag?'var(--primary)':'var(--muted)'}}/>
        <p className="font-semibold text-sm" style={{color:drag?'var(--primary)':'var(--foreground)'}}>Drag &amp; drop files here, or click to browse</p>
        <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>PNG, JPG, PDF, MP4, ZIP up to 50MB</p>
      </div>

      <Card padding={false}>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b" style={{borderColor:'var(--border)'}}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
          <div className="flex gap-1.5">
            {types.map(t=>(
              <button key={t} type="button" onClick={()=>setType(t)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                style={type===t?{background:'var(--primary)',color:'#fff'}:{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-1 ml-auto">
            {selected.length>0 && <Button size="sm" variant="error" onClick={delSelected}><Trash2 size={13}/>Delete ({selected.length})</Button>}
            <button type="button" onClick={()=>setView('grid')} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={view==='grid'?{background:'var(--primary)',color:'#fff'}:{color:'var(--muted)',border:'1px solid var(--border)'}}><Grid size={15}/></button>
            <button type="button" onClick={()=>setView('list')} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={view==='list'?{background:'var(--primary)',color:'#fff'}:{color:'var(--muted)',border:'1px solid var(--border)'}}><List size={15}/></button>
          </div>
        </div>

        {view==='grid' ? (
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map(f=>{
              const Icon = TYPE_ICON[f.type] || File
              const sel  = selected.includes(f.id)
              return (
                <div key={f.id} onClick={()=>toggleSel(f.id)}
                  className="group relative rounded-xl border overflow-hidden cursor-pointer transition-all hover:shadow-md"
                  style={{borderColor:sel?'var(--primary)':'var(--border)',outline:sel?'2px solid var(--primary)':'none'}}>
                  {f.type==='image'&&f.url ? (
                    <div className="aspect-square overflow-hidden"><img src={f.url} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/></div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center" style={{background:'var(--surface)'}}><Icon size={28} style={{color:'var(--muted)'}}/></div>
                  )}
                  <div className="p-2">
                    <p className="text-xs font-semibold truncate" style={{color:'var(--foreground)'}}>{f.name}</p>
                    <p className="text-[10px]" style={{color:'var(--muted)'}}>{f.size}</p>
                  </div>
                  {sel && <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{background:'var(--primary)'}}><span className="text-white text-[10px]">✓</span></div>}
                  <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={e=>{e.stopPropagation();setPreview(f)}} className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{background:'rgba(0,0,0,0.5)'}}><Eye size={11}/></button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="divide-y" style={{borderColor:'var(--border)'}}>
            {filtered.map(f=>{
              const Icon = TYPE_ICON[f.type] || File
              return (
                <div key={f.id} className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--surface)] transition-colors">
                  <input type="checkbox" checked={selected.includes(f.id)} onChange={()=>toggleSel(f.id)} className="w-4 h-4 rounded flex-shrink-0"/>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden" style={{background:'var(--surface)'}}>
                    {f.type==='image'&&f.url ? <img src={f.url} alt={f.name} className="w-full h-full object-cover"/> : <Icon size={18} style={{color:'var(--muted)'}}/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{color:'var(--foreground)'}}>{f.name}</p>
                    <p className="text-xs" style={{color:'var(--muted)'}}>{f.dims} · {f.size}</p>
                  </div>
                  <Badge variant={TYPE_V[f.type]||'muted'} className="text-[10px] capitalize flex-shrink-0">{f.type}</Badge>
                  <span className="text-xs flex-shrink-0" style={{color:'var(--muted)'}}>{f.date}</span>
                  <div className="flex gap-1 flex-shrink-0">
                    <button type="button" onClick={()=>setPreview(f)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Eye size={13}/></button>
                    <button type="button" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Download size={13}/></button>
                    <button type="button" onClick={()=>{setFiles(fs=>fs.filter(x=>x.id!==f.id));showToast('Deleted')}} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-all hover:scale-105" style={{color:'var(--muted)'}}><Trash2 size={13}/></button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <div className="p-4 border-t" style={{borderColor:'var(--border)'}}>
          <span className="text-sm" style={{color:'var(--muted)'}}>{filtered.length} files · {selected.length} selected</span>
        </div>
      </Card>

      <Modal open={!!preview} onClose={()=>setPreview(null)} title={preview?.name} size="lg"
        footer={<><Button variant="ghost" onClick={()=>setPreview(null)}>Close</Button><Button variant="outline"><Copy size={13}/>Copy URL</Button><Button><Download size={13}/>Download</Button></>}>
        {preview && (
          <div className="space-y-4">
            {preview.type==='image'&&preview.url ? (
              <div className="rounded-xl overflow-hidden border" style={{borderColor:'var(--border)'}}><img src={preview.url} alt={preview.name} className="w-full h-64 object-cover"/></div>
            ) : (
              <div className="h-40 rounded-xl flex items-center justify-center" style={{background:'var(--surface)'}}>
                {(() => { const Icon=TYPE_ICON[preview.type]||File; return <Icon size={48} style={{color:'var(--muted)'}}/>})()}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {[{l:'File Name',v:preview.name},{l:'Type',v:preview.type},{l:'Size',v:preview.size},{l:'Dimensions',v:preview.dims},{l:'Uploaded',v:preview.date},{l:'URL',v:'...'+preview.name}].map(f=>(
                <div key={f.l} className="p-3 rounded-xl" style={{background:'var(--surface)'}}>
                  <p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{f.l}</p>
                  <p className="text-sm font-semibold truncate" style={{color:'var(--foreground)'}}>{f.v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
