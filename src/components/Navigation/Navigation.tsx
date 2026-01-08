'use client'

import { useRef } from 'react'
import Hamburger from '../Hamburger'
import Nav from '../Nav'

interface NavigationProps {
  navClassName?: string
}

const Navigation = ({ navClassName }: NavigationProps) => {
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Hamburger ref={hamburgerRef} />
      <Nav className={navClassName || ''} hamburgerRef={hamburgerRef} />
    </>
  )
}

export default Navigation
