import { EventModel } from '@/types/EventModel'
import Heading from '../UI/Heading'
import EventDetail from './EventDetail'
import EventLocation from './EventLocation'

import classes from './SingleEvent.module.scss'
import Modal from '../UI/Modal'
import { useContext, useEffect } from 'react'
import { ModalContext } from '@/store/context/modal-context'
import { UserModel } from '@/types/UserModel'
import { UpdateModalContext } from '@/store/context/update-modal-context'
import UpdateModal from '../UI/UpdateModal'

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
		closeFunction: closeMessageModal,
		title,
		type,
		errors,
		isOpen: isOpenMessageModal,
		openFunction: openMessageModal,
		setModalType,
	} = useContext(ModalContext)

	const {
		closeFunction: closeUpdateModal,
		isOpen: isOpenUpdateModal,
		label,
	} = useContext(UpdateModalContext)

	useEffect(() => {
		const firstSignup = localStorage.getItem('firstSignup')
		if (firstSignup) {
			setModalType('Information')
			openMessageModal('Welcome!', 'Thank you for signing up!')
			localStorage.removeItem('firstSignup')
		}
	}, [openMessageModal, setModalType])

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
			{isOpenMessageModal && (
				<Modal
					message={message}
					onClose={closeMessageModal}
					title={title}
					type={type}
					errors={errors}
				/>
			)}
			{isOpenUpdateModal && (
				<UpdateModal
					label={label}
					onClose={closeUpdateModal}
					type='event'
					eventInformations={event}
				/>
			)}
		</section>
	)
}

export default SingleEvent
