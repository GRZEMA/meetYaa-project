import { useRef } from 'react'
import classes from './UpdateModal.module.scss'

import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin-ext'] })

interface ModalProps {
	label?: string
	onClose?: () => void
}

const UpdateModal = ({ onClose, label }: ModalProps): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div className={classes.backdrop + ' ' + exo.className} onClick={onClose}>
			<div className={classes.modal}>
				<h2>Update your {label}</h2>
				<div className={classes.input}>
					<label htmlFor=''>{'new ' + label + ':'}</label>
					<input type='text' className={exo.className} ref={inputRef} />
				</div>
				<div className={classes.btns}>
					<button>Submit</button>
					<button onClick={onClose} className={exo.className}>
						Close
					</button>
				</div>
			</div>
		</div>
	)
}

export default UpdateModal
