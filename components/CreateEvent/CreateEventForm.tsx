import { FormEvent, useRef } from 'react'

import Heading from '../UI/Heading'
import classes from './CreateEventForm.module.scss'

import { Exo } from 'next/font/google'
import { validateEventForm } from '@/helpers/event-form-validator'
import { createEvent } from '@/helpers/create-event'

const exo = Exo({ subsets: ['latin-ext'] })

const CreateEventForm = (): JSX.Element => {
	const titleRef = useRef<HTMLInputElement>(null)
	const locationRef = useRef<HTMLInputElement>(null)
	const dateRef = useRef<HTMLInputElement>(null)
	const timeRef = useRef<HTMLInputElement>(null)
	const imageRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLTextAreaElement>(null)

	const formSubmissionHandler = async (e: FormEvent) => {
		e.preventDefault()
		const title = titleRef.current!.value
		const location = locationRef.current!.value
		const date = dateRef.current!.value
		const time = timeRef.current!.value
		const image = imageRef.current!.value
		const description = descriptionRef.current!.value

		const errors = validateEventForm({
			title,
			location,
			date,
			time,
			image,
			description,
		})

		if (errors.length > 0) {
			console.log(errors)
			return
		}

		const res = await createEvent({
			title,
			location,
			date,
			time,
			image,
			description,
		})

		console.log(res)
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
				<input type='date' className={exo.className} required ref={dateRef} />
				<input type='time' className={exo.className} required ref={timeRef} />
				<input
					type='text'
					placeholder='Link to Image'
					className={exo.className}
					required
					ref={imageRef}
				/>
				<textarea
					placeholder='Event Description'
					className={exo.className}
					required
					ref={descriptionRef}
				/>
				<div className={classes.buttons}>
					<button type='submit' className={exo.className}>
						Submit
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
