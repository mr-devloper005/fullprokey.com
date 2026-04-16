export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'fp9q2x7m4v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Full Pro Key',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Direct classifieds and buyer-ready posts',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A no-frills classified platform for practical offers, deals, and quick discovery.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'fullprokey.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fullprokey.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

