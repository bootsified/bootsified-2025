import clsx from 'clsx'

import styles from './Gradient.module.css'

export default function Gradient() {
  return (
		<>
			<div className={clsx(styles.gradient, styles.sunset, styles.active)}></div>
			<div className={clsx(styles.gradient, styles.night)}></div>
			<div className={clsx(styles.gradient, styles.cloudy)}></div>
			<div className={clsx(styles.gradient, styles.dramatic)}></div>
			<div className={clsx(styles.gradient, styles.dawn)}></div>
		</>
  )
}
