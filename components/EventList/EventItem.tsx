import Image from 'next/image'
import classes from './EventItem.module.scss'
import Link from 'next/link'

interface EventItemProps {
	eventName: string
	eventDate: string
	eventImage: string
	briefDescription: string
}

const EventItem = ({
	eventName,
	eventDate,
	eventImage,
	briefDescription,
}: EventItemProps): JSX.Element => {
	return (
		<div className={classes.event}>
			<div className={classes['event-image']}>
				<Image src={eventImage} alt={eventName} fill />
			</div>
			<div className={classes['event-description']}>
				<h3 className={classes.name}>{eventName}</h3>
				<p>
					<time className={classes.date}>{eventDate}</time>
				</p>
				<p className={classes.description}>{briefDescription}</p>
				<Link href={`/events/${'event-id-here'}`}>
					<button className={classes['more-btn']}>More</button>
				</Link>
			</div>
		</div>
	)
}

export default EventItem
