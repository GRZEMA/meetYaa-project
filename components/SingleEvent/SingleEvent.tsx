import Heading from '../UI/Heading'
import EventDetail from './EventDetail'
import EventLocation from './EventLocation'

import classes from './SingleEvent.module.scss'

const SingleEvent = (): JSX.Element => {
	return (
		<section className={classes['event-box']}>
			<EventLocation />
			<EventDetail />
		</section>
	)
}

export default SingleEvent
