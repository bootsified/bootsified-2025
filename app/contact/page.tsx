import TextBlock from '@/components/TextBlock'
import Schema from '@/components/Schema'
import { SITE_PUBLIC_URL, SEO_DEFAULT_IMAGE } from '@/utils/constants'
import Contact from '@/components/Contact'

const pageTitle = ''
const pageDescription = ''
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
			<TextBlock padBottom='2em' padTop='1em'>
				<h1>Let me hear from you</h1>
			</TextBlock>
			<Contact />
		</>
  )
}

export default ContactPage