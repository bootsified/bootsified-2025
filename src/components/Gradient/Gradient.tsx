'use client'

import clsx from 'clsx'

import { useUIContext } from '@/context/UIContext'
import styles from './Gradient.module.css'

const Gradient = () => {
	const { pageHandle } = useUIContext()

	// Determine which gradient to show based on the page handle
	// Each page now explicitly sets its handle, so we can trust it
	const isHome = pageHandle === 'home'
	const isAbout = pageHandle === 'about'
	const isWork = pageHandle.startsWith('work')
	const isContact = pageHandle === 'contact'
	const isOther = !isHome && !isAbout && !isWork && !isContact

  return (
		<>
			<div className={clsx(styles.gradient, styles.cloudy, isOther && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.sunset, isHome && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.night, isAbout && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.dramatic, isWork && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.dawn, isContact && styles.active)}></div>
		</>
  )
}

export default Gradient