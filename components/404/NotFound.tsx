import Image from 'next/image'
import Link from 'next/link'

import classes from './NotFound.module.scss'

const NotFound = (): JSX.Element => {
	return (
		<section className={classes.section}>
			<div className={classes.wrapper}>
				<div className={classes.image}>
					<Image src='/images/not-found.png' alt='Not found' fill />
				</div>
				<div className={classes.text}>
					<h1>Look what you&apos;ve done!</h1>
					<p>The Page is DEAD!</p>
					<p>
						The only way from here is <Link href='/'>Home Page!</Link>
					</p>
				</div>
			</div>
		</section>
	)
}

export default NotFound
