import TextBlock from '@/components/TextBlock'
import Schema from '@/components/Schema'
import { SITE_PUBLIC_URL, SEO_DEFAULT_IMAGE, SITE_NAME } from '@/utils/constants'
import Contact from '@/components/Contact'
import { PageHandleSetter } from '@/components/PageHandleSetter'

const pageTitle = `Contact | ${SITE_NAME}, Front-End Developer`
const pageDescription = 'Get in touch regarding front-end development roles, collaborations, or thoughtful creative opportunities.'
const pageURL = `${SITE_PUBLIC_URL}/contact`

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
		<div className="fadeIn">
			<PageHandleSetter handle="contact" />
			<Schema
				data={[
					{
						'@context': 'https://schema.org',
						'@type': 'ContactPage',
						'@id': 'https://boots.dev/contact#webpage',
						url: 'https://boots.dev/contact',
						name: pageTitle,
						description: pageDescription,
						about: { '@id': 'https://boots.dev/#person' },
						isPartOf: { '@id': 'https://boots.dev/#website' },
						inLanguage: 'en-US'
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boots.dev/' },
							{ '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://boots.dev/contact' }
						]
					}
				]}
			/>
			<h1 className='srOnly'>Contact</h1>
			<TextBlock padBottom='2em' padTop='1em'>
				<h2 className='h1'>Let me hear from you</h2>
			</TextBlock>
			<Contact />
		</div>
  )
}

export default ContactPage