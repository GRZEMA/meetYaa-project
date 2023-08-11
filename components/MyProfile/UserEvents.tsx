import { EventModel } from '@/types/EventModel'
import classes from './UserEvents.module.scss'
import { useState } from 'react'
import EventsList from './EventsList'

interface UserEventsProps {
	events: EventModel[]
}

const UserEvents = ({ events }: UserEventsProps) => {
	const [isShowMore, setIsShowMore] = useState(false)

	return (
		<div className={classes.events}>
			<h2>My Events</h2>
			<EventsList events={events} isShowMore={isShowMore} />
			{events.length > 1 && (
				<button
					className={classes['more-btn']}
					onClick={() => {
						setIsShowMore((prev) => !prev)
					}}>
					{isShowMore ? 'Show less' : 'Show more'}
				</button>
			)}
		</div>
	)
}

export default UserEvents
