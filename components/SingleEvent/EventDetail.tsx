import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { PaymentContext } from '@/store/payment-context'

import classes from './EventDetail.module.scss'

import { Exo } from 'next/font/google'
const exo = Exo({ subsets: ['latin-ext'] })

interface EventDetailProps {
	title: string
	description: string
	date: string
	ticketPrice: number
	location: string
	id: string
	userData: any
}

const EventDetail = ({
	title,
	description,
	date,
	location,
	ticketPrice,
	id,
	userData,
}: EventDetailProps): JSX.Element => {
	const [detailsActive, setDetailsActive] = useState(true)
	const [userSigned, setUserSigned] = useState(false)

	const router = useRouter()
	const session = useSession()
	const paymentCtx = useContext(PaymentContext)

	const setDetailsActiveHandler = () => {
		setDetailsActive(true)
	}

	const setDetailsNotActiveHandler = () => {
		setDetailsActive(false)
	}

	const signUpHandler = async () => {
		if (session.status === 'unauthenticated') {
			router.push('/auth')
			return
		}

		// signup for event logic

		paymentCtx.updateUsername(session.data!.user!.name!)
		paymentCtx.updateEventId(id)

		router.push('/dummy-pay')
	}

	useEffect(() => {
		if (userData?.signedEvents.some((eventId: string) => eventId === id)) {
			setUserSigned(true)
		}
	}, [userData, id])

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
					{detailsActive ? (
						<>
							<p>{description}</p>
							<p className={classes.ticket}>
								Ticket price: {ticketPrice === 0 ? 'FREE' : ticketPrice + '$'}
							</p>
						</>
					) : (
						<p>ORGANIZER INFO</p>
					)}
				</div>
			</div>
			<button
				className={classes.signup + ' ' + exo.className}
				onClick={userSigned ? undefined : signUpHandler}
				disabled={userSigned}>
				{userSigned ? 'Already signed up' : 'Sign up'}
			</button>
		</div>
	)
}

export default EventDetail
