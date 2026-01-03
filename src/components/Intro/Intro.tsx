import React from 'react'
import styles from './Intro.module.css'
import clsx from 'clsx'
import { spanBass, spanWeb, thisYear } from '@/utils/helpers'
import Image from 'next/image'
import Button from '../Button'

interface IntroProps {
	className?: string
}

const Intro = ({
	className = ''
}: IntroProps) => {
	return (
		<section className={clsx(styles.wrapper, className)}>
			<div className={styles.inner}>
				<div className={styles.text}>
					<h2>Hello!</h2>
					<p>My name is John Highland, but most people know me as <strong>&ldquo;Boots&rdquo;</strong> &mdash; long story. I currently live in the Seattle area, with my very loving and understanding wife and two whacky sons. For {spanWeb()} years, I’ve been developing websites, but my first passion was playing bass guitar ({thisYear()} marks {spanBass()} years). Welcome to my home. Take a look around... make yourself comfortable.</p>
					<div className={styles.buttons}>
						<Button href='/work' variant='outlineReverse'>View my work</Button>
						<Button href='/contact' variant='reverse'>Contact Me</Button>
					</div>
				</div>
				<div className={styles.image}>
					<Image src='/images/me-comic.png' alt='A comic-style illustration of John "Boots" Highland' width={400} height={400} />
				</div>
			</div>
		</section>
	)
}

export default Intro
