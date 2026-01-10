import { forwardRef, ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import styles from './Button.module.css'

export const BUTTON_VARIANTS = {
  default: styles.default,
  reverse: styles.reverse,
  outline: styles.outline,
	outlineReverse: styles.outlineReverse,
}

type BaseButtonProps = {
  compact?: boolean
  children: ReactNode
  variant?: keyof typeof BUTTON_VARIANTS
}

type ButtonAsButton = BaseButtonProps & 
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: never
    isLink?: false
    download?: never
  }

type ButtonAsAnchor = BaseButtonProps & 
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string
    isLink?: never
    disabled?: boolean
  }

type ButtonAsSpan = BaseButtonProps & 
  Omit<React.HTMLAttributes<HTMLSpanElement>, keyof BaseButtonProps> & {
    href?: never
    isLink: true
    download?: never
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsSpan

export type ButtonRef = HTMLButtonElement | HTMLAnchorElement

const Button = forwardRef<ButtonRef, ButtonProps>(function Button(
  { className, compact = false, children, variant = 'default', isLink = false, ...props },
  ref
) {
  if (!BUTTON_VARIANTS[variant]) {
    throw new Error(
      `Invalid Button variant: ${variant}\nMust be one of ${Object.keys(BUTTON_VARIANTS).join(
        ', '
      )}`
    )
  }

  const isAnchor = 'href' in props && props.href
  const isExternal = isAnchor && (
    props.href.startsWith('http://') || 
    props.href.startsWith('https://') || 
    props.href.startsWith('mailto:') ||
    props.href.startsWith('tel:')
  )
  const isInternal = isAnchor && !isExternal

  const Element = isAnchor ? 'a' : isLink ? 'span' : 'button'
  
  const buttonClasses = clsx(
    styles.button,
    BUTTON_VARIANTS[variant],
    compact ? styles.compact : '',
    className
  )

  if (isInternal) {
    const { href, ...linkProps } = props as ButtonAsAnchor
    return (
      <Link
        href={href}
        className={buttonClasses}
        {...linkProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <Element
      className={buttonClasses}
      // @ts-expect-error because polymorphic typing is complex
      ref={ref}
      {...props}
    >
      {children}
    </Element>
  )
})

export default Button
