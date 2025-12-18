'use client'

import React from 'react'
import { useUIContext } from '@/context/UIContext'
import KonamiEasterEgg from '@/components/KonamiEasterEgg'
import KonamiProgress from '@/components/KonamiProgress'

const KonamiEasterEggWrapper: React.FC = () => {
  const { konamiCode } = useUIContext()
  
  return (
    <>
      <KonamiProgress />
      <KonamiEasterEgg 
        isActive={konamiCode.isActivated} 
        onClose={konamiCode.deactivate}
      />
    </>
  )
}

export default KonamiEasterEggWrapper