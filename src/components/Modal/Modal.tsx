import React, { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import CloseIcon from '@/assets/icons/close.svg'

import styles from './Modal.module.css'

export const MODAL_VARIANTS = {
  flex: styles.flex,
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
}

type ModalProps = {
  open?: boolean
  trigger: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  outsideClose?: boolean
  fullscreenMobile?: boolean
  tinyDots?: boolean
  size?: keyof typeof MODAL_VARIANTS
  onOpenChange?: (open: boolean) => void
}

const Modal = ({
  open = false,
  trigger,
  children,
  outsideClose = false,
  fullscreenMobile = false,
  tinyDots = false,
  size = 'small',
  onOpenChange,
  ...props
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              className={clsx(styles.content, MODAL_VARIANTS[size])}
              data-outside-close={outsideClose}
              data-fullscreen-mobile={fullscreenMobile}
              data-tiny-dots={tinyDots}
              forceMount
              asChild
            >
              <motion.div
                className={styles.content}
                initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-45%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
                transition={{ duration: 0.3, ease: [0.075, 0.82, 0.165, 1] }} // ease-out-circ
              >
                <div className={styles.inner}>{children}</div>
                <Dialog.Close asChild>
                  <button className={styles.close} aria-label="Close">
                    <CloseIcon />
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default Modal
