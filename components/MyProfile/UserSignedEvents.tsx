import { EventModel } from '@/types/EventModel'

import classes from './UserSignedEvents.module.scss'
import EventsList from './EventsList'
import { useState } from 'react'

interface UserSignedEventsProps {
	events: EventModel[]
}

const UserSignedEvents = ({ events }: UserSignedEventsProps): JSX.Element => {
	const [isShowMore, setIsShowMore] = useState(false)

	return (
		<div className={classes.events}>
			<h2>My Signed Events</h2>
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

export default UserSignedEvents
