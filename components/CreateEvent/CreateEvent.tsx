import CreateEventForm from './CreateEventForm'

import Lottie from 'lottie-react'
import squareAnimation from '@/public/lottie/square.json'
import formAnimation from '@/public/lottie/form.json'

import classes from './CreateEvent.module.scss'

const CreateEvent = (): JSX.Element => {
	return (
		<section className={classes['create-section']}>
			<div className={classes['animation-one']}>
				<Lottie animationData={squareAnimation} />
			</div>
			<CreateEventForm />
			<div className={classes['animation-two']}>
				<Lottie animationData={formAnimation} />
			</div>
		</section>
	)
}

export default CreateEvent
