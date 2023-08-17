import CreateEventForm from './CreateEventForm'

import Lottie from 'lottie-react'
import squareAnimation from '@/public/lottie/square.json'
import formAnimation from '@/public/lottie/form.json'

import classes from './CreateEvent.module.scss'
import { useContext } from 'react'
import { ModalContext } from '@/store/modal-context'
import Modal from '../UI/Modal'

const CreateEvent = (): JSX.Element => {
	const {
		isOpen,
		openFunction,
		setModalType,
		closeFunction,
		message,
		title,
		type,
		errors,
	} = useContext(ModalContext)
	return (
		<section className={classes['create-section']}>
			{isOpen && (
				<Modal
					onClose={closeFunction}
					message={message}
					title={title}
					type={type}
					errors={errors}
				/>
			)}
			<div className={classes['animation-one']}>
				<Lottie animationData={squareAnimation} />
			</div>
			<CreateEventForm
				openFunction={openFunction}
				setModalType={setModalType}
			/>
			<div className={classes['animation-two']}>
				<Lottie animationData={formAnimation} />
			</div>
		</section>
	)
}

export default CreateEvent
