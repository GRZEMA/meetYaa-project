import { EventModel } from '@/types/EventModel'
import classes from './UserEvents.module.scss'

interface UserEventsProps {
	events: EventModel[]
}

const UserEvents = ({ events }: UserEventsProps) => {
	return (
		<div>
			<h2>My Events</h2>
			<ul>{/*dynamic event list here*/}</ul>
			{events.length > 1 && (
				<button className={classes['more-btn']}>Show more</button>
			)}
		</div>
	)
}

export default UserEvents
