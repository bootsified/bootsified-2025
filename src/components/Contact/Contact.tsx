import React from 'react'
import GithubIcon from '@assets/icons/contact-icon-github.svg'
import LinkedInIcon from '@assets/icons/contact-icon-linkedin.svg'
import PDFIcon from '@assets/icons/contact-icon-pdf.svg'
import BlueskyIcon from '@assets/icons/contact-icon-bluesky.svg'
import Link from 'next/link'

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
                href="https://www.linkedin.com/in/boots-highland/"
                target="_blank"
              >
                <LinkedInIcon />
                <span>linkedin.com/in/boots-highland</span>
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="https://github.com/bootsified" target="_blank">
                <GithubIcon />
                <span>github.com/bootsified</span>
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href="https://bsky.app/profile/bootsified.bsky.social"
                target="_blank"
              >
                <BlueskyIcon />
                <span>bootsified.bsky.social</span>
              </Link>
            </li>
            <li>
              <a
                className={styles.link}
                href="https://docs.google.com/document/d/1rQctHdBV9pXxVna_HOguMz88CmM4ywg9sugs21w9_Ls/export?format=pdf"
                download
              >
                <PDFIcon />
                <span>John &ldquo;Boots&rdquo; Highland Resume</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default Contact
