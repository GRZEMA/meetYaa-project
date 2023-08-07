import { EventModel } from '@/types/EventModel'
import Heading from '../UI/Heading'
import EventDetail from './EventDetail'
import EventLocation from './EventLocation'

import classes from './SingleEvent.module.scss'

interface SingleEventProps {
	event: EventModel
}

const SingleEvent = ({ event }: SingleEventProps): JSX.Element => {
	return (
		<section className={classes['event-box']}>
			<EventLocation
				location={event.location}
				image={event.image}
				briefDescription={event.briefDescription}
			/>
			<EventDetail
				title={event.title}
				description={event.description}
				date={event.date}
				location={event.location}
				ticketPrice={event.ticketPrice}
			/>
		</section>
	)
}

export default SingleEvent
