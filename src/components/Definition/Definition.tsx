import React from 'react'
import clsx from 'clsx'
import ScrollDown from '../ScrollDown/ScrollDown'

import styles from './Definition.module.css'

const Definition = () => {

  return (
		<section className={styles.wrapper}>
			<div className={styles.inner}>
				<h2>Boots</h2>
				<p><em>noun</em> \ˈbüṯs\</p>
				<ol>
					<li><em><s>(plural) Sturdy coverings for the foot and lower leg, typically extending above the ankle and made of leather, rubber, or similar materials; designed for protection, warmth, or utility.</s></em></li>
					<li>(singular) A Seattle-area web developer and musician, known for his friendly demeanor and love of bass guitar.<br />
					<em>See also &ldquo;John Highland&rdquo;</em></li>
				</ol>
			</div>
			<ScrollDown />
		</section>
  )
}

export default Definition
