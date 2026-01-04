// Fallback to localhost if NEXT_PUBLIC_URL is empty or just 'https://'
const rawUrl = process.env.NEXT_PUBLIC_URL as string
export const SITE_URL: string = (rawUrl && rawUrl !== 'https://' && rawUrl !== 'https://') 
  ? rawUrl 
  : 'http://localhost:3000'

export const SITE_NAME = 'John "Boots" Highland'
export const SITE_NAME_SHORT = 'Boots!!!'

export const SITE_PUBLIC_DOMAIN = 'boots.dev'
export const SITE_PUBLIC_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_PUBLIC_DOMAIN}`

export const SEO_DEFAULT_TITLE = `Front-End Developer & Musician | ${SITE_NAME} Portfolio`
export const SEO_DEFAULT_DESCRIPTION = 'Front-end developer and lifelong musician building accessible, responsive web interfaces with care, rhythm, and attention to detail.'
export const SEO_DEFAULT_IMAGE = `${SITE_PUBLIC_URL}/images/bootsified-seo.png`