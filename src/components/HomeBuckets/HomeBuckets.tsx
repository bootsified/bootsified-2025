import React from 'react'
import Image from 'next/image'
import styles from './HomeBuckets.module.css'
import adhdImage from '@public/images/services-art-adhd-new.png'
import burnoutImage from '@public/images/services-art-burnout-new.png'
import relationshipsImage from '@public/images/services-art-relationships-new.png'
import traumaImage from '@public/images/services-art-trauma-new.png'
import religionImage from '@public/images/services-art-religion-new.png'
import Link from 'next/link'

const HomeBuckets = () => {
	return (
		<div className={styles.container}>
			<div className={styles.buckets}>

				<div className={styles.bucket}>
					<Link href="/services#adhd-autism-therapy" className={styles.image}>
						<Image
							src={adhdImage}
							alt="An abstract illustration representing ADHD and Autism Therapy"
							sizes="50vw"
						/>
						<div className={styles.caption}>
							<h2>ADHD &amp; Autism Therapy</h2>
							<h3>When your brain feels like 27 tabs open at once...</h3>
						</div>
					</ Link>
					<div className={styles.content}>
						<p>Neurodivergent therapy that helps you focus, follow through, and stop beating yourself up.</p>
						<p><Link className={styles.link} href="/services#adhd-autism-therapy">ADHD &amp; Autism Therapy <span>&rarr;</span></Link></p>
					</div>
				</div>

				<div className={styles.bucket}>
					<Link href="/services#trauma-therapy" className={styles.image}>
						<Image
							src={traumaImage}
							alt="An abstract illustration representing Trauma Therapy"
							sizes="50vw"
						/>
						<div className={styles.caption}>
							<h2>Trauma Therapy</h2>
							<h3>When old wounds just will not stay in the past...</h3>
						</div>
					</Link>
					<div className={styles.content}>
						<p>Evidence-based trauma therapy to reprocess memories and feel safe again.</p>
						<p><Link className={styles.link} href="/services#trauma-therapy">Trauma Therapy <span>&rarr;</span></Link></p>
					</div>
				</div>		

				<div className={styles.bucket}>
					<Link href="/services#attachment-relationship-work" className={styles.image}>
						<Image
							src={relationshipsImage}
							alt="An abstract illustration representing Attachment & Relationship Work"
							sizes="50vw"
						/>
						<div className={styles.caption}>
							<h2>Attachment &amp; Relationship Work</h2>
							<h3>When connection feels confusing, draining, or unsafe...</h3>
						</div>
					</Link>
					<div className={styles.content}>
						<p>Therapy to untangle people-pleasing, build boundaries, and create healthier connections.</p>
						<p><Link className={styles.link} href="/services#attachment-relationship-work">Attachment &amp; Relationship Work <span>&rarr;</span></Link></p>
					</div>
				</div>

				<div className={styles.bucket}>
					<Link href="/services#burnout-life-transitions" className={styles.image}>
						<Image
							src={burnoutImage}
							alt="An abstract illustration representing Burnout & Life Transitions"
							sizes="50vw"
						/>
						<div className={styles.caption}>
							<h2>Burnout &amp; Life&nbsp;Transitions</h2>
							<h3>When you&rsquo;ve been holding it all together for too long...</h3>
						</div>
					</Link>
					<div className={styles.content}>
						<p>Support for burnout, caregiving, parenting, faith shifts, and life changes.</p>
						<p><Link className={styles.link} href="/services#burnout-life-transitions">Burnout &amp; Life Transitions <span>&rarr;</span></Link></p>
					</div>	
				</div>

				<div className={styles.bucket}>
					<Link href="/services#faith-transitions-religious-trauma" className={styles.image}>
						<Image
							src={religionImage}
							alt="An abstract illustration representing Faith Transitions & Religious Trauma"
							sizes="50vw"
						/>
						<div className={styles.caption}>
							<h2>Faith Transitions &amp; Religious Trauma</h2>
							<h3>When the faith that was supposed to save you... hurt you instead</h3>
						</div>
					</Link>
					<div className={styles.content}>
						<p>Compassionate support for deconstruction, rebuilding, and healing from spiritual abuse.</p>
						<p><Link className={styles.link} href="/services#faith-transitions-religious-trauma">Faith Transitions &amp; Religious Trauma <span>&rarr;</span></Link></p>
					</div>	
				</div>

			</div>
		</div>
	)
}

export default HomeBuckets