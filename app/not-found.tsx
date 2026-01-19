import styles from './not-found.module.css'
import Button from '@/components/Button'
import { PageHandleSetter } from '@/components/PageHandleSetter'
import Image from 'next/image'

export const metadata = {
  title: '404: Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className={styles.container}>
      <PageHandleSetter handle="other" />
      <h1 className="srOnly">404: Page Not Found</h1>
      <div className={styles.content}>
        <div className={styles.sasquatch}>
					<Image src="/images/sasquatch-404-sign.png" alt="Sasquatch" width={209} height={400} />
				</div>
				<div className={styles.text}>
					<p>Uhhh...<br />
					Are you lost or somethin&rsquo;?</p>
					<Button href="/" className={styles.homeLink}>Go home</Button>
				</div>
      </div>
    </div>
  )
}
