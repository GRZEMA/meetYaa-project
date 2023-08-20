import { FormEvent, useRef, useState } from 'react'

import Heading from '../UI/Heading'
import classes from './CreateEventForm.module.scss'

import { Exo } from 'next/font/google'
import { validateEventForm } from '@/helpers/event-form-validator'
import { createEvent } from '@/helpers/create-event'
import { getSession } from 'next-auth/react'

const exo = Exo({ subsets: ['latin-ext'] })

interface CreateEventFormProps {
	openFunction: (
		title: string,
		message: string,
		errors?:
			| {
					message: string
			  }[]
			| undefined
	) => void
	setModalType: (type: 'Error' | 'Information') => void
}

const CreateEventForm = ({
	openFunction,
	setModalType,
}: CreateEventFormProps): JSX.Element => {
	const [loading, setLoading] = useState(false)
	const titleRef = useRef<HTMLInputElement>(null)
	const locationRef = useRef<HTMLInputElement>(null)
	const dateRef = useRef<HTMLInputElement>(null)
	const timeRef = useRef<HTMLInputElement>(null)
	const imageRef = useRef<HTMLInputElement>(null)
	const briefDescRef = useRef<HTMLInputElement>(null)
	const priceRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLTextAreaElement>(null)

	const formSubmissionHandler = async (e: FormEvent) => {
		setLoading(true)
		e.preventDefault()

		const session = await getSession()

		if (!session) {
			setModalType('Error')
			openFunction('Error', 'You need to be logged in to create an event!')
			setLoading(false)
			return
		}
		const username = session!.user!.name!

		const title = titleRef.current!.value
		const location = locationRef.current!.value
		const date = dateRef.current!.value
		const time = timeRef.current!.value
		const image = imageRef.current!.value
		const description = descriptionRef.current!.value
		const briefDescription = briefDescRef.current!.value
		const ticketPrice = priceRef.current!.value

		const errors = validateEventForm({
			title,
			location,
			date,
			time,
			image,
			description,
			briefDescription,
		})

		if (errors.length > 0) {
			setModalType('Error')
			openFunction('Error', 'Please fill all the fields correctly!', errors)
			setLoading(false)
			return
		}

		const res = await createEvent({
			title,
			location,
			date,
			time,
			image,
			description,
			briefDescription,
			username,
			ticketPrice: Number(ticketPrice),
		})

		if (res.status !== 200) {
			setModalType('Error')
			openFunction('Error', 'Something went wrong!')
			setLoading(false)
		}

		setModalType('Information')
		openFunction('Success!', 'Event succesfully created!')
		setLoading(false)

		titleRef.current!.value = ''
		locationRef.current!.value = ''
		dateRef.current!.value = ''
		timeRef.current!.value = ''
		imageRef.current!.value = ''
		descriptionRef.current!.value = ''
		briefDescRef.current!.value = ''
		priceRef.current!.value = ''
	}

	return (
		<div className={classes['form-box']}>
			<Heading text='Create Event!' id='create-event' />
			<form action='' className={classes.form} onSubmit={formSubmissionHandler}>
				<input
					type='text'
					placeholder='Event Title'
					className={exo.className}
					required
					ref={titleRef}
				/>
				<input
					type='text'
					placeholder='Event Location'
					className={exo.className}
					required
					ref={locationRef}
				/>
				<input
					type='date'
					className={exo.className}
					required
					ref={dateRef}
					onChange={() => {
						dateRef.current?.style.setProperty('color', '#0b2545')
					}}
				/>
				<input
					type='time'
					className={exo.className}
					required
					ref={timeRef}
					onChange={() => {
						timeRef.current?.style.setProperty('color', '#0b2545')
					}}
				/>
				<input
					type='url'
					placeholder='Link to Image'
					className={exo.className}
					required
					ref={imageRef}
				/>
				<input
					type='text'
					placeholder='Brief description'
					className={exo.className}
					required
					ref={briefDescRef}
				/>
				<input
					type='number'
					placeholder='Ticket price (0 if free)'
					className={exo.className}
					required
					ref={priceRef}
				/>
				<textarea
					placeholder='Event Description'
					className={exo.className}
					required
					ref={descriptionRef}
				/>
				<div className={classes.buttons}>
					<button type='submit' className={exo.className} disabled={loading}>
						{loading ? 'Loading...' : 'Submit'}
					</button>
					<button type='reset' className={exo.className}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateEventForm
