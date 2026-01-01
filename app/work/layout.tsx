import WorkNav from '@components/Work/WorkNav'

// import richStyles from '@styles/rich-text.module.css'

import styles from '@components/Work/Work.module.css'

////////////////////////////////////////////////////////
// TODO: When they get their shit together, here you go:
////////////////////////////////////////////////////////

// const pageTitle = `My Projects`
// const pageDescription =
//   "Here is a few of the various projects I've had over the years - websites, music, goofy videos, etc."
// const url = '/work'

// export const metadata = {
//   title: pageTitle,
//   description: pageDescription,
//   twitter: {
//     title: pageTitle,
//     description: pageDescription,
//     url: `${SITE_URL}${url}`,
//   },
//   openGraph: {
//     title: pageTitle,
//     description: pageDescription,
//     url: `${SITE_URL}${url}`,
//   },
// }

const WorkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>What I&rsquo;ve been up&nbsp;to&hellip;</h1>
      <div className={styles.nav}>
        <WorkNav />
      </div>
      {children}
    </div>
  )
}

export default WorkLayout
