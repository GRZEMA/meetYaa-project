import { EventModel } from '@/types/EventModel'
import classes from './Events.module.scss'
import { useEffect, useState } from 'react'
import EventsList from './EventsList'

interface UserEventsProps {
	events: EventModel[] | undefined
	title: string
}

const Events = ({ title, events }: UserEventsProps) => {
	const [isShowMore, setIsShowMore] = useState(false)

	return (
		<div className={classes.events}>
			<h2>{title}</h2>
			<EventsList events={events} isShowMore={isShowMore} />
			{events && events.length > 1 && (
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

export default Events
