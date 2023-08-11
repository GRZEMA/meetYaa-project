import { EventModel } from '@/types/EventModel'
import Image from 'next/image'

import classes from './EventsList.module.scss'
import { useRouter } from 'next/router'

interface EventsListProps {
	events: EventModel[]
	isShowMore: boolean
}

const EventsList = ({ isShowMore, events }: EventsListProps): JSX.Element => {
	const router = useRouter()

	return (
		<ul className={classes.list}>
			{events.length === 0 ? (
				<div className={classes.error}>
					<p>Unfortunately there is nothing to be shown!</p>
				</div>
			) : isShowMore ? (
				events.map((event) => (
					<li
						key={event._id}
						className={classes.event}
						onClick={() => {
							router.push(`/events/${event._id}`)
						}}>
						<div className={classes.image}>
							<Image src={event.image} alt={event.briefDescription} fill />
						</div>
						<div className={classes.info}>
							<h3>{event.title}</h3>
							<p>{event.briefDescription}</p>
						</div>
					</li>
				))
			) : (
				<li
					key={events[0]._id}
					className={classes.event}
					onClick={() => {
						router.push(`/events/${events[0]._id}`)
					}}>
					<div className={classes.image}>
						<Image
							src={events[0].image}
							alt={events[0].briefDescription}
							fill
						/>
					</div>
					<div className={classes.info}>
						<h3>{events[0].title}</h3>
						<p>{events[0].briefDescription}</p>
					</div>
				</li>
			)}
		</ul>
	)
}

export default EventsList
