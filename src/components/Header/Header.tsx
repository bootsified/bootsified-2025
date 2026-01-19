import clsx from 'clsx'
import Link from 'next/link'
import Logo from '@/assets/images/bootsified-splat.svg'

import styles from './Header.module.css'

interface HeaderProps {
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
      </div>
    </header>
  )
}

export default Header
