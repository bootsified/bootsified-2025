import styles from './not-found.module.css'
import Button from '@/components/Button'
import { PageHandleSetter } from '@/components/PageHandleSetter'

export const metadata = {
  title: '404: Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className={styles.container}>
      <PageHandleSetter handle="other" />
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.errorCode}>404</span>
        </h1>
        <p className={styles.message}>
          Oops! The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Button href="/" className={styles.homeLink}>
          Return Home
        </Button>
      </div>
    </div>
  )
}
