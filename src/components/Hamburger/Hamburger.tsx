"use client"

import React from 'react'
import 'hamburgers/dist/hamburgers.css'
import clsx from 'clsx'
import styles from './Hamburger.module.css'
import { useUIContext } from '../../context/UIContext'

const Hamburger = () => {
	const { navOpen, toggleNav } = useUIContext()

	return (
		<div className={styles.container}>
			<button
				className={clsx(styles.button, 'hamburger', 'hamburger--slider', { 'is-active': navOpen })}
				type="button"
				aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
				aria-expanded={navOpen}
				onClick={toggleNav}
			>
				<span className={clsx(styles.box, 'hamburger-box')}>
					<span className={clsx(styles.inner, 'hamburger-inner')}></span>
				</span>
			</button>
		</div>
	)
}

export default Hamburger