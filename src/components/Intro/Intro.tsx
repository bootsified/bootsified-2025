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
							<Button href='/about' className={styles.buttonPrimary} variant='reverse'>My Bio</Button>
							<Button href='/work' className={styles.button} variant='outlineReverse'>My work</Button>
							<Button href='https://docs.google.com/document/d/1rQctHdBV9pXxVna_HOguMz88CmM4ywg9sugs21w9_Ls/export?format=pdf' download={true} className={styles.button} variant='outlineReverse'>My Resume</Button>
					</div>
				</div>
				<div className={styles.image}>
					<Image 
						src='/images/me-comic.jpg' 
						alt='A comic-style illustration of John "Boots" Highland' 
						width={400} 
						height={400}
						priority={true}
						sizes="(max-width: 768px) 100vw, 400px"
						quality={90}
					/>
				</div>
			</div>
		</section>
	)
}

export default Intro
