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
export const SEO_DEFAULT_IMAGE = `${SITE_PUBLIC_URL}/images/bootsified-seo.jpg`

// Social Media
export const BLUESKY_HANDLE = 'bootsified.bsky.social'
export const BLUESKY_URL = `https://bsky.app/profile/${BLUESKY_HANDLE}`
export const GITHUB_HANDLE = 'bootsified'
export const GITHUB_URL = `https://github.com/${GITHUB_HANDLE}`
export const LINKEDIN_HANDLE = 'boots-highland'
export const LINKEDIN_URL = `https://www.linkedin.com/in/${LINKEDIN_HANDLE}/`

// Schema.org canonical domain (use boots.dev as canonical)
const SCHEMA_BASE_URL = `https://${SITE_PUBLIC_DOMAIN}`

// Schema.org Person
export const PERSON_SCHEMA = {
  '@type': 'Person',
  '@id': `${SCHEMA_BASE_URL}/#person`,
  name: 'John Highland',
  alternateName: 'John "Boots" Highland',
  jobTitle: ['Front-End Developer', 'Web Developer', 'Musician'],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'WA',
    addressCountry: 'US'
  },
  homeLocation: {
    '@type': 'Place',
    name: 'Seattle area'
  },
  url: SCHEMA_BASE_URL,
  sameAs: [
    LINKEDIN_URL,
    GITHUB_URL,
    BLUESKY_URL
  ]
}

// Schema.org WebSite
export const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${SCHEMA_BASE_URL}/#website`,
  url: SCHEMA_BASE_URL,
  name: SITE_NAME,
  inLanguage: 'en-US',
  publisher: { '@id': `${SCHEMA_BASE_URL}/#person` }
}