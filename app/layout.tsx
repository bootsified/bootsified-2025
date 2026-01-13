import type { Metadata, Viewport } from "next";
import dynamic from 'next/dynamic';
import '@styles/globals.css';
import styles from '@styles/RootLayout.module.css'
import * as constants from '@/utils/constants'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UIProvider } from '@/context/UIContext'
import { PT_Serif } from 'next/font/google'
import localFont from 'next/font/local'
import Navigation from '@components/Navigation'
import Gradient from "@/components/Gradient";

const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'))
const Schema = dynamic(() => import('@/components/Schema'))
const KonamiEasterEggWrapper = dynamic(() => import('@/components/KonamiEasterEggWrapper'))

export const ptSerif = PT_Serif({
	weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// export const bangers = Bangers({
// 	weight: ['400'],
//   subsets: ['latin'],
//   display: 'swap',
// })

const AnimeAce = localFont({
  src: './animeacei.woff2',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
	metadataBase: new URL(constants.SITE_URL),
  title: constants.SEO_DEFAULT_TITLE,
  description: constants.SEO_DEFAULT_DESCRIPTION,
  applicationName: constants.SITE_NAME_SHORT,
	appleWebApp: {
    title: constants.SITE_NAME_SHORT
  },
	icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
	manifest: '/site.webmanifest',
	twitter: {
    card: 'summary',
    title: constants.SEO_DEFAULT_TITLE,
    description: constants.SEO_DEFAULT_DESCRIPTION,
    creator: '@bootsified',
    images: [constants.SEO_DEFAULT_IMAGE], // Must be an absolute URL
  },
	openGraph: {
    title: constants.SEO_DEFAULT_TITLE,
    description: constants.SEO_DEFAULT_DESCRIPTION,
    url: constants.SITE_PUBLIC_URL,
    siteName: constants.SITE_NAME,
    images: [
      {
        url: constants.SEO_DEFAULT_IMAGE, // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#5bbb56',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <html lang="en" className={AnimeAce.className}>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={styles.body} suppressHydrationWarning>
				<style>
					{`
						:root {
							--font-base: ${ptSerif.style.fontFamily}, Georgia, serif;
							--font-heading: ${AnimeAce.style.fontFamily}, 'Comic Sans MS', cursive, sans-serif;
							--font-sans: 'Helvetica Neue', Arial, sans-serif;
						}
					`}
				</style>
        <a href="#main-content" className="srOnly">Skip to main content</a>
        <UIProvider>
          <Schema
            data={{
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${constants.SITE_PUBLIC_DOMAIN}/#website`,
                  url: `https://${constants.SITE_PUBLIC_DOMAIN}`,
                  name: constants.SITE_NAME,
                  inLanguage: 'en-US',
                  publisher: { '@id': `https://${constants.SITE_PUBLIC_DOMAIN}/#person` }
                },
                {
                  '@type': 'Person',
                  '@id': `https://${constants.SITE_PUBLIC_DOMAIN}/#person`,
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
                  url: `https://${constants.SITE_PUBLIC_DOMAIN}`,
                  sameAs: [
                    constants.LINKEDIN_URL,
                    constants.GITHUB_URL,
                    constants.BLUESKY_URL
                  ]
                }
              ]
            }}
          />
					<Gradient />
					<div className="vignette"></div>
          <Header />
					<Navigation navClassName={styles.nav} />
          <main id="main-content" className={styles.main}>{children}</main>
          <Footer className={styles.footer} />
          <KonamiEasterEggWrapper />
        </UIProvider>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
