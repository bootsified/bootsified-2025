'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

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

  return (
		<>
			<nav className={clsx(styles.wrapper, className)}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<Link 
						href="/" 
						className={pathname === '/' ? styles.isActive : ''}
						>Home</Link>
					</li>
					<li className={styles.item}>
						<Link 
						href="/about" 
						className={pathname === '/about' ? styles.isActive : ''}
						>About</Link>
					</li>
					<li className={styles.item}>
						<Link
							href="/services"
							className={pathname === '/services' ? styles.isActive : ''}
						>Services</Link>
					</li>
					<li className={styles.item}>
						<Link
							href="/faq"
							className={pathname === ('/faq') ? styles.isActive : ''}
						>FAQ</Link>
					</li>
					<li className={styles.item}>
						<Link
							href="/contact"
							className={pathname === '/contact' ? styles.isActive : ''}
						>Contact</Link>
					</li>
				</ul>
			</nav>
		</>
  )
}

export default Nav
