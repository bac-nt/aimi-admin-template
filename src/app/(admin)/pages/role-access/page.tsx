'use client'
import { PageBanner, Card, Badge, Button, Modal, Input, Checkbox } from '@/components/ui'
import { Shield, Plus, Edit, Trash2, Users, Check } from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

const PERMISSIONS = {
  dashboard:  ['view'],
  users:      ['view','create','edit','delete'],
  content:    ['view','create','edit','delete','publish'],
  analytics:  ['view','export'],
  settings:   ['view','edit'],
  billing:    ['view','edit'],
  api:        ['view','create','revoke'],
}

const INIT_ROLES = [
  { id:1, name:'Administrator', color:COLOR.error,    users:3,  desc:'Full access to all features and settings',
    perms:{dashboard:['view'],users:['view','create','edit','delete'],content:['view','create','edit','delete','publish'],analytics:['view','export'],settings:['view','edit'],billing:['view','edit'],api:['view','create','revoke']} },
  { id:2, name:'Editor',        color:COLOR.primary,  users:8,  desc:'Can manage content and view analytics',
    perms:{dashboard:['view'],users:['view'],content:['view','create','edit','delete','publish'],analytics:['view'],settings:[],billing:[],api:[]} },
  { id:3, name:'Author',        color:COLOR.secondary,users:12, desc:'Can create and edit own content only',
    perms:{dashboard:['view'],users:[],content:['view','create','edit'],analytics:['view'],settings:[],billing:[],api:[]} },
  { id:4, name:'Viewer',        color:COLOR.muted || COLOR.success, users:24, desc:'Read-only access to dashboard and content',
    perms:{dashboard:['view'],users:[],content:['view'],analytics:[],settings:[],billing:[],api:[]} },
]

export default function RoleAccessPage() {
  const [roles, setRoles]     = useState(INIT_ROLES)
  const [sel, setSel]         = useState(INIT_ROLES[0])
  const [modal, setModal]     = useState(false)
  const [newName, setNewName] = useState('')

  const togglePerm = (module: string, perm: string) => {
    setSel(r => {
      const current = (r.perms as any)[module] || []
      const updated  = current.includes(perm) ? current.filter((p:string)=>p!==perm) : [...current,perm]
      const newPerms = {...r.perms,[module]:updated}
      setRoles(rs=>rs.map(x=>x.id===r.id?{...x,perms:newPerms}:x))
      return {...r,perms:newPerms}
    })
  }

  return (
    <>
      <PageBanner title="Role Based Access" breadcrumbs={[{label:'Home',href:'/'},{label:'Pages'},{label:'Role Access'}]} description="Manage user roles and permissions"/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Role list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold" style={{color:'var(--foreground)'}}>Roles</h3>
            <Button size="sm" onClick={()=>setModal(true)}><Plus size={13}/>New Role</Button>
          </div>
          {roles.map(r=>(
            <button key={r.id} onClick={()=>setSel(r)}
              className="w-full card p-4 text-left transition-all hover:shadow-md"
              style={sel.id===r.id?{borderColor:'var(--primary)',borderWidth:2}:{}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{background:r.color}}>{r.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><p className="font-bold text-sm" style={{color:'var(--foreground)'}}>{r.name}</p><Badge variant="muted" className="text-[9px]"><Users size={9} className="inline mr-0.5"/>{r.users}</Badge></div>
                  <p className="text-xs truncate" style={{color:'var(--muted)'}}>{r.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Permissions matrix */}
        <div className="xl:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:sel.color+'22'}}><Shield size={18} style={{color:sel.color}}/></div>
                <div><p className="font-bold" style={{color:'var(--foreground)'}}>{sel.name}</p><p className="text-xs" style={{color:'var(--muted)'}}>{sel.desc}</p></div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><Edit size={12}/>Edit</Button>
                {sel.id!==1&&<Button size="sm" variant="error"><Trash2 size={12}/>Delete</Button>}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
                  <th className="text-left pb-3 text-xs font-bold uppercase" style={{color:'var(--muted)'}}>Module</th>
                  {['View','Create','Edit','Delete','Publish','Export','Revoke'].map(p=>(
                    <th key={p} className="pb-3 text-xs font-bold uppercase text-center" style={{color:'var(--muted)'}}>{p}</th>
                  ))}
                </tr></thead>
                <tbody>{Object.entries(PERMISSIONS).map(([module,perms])=>(
                  <tr key={module} className="border-b" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                    <td className="py-3 pr-4"><p className="font-semibold capitalize" style={{color:'var(--foreground)'}}>{module}</p></td>
                    {['view','create','edit','delete','publish','export','revoke'].map(p=>(
                      <td key={p} className="py-3 text-center">
                        {perms.includes(p) ? (
                          <div onClick={()=>togglePerm(module,p)} className="w-5 h-5 rounded border-2 flex items-center justify-center mx-auto cursor-pointer transition-all"
                            style={(sel.perms as any)[module]?.includes(p)?{background:'var(--primary)',borderColor:'var(--primary)'}:{borderColor:'var(--border)'}}>
                            {(sel.perms as any)[module]?.includes(p)&&<Check size={11} className="text-white"/>}
                          </div>
                        ) : <div className="w-5 h-5 mx-auto flex items-center justify-center"><span className="w-1 h-1 rounded-full" style={{background:'var(--border)'}}/></div>}
                      </td>
                    ))}
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div className="flex gap-2 mt-5"><Button>Save Changes</Button><Button variant="ghost">Reset to Default</Button></div>
          </Card>
        </div>
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title="Create New Role"
        footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={()=>{if(newName){setRoles(r=>[...r,{id:Date.now(),name:newName,color:COLOR.secondary,users:0,desc:'Custom role',perms:{dashboard:['view'],users:[],content:[],analytics:[],settings:[],billing:[],api:[]}}]);setModal(false);setNewName('')}}}>Create Role</Button></>}>
        <Input label="Role Name" value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Content Manager"/>
      </Modal>
    </>
  )
}
