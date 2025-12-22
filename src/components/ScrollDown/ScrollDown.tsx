import React from 'react'
import clsx from 'clsx'

import styles from './ScrollDown.module.css'

type ScrollDownProps = {
	className?: string
}

const ScrollDown = ({ className }: ScrollDownProps) => {
  return (
    <div title='Scroll to see more' className={clsx(styles.wrapper, className)}></div>
  )
}

export default ScrollDown
