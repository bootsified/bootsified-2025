import clsx from 'clsx'

import styles from './Divider.module.css'

export interface DividerProps {
  className?: string
	hideMobile?: boolean
	narrow?: boolean
	pad?: string
}

export default function Divider({ className, hideMobile = false, narrow = false, pad = '2em' }: DividerProps) {
  return (
    <div className={clsx(styles.divider, className, hideMobile ? styles.hideMobile : '', narrow ? styles.narrow : '')}	style={{ paddingTop: pad, paddingBottom: pad }}>
			<hr aria-hidden="true"/>
		</div>
  )
}
