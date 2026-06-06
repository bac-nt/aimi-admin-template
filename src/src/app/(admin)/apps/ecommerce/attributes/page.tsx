'use client'
import { useState } from 'react'
import { PageBanner, Card, Badge, Button, Modal, Input, Toggle } from '@/components/ui'
import { Plus, Edit, Trash2, Hash, GripVertical, ChevronDown, ChevronUp } from 'lucide-react'

type AttrType = 'Select'|'Multi-Select'|'Text'|'Number'|'Boolean'|'Color'|'Date'
interface Attr { id:number; name:string; slug:string; type:AttrType; values:string[]; filterable:boolean; visible:boolean; count:number }

const INIT: Attr[] = [
  { id:1, name:'Color',     slug:'color',     type:'Color',       values:['Black','White','Red','Blue','Green','Yellow','Pink','Purple'], filterable:true,  visible:true,  count:48 },
  { id:2, name:'Size',      slug:'size',      type:'Select',      values:['XS','S','M','L','XL','XXL'],                                  filterable:true,  visible:true,  count:67 },
  { id:3, name:'Material',  slug:'material',  type:'Select',      values:['Cotton','Polyester','Leather','Wool','Silk','Denim'],         filterable:true,  visible:true,  count:34 },
  { id:4, name:'Brand',     slug:'brand',     type:'Select',      values:['Nike','Adidas','Apple','Sony','Samsung','Levi\'s'],           filterable:true,  visible:true,  count:89 },
  { id:5, name:'Weight',    slug:'weight',    type:'Number',      values:[],                                                             filterable:false, visible:false, count:12 },
  { id:6, name:'In Stock',  slug:'in-stock',  type:'Boolean',     values:['Yes','No'],                                                   filterable:true,  visible:false, count:127},
  { id:7, name:'Style',     slug:'style',     type:'Multi-Select',values:['Casual','Formal','Sport','Outdoor','Beach','Office'],         filterable:true,  visible:true,  count:21 },
]

const TYPE_V: Record<AttrType,'primary'|'secondary'|'warning'|'success'|'purple'|'error'|'muted'> = {
  Select:'primary', 'Multi-Select':'secondary', Text:'muted', Number:'warning', Boolean:'success', Color:'purple', Date:'error'
}
const COLOR_MAP: Record<string,string> = { Black:'#1a1a1a',White:'#f5f5f5',Red:'#ef4444',Blue:'#3b82f6',Green:'#22c55e',Yellow:'#eab308',Pink:'#ec4899',Purple:'#a855f7' }

export default function AttributesPage() {
  const [attrs,    setAttrs]    = useState(INIT)
  const [modal,    setModal]    = useState(false)
  const [editing,  setEditing]  = useState<Attr|null>(null)
  const [expanded, setExpanded] = useState<number|null>(null)
  const [toast,    setToast]    = useState<string|null>(null)
  const [form,     setForm]     = useState({ name:'', type:'Select' as AttrType, filterable:true, visible:true })
  const [valInput, setValInput] = useState('')
  const [vals,     setVals]     = useState<string[]>([])

  const showToast = (m:string) => { setToast(m); setTimeout(()=>setToast(null),3000) }

  const openNew  = () => { setEditing(null); setForm({name:'',type:'Select',filterable:true,visible:true}); setVals([]); setModal(true) }
  const openEdit = (a: Attr) => { setEditing(a); setForm({name:a.name,type:a.type,filterable:a.filterable,visible:a.visible}); setVals([...a.values]); setModal(true) }

  const save = () => {
    if (!form.name.trim()) return
    if (editing) {
      setAttrs(as => as.map(a => a.id===editing.id ? {...a,...form,values:vals} : a))
      showToast('Attribute updated!')
    } else {
      setAttrs(as => [...as, {id:Date.now(),slug:form.name.toLowerCase().replace(/\s+/g,'-'),...form,values:vals,count:0}])
      showToast('Attribute created!')
    }
    setModal(false)
  }

  const addVal = () => { const v=valInput.trim(); if(v&&!vals.includes(v)){setVals(vs=>[...vs,v]);setValInput('')} }

  return (
    <>
      <PageBanner title="Product Attributes" breadcrumbs={[{label:'Home',href:'/'},{label:'Ecommerce'},{label:'Attributes'}]}
        description="Define attribute types used for product variants and filtering"
        action={<Button onClick={openNew}><Plus size={14}/>New Attribute</Button>}/>

      {toast && <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-lg animate-fade-in" style={{background:'var(--success)'}}>{toast}</div>}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[{l:'Attributes',v:attrs.length,c:'var(--primary)'},{l:'Total Values',v:attrs.reduce((s,a)=>s+a.values.length,0),c:'var(--secondary)'},{l:'Filterable',v:attrs.filter(a=>a.filterable).length,c:'var(--success)'}].map(s=>(
          <Card key={s.l}><p className="text-xs mb-0.5" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>

      <div className="space-y-3">
        {attrs.map(a => (
          <Card key={a.id} padding={false}>
            <div className="flex items-center gap-4 px-5 py-4 cursor-pointer" onClick={()=>setExpanded(expanded===a.id?null:a.id)}>
              <GripVertical size={16} style={{color:'var(--border)'}} className="flex-shrink-0"/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold" style={{color:'var(--foreground)'}}>{a.name}</span>
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{background:'var(--surface)',color:'var(--muted)'}}>/{a.slug}</span>
                  <Badge variant={TYPE_V[a.type]} className="text-[10px]">{a.type}</Badge>
                  {a.filterable && <Badge variant="success" className="text-[10px]">Filterable</Badge>}
                  {a.visible   && <Badge variant="muted"   className="text-[10px]">Visible</Badge>}
                </div>
                <p className="text-xs mt-0.5" style={{color:'var(--muted)'}}>{a.values.length} values · used in {a.count} products</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button type="button" onClick={e=>{e.stopPropagation();openEdit(a)}} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] transition-colors" style={{color:'var(--muted)'}}><Edit size={13}/></button>
                <button type="button" onClick={e=>{e.stopPropagation();setAttrs(as=>as.filter(x=>x.id!==a.id));showToast('Deleted')}} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={13}/></button>
                {expanded===a.id ? <ChevronUp size={15} style={{color:'var(--muted)'}}/> : <ChevronDown size={15} style={{color:'var(--muted)'}}/>}
              </div>
            </div>
            {expanded===a.id && a.values.length > 0 && (
              <div className="border-t px-5 py-4" style={{borderColor:'var(--border)'}}>
                <p className="text-xs font-bold uppercase mb-3" style={{color:'var(--muted)'}}>Values</p>
                <div className="flex flex-wrap gap-2">
                  {a.values.map(v => (
                    <div key={v} className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold" style={{borderColor:'var(--border)',color:'var(--foreground)'}}>
                      {a.type==='Color' && COLOR_MAP[v] && <span className="w-3 h-3 rounded-full border flex-shrink-0" style={{background:COLOR_MAP[v],borderColor:'rgba(0,0,0,0.1)'}}/>}
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title={editing?'Edit Attribute':'New Attribute'}
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={save}>{editing?'Update':'Create'} Attribute</Button></>}>
        <div className="space-y-4">
          <Input label="Attribute Name *" placeholder="e.g. Color, Size, Material" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Select','Multi-Select','Text','Number','Boolean','Color'] as AttrType[]).map(t=>(
                <button key={t} type="button" onClick={()=>setForm(f=>({...f,type:t}))}
                  className="py-2 px-3 rounded-xl border-2 text-xs font-semibold transition-all"
                  style={form.type===t?{borderColor:'var(--primary)',background:'var(--primary-light)',color:'var(--primary)'}:{borderColor:'var(--border)',color:'var(--muted)'}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Toggle checked={form.filterable} onChange={v=>setForm(f=>({...f,filterable:v}))} label="Filterable on shop" size="sm"/>
            <Toggle checked={form.visible}    onChange={v=>setForm(f=>({...f,visible:v}))}    label="Visible to users" size="sm"/>
          </div>
          {form.type!=='Text'&&form.type!=='Number'&&form.type!=='Boolean'&&form.type!=='Date' && (
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{color:'var(--foreground)'}}>Values</label>
              <div className="flex gap-2 mb-2">
                <input value={valInput} onChange={e=>setValInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addVal()}
                  placeholder="Type value and press Enter" className="field flex-1 text-sm"/>
                <Button size="sm" variant="outline" onClick={addVal}><Plus size={13}/>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {vals.map(v=>(
                  <div key={v} className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs font-semibold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>
                    {v}
                    <button type="button" onClick={()=>setVals(vs=>vs.filter(x=>x!==v))} className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
