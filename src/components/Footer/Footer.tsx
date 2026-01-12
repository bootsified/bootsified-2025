import clsx from 'clsx'
import Logo from '@/assets/images/boots-signature.svg'
import styles from './Footer.module.css'
import Image from 'next/image'
import Seaplane from '@/assets/images/seaplane.svg'

interface FooterProps {
  className?: string
}

const Footer = ({ className = '' }: FooterProps) => {

	return (
    <footer className={clsx(styles.wrapper, className)}>
			<div className={styles.seaplane}>
				<Seaplane
					className={styles.seaplaneSvg}
					title="A small illustrated seaplane, with a banner, flying through the air."
					aria-hidden="true"
					role="presentation"
					width="400"
					height="65"
				/>
				<span>Open for hire!</span>
			</div>
      <div className={styles.trees}></div>
			<div className={styles.bottom}>
				<div className={styles.container}>
					<p className={styles.made}>Made with <span className={styles.heart} title="love">♥</span> in Seattle</p>
					<p className={styles.signature}>
						<Logo title="Bootsified Signature" aria-hidden="true" focusable="false" />
					</p>
				</div>
			</div>
			<div className={styles.sasquatch}>
				<div className={styles.slice}>
					<Image
						src="/images/sasquatch-living-room-left.png"
						alt="A front door, leading into the left side of an illustrated living room, containing a comfy chair, lamp, and plant on the floor."
						width="156"
						height="93"
					/>
				</div>
				<div className={styles.slice}>
					<Image
						src="/images/sasquatch-jogging-cropped.gif"
						alt="A friendly sasquatch jogging on a treadmill."
						width="90"
						height="90"
					/>
				</div>
				<div className={styles.slice}>
					<Image
						src="/images/sasquatch-living-room-right.png"
						alt="The right side of the living room, featuring a vintage TV on an entertainment stand, and a couple plants."
						width="100"
						height="93"
					/>
				</div>
			</div>
    </footer>
  )
}

export default Footer
