import { useState } from 'react'
import classes from './EventDetail.module.scss'

import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin-ext'] })

interface EventDetailProps {
	title: string
	description: string
	date: string
	ticketPrice: number
	location: string
}

const EventDetail = ({
	title,
	description,
	date,
	location,
	ticketPrice,
}: EventDetailProps): JSX.Element => {
	const [detailsActive, setDetailsActive] = useState(true)

	const setDetailsActiveHandler = () => {
		setDetailsActive(true)
	}

	const setDetailsNotActiveHandler = () => {
		setDetailsActive(false)
	}

	return (
		<div className={classes['details-container']}>
			<div className={classes.heading}>
				<h1>{title}</h1>
				<p>{date}</p>
				<p>Address: {location}</p>
			</div>
			<nav className={classes.nav}>
				<ul>
					<li
						className={detailsActive ? classes.active : undefined}
						onClick={setDetailsActiveHandler}>
						<p>Details</p>
					</li>
					<li
						className={detailsActive ? undefined : classes.active}
						onClick={setDetailsNotActiveHandler}>
						<p>Organizer Info</p>
					</li>
				</ul>
			</nav>
			<div className={classes['event-details-box']}>
				<div className={classes['event-details-content']}>
					{detailsActive ? <p>{description}</p> : <p>ORGANIZER INFO</p>}
				</div>
			</div>
			<button className={classes.signup + ' ' + exo.className}>Sign up!</button>
		</div>
	)
}

export default EventDetail
