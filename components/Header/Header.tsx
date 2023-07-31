import Lottie from 'lottie-react'

import meetingAnimation from '@/public/lottie/meeting.json'
import virtualMeetingAnimation from '@/public/lottie/virtualMeeting.json'

import { Exo } from 'next/font/google'

import classes from './Header.module.scss'

const exo = Exo({ subsets: ['latin-ext'] })

const Header = (): JSX.Element => {
	const scrollHandler = () => {
		const isMobile =
			!!navigator.userAgent.match(/iphone|android|blackberry/gi) || false
		const element = document.getElementById('featured')!
		if (isMobile) {
			window.scrollBy({ top: element.offsetTop - 100 - window.scrollY })
		} else {
			window.scrollBy({ top: element.offsetTop - 120 - window.scrollY })
		}
	}

	return (
		<header className={classes.header + ' ' + exo.className}>
			<div className={classes.wrapper}>
				<div className={classes.heading}>
					<h1>Meet new friend near you!</h1>
				</div>
				<div className={classes.animations}>
					<div className={classes.animation}>
						<div className={classes['animation-src']}>
							<Lottie
								animationData={meetingAnimation}
								style={{
									height: '100%',
								}}
							/>
						</div>
						<div className={classes['animation-text']}>
							<h2>Meet new friends!</h2>
						</div>
					</div>
					<div className={classes.animation}>
						<div className={classes['animation-src']}>
							<Lottie
								animationData={virtualMeetingAnimation}
								style={{ height: '100%' }}
							/>
						</div>
						<div className={classes['animation-text']}>
							<h2>Find new opportunities!</h2>
						</div>
					</div>
				</div>
				<button className={classes.explore} onClick={scrollHandler}>
					EXPLORE
				</button>
			</div>
		</header>
	)
}

export default Header
