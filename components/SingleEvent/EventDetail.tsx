import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'

import { PaymentContext } from '@/store/context/payment-context'

import classes from './EventDetail.module.scss'

import { Exo } from 'next/font/google'
import { UserModel } from '@/types/UserModel'
import { UpdateModalContext } from '@/store/context/update-modal-context'
const exo = Exo({ subsets: ['latin-ext'] })

interface EventDetailProps {
	title: string
	description: string
	date: string
	ticketPrice: number
	location: string
	id: string
	userData: UserModel
	organizerData: UserModel
}

const EventDetail = ({
	title,
	description,
	date,
	location,
	ticketPrice,
	id,
	userData,
	organizerData,
}: EventDetailProps): JSX.Element => {
	const [detailsActive, setDetailsActive] = useState(true)
	const [userSigned, setUserSigned] = useState(false)
	const [loading, setLoading] = useState(false)

	const session = useSession()
	const { status } = session

	const router = useRouter()
	const paymentCtx = useContext(PaymentContext)

	const { openFunction } = useContext(UpdateModalContext)

	const setDetailsActiveHandler = () => {
		setDetailsActive(true)
	}

	const setDetailsNotActiveHandler = () => {
		setDetailsActive(false)
	}

	const signUpHandler = async () => {
		const session = await getSession()
		setLoading(true)

		if (status === 'unauthenticated') {
			setLoading(false)
			router.push('/auth')
			return
		}

		// signup for event logic
		setLoading(false)
		paymentCtx.updateUsername(session!.user!.name!)
		paymentCtx.updateEventId(id)

		router.push('/dummy-pay')
	}

	useEffect(() => {
		if (userData?.signedEvents?.some((eventId: string) => eventId === id)) {
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
						<p>Organizer</p>
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
						<>
							<p>Organizer Name: {organizerData.userName}</p>
							<p>
								Contact Email:{' '}
								{organizerData.email ? organizerData.email : 'not set'}
							</p>
						</>
					)}
				</div>
			</div>
			{session?.data?.user?.name === organizerData.userName ? (
				<button
					className={classes.btn + ' ' + exo.className}
					onClick={() => {
						openFunction('event')
					}}>
					Edit your Event
				</button>
			) : (
				<button
					className={classes.btn + ' ' + exo.className}
					onClick={userSigned ? undefined : signUpHandler}
					disabled={userSigned}>
					{userSigned ? 'Already signed up' : 'Sign up'}
				</button>
			)}
		</div>
	)
}

export default EventDetail
