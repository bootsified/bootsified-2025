"use client"

import React from 'react'
import 'hamburgers/dist/hamburgers.css'
import clsx from 'clsx'
import styles from './Hamburger.module.css'
import { useUIContext } from '../../context/UIContext'

const Hamburger: React.FC = () => {
	const { navOpen, toggleNav } = useUIContext()

	return (
		<button
			className={clsx(styles.hamburger, 'hamburger', 'hamburger--slider', { 'is-active': navOpen })}
			type="button"
			aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
			aria-expanded={navOpen}
			onClick={toggleNav}
		>
			<span className="hamburger-box">
				<span className="hamburger-inner"></span>
			</span>
		</button>
	)
}

export default Hamburger