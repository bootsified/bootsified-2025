import clsx from 'clsx'
import Logo from '@/assets/images/boots-signature.svg'
import styles from './Footer.module.css'
import Image from 'next/image'

interface FooterProps {
  className?: string
}

const Footer = ({ className = '' }: FooterProps) => {

	return (
    <footer className={clsx(styles.wrapper, className)}>
      <div className={styles.trees}></div>
			<div className={styles.bottom}>
				<div className={styles.container}>
					<p className={styles.made}>Made with <span className={styles.heart} title="love">♥</span> in Seattle</p>
					<p className={styles.signature}>
						<Logo alt="Bootsified Signature" aria-hidden="true" focusable="false" />
					</p>
				</div>
			</div>
			<div className={styles.sasquatch}>
				<div className={styles.image}>
					<Image
						src="/images/sasquatch-jogging3-sm.gif"
						alt="A friendly sasquatch jogging on a treadmill."
						width="160"
						height="90"
					/>
				</div>
			</div>
    </footer>
  )
}

export default Footer
