'use client'

import styles from './CTA.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CTA = () => {
	const pathname = usePathname()
	
	return (
		<>
			<div className={styles.cta} data-show={pathname === '/contact' || pathname.includes('/admin') ? 'false' : 'true'}>
				<Link href="/contact">Schedule your <strong>free</strong> 15-minute consult</Link>
			</div>
		</>
	)
}

export default CTA