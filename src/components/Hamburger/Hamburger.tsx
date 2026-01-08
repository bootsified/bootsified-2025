"use client"

import React, { forwardRef, useEffect } from 'react'
import 'hamburgers/dist/hamburgers.css'
import clsx from 'clsx'
import styles from './Hamburger.module.css'
import { useUIContext } from '../../context/UIContext'

const Hamburger = forwardRef<HTMLButtonElement>((props, ref) => {
	const { navOpen, toggleNav } = useUIContext()

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && navOpen) {
				toggleNav()
			}
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [navOpen, toggleNav])

	return (
		<div className={styles.container}>
			<button
				ref={ref}
				className={clsx(styles.button, 'hamburger', 'hamburger--slider', { 'is-active': navOpen })}
				type="button"
				aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
				aria-expanded={navOpen}
				onClick={toggleNav}
			>
				<span className={clsx(styles.box, 'hamburger-box')}>
					<span className={clsx(styles.inner, 'hamburger-inner')} data-is-active={navOpen}></span>
				</span>
			</button>
		</div>
	)
})

Hamburger.displayName = 'Hamburger'

export default Hamburger