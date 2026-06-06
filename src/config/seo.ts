/**
 * SEO Configuration — centralized metadata for all pages
 * Next.js 16 Metadata API (generateMetadata per page or static export)
 */

export const SITE = {
  name:        'Modernize Admin',
  tagline:     'Professional Next.js 16 Admin Dashboard',
  description: 'Modernize Admin is a professional, fully-featured admin dashboard built with Next.js 16, React 19, TypeScript, and Tailwind CSS. 90+ components, dark mode, and full SEO support.',
  url:         'https://modernize-admin.vercel.app',
  twitter:     '@modernizeadmin',
  ogImage:     '/og-image.png',
  locale:      'en_US',
  themeColor:  '#5d87ff',
} as const

/** Generate metadata for a page */
export function seoMeta(opts: {
  title:       string
  description?: string
  path?:        string
  noIndex?:     boolean
}) {
  const description = opts.description ?? SITE.description
  const url         = opts.path ? `${SITE.url}${opts.path}` : SITE.url

  return {
    title: opts.title,
    description,
    ...(opts.noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title:       `${opts.title} | ${SITE.name}`,
      description,
      url,
      siteName:    SITE.name,
      locale:      SITE.locale,
      type:        'website' as const,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card:        'summary_large_image' as const,
      title:       `${opts.title} | ${SITE.name}`,
      description,
      creator:     SITE.twitter,
      images:      [SITE.ogImage],
    },
    alternates: { canonical: url },
  }
}
