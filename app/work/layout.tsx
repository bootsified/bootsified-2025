import WorkNav from '@components/Work/WorkNav'
import styles from '@components/Work/Work.module.css'

const WorkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>What I&rsquo;ve been up&nbsp;to</h1>
      <div className={styles.nav}>
        <WorkNav />
      </div>
      {children}
    </div>
  )
}

export default WorkLayout
