import clsx from 'clsx'
import Link from 'next/link'
import Logo from '@/assets/images/bootsified-splat.svg'
import Hamburger from '../Hamburger'
// import { CONTACT_PHONE, CONTACT_PHONE_URL, CONTACT_EMAIL } from '@/utils/constants'

import styles from './Header.module.css'
import Nav from '@components/Nav'

type HeaderProps = {
  className?: string
}

const Header = ({ className = '' }: HeaderProps) => {

	return (
    <header id="top" className={clsx(styles.wrapper, className)}>
      <div className={styles.container}>
				<div className={styles.branding}>
					<Link href="/" aria-label="Bootsified Home">
						<Logo alt="Bootsified Logo" aria-hidden="true" focusable="false" />
					</Link>
				</div>
				<div className={styles.hamburgerWrapper}>
					<Hamburger />
				</div>
				<Nav className={styles.nav} />
      </div>
    </header>
  )
}

export default Header
