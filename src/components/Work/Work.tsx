import React from 'react'
import Link from 'next/link'

import WorkNav from './WorkNav'

import styles from './Work.module.css'
import richStyles from '@styles/rich-text.module.css'

const Work = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>What I&rsquo;ve been up&nbsp;to...</h1>
      <div className={richStyles.richText}>
        <p>
          Here are a few things that I&rsquo;ve done over the years. Since the web is a living,
          constantly-evolving being, much of the web work I&rsquo;ve done isn&rsquo;t live anymore.
          I&rsquo;ll give links here when possible, but if you&rsquo;d like to see some of the older
          stuff, I can maybe scrounge up an archived link for you. Just{' '}
          <Link href="/contact">let me know</Link>.
        </p>
      </div>
      <WorkNav />
    </div>
  )
}

export default Work
