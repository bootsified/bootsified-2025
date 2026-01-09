import { SITE_PUBLIC_URL, SEO_DEFAULT_TITLE, SEO_DEFAULT_DESCRIPTION, SEO_DEFAULT_IMAGE } from '@/utils/constants'
import Schema from '@/components/Schema'
import Definition from '@/components/Definition'
import Intro from '@/components/Intro'
import FeaturedProjects from '@/components/FeaturedProjects'

export const metadata = {
	title: SEO_DEFAULT_TITLE,
	description: SEO_DEFAULT_DESCRIPTION,
	alternates: {
		canonical: SITE_PUBLIC_URL
	},
	twitter: {
		title: SEO_DEFAULT_TITLE,
		description: SEO_DEFAULT_DESCRIPTION,
		images: [SEO_DEFAULT_IMAGE], // Must be an absolute URL
	},
	openGraph: {
		title: SEO_DEFAULT_TITLE,
		description: SEO_DEFAULT_DESCRIPTION,
		url: SITE_PUBLIC_URL,
		images: [
			{
				url: SEO_DEFAULT_IMAGE, // Must be an absolute URL
				width: 1200,
				height: 630,
			},
		],
	},
}

const HomePage = () => {
  return (
		<article>
			<h1 className='srOnly'>John &ldquo;Boots&rdquo; Highland</h1>
			<Definition />
			<Intro />
			<FeaturedProjects />
		</article>
  )
}

export default HomePage