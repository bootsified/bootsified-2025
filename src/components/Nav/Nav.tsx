'use client'

import { useEffect, useRef } from 'react'
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

interface NavProps {
  className: string
	hamburgerRef?: React.RefObject<HTMLButtonElement>
}

const Nav = ({ className, hamburgerRef }: NavProps) => {
  const pathname = usePathname()
	const { navOpen, toggleNav } = useUIContext()
	const navRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (!navOpen) return

		const nav = navRef.current
		if (!nav) return

		const focusableElements = nav.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
		)
		const firstElement = hamburgerRef?.current || focusableElements[0]
		const lastElement = focusableElements[focusableElements.length - 1]

		const handleTabKey = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement?.focus()
					e.preventDefault()
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement?.focus()
					e.preventDefault()
				}
			}
		}

		firstElement?.focus()
		document.addEventListener('keydown', handleTabKey)

		return () => {
			document.removeEventListener('keydown', handleTabKey)
		}
	}, [navOpen, hamburgerRef])

  return (
		<nav 			ref={navRef}			className={clsx(styles.wrapper, navOpen && styles.navOpen, className)} 
			inert={navOpen ? undefined : true} 
			aria-label="Primary Navigation" 
			aria-hidden={!navOpen}>
			<ul className={styles.list} id="primary-navigation">
				<li className={styles.item}>
					<Link 
					href="/" 
					className={pathname === '/' ? styles.isActive : ''}
					onClick={toggleNav}
          tabIndex={navOpen ? 0 : -1}
					>Home</Link>
				</li>
				<li className={styles.item}>
					<Link 
					href="/about" 
					className={pathname === '/about' ? styles.isActive : ''}
					onClick={toggleNav}
          tabIndex={navOpen ? 0 : -1}
					>About</Link>
				</li>
				<li className={styles.item}>
					<Link
						href="/work"
						className={pathname.includes('work') ? styles.isActive : ''}
						onClick={toggleNav}
            tabIndex={navOpen ? 0 : -1}
					>Work</Link>
				</li>
				<li className={styles.item}>
					<Link
						href="/contact"
						className={pathname === '/contact' ? styles.isActive : ''}
						onClick={toggleNav}
            tabIndex={navOpen ? 0 : -1}
					>Contact</Link>
				</li>
			</ul>
		</nav>
  )
}

export default Nav
