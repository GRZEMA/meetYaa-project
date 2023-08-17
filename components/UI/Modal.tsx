import classes from './Modal.module.scss'

import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin-ext'] })

interface ModalProps {
	title: string
	message: string
	errors?: { message: string }[]
	type: 'Information' | 'Error'
	onClose: () => void
}

const Modal = ({
	onClose,
	message,
	title,
	type,
	errors,
}: ModalProps): JSX.Element => {
	const h2Classes =
		type === 'Information' ? classes['info-title'] : classes['error-title']
	const messageClasses =
		type === 'Information' ? classes['info-msg'] : classes['error-msg']

	return (
		<div className={classes.backdrop + ' ' + exo.className} onClick={onClose}>
			<div
				className={classes.modal}
				onClick={(e) => {
					e.stopPropagation()
				}}>
				<h2 className={h2Classes}>{title}</h2>
				<p className={messageClasses}>{message}</p>
				{errors
					? errors.map((error) => <p key={error.message}>{error.message}</p>)
					: null}
				<button onClick={onClose} className={exo.className}>
					Close
				</button>
			</div>
		</div>
	)
}

export default Modal
