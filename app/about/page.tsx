import TextBlock from '@/components/TextBlock'
import Schema from '@/components/Schema'
import { SITE_PUBLIC_URL, SEO_DEFAULT_IMAGE } from '@/utils/constants'
import Link from 'next/link'
import { spanBass, spanWeb } from '@/utils/helpers'
import Image from 'next/image';
import TextMedia from '@/components/TextMedia'
import kidVideo from 'videos/me-kid-waving-edit-web.mp4';
import kidPoster from '@public/images/me-kid-waving-poster.jpg';
import meSelfie from '@public/images/me-comic-selfie3.png';
import FullWidthImage from '@/components/FullWidthImage'
import Specialize from '@/components/Specialize'

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

const AboutPage = () => {
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
			<TextBlock padBottom='1em' padTop='0em' narrow>
				<h1>A little about me&hellip;</h1>
			</TextBlock>

			<TextMedia 
				imageSrc={kidPoster} 
				imageAlt="Me as a kid, sitting in my pretend airplane (made from a cardboard box), waving at the camera." 
				videoSrc={kidVideo} 
				imageWidth={280}>
				<p>My name is <strong>John Highland</strong>, but most people call me <strong>“Boots”</strong> - long story. I’m a web developer, musician, husband, and father of two awesome boys, currently living in the Seattle area. I was born in Cincinnati, OH, but my family moved to Dallas, TX, when I was two. In Dallas, I grew up, went to school, played in multiple bands, started a web developer career, found a wife, and birthed a couple sons. In 2023, we finally said goodbye to the brutal Texas Summers, and said hello to the Pacific Northwest. The new chapter begins&hellip;</p>
			</TextMedia>

			<TextBlock padBottom='3em' padTop='3em' narrow>
        <h2>As a web developer&hellip;</h2>

        <p>
          I specialize in advanced HTML/CSS layouts that are cross-browser, accessible, and
          responsive to any device size. I’m experienced with vanilla JavaScript, and have become
          very familiar with React components and Next.js over the last couple years.
        </p>

        <p>In a nutshell, I’m a huge lover of the “pretty side” of front-end dev. I love:</p>
        <ul>
          <li>CSS as a (programming?) language</li>
          <li>finding creative ways to layout a difficult design</li>
          <li>
            making a layout perfectly respond to everything from a watch to a giant studio display
          </li>
          <li>finding subtle ways to wow a user with animation/transitions</li>
          <li>marking up a site in a way that works, even without the CSS</li>
          <li>semantic markup (I’m a hopeless rule-follower)</li>
          <li>
            basically, anything involving the{' '}
            <Link
              href="https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/"
              target="_blank"
            >
              Front-of-the-Front-End
            </Link>{' '}
            (including JS)
          </li>
        </ul>

        <p>
          That said, I can also get me hands dirty. Most of my career (2004-2018) has been in the
          design agency trenches, building client sites start to finish. The first ~7 years building
          advanced, immersive Flash experiences, then mostly LAMP stack CMS jobs (ExpressionEngine
          back in the day, then CraftCMS) and some straight PHP sites. Recently, I ran a large
          Shopify store &mdash; tons of Liquid templating initially &mdash; but we eventually
          (finally!) moved to a React/Next.js/headless CMS setup. Now that I‘ve had a couple years
          of building React components (&hearts; CSS modules &hearts;), I’ve come to really love it
          &mdash; especially with Next.js and Vercel. That’s my go-to now.
        </p>

        <p>
          I’ve also had significant real-world experience running a large eCommerce site (Shopify),
          as the Sr Manager of Web Development for the performance menswear company, Mizzen+Main. In
          my 4.5 years with Mizzen, we ran into all kinds of ups and downs, and I was always able to
          get us across the finish line. It’s been a rocky relationship at times, but I definitely
          know Shopify.
        </p>

        <p>
          So essentially, my key skill is problem solving. In the {spanWeb()} years I’ve been
          building and managing websites, I’ve just about seen it all, so as the great American
          poet,{' '}
          <Link href="https://en.wikipedia.org/wiki/Vanilla_Ice" target="_blank">
            Robert Matthew Van Winkle
          </Link>
          , once put it,{' '}
          <em>
            “
            <Link href="https://youtu.be/rog8ou-ZepE?t=51" target="_blank">
              If there was a problem, YO! I’ll solve it.
            </Link>
            ”
          </em>
        </p>

        <h2>As a musician&hellip;</h2>

        <p>
          I’ve been primarily a bass guitarist for {spanBass()} years, and I toured professionally
          with various rock bands for nearly 15 years of that. In addition to bass guitar, I also
          play acoustic bass, guitar, drums, and cello (my first instrument); and have experience
          with synth programming and studio mixing and producing - mostly with Logic Pro. Music has
          taken a back seat for me, since web development took over, but I still try to get back to
          it from time to time. I actually have <Link href="/work/music">an album of my own</Link>{' '}
          in the works that will hopefully see the light of day sometime in 2023. I’ll keep you
          posted.
        </p>
			</TextBlock>

			<FullWidthImage src={meSelfie} alt="An illustration of a recent photo of Boots on his deck, wearing glasses and a dark t-shirt, smiling at the camera." padBottom='5em' />

			<Specialize />
		</>
  )
}

export default AboutPage