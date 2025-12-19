import type { Metadata, Viewport } from "next";
import Script from 'next/script';
import '@styles/globals.css';
import styles from '@styles/RootLayout.module.css'
import * as constants from '@/utils/constants'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UIProvider } from '@/context/UIContext'
import Schema from '@/components/Schema'
import KonamiEasterEggWrapper from '@/components/KonamiEasterEggWrapper'
import { PT_Serif, Amatic_SC } from 'next/font/google'
import Nav from '@components/Nav'
import Gradient from "@/components/Gradient";

export const ptSerif = PT_Serif({
	weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})
 
export const amaticSC = Amatic_SC({
	weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
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
    <html lang="en" className={ptSerif.className}>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-dark.png" media="(prefers-color-scheme: dark)" />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={styles.body}>
				<style>
					{`
						:root {
							--font-pt-serif: ${ptSerif.style.fontFamily};
							--font-amatic-sc: ${amaticSC.style.fontFamily};
							--font-base: var(--font-pt-serif);
							--font-heading: var(--font-amatic-sc);
						}
					`}
				</style>
        <a href="#main-content" className="srOnly">Skip to main content</a>
        <UIProvider>
          {/* <Schema
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'MedicalBusiness',
                '@id': `${constants.SITE_PUBLIC_URL}#practice`,
                name: constants.SITE_NAME,
                url: constants.SITE_PUBLIC_URL,
								telephone: constants.CONTACT_PHONE_URL,
                logo: `${constants.SITE_PUBLIC_URL}/images/hlpc-seo.png`,
								image: [
									`${constants.SITE_PUBLIC_URL}/images/alyssa-square.jpg`,
								],
                sameAs: [
                  'https://www.psychologytoday.com/us/therapists/alyssa-highland-mill-creek-wa/180679',
                  'https://www.instagram.com/alyssa.highland.lpcs/',
                  'http://facebook.com/AlyssaHighlandLPCS/',
									'https://care.headway.co/providers/alyssa-highland'
                ],
                medicalSpecialty: ['Psychiatric', 'Psychology'],
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: constants.CONTACT_PHONE_URL,
                  contactType: 'customer service',
                  areaServed: ['US-WA', 'US-TX'],
                  availableLanguage: ['en']
                },
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: '13300 Bothell Everett Hwy, Ste 303-212',
                  addressLocality: 'Mill Creek',
                  addressRegion: 'WA',
                  postalCode: '98012',
                  addressCountry: 'US'
                },
                founder: { '@id': `${constants.SITE_PUBLIC_URL}#founder` },
                availableService: [
                  { '@type': 'Service', name: 'ADHD & Autism Therapy', areaServed: ['US-WA','US-TX'] },
                  { '@type': 'Service', name: 'Trauma Therapy', areaServed: ['US-WA','US-TX'] },
                  { '@type': 'Service', name: 'Attachment & Relationship Work', areaServed: ['US-WA','US-TX'] },
                  { '@type': 'Service', name: 'Burnout & Life Transitions', areaServed: ['US-WA','US-TX'] },
                  { '@type': 'Service', name: 'Faith Transitions & Religious Trauma', areaServed: ['US-WA','US-TX'] }
                ],
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: rating.ratingValue,
                  ratingCount: rating.ratingCount,
                  reviewCount: rating.reviewCount,
                  bestRating: 5,
                  worstRating: 5
                }
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                '@id': `${constants.SITE_PUBLIC_URL}#founder`,
                name: 'Alyssa Highland',
                jobTitle: 'Licensed Mental Health Counselor / Licensed Professional Counselor',
                worksFor: { '@id': `${constants.SITE_PUBLIC_URL}#practice` },
                url: constants.SITE_PUBLIC_URL,
                image: `${constants.SITE_PUBLIC_URL}/images/alyssa-bio.jpg`
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${constants.SITE_PUBLIC_URL}#website`,
                url: constants.SITE_PUBLIC_URL,
                name: constants.SITE_NAME,
                description: constants.SEO_DEFAULT_DESCRIPTION,
                publisher: { '@id': `${constants.SITE_PUBLIC_URL}#practice` },
                inLanguage: 'en-US'
              }
            ]}
          /> */}
					<Gradient />
					<div className="vignette"></div>
          <Header />
					<Nav className={styles.nav} />
          <main id="main-content" className={styles.main}>{children}</main>
          <Footer className={styles.footer} />
          <KonamiEasterEggWrapper />
        </UIProvider>
      </body>
    </html>
  );
}
