import React from 'react'
import GithubIcon from '@assets/icons/contact-icon-github.svg'
import LinkedInIcon from '@assets/icons/contact-icon-linkedin.svg'
import PDFIcon from '@assets/icons/contact-icon-pdf.svg'
import BlueskyIcon from '@assets/icons/contact-icon-bluesky.svg'
import RssIcon from '@assets/icons/contact-icon-rss.svg'
import Link from 'next/link'
import { BLUESKY_HANDLE, BLUESKY_URL, GITHUB_HANDLE, GITHUB_URL, LINKEDIN_HANDLE, LINKEDIN_URL } from '@utils/constants'

import ContactForm from '@components/ContactForm'

import styles from './Contact.module.css'

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formWrapper}>
					<p className={styles.intro}>If you need to reach me, please fill out the quick form below and I will get back with you ASAP. Thanks!</p>
					<ContactForm />
				</div>
        <aside className={styles.otherLinks}>
          <h2>Other Links</h2>
          <ul>
            <li>
              <Link
                className={styles.link}
                href={`${LINKEDIN_URL}`}
                target="_blank"
              >
                <LinkedInIcon aria-hidden="true" />
                <span>{LINKEDIN_HANDLE}</span>
              </Link>
            </li>
            <li>
              <Link className={styles.link} href={`${GITHUB_URL}`} target="_blank">
                <GithubIcon aria-hidden="true" />
                <span>{GITHUB_HANDLE}</span>
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href={`${BLUESKY_URL}`}
                target="_blank"
              >
                <BlueskyIcon aria-hidden="true" />
                <span>{BLUESKY_HANDLE}</span>
              </Link>
            </li>
            <li>
              <a
                className={styles.link}
                href="https://docs.google.com/document/d/1rQctHdBV9pXxVna_HOguMz88CmM4ywg9sugs21w9_Ls/export?format=pdf"
                download
              >
                <PDFIcon aria-hidden="true" />
                <span>John &ldquo;Boots&rdquo; Highland Resume</span>
              </a>
            </li>
            <li>
              <a
                className={styles.link}
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RssIcon aria-hidden="true" />
                <span>Blog Feed</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default Contact
