'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUIContext } from '../../context/UIContext'

// Adding what-input here because:
// - it must be initialized client-side
// - this component is site-wide
// - this component is rendered client-side
import 'what-input'

import styles from './Nav.module.css'

type NavProps = {
  className: string
}

const Nav = ({ className }: NavProps) => {
  const pathname = usePathname()
	const { navOpen, toggleNav } = useUIContext()

  return (
		<nav className={clsx(styles.wrapper, navOpen && styles.navOpen, className)}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link 
					href="/" 
					className={pathname === '/' ? styles.isActive : ''}
					onClick={toggleNav}
					>Home</Link>
				</li>
				<li className={styles.item}>
					<Link 
					href="/about" 
					className={pathname === '/about' ? styles.isActive : ''}
					onClick={toggleNav}
					>About</Link>
				</li>
				<li className={styles.item}>
					<Link
						href="/work"
						className={pathname === '/work' ? styles.isActive : ''}
						onClick={toggleNav}
					>Work</Link>
				</li>
				<li className={styles.item}>
					<Link
						href="/contact"
						className={pathname === '/contact' ? styles.isActive : ''}
						onClick={toggleNav}
					>Contact</Link>
				</li>
			</ul>
		</nav>
  )
}

export default Nav
