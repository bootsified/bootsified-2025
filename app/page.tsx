import HomeBuckets from '@/components/HomeBuckets'
import TextBlock from '@/components/TextBlock'
import { SITE_PUBLIC_URL, SEO_DEFAULT_TITLE, SEO_DEFAULT_DESCRIPTION } from '@/utils/constants'
import Schema from '@/components/Schema'
import Divider from '@/components/Divider'

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
			<TextBlock padBottom='1em' narrow>
        <h2 data-type="pageTitle">Therapy for the <em>high-functioning</em> adults who are&nbsp;secretly&nbsp;drowning.</h2>
				<p><strong>If you&rsquo;re the person everyone relies on, but you&rsquo;re running on fumes, replaying every conversation at 2am, and wondering why life feels harder for you than everyone else, you&rsquo;re in the right place.</strong></p>
				<p>I specialize in late-diagnosed ADHD and autism, trauma that won&rsquo;t stay in the past, and the exhaustion that comes from holding it all together for too long. You don&rsquo;t need another person telling you to &ldquo;just relax&rdquo; or &ldquo;try harder.&rdquo; You need someone who gets it and has the tools to help you actually feel different.</p>

			<h2>Who I work with</h2>
			<p>If your brain feels like 27 tabs open at once, or you keep replaying conversations at 2am wondering what you &ldquo;should have said;&rdquo; or you&rsquo;re holding it all together on the outside while falling apart on the inside, you&rsquo;re in the right place.</p>
			<p>I work with teens, adults, and seniors who look &ldquo;high-functioning&rdquo; but feel secretly overwhelmed. The over-functioners. The people everyone leans on. The ones who are starting to realize their brain works differently, or that the faith, family, or life they built doesn&rsquo;t fit anymore.</p>
				<p>Therapy here isn&rsquo;t about &ldquo;fixing&rdquo; you. It&rsquo;s about making sense of your story, quieting the noise, and finally feeling more at home in yourself.</p>
			</TextBlock>
			<Divider />
			<TextBlock padBottom='2em' padTop='1em'>
				<h2>What I specialize in</h2>
      </TextBlock>
			{/* <HomeBuckets /> */}
		</>
  )
}

export default HomePage