'use client'

import { useState } from 'react'
import { useUIContext } from '@/context/UIContext'
import styles from './SnowEffect.module.css'

// Generate snowflake properties outside component to satisfy React compiler
const generateSnowflakes = () => Array.from({ length: 18 }, (_, i) => ({
	id: i,
	// Random horizontal starting position (0-100%)
	left: Math.random() * 100,
	// Random animation duration (8-15s)
	duration: 8 + Math.random() * 7,
	// Random delay (0-10s) for staggered start
	delay: Math.random() * 10,
	// Random horizontal drift (-20px to 20px)
	drift: (Math.random() - 0.5) * 500,
	// Random size (2-6px)
	size: 2 + Math.random() * 4,
	// Random opacity (0.4-0.7)
	opacity: 0.4 + Math.random() * 0.3,
}))

const SnowEffect = () => {
	const { pageHandle } = useUIContext()
	const isBlog = pageHandle === 'blog'
	
	// Use lazy initializer to generate snowflakes only once on first render
	const [snowflakes] = useState(generateSnowflakes)

	return (
		<div className={styles.snowContainer} style={{ opacity: isBlog ? 1 : 0 }}>
			{snowflakes.map((flake) => (
				<div
					key={flake.id}
					className={styles.snowflake}
					style={{
						left: `${flake.left}%`,
						animationDuration: `${flake.duration}s`,
						animationDelay: `${flake.delay}s`,
						width: `${flake.size}px`,
						height: `${flake.size}px`,
						opacity: flake.opacity,
						// Use CSS custom property for drift distance
						['--drift' as string]: `${flake.drift}px`,
					}}
				/>
			))}
		</div>
	)
}

export default SnowEffect
