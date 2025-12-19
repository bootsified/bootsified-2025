'use client'

import clsx from 'clsx'

import { useUIContext } from '@/context/UIContext'
import styles from './Gradient.module.css'

export default function Gradient() {
	const { pageHandle } = useUIContext()

  return (
		<>
			<div data-page-handle={pageHandle} className={clsx(styles.gradient, styles.sunset, pageHandle === 'home' && styles.active)}></div>
			<div data-page-handle={pageHandle} className={clsx(styles.gradient, styles.night, pageHandle === 'about' && styles.active)}></div>
			<div data-page-handle={pageHandle} className={clsx(styles.gradient, styles.cloudy, pageHandle === 'work' && styles.active)}></div>
			<div data-page-handle={pageHandle} className={clsx(styles.gradient, styles.dramatic)}></div>
			<div data-page-handle={pageHandle} className={clsx(styles.gradient, styles.dawn, pageHandle === 'contact' && styles.active)}></div>
		</>
  )
}
