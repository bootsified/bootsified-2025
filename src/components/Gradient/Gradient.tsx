'use client'

import clsx from 'clsx'

import { useUIContext } from '@/context/UIContext'
import styles from './Gradient.module.css'

const Gradient = () => {
	const { pageHandle } = useUIContext()

	let currentPage

	if (pageHandle === null || pageHandle === undefined || pageHandle === 'home') {
		currentPage = 'home'
	} else if (pageHandle === 'about') {
		currentPage = 'about'
	} else if (pageHandle?.includes('work')) {
		currentPage = 'work'
	} else if (pageHandle === 'contact') {
		currentPage = 'contact'
	} else {
		currentPage = 'other'
	}

	console.log('Current Page in Gradient:', currentPage)

  return (
		<>
			<div className={clsx(styles.gradient, styles.cloudy, currentPage === 'other' && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.sunset, currentPage === 'home' && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.night, currentPage === 'about' && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.dramatic, currentPage === 'work' && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.dawn, currentPage === 'contact' && styles.active)}></div>
		</>
  )
}

export default Gradient