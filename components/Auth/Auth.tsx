import classes from './Auth.module.scss'
import AuthForm from './AuthForm'
import Lottie from 'lottie-react'
import someKindGuyAnimation from '@/public/lottie/someKindGuy.json'
import formAnimation from '@/public/lottie/formSubmit.json'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import { ModalContext } from '@/store/modal-context'

const Auth = (): JSX.Element => {
	const { isOpen, message, title, type, closeFunction, errors } =
		useContext(ModalContext)

	return (
		<section className={classes['auth-section']}>
			{isOpen && (
				<Modal
					message={message}
					title={title}
					type={type}
					onClose={closeFunction}
					errors={errors}
				/>
			)}
			<div className={classes.formAnimation}>
				<Lottie animationData={formAnimation} />
			</div>
			<AuthForm />
			<div className={classes.guyAnimation}>
				<Lottie animationData={someKindGuyAnimation} />
			</div>
		</section>
	)
}

export default Auth
