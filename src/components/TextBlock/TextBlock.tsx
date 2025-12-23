import React from 'react'

import styles from './TextBlock.module.css'
import clsx from 'clsx'
import richTextStyles from '@styles/rich-text.module.css'

interface TextBlockProps {
	children: React.ReactNode,
	className?: string,
	narrow?: boolean,
	padTop?: string,
	padBottom?: string,
}

const TextBlock = ({
	children, 
	className = '',
	narrow = false,
	padBottom = '4em', 
	padTop = '3em'
}:TextBlockProps) => {

	return (
		<div className={clsx(styles.container, richTextStyles.richText, className, narrow ? styles.narrow : '')} style={{ paddingBottom: padBottom, paddingTop: padTop }}>
			{children}
		</div>
	)
}

export default TextBlock