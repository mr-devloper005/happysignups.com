export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || '259b0233yz',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Happysignups',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Listing platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A listing site for Happysignups, built for clean discovery and structured publishing.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'happysignups.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://happysignups.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

