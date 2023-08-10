import { EventModel } from '@/types/EventModel'
import classes from './UserProfileEvents.module.scss'

interface UserProfileEventsProps {
	events: EventModel[]
}

const UserProfileEvents = ({ events }: UserProfileEventsProps): JSX.Element => {
	return (
		<ul>
			{events.map((event) => (
				<li key={event._id}>
					<div className={classes['event-image']}>IMG</div>
					<div className={classes['event-info']}>
						<h3>{event.title}</h3>
						<p>{event.briefDescription}</p>
					</div>
				</li>
			))}
		</ul>
	)
}

export default UserProfileEvents
