import { useState } from 'react'
import classes from './EventDetail.module.scss'

import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin-ext'] })

const EventDetail = (): JSX.Element => {
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
				<h1>EVENT NAME</h1>
				<p>EVENT DATE</p>
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
					{detailsActive ? (
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
							cupiditate voluptatem corrupti excepturi, sunt doloribus dolore
							nobis dolores sint a, eum nisi tempora iure hic optio autem modi
							aliquid cumque quidem et rerum illo rem accusantium. Adipisci
							blanditiis ipsam delectus.
						</p>
					) : (
						<p>ORGANIZER INFO</p>
					)}
				</div>
			</div>
			<button className={classes.signup + ' ' + exo.className}>Sign up!</button>
		</div>
	)
}

export default EventDetail
