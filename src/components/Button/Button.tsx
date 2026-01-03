import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

import styles from './Button.module.css'

export const BUTTON_VARIANTS = {
  default: styles.default,
  reverse: styles.reverse,
  outline: styles.outline,
	outlineReverse: styles.outlineReverse,
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  compact?: boolean
  children: ReactNode
  variant?: keyof typeof BUTTON_VARIANTS
  href?: string
  isLink?: boolean
	disabled?: boolean
}

export type ButtonRef = HTMLButtonElement | HTMLAnchorElement

const Button = forwardRef<ButtonRef, ButtonProps>(function Button(
  { className, compact = false, children, variant = 'default', isLink = false, disabled = false, ...props },
  ref
) {
  if (!BUTTON_VARIANTS[variant]) {
    throw new Error(
      `Invalid Button variant: ${variant}\nMust be one of ${Object.keys(BUTTON_VARIANTS).join(
        ', '
      )}`
    )
  }

  const Element = props.href ? 'a' : isLink ? 'span' : 'button'

  return (
    <Element
			disabled={disabled}
      className={clsx(
        styles.button,
        BUTTON_VARIANTS[variant],
        compact ? styles.compact : '',
        className
      )}
      // @ts-expect-error because polymorphic typing is complex
      ref={ref}
      {...props}
    >
      {children}
    </Element>
  )
})

export default Button
