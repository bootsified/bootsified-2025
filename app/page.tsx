import TextBlock from '@/components/TextBlock'
import { SITE_PUBLIC_URL, SEO_DEFAULT_TITLE, SEO_DEFAULT_DESCRIPTION } from '@/utils/constants'
import Schema from '@/components/Schema'
import { spanBass, spanWeb, thisYear } from '@/utils/helpers'
import Link from 'next/link'
import Definition from '@/components/Definition'
import Intro from '@/components/Intro'
import ScrollDown from '@/components/ScrollDown'

export const metadata = {
  title: SEO_DEFAULT_TITLE,
  description: SEO_DEFAULT_DESCRIPTION,
  alternates: {
    canonical: SITE_PUBLIC_URL
  }
}

const HomePage = () => {
  return (
		<>
			{/* <Schema
				data={[
					{
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						'@id': `${SITE_PUBLIC_URL}#homepage`,
						url: SITE_PUBLIC_URL,
						name: 'The Highland Practice Home',
						description: SEO_DEFAULT_DESCRIPTION,
						isPartOf: { '@id': `${SITE_PUBLIC_URL}#website` },
						inLanguage: 'en-US'
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_PUBLIC_URL }
						]
					},
					{
						'@context': 'https://schema.org',
						'@type': 'ItemList',
						name: 'Therapy Services Overview',
						itemListElement: [
							{ '@type': 'Service', name: 'ADHD & Autism Therapy', url: `${SITE_PUBLIC_URL}/services#adhd-autism-therapy`, provider: { '@id': `${SITE_PUBLIC_URL}#practice` }, areaServed: ['US-WA','US-TX'] },
							{ '@type': 'Service', name: 'Trauma Therapy', url: `${SITE_PUBLIC_URL}/services#trauma-therapy`, provider: { '@id': `${SITE_PUBLIC_URL}#practice` }, areaServed: ['US-WA','US-TX'] },
							{ '@type': 'Service', name: 'Attachment & Relationship Work', url: `${SITE_PUBLIC_URL}/services#attachment-relationship-work`, provider: { '@id': `${SITE_PUBLIC_URL}#practice` }, areaServed: ['US-WA','US-TX'] },
							{ '@type': 'Service', name: 'Burnout & Life Transitions', url: `${SITE_PUBLIC_URL}/services#burnout-life-transitions`, provider: { '@id': `${SITE_PUBLIC_URL}#practice` }, areaServed: ['US-WA','US-TX'] },
							{ '@type': 'Service', name: 'Faith Transitions & Religious Trauma', url: `${SITE_PUBLIC_URL}/services#faith-transitions-religious-trauma`, provider: { '@id': `${SITE_PUBLIC_URL}#practice` }, areaServed: ['US-WA','US-TX'] }
						]
					}
				]}
			/> */}
			<h1 className='srOnly'>John &ldquo;Boots&rdquo; Highland</h1>
			<Definition />
			<ScrollDown />
			<Intro />
		</>
  )
}

export default HomePage