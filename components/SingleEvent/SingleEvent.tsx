import { EventModel } from '@/types/EventModel'
import Heading from '../UI/Heading'
import EventDetail from './EventDetail'
import EventLocation from './EventLocation'

import classes from './SingleEvent.module.scss'

interface SingleEventProps {
	event: EventModel
	userData: any
}

const SingleEvent = ({ event, userData }: SingleEventProps): JSX.Element => {
	return (
		<section className={classes['event-box']}>
			<EventLocation
				location={event.location}
				image={event.image}
				briefDescription={event.briefDescription}
			/>
			<EventDetail
				id={event._id}
				title={event.title}
				description={event.description}
				date={event.date}
				location={event.location}
				ticketPrice={event.ticketPrice}
				userData={userData}
			/>
		</section>
	)
}

export default SingleEvent
