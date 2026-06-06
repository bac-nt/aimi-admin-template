'use client'
/**
 * IAM – Identity & Access Management
 * Unified page: Roles, Members, Security, Audit Log
 */
import { PageBanner, Card, CardHeader, Badge, Button, Modal, Input, Tabs, Toggle, Progress } from '@/components/ui'
import {
  Shield, Check, X, Plus, Edit, Trash2, Search,
  AlertTriangle, Clock, Monitor, Smartphone, Download, UserCheck,
  UserX, Crown, Zap, Star, Eye,
} from 'lucide-react'
import { useState } from 'react'
import { COLOR } from '@/config/tokens'

type Permission = 'read'|'write'|'delete'|'publish'|'export'|'admin'

interface Role {
  id: string; name: string; color: string; icon: React.ElementType
  desc: string; userCount: number; isSystem: boolean
  permissions: Record<string, Permission[]>
}

interface IAMUser {
  id: number; name: string; email: string; role: string
  status: 'active'|'inactive'|'suspended'|'invited'
  lastLogin: string; mfa: boolean; sessions: number
}

const MODULES: Record<string, { label: string; icon: string; perms: readonly Permission[] }> = {
  dashboard: { label:'Dashboard',  icon:'📊', perms:['read']                                    },
  users:     { label:'Users',       icon:'👥', perms:['read','write','delete','admin']          },
  content:   { label:'Blog / CMS',  icon:'📝', perms:['read','write','delete','publish']        },
  ecommerce: { label:'Ecommerce',   icon:'🛒', perms:['read','write','delete','publish','export'] },
  analytics: { label:'Analytics',  icon:'📈', perms:['read','export']                          },
  settings:  { label:'Settings',   icon:'⚙️', perms:['read','write','admin']                  },
  billing:   { label:'Billing',    icon:'💳', perms:['read','write','admin']                  },
  api:       { label:'API Keys',   icon:'🔑', perms:['read','write','delete','admin']          },
  iam:       { label:'IAM',        icon:'🛡️', perms:['read','write','admin']                  },
  media:     { label:'Media',      icon:'🖼️', perms:['read','write','delete']                 },
}

const P: Record<Permission,{label:string;color:string}> = {
  read:    {label:'Read',    color:'var(--primary)'   },
  write:   {label:'Write',   color:'var(--secondary)' },
  delete:  {label:'Delete',  color:'var(--error)'     },
  publish: {label:'Publish', color:'var(--success)'   },
  export:  {label:'Export',  color:'var(--warning)'   },
  admin:   {label:'Admin',   color:'var(--purple)'    },
}
const ALL_PERMS: Permission[] = ['read','write','delete','publish','export','admin']

const INIT_ROLES: Role[] = [
  { id:'super_admin', name:'Super Admin',    color:COLOR.error,     icon:Crown,  isSystem:true,  desc:'Unrestricted access.',               userCount:1,
    permissions: Object.fromEntries(Object.keys(MODULES).map(k=>[k,[...MODULES[k].perms]])) },
  { id:'admin',       name:'Administrator',  color:COLOR.primary,   icon:Shield, isSystem:true,  desc:'Full management except billing admin.',userCount:3,
    permissions:{ dashboard:['read'],users:['read','write','delete'],content:['read','write','delete','publish'],ecommerce:['read','write','delete','publish','export'],analytics:['read','export'],settings:['read','write'],billing:['read'],api:['read','write','delete'],iam:['read'],media:['read','write','delete'] } },
  { id:'manager',     name:'Manager',         color:COLOR.secondary, icon:Star,   isSystem:true,  desc:'Manage team, content and orders.',     userCount:8,
    permissions:{ dashboard:['read'],users:['read','write'],content:['read','write','delete','publish'],ecommerce:['read','write','delete'],analytics:['read','export'],settings:['read'],billing:[],api:['read'],iam:[],media:['read','write','delete'] } },
  { id:'editor',      name:'Editor',           color:COLOR.warning,   icon:Zap,    isSystem:true,  desc:'Content creation and publishing.',     userCount:12,
    permissions:{ dashboard:['read'],users:['read'],content:['read','write','publish'],ecommerce:['read'],analytics:['read'],settings:[],billing:[],api:[],iam:[],media:['read','write'] } },
  { id:'viewer',      name:'Viewer',            color:'#7c8fac',       icon:Eye,    isSystem:true,  desc:'Read-only access.',                    userCount:24,
    permissions:{ dashboard:['read'],users:[],content:['read'],ecommerce:['read'],analytics:['read'],settings:[],billing:[],api:[],iam:[],media:['read'] } },
]

const INIT_USERS: IAMUser[] = [
  {id:1,name:'Mathew Anderson',email:'admin@modernize.com',  role:'super_admin',status:'active',    lastLogin:'Just now',   mfa:true, sessions:2},
  {id:2,name:'Andrew McDown',  email:'andrew@pm.com',        role:'admin',      status:'active',    lastLogin:'2 min ago',  mfa:true, sessions:1},
  {id:3,name:'Bhavesh Patel',  email:'b.patel@web.com',      role:'manager',    status:'active',    lastLogin:'1 hr ago',   mfa:false,sessions:1},
  {id:4,name:'Nirav Joshi',    email:'nirav@dev.com',         role:'editor',     status:'active',    lastLogin:'3 hr ago',   mfa:true, sessions:1},
  {id:5,name:'Lara Croft',     email:'lara@design.io',        role:'editor',     status:'active',    lastLogin:'Yesterday',  mfa:false,sessions:0},
  {id:6,name:'Sofia Martinez', email:'sofia@growth.io',       role:'viewer',     status:'active',    lastLogin:'3 days ago', mfa:false,sessions:0},
  {id:7,name:'John Deo',       email:'john@cloud.io',         role:'admin',      status:'suspended', lastLogin:'30 days ago',mfa:true, sessions:0},
  {id:8,name:'Micheal Doe',    email:'m.doe@content.co',      role:'editor',     status:'invited',   lastLogin:'Never',      mfa:false,sessions:0},
]

const AUDIT = [
  {id:1,action:'Login',             user:'Mathew Anderson',ip:'192.168.1.1', device:'Chrome / macOS', time:'Just now',   ok:true },
  {id:2,action:'Permission Changed',user:'Andrew McDown',  ip:'10.0.0.15',   device:'Safari / iPhone',time:'5 min ago',  ok:true },
  {id:3,action:'User Suspended',    user:'John Deo',       ip:'192.168.1.55',device:'Firefox / Win',  time:'30 min ago', ok:null },
  {id:4,action:'Failed Login ×3',   user:'unknown@spam',   ip:'45.33.21.8',  device:'Bot',            time:'1 hr ago',   ok:false},
  {id:5,action:'API Key Created',   user:'Bhavesh Patel',  ip:'10.0.0.22',   device:'Chrome / macOS', time:'2 hr ago',   ok:true },
  {id:6,action:'Role Changed',      user:'Nirav Joshi',    ip:'192.168.1.10',device:'Chrome / Linux', time:'Yesterday',  ok:true },
]

const STATUS_V: Record<string,'success'|'warning'|'error'|'muted'> = {
  active:'success',invited:'warning',suspended:'error',inactive:'muted'
}

function Initials({name,size=32}:{name:string;size?:number}) {
  const i = name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)
  return (
    <div className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{width:size,height:size,background:'var(--primary)',fontSize:size*0.35}}>{i}</div>
  )
}

export default function IAMPage() {
  const [roles,   setRoles]  = useState<Role[]>(INIT_ROLES)
  const [users,   setUsers]  = useState<IAMUser[]>(INIT_USERS)
  const [sel,     setSel]    = useState<Role>(INIT_ROLES[0])
  const [search,  setSearch] = useState('')
  const [invMod,  setInvMod] = useState(false)
  const [email,   setEmail]  = useState('')
  const [iRole,   setIRole]  = useState('editor')
  const [mfa,     setMfa]    = useState(true)
  const [timeout, setTo]     = useState(true)
  const [ip,      setIp]     = useState(false)

  const togglePerm = (mod:string, perm:Permission) => {
    setRoles(rs=>rs.map(r=>{
      if(r.id!==sel.id) return r
      const curr = (r.permissions[mod]||[]) as Permission[]
      const next = curr.includes(perm)?curr.filter(p=>p!==perm):[...curr,perm]
      const u = {...r,permissions:{...r.permissions,[mod]:next}}
      setSel(u); return u
    }))
  }

  const invite = () => {
    if(!email.trim()) return
    setUsers(us=>[...us,{id:Date.now(),name:email.split('@')[0],email,role:iRole,status:'invited',lastLogin:'Never',mfa:false,sessions:0}])
    setEmail(''); setInvMod(false)
  }

  const mfaPct = Math.round(users.filter(u=>u.mfa).length/users.length*100)
  const filtered = users.filter(u=>u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase()))

  const TABS = [
    { label:'Roles & Permissions', content:(
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Role list */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}> Roles</h3>
            <Button size="sm" variant="outline"><Plus size={11}/>New</Button>
          </div>
          {roles.map(r=>{
            const Icon=r.icon
            return (
              <button key={r.id} type="button" onClick={()=>setSel(r)}
                className="w-full p-3 rounded-xl border text-left transition-all hover:shadow-sm"
                style={sel.id===r.id?{borderColor:r.color,borderWidth:2,background:r.color+'08'}:{borderColor:'var(--border)'}}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{background:r.color}}><Icon size={14}/></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-xs truncate" style={{color:'var(--foreground)'}}>{r.name}</p>
                      {r.isSystem&&<span className="text-[9px] px-1 py-0.5 rounded" style={{background:'var(--surface)',color:'var(--muted)'}}>SYS</span>}
                    </div>
                    <p className="text-[10px]" style={{color:'var(--muted)'}}>{r.userCount} users</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        {/* Permission matrix */}
        <div className="xl:col-span-3">
          <Card>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{borderColor:'var(--border)'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background:sel.color}}><sel.icon size={20}/></div>
              <div className="flex-1">
                <h3 className="font-bold" style={{color:'var(--foreground)'}}>{sel.name}</h3>
                <p className="text-xs" style={{color:'var(--muted)'}}>{sel.desc}</p>
                <div className="flex gap-1.5 mt-1">
                  <Badge variant="muted">{sel.userCount} users</Badge>
                  {sel.isSystem&&<Badge variant="secondary">System — read only</Badge>}
                </div>
              </div>
              {!sel.isSystem&&<Button size="sm" variant="outline"><Edit size={12}/>Edit Role</Button>}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
              {ALL_PERMS.map(p=>(
                <div key={p} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{background:P[p].color}}/><span style={{color:'var(--foreground)'}}>{P[p].label}</span>
                </div>
              ))}
            </div>
            {/* Matrix */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
                  <th className="text-left pb-2.5 text-xs font-bold uppercase pr-4" style={{color:'var(--muted)',minWidth:140}}>Module</th>
                  {ALL_PERMS.map(p=>(
                    <th key={p} className="pb-2.5 text-xs font-bold text-center px-2" style={{color:P[p].color,minWidth:52}}>{P[p].label}</th>
                  ))}
                  <th className="pb-2.5 text-xs font-bold text-center px-2" style={{color:'var(--muted)',minWidth:52}}>All</th>
                </tr></thead>
                <tbody>
                  {Object.entries(MODULES).map(([key,mod])=>{
                    const curr=(sel.permissions[key]||[]) as Permission[]
                    const grantable=mod.perms as readonly Permission[]
                    const allGranted=grantable.every(p=>curr.includes(p))
                    return (
                      <tr key={key} className="border-b hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.5)'}}>
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-2"><span className="text-base">{mod.icon}</span><span className="font-medium text-sm" style={{color:'var(--foreground)'}}>{mod.label}</span></div>
                        </td>
                        {ALL_PERMS.map(perm=>{
                          const avail=grantable.includes(perm)
                          const has=curr.includes(perm)
                          if(!avail) return <td key={perm} className="px-2 py-2.5 text-center"><span className="inline-block w-1.5 h-1.5 rounded-full" style={{background:'var(--border)'}}/></td>
                          return (
                            <td key={perm} className="px-2 py-2.5 text-center">
                              <button type="button" disabled={sel.isSystem} onClick={()=>togglePerm(key,perm)}
                                className="w-6 h-6 rounded border-2 flex items-center justify-center mx-auto transition-all"
                                style={{background:has?P[perm].color:'transparent',borderColor:has?P[perm].color:'var(--border)',cursor:sel.isSystem?'not-allowed':'pointer',opacity:sel.isSystem?0.7:1}}>
                                {has&&<Check size={11} className="text-white"/>}
                              </button>
                            </td>
                          )
                        })}
                        <td className="py-2.5 text-center px-2">
                          <button type="button" disabled={sel.isSystem}
                            onClick={()=>{
                              if(sel.isSystem) return
                              const next=allGranted?[]:[...grantable]
                              setRoles(rs=>rs.map(r=>{ if(r.id!==sel.id) return r; const u={...r,permissions:{...r.permissions,[key]:next}}; setSel(u); return u }))
                            }}
                            className="w-6 h-6 rounded border-2 flex items-center justify-center mx-auto transition-all"
                            style={{background:allGranted?'var(--foreground)':'transparent',borderColor:allGranted?'var(--foreground)':'var(--border)',cursor:sel.isSystem?'not-allowed':'pointer',opacity:sel.isSystem?0.4:1}}>
                            {allGranted&&<Check size={11} className="text-white"/>}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {!sel.isSystem&&(
              <div className="flex gap-2 mt-4 pt-4 border-t" style={{borderColor:'var(--border)'}}>
                <Button>Save Permissions</Button>
                <Button variant="ghost">Reset</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    )},
    { label:`Members (${users.length})`, content:(
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border flex-1 max-w-xs" style={{background:'var(--card)',borderColor:'var(--border)'}}>
            <Search size={14} style={{color:'var(--muted)'}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search members…" className="bg-transparent text-sm outline-none w-full" style={{color:'var(--foreground)'}}/>
          </div>
          <Button size="sm" className="ml-auto" onClick={()=>setInvMod(true)}><Plus size={14}/>Invite Member</Button>
        </div>
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr style={{borderBottom:'1px solid var(--border)'}}>
                {['User','Role','Status','Last Login','MFA','Actions'].map(h=>(
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase whitespace-nowrap" style={{color:'var(--muted)',background:'var(--surface)'}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.map(u=>{
                  const role=roles.find(r=>r.id===u.role)
                  const RIcon=role?.icon||Shield
                  return (
                    <tr key={u.id} className="border-b hover:bg-[var(--surface)] transition-colors" style={{borderColor:'rgba(232,237,242,0.7)'}}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Initials name={u.name} size={32}/>
                          <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{u.name}</p><p className="text-xs" style={{color:'var(--muted)'}}>{u.email}</p></div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {role&&<div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded flex items-center justify-center text-white flex-shrink-0" style={{background:role.color}}><RIcon size={11}/></div>
                          <span className="text-xs font-semibold" style={{color:'var(--foreground)'}}>{role.name}</span>
                        </div>}
                      </td>
                      <td className="px-5 py-3.5"><Badge variant={STATUS_V[u.status]} dot className="capitalize">{u.status}</Badge></td>
                      <td className="px-5 py-3.5"><div className="flex items-center gap-1 text-xs" style={{color:'var(--muted)'}}><Clock size={11}/>{u.lastLogin}</div></td>
                      <td className="px-5 py-3.5"><div className={`flex items-center gap-1 text-xs font-semibold ${u.mfa?'text-[var(--success)]':'text-[var(--error)]'}`}>{u.mfa?<><Check size={12}/>On</>:<><X size={12}/>Off</>}</div></td>
                      <td className="px-5 py-3.5"><div className="flex gap-1">
                        <button type="button" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-colors" style={{color:'var(--muted)'}}><Edit size={12}/></button>
                        {u.status!=='suspended'
                          ?<button type="button" onClick={()=>setUsers(us=>us.map(x=>x.id===u.id?{...x,status:'suspended' as const}:x))} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--warning-light)] hover:text-[var(--warning)] transition-colors" style={{color:'var(--muted)'}}><UserX size={12}/></button>
                          :<button type="button" onClick={()=>setUsers(us=>us.map(x=>x.id===u.id?{...x,status:'active' as const}:x))} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--success-light)] hover:text-[var(--success)] transition-colors" style={{color:'var(--muted)'}}><UserCheck size={12}/></button>
                        }
                        {u.role!=='super_admin'&&<button type="button" onClick={()=>setUsers(us=>us.filter(x=>x.id!==u.id))} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--error-light)] hover:text-[var(--error)] transition-colors" style={{color:'var(--muted)'}}><Trash2 size={12}/></button>}
                      </div></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )},
    { label:'Security', content:(
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Authentication Policies"/>
          <div className="space-y-3">
            {[{l:'Require MFA',s:'Enforce 2FA org-wide',v:mfa,fn:setMfa},{l:'Session timeout',s:'Auto-logout 30 min',v:timeout,fn:setTo},{l:'IP Whitelist',s:'Restrict specific IPs',v:ip,fn:setIp},{l:'Single Sign-On',s:'SAML/OIDC provider',v:false,fn:()=>{}}].map((item,i)=>(
              <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border" style={{borderColor:'var(--border)'}}>
                <div><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{item.l}</p><p className="text-xs" style={{color:'var(--muted)'}}>{item.s}</p></div>
                <Toggle checked={item.v} onChange={item.fn} size="sm"/>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="MFA Coverage"/>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2"><span style={{color:'var(--foreground)'}}>Coverage</span><span className="font-bold" style={{color:mfaPct>=70?COLOR.success:COLOR.warning}}>{mfaPct}%</span></div>
            <Progress value={mfaPct} color={mfaPct>=70?COLOR.success:COLOR.warning} height={8}/>
            <p className="text-xs mt-1" style={{color:'var(--muted)'}}>{users.filter(u=>u.mfa).length} of {users.length} users have MFA</p>
          </div>
          {users.filter(u=>!u.mfa&&u.status==='active').length>0&&(
            <div className="space-y-2">
              {users.filter(u=>!u.mfa&&u.status==='active').map(u=>(
                <div key={u.id} className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{background:'var(--warning-light)'}}>
                  <Initials name={u.name} size={28}/>
                  <p className="text-xs font-semibold flex-1 truncate" style={{color:'var(--foreground)'}}>{u.name}</p>
                  <button type="button" className="text-[10px] font-bold px-2 py-1 rounded-md text-white" style={{background:'var(--warning)'}}>Nudge</button>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card>
          <CardHeader title="Password Policy"/>
          {[{l:'Min 8 chars',ok:true},{l:'Uppercase required',ok:true},{l:'Number required',ok:true},{l:'Special character',ok:false},{l:'No reuse of last 5',ok:true},{l:'Expires every 90d',ok:false}].map((p,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0" style={{borderColor:'var(--border)'}}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{background:p.ok?'var(--success)':'var(--border)'}}>
                {p.ok&&<Check size={11} className="text-white"/>}
              </div>
              <span className="text-sm flex-1" style={{color:'var(--foreground)'}}>{p.l}</span>
              <Toggle checked={p.ok} onChange={()=>{}} size="sm"/>
            </div>
          ))}
        </Card>
        <Card>
          <CardHeader title="Active Sessions"/>
          {[{user:'Mathew Anderson',device:'Chrome / macOS',loc:'San Francisco',time:'Now',D:Monitor},{user:'Mathew Anderson',device:'Safari / iPhone',loc:'San Francisco',time:'10m ago',D:Smartphone},{user:'Andrew McDown',device:'Chrome / Windows',loc:'New York',time:'2m ago',D:Monitor}].map((s,i)=>(
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border mb-3 last:mb-0" style={{borderColor:'var(--border)'}}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'var(--surface)'}}><s.D size={16} style={{color:'var(--muted)'}}/></div>
              <div className="flex-1 min-w-0"><p className="font-semibold text-xs" style={{color:'var(--foreground)'}}>{s.user}</p><p className="text-[10px]" style={{color:'var(--muted)'}}>{s.device} · {s.loc} · {s.time}</p></div>
              <button type="button" className="text-[10px] font-semibold px-2 py-1 rounded-md border hover:bg-[var(--error-light)] hover:text-[var(--error)]" style={{borderColor:'var(--border)',color:'var(--muted)'}}>Revoke</button>
            </div>
          ))}
        </Card>
      </div>
    )},
    { label:'Audit Log', content:(
      <Card padding={false}>
        <div className="p-4 border-b flex items-center justify-between" style={{borderColor:'var(--border)'}}>
          <h3 className="font-bold" style={{color:'var(--foreground)'}}>Security Events</h3>
          <Button variant="ghost" size="sm"><Download size={13}/>Export CSV</Button>
        </div>
        <div className="divide-y" style={{borderColor:'var(--border)'}}>
          {AUDIT.map(log=>(
            <div key={log.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--surface)] transition-colors">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:log.ok===true?'var(--success)':log.ok===false?'var(--error)':'var(--warning)'}}/>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{log.action}</p>
                <div className="flex flex-wrap gap-3 text-xs mt-0.5" style={{color:'var(--muted)'}}><span>{log.user}</span><span>·</span><span>{log.ip}</span><span>·</span><span>{log.device}</span></div>
              </div>
              <div className="text-xs flex items-center gap-1 flex-shrink-0" style={{color:'var(--muted)'}}><Clock size={11}/>{log.time}</div>
              <Badge variant={log.ok===true?'success':log.ok===false?'error':'warning'} className="text-[10px] flex-shrink-0">{log.ok===true?'ok':log.ok===false?'blocked':'warn'}</Badge>
            </div>
          ))}
        </div>
        <div className="p-4 border-t text-center" style={{borderColor:'var(--border)'}}>
          <button type="button" className="text-sm font-semibold hover:opacity-70" style={{color:'var(--primary)'}}>Load more</button>
        </div>
      </Card>
    )},
  ]

  return (
    <>
      <PageBanner title="IAM & Access" breadcrumbs={[{label:'Home',href:'/'},{label:'Administration'},{label:'IAM & Access'}]} description="Roles, permissions, members and security — all in one place"/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[{l:'Total Members',v:users.length,c:COLOR.primary},{l:'Active',v:users.filter(u=>u.status==='active').length,c:COLOR.success},{l:'Roles',v:roles.length,c:COLOR.secondary},{l:'MFA Coverage',v:`${mfaPct}%`,c:mfaPct>=70?COLOR.success:COLOR.warning}].map(s=>(
          <Card key={s.l}><p className="text-xs font-medium mb-1" style={{color:'var(--muted)'}}>{s.l}</p><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p></Card>
        ))}
      </div>
      {users.filter(u=>!u.mfa&&u.status==='active').length>0&&(
        <div className="flex items-start gap-3 p-4 rounded-2xl mb-5 border" style={{background:'var(--warning-light)',borderColor:'var(--warning)44'}}>
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{color:'var(--warning)'}}/>
          <p className="text-sm" style={{color:'var(--muted)'}}><strong style={{color:'var(--warning)'}}>{users.filter(u=>!u.mfa&&u.status==='active').length} users</strong> have MFA disabled.</p>
        </div>
      )}
      <Tabs items={TABS} variant="card"/>
      <Modal open={invMod} onClose={()=>setInvMod(false)} title="Invite Team Member"
        footer={<><Button variant="ghost" onClick={()=>setInvMod(false)}>Cancel</Button><Button onClick={invite}>Send Invitation</Button></>}>
        <div className="space-y-4">
          <Input label="Email *" type="email" placeholder="colleague@company.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{color:'var(--foreground)'}}>Assign Role</label>
            <div className="space-y-2">
              {roles.filter(r=>r.id!=='super_admin').map(r=>{
                const RIcon=r.icon
                return (
                  <button key={r.id} type="button" onClick={()=>setIRole(r.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all"
                    style={{borderColor:iRole===r.id?r.color:'var(--border)',background:iRole===r.id?r.color+'11':undefined}}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{background:r.color}}><RIcon size={14}/></div>
                    <div className="flex-1 min-w-0"><p className="font-semibold text-sm" style={{color:'var(--foreground)'}}>{r.name}</p><p className="text-xs truncate" style={{color:'var(--muted)'}}>{r.desc}</p></div>
                    {iRole===r.id&&<Check size={16} style={{color:r.color}}/>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
