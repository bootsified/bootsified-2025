import TextBlock from '@/components/TextBlock'
import Schema from '@/components/Schema'
import { SITE_PUBLIC_URL, SEO_DEFAULT_IMAGE, SITE_NAME } from '@/utils/constants'
import Link from 'next/link'
import { spanBass, spanWeb } from '@/utils/helpers'
import Image from 'next/image';
import TextMedia from '@/components/TextMedia'
import { getVideoAsset } from '@/utils/videoAssets';
import kidPoster from '@public/images/me-kid-waving-poster.jpg';
import meSelfie from '@public/images/me-comic-selfie4.png';
import meRawk from '@public/images/me-comic-rawk2.jpg';
import meUSPS from '@public/images/me-usps.jpg';
import FullWidthImage from '@/components/FullWidthImage'
import Specialize from '@/components/Specialize'

const pageTitle = `About ${SITE_NAME} | Front-End Developer with a Musician’s Mindset`
const pageDescription = 'I’m John “Boots” Highland, a front-end developer and working musician focused on clean code, accessibility, and thoughtful composition in both software and sound.'
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

const AboutPage = () => {
	const kidVideoUrl = getVideoAsset('https://mjnlegv8gnebzmyg.public.blob.vercel-storage.com/videos/me-kid-waving-edit-web-zSvbMEyXvTih2k9VYugAx407okKqty.mp4')
	
  return (
		<article className="fadeIn">
			<Schema
				data={[
					{
						'@context': 'https://schema.org',
						'@type': 'AboutPage',
						'@id': 'https://boots.dev/about#webpage',
						url: 'https://boots.dev/about',
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
							{ '@type': 'ListItem', position: 2, name: 'About', item: 'https://boots.dev/about' }
						]
					}
				]}
			/>
			<TextBlock padBottom='2em' padTop='1em' narrow>
				<h1>A little about me</h1>
			</TextBlock>

			<TextMedia 
				imageSrc={kidPoster} 
				imageAlt="Me as a kid, sitting in my pretend airplane (made from a cardboard box), waving at the camera." 
				videoSrc={kidVideoUrl} 
				imageWidth={280}
				imageHeight={372}>
				<p>My name is <strong>John Highland</strong>, but most people call me <strong>“Boots”</strong> - long story. I&rsquo;m a web developer, musician, husband, and father of two awesome boys, currently living in the Seattle area. I was born in Cincinnati, OH, but my family moved to Dallas, TX, when I was two. In Dallas, I grew up, went to school, played in multiple bands, started a web developer career, found a wife, and birthed a couple sons. In 2023, we finally said goodbye to the brutal Texas Summers, and said hello to the Pacific Northwest. The new chapter begins&hellip;</p>
			</TextMedia>

			<TextBlock padBottom='3em' padTop='3em' narrow>
        <h2>As a web developer&hellip;</h2>
        <p>For {spanWeb()} years, I&rsquo;ve specialized in advanced HTML and CSS layouts that are cross-browser, accessible, and responsive across all device sizes. I have deep experience with modern, vanilla JavaScript and, over the past several years, have worked extensively with React and Next.js to build component-driven, production-ready interfaces.</p>
				<p>At heart, I&rsquo;m passionate about the visual and experiential side of front-end development. I enjoy solving complex layout challenges, crafting responsive systems that scale from small wearables to large-format displays, and using animation and interaction thoughtfully to enhance usability. I place a strong emphasis on semantic, accessible markup and believe that well-structured HTML should stand on its own, even without styling.</p>
			</TextBlock>

			<FullWidthImage src={meSelfie} alt="An illustration of a recent photo of Boots on his deck, wearing glasses and a dark t-shirt, smiling at the camera." padBottom='3em' />
				
			<TextBlock padBottom='3em' padTop='0em' narrow>
        <p>While front-end is my specialty, I&rsquo;m comfortable working across the stack when needed. Much of my career was spent in agency environments, building client projects end-to-end. Early on, that meant creating immersive Flash experiences, followed by years of CMS-driven development on the LAMP stack, including ExpressionEngine, Craft CMS, and custom PHP solutions. More recently, I led the evolution of a large Shopify storefront from traditional Liquid templates to a modern React, Next.js, and headless CMS architecture. Today, that stack, paired with Vercel, is my preferred approach.</p>
				<p>I&rsquo;ve also spent several years leading web development for a high-volume eCommerce business as Senior Manager of Web Development at Mizzen+Main. Managing a complex Shopify ecosystem in a fast-growing retail environment required balancing technical decisions, performance, reliability, and business priorities. Through both smooth launches and challenging moments, I consistently delivered solutions that kept the business moving forward.</p>
				<p>At the core of my work is problem solving. With nearly three decades of experience building and managing websites, I&rsquo;ve encountered a wide range of technical and organizational challenges, and I bring a calm, pragmatic approach to navigating them and delivering results.</p>

        <h2>As a musician&hellip;</h2>

        <p>
          I&rsquo;ve been primarily a bass guitarist for {spanBass()} years, and I toured professionally
          with various rock bands for nearly 15 years of that. In addition to bass guitar, I also
          play acoustic bass, guitar, drums, and cello (my first instrument); and have experience
          with synth programming and studio mixing and producing - mostly with Logic Pro. Music has
          taken a back seat for me, since web development took over, but I still try to get back to
          it from time to time. I actually have <Link href="/work/music/the-release">an album of my own</Link> in the works that will hopefully see the light of day sometime soon. I&rsquo;ll keep you posted.
        </p>
			</TextBlock>

			<FullWidthImage src={meRawk} alt="An illustration of Boots playing bass guitar on stage, with a dynamic and energetic pose." padBottom='5em' />

			<TextBlock padBottom='3em' padTop='0em' narrow>
				<h2>As a... Letter Carrier?!?</h2>
				<p>Yup, that&rsquo;s right. Since a full-time dev gig has been elusive lately, I have been working as a USPS Letter Carrier since 2024. I&rsquo;m based in Lynnwood, WA, but my routes are all in the North Seattle area. I never would have guessed I&rsquo;d be delivering mail in Seattle at some point in my life, but I&rsquo;ve actually enjoyed it (except around the holidays... GEEZ!). It can be tough, but it keeps me active, and gives me a chance to get to know the new community I live in.</p>
			</TextBlock>

			<FullWidthImage src={meUSPS} narrow position="right" alt="An illustration of Boots working as a USPS Letter Carrier, delivering mail out of his mail truck." padBottom='5em' />

			<Specialize />
		</article>
  )
}

export default AboutPage