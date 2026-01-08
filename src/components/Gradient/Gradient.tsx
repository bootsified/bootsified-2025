'use client'

import clsx from 'clsx'

import { useUIContext } from '@/context/UIContext'
import styles from './Gradient.module.css'

const Gradient = () => {
	const { pageHandle } = useUIContext()

	const isDefaultGradient = pageHandle !== 'home' && pageHandle !== 'about' && !pageHandle.includes('work') && pageHandle !== 'contact'

  return (
		<>
			<div className={clsx(styles.gradient, styles.sunset, pageHandle === 'home' && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.night, pageHandle === 'about' && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.cloudy, isDefaultGradient && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.dramatic, pageHandle.includes('work') && styles.active)}></div>
			<div className={clsx(styles.gradient, styles.dawn, pageHandle === 'contact' && styles.active)}></div>
		</>
  )
}

export default Gradient