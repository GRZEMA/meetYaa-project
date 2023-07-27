import Lottie from 'lottie-react'
import meetingAnimation from '../../public/lottie/meeting.json'
import virtualMeetingAnimation from '../../public/lottie/virtualMeeting.json'

import Button from '../UI/Button'

import classes from './Header.module.scss'

const Header = (): JSX.Element => {
	const customBtnStyle = {
		position: 'absolute',
		bottom: '1.5rem',
	}

	return (
		<header className={classes.header}>
			<h1>Meet new friend near you!</h1>
			<div className={classes.animations}>
				<div className={classes['animation-box']}>
					<Lottie
						animationData={virtualMeetingAnimation}
						className={classes.animation}
						style={{ height: 180 }}
					/>
					<p>Meet new friends!</p>
				</div>
				<div className={classes['animation-box']}>
					<p>Find new opportunities!</p>
					<Lottie
						animationData={meetingAnimation}
						className={classes.animation}
						style={{ height: 240 }}
					/>
				</div>
			</div>
			<Button
				onClick={() => {}}
				text='EXPLORE'
				customStyle={customBtnStyle}></Button>
		</header>
	)
}

export default Header
