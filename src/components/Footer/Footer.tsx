import clsx from 'clsx'
import Logo from '@/assets/images/boots-signature.svg'
import styles from './Footer.module.css'

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
    </footer>
  )
}

export default Footer
