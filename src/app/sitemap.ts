import { MetadataRoute } from 'next'
import { SITE } from '@/config/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    { path: '/pages/homepage',    priority: 1.0,  changeFreq: 'monthly'  as const },
    { path: '/pages/pricing',     priority: 0.9,  changeFreq: 'monthly'  as const },
    { path: '/pages/about',       priority: 0.8,  changeFreq: 'monthly'  as const },
    { path: '/pages/contact',     priority: 0.8,  changeFreq: 'monthly'  as const },
    { path: '/pages/blog',        priority: 0.8,  changeFreq: 'weekly'   as const },
    { path: '/pages/portfolio',   priority: 0.7,  changeFreq: 'monthly'  as const },
    { path: '/pages/integrations',priority: 0.7,  changeFreq: 'monthly'  as const },
    { path: '/pages/faq',         priority: 0.6,  changeFreq: 'monthly'  as const },
  ]

  return publicPages.map(page => ({
    url:          `${SITE.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority:     page.priority,
  }))
}
