'use client'
import { Avatar, Badge, Button, Card, PageBanner, SearchBar } from '@/components/ui'
import { CONTACTS } from '@/lib/data'
import { Search, UserPlus, Check } from 'lucide-react'
import { useState } from 'react'

export default function FollowersPage() {
  const [search, setSearch] = useState('')
  const [following, setFollowing] = useState<number[]>([1,3,5])

  const people = CONTACTS.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <PageBanner title="Followers" breadcrumbs={[{label:'Home',href:'/'},{label:'Users'},{label:'Followers'}]}
        description="People you are connected with"/>
      <SearchBar value={search} onChange={setSearch} placeholder="Search…"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {people.map(p=>(
          <Card key={p.id} className="text-center hover:shadow-md transition-all hover:-translate-y-0.5">
            <Avatar name={p.name} size={56} color="var(--primary)" className="mx-auto mb-3"/>
            <h3 className="font-bold text-sm" style={{color:'var(--foreground)'}}> {p.name}</h3>
            <p className="text-xs mb-3" style={{color:'var(--muted)'}}> {p.role} · {p.company}</p>
            <Button size="sm" variant={following.includes(p.id)?'outline':'primary'} className="w-full"
              onClick={()=>setFollowing(f=>f.includes(p.id)?f.filter(x=>x!==p.id):[...f,p.id])}>
              {following.includes(p.id)?<><Check size={12}/> Following</>:<><UserPlus size={12}/> Follow</>}
            </Button>
          </Card>
        ))}
      </div>
    </>
  )
}
