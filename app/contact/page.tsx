import TextBlock from '@/components/TextBlock'
import Schema from '@/components/Schema'
import { SITE_PUBLIC_URL, SEO_DEFAULT_IMAGE } from '@/utils/constants'
import Link from 'next/link'

const pageTitle = 'About The Highland Practice | Neurodivergent & Trauma-Informed Therapist'
const pageDescription = 'Neurodivergent therapist helping late-diagnosed ADHD/autistic adults heal trauma, religious wounds, perfectionism and burnout with insight + compassion.'
const pageURL = `${SITE_PUBLIC_URL}/about`

export const metadata = {
	title: pageTitle,
	description: pageDescription,
	alternates: {
		canonical: pageURL
	},
	twitter: {
		title: pageTitle,
		description: pageDescription,
		images: [SEO_DEFAULT_IMAGE], // Must be an absolute URL
	},
	openGraph: {
		title: pageTitle,
		description: pageDescription,
		url: pageURL,
		images: [
			{
				url: SEO_DEFAULT_IMAGE, // Must be an absolute URL
				width: 1200,
				height: 630,
			},
		],
	},
}

const ContactPage = () => {
  return (
		<>
			{/* <Schema
				data={{
					'@context': 'https://schema.org',
					'@type': 'AboutPage',
					'@id': `${pageURL}#webpage`,
					url: pageURL,
					name: pageTitle,
					description: pageDescription,
					isPartOf: { '@id': `${SITE_PUBLIC_URL}#website` },
					inLanguage: 'en-US',
					breadcrumb: {
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_PUBLIC_URL },
							{ '@type': 'ListItem', position: 2, name: 'About', item: pageURL }
						]
					}
				}}
			/> */}
			<h1 className='srOnly'>Contact Me</h1>
			<TextBlock padBottom='1em' padTop='0em' narrow>
				<h1>Let me hear from you...</h1>
				<p>
          My name is <strong>John Highland</strong>, but most people call me{' '}
          <strong>“Boots”</strong> - long story. I’m a web developer, musician, husband, and father
          of two awesome boys, currently living in the Seattle area. I was born in Cincinnati, OH,
          but my family moved to Dallas, TX, when I was two. In Dallas, I grew up, went to school,
          played in multiple bands, started a web developer career, found a wife, and birthed a
          couple sons. In 2023, we finally said goodbye to the brutal Texas Summers, and said hello
          to the Pacific Northwest. The new chapter begins...
        </p>
			</TextBlock>
		</>
  )
}

export default ContactPage