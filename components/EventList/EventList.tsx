import { EventModel } from '@/types/EventModel'
import EventItem from './EventItem'

import classes from './EventList.module.scss'

interface EventListProps {
	events: EventModel[]
}

const EventList = ({ events }: EventListProps): JSX.Element => {
	return (
		<>
			{events.length === 0 ? (
				<p className={classes['not-found']}>
					Unfortunately, no events could be found with specific criteria
				</p>
			) : (
				<ul className={classes.events}>
					{events.map((event) => (
						<EventItem
							eventName={event.title}
							briefDescription={event.briefDescription}
							eventDate={event.date}
							eventImage={event.image}
							key={event._id}
							eventId={event._id}
						/>
					))}
				</ul>
			)}
		</>
	)
}

export default EventList
