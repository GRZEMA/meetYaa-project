import { useState } from 'react'
import { createPortal } from 'react-dom'
import classes from './UpdateModal.module.scss'

import { Exo } from 'next/font/google'
import CredentialsUpdate from './CredentialsUpdate'
import EventUpdate from './EventUpdate'
import { EventModel } from '@/types/EventModel'

const exo = Exo({ subsets: ['latin-ext'] })

interface ModalProps {
	label: string
	onClose: () => void
	type: 'credentials' | 'event'
	eventInformations?: EventModel
}

const UpdateModal = ({
	onClose,
	label,
	type,
	eventInformations,
}: ModalProps): JSX.Element => {
	const [message, setMessage] = useState<string | undefined>(undefined)

	return createPortal(
		<div className={classes.backdrop + ' ' + exo.className} onClick={onClose}>
			<div
				className={classes.modal}
				style={{ maxWidth: type === 'credentials' ? '500px' : '800px' }}
				onClick={(e) => {
					e.stopPropagation()
				}}>
				{message ? (
					<>
						<h2>{message}</h2>
						<div className={classes.btns}>
							<button onClick={onClose} className={exo.className}>
								Close
							</button>
						</div>
					</>
				) : type === 'credentials' ? (
					<CredentialsUpdate
						classes={classes}
						exo={exo}
						label={label}
						onClose={onClose}
						setMessage={setMessage}
					/>
				) : (
					eventInformations && (
						<EventUpdate
							exo={exo}
							onClose={onClose}
							setMessage={setMessage}
							eventInformations={eventInformations}
						/>
					)
				)}
			</div>
		</div>,
		document.getElementById('modals')!
	)
}

export default UpdateModal
