import { EventModel } from '@/types/EventModel'
import Heading from '../UI/Heading'
import EventDetail from './EventDetail'
import EventLocation from './EventLocation'

import classes from './SingleEvent.module.scss'
import Modal from '../UI/Modal'
import { useContext, useEffect } from 'react'
import { ModalContext } from '@/store/modal-context'
import { UserModel } from '@/types/UserModel'

interface SingleEventProps {
	event: EventModel
	userData: any
	organizerData: UserModel
}

const SingleEvent = ({
	event,
	userData,
	organizerData,
}: SingleEventProps): JSX.Element => {
	const {
		message,
		closeFunction,
		title,
		type,
		errors,
		isOpen,
		openFunction,
		setModalType,
	} = useContext(ModalContext)

	useEffect(() => {
		const firstSignup = localStorage.getItem('firstSignup')
		if (firstSignup) {
			setModalType('Information')
			openFunction('Welcome!', 'Thank you for signing up!')
			localStorage.removeItem('firstSignup')
		}
	}, [openFunction, setModalType])

	return (
		<section className={classes['event-box']}>
			<EventLocation
				location={event.location}
				image={event.image}
				briefDescription={event.briefDescription}
			/>
			<EventDetail
				id={event._id}
				title={event.title}
				description={event.description}
				date={event.date}
				location={event.location}
				ticketPrice={event.ticketPrice}
				userData={userData}
				organizerData={organizerData}
			/>
			{isOpen && (
				<Modal
					message={message}
					onClose={closeFunction}
					title={title}
					type={type}
					errors={errors}
				/>
			)}
		</section>
	)
}

export default SingleEvent
