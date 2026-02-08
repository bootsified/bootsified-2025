'use client'

import dynamic from 'next/dynamic'

const SnowEffect = dynamic(() => import('./SnowEffect'), { ssr: false })

const ClientSnowEffect = () => {
	return <SnowEffect />
}

export default ClientSnowEffect
