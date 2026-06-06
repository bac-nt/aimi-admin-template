'use client'
import { useState } from 'react'
import { PageBanner, Card, Button, Select } from '@/components/ui'
import { Sparkles, Download, RefreshCw, ImageIcon } from 'lucide-react'

const DEMO_IMAGES = [
  'https://picsum.photos/seed/ai1/512/512', 'https://picsum.photos/seed/ai2/512/512',
  'https://picsum.photos/seed/ai3/512/512', 'https://picsum.photos/seed/ai4/512/512',
]

const STYLES   = ['Photorealistic','Digital Art','Oil Painting','Watercolor','Sketch','3D Render','Anime','Minimalist']
const SIZES    = ['512×512','768×768','1024×1024','1024×768','768×1024']
const EXAMPLES = ['A serene mountain lake at sunset','Futuristic city skyline at night','Cozy coffee shop interior','Abstract colorful geometric patterns']

export default function ImageGenPage() {
  const [prompt,   setPrompt]  = useState('')
  const [style,    setStyle]   = useState('Photorealistic')
  const [size,     setSize]    = useState('512×512')
  const [images,   setImages]  = useState<string[]>([])
  const [loading,  setLoading] = useState(false)
  const [selected, setSelected]= useState<string|null>(null)

  const generate = () => {
    if (!prompt.trim()) return
    setLoading(true)
    setTimeout(()=>{
      setImages(DEMO_IMAGES.map((_,i)=>`https://picsum.photos/seed/${prompt.replace(/ /g,'')}${i}/512/512`))
      setLoading(false)
    }, 2000)
  }

  return (
    <>
      <PageBanner title="AI Image Generator" breadcrumbs={[{label:'Home',href:'/'},{label:'Image Generator'}]}
        description="Generate stunning images from text prompts using AI"/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Settings */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold mb-4" style={{color:'var(--foreground)'}}>Prompt</h3>
            <textarea rows={4} value={prompt} onChange={e=>setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate…" className="field w-full resize-none mb-3"/>
            <p className="text-xs font-semibold mb-2" style={{color:'var(--muted)'}}>Examples:</p>
            <div className="space-y-1.5">
              {EXAMPLES.map(e=>(
                <button key={e} type="button" onClick={()=>setPrompt(e)} className="w-full text-left text-xs px-2.5 py-2 rounded-lg hover:bg-[var(--surface)] transition-colors truncate" style={{color:'var(--muted)'}}>{e}</button>
              ))}
            </div>
          </Card>
          <Card>
            <div className="space-y-3">
              <Select label="Style" value={style} onChange={e=>setStyle(e.target.value)} options={STYLES.map(v=>({value:v,label:v}))}/>
              <Select label="Size" value={size} onChange={e=>setSize(e.target.value)} options={SIZES.map(v=>({value:v,label:v}))}/>
            </div>
          </Card>
          <Button className="w-full" loading={loading} onClick={generate}>
            <Sparkles size={14}/>Generate Images
          </Button>
        </div>

        {/* Results */}
        <div className="xl:col-span-2">
          {images.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {images.map((img,i)=>(
                  <div key={i} onClick={()=>setSelected(img)}
                    className="aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:shadow-lg"
                    style={{borderColor:selected===img?'var(--primary)':'transparent'}}>
                    <img src={img} alt={`Generated ${i+1}`} className="w-full h-full object-cover"/>
                  </div>
                ))}
              </div>
              {selected&&(
                <div className="flex gap-2 justify-center">
                  <Button variant="outline"><Download size={14}/>Download</Button>
                  <Button variant="ghost" onClick={generate}><RefreshCw size={14}/>Regenerate</Button>
                </div>
              )}
            </>
          ) : (
            <div className="h-full min-h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center" style={{borderColor:'var(--border)'}}>
              {loading ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{background:'var(--primary-light)'}}><Sparkles size={28} style={{color:'var(--primary)'}}/></div>
                  <p className="font-semibold" style={{color:'var(--foreground)'}}>Generating your images…</p>
                  <p className="text-xs mt-1" style={{color:'var(--muted)'}}>This usually takes 5-15 seconds</p>
                  <div className="flex gap-1.5 justify-center mt-3">{[0,1,2].map(i=><div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{background:'var(--primary)',animationDelay:`${i*150}ms`}}/>)}</div>
                </div>
              ) : (
                <div className="text-center px-8">
                  <ImageIcon size={40} className="mx-auto mb-3" style={{color:'var(--border)'}}/>
                  <p className="font-semibold" style={{color:'var(--muted)'}}>Your generated images will appear here</p>
                  <p className="text-xs mt-1" style={{color:'var(--muted)'}}>Enter a prompt and click Generate</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
