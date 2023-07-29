import Image from 'next/image'

import Button from '../UI/Button'

import classes from './EventItem.module.scss'

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
			<div className={classes['event-description']}>
				<h3>{eventName}</h3>
				<p>
					<time>{eventDate}</time>
				</p>
				<p>{briefDescription}</p>
				<Button text='More...' onClick={() => {}} />
			</div>
			<div className={classes['event-image']}>
				<Image src={eventImage} alt={eventName} height={100} width={100} />
			</div>
		</div>
	)
}

export default EventItem
