import { getSession } from 'next-auth/react'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Dispatch, FormEvent, SetStateAction, useRef } from 'react'

import classes from './EventUpdate.module.scss'
import { EventModel } from '@/types/EventModel'

interface EventUpdateProps {
	exo: NextFont
	onClose: () => void
	setMessage: Dispatch<SetStateAction<string | undefined>>
	eventInformations: EventModel
}

const EventUpdate = ({
	exo,
	onClose,
	setMessage,
	eventInformations,
}: EventUpdateProps): JSX.Element => {
	const {
		briefDescription,
		date,
		description,
		image,
		location,
		ticketPrice,
		time,
		title,
		_id,
	} = eventInformations

	const briefDescriptionRef = useRef<HTMLInputElement>(null)
	const dateRef = useRef<HTMLInputElement>(null)
	const descriptionRef = useRef<HTMLTextAreaElement>(null)
	const imageRef = useRef<HTMLInputElement>(null)
	const locationRef = useRef<HTMLInputElement>(null)
	const ticketPriceRef = useRef<HTMLInputElement>(null)
	const timeRef = useRef<HTMLInputElement>(null)
	const titleRef = useRef<HTMLInputElement>(null)

	const submitHandler = async (e: FormEvent) => {
		const briefDescription = briefDescriptionRef.current?.value
		const date = dateRef.current?.value
		const description = descriptionRef.current?.value
		const image = imageRef.current?.value
		const location = locationRef.current?.value
		const ticketPrice = ticketPriceRef.current?.value
		const time = timeRef.current?.value
		const title = titleRef.current?.value

		e.preventDefault()
		const session = await getSession()

		if (!session) {
			setMessage('You need to be logged in to update an event!')
		}

		const response = await fetch('/api/events/update-event', {
			method: 'PATCH',
			body: JSON.stringify({
				briefDescription,
				date,
				description,
				image,
				location,
				ticketPrice,
				time,
				title,
				id: _id,
			}),
		})

		if (response.status !== 200) {
			setMessage('Something went wrong!')
		}

		setMessage('Event updated!')
	}

	return (
		<>
			<h2>Update your Event!</h2>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.wrapper}>
					<div className={classes['form-slice']}>
						<div className={classes.input}>
							<label htmlFor='title'>Title: </label>
							<input
								type='text'
								id='title'
								defaultValue={title}
								className={exo.className}
								ref={titleRef}
							/>
						</div>
						<div className={classes.input}>
							<label htmlFor='location'>Location: </label>
							<input
								type='text'
								id='location'
								defaultValue={location}
								className={exo.className}
								ref={locationRef}
							/>
						</div>
						<div className={classes.input}>
							<label htmlFor='image'>Image: </label>
							<input
								type='text'
								id='image'
								defaultValue={image}
								className={exo.className}
								ref={imageRef}
							/>
						</div>
						<div className={classes.input}>
							<label htmlFor='description'>Description: </label>
							<textarea
								id='description'
								defaultValue={description}
								className={exo.className}
								ref={descriptionRef}
							/>
						</div>
					</div>
					<div className={classes['form-slice']}>
						<div className={classes.input}>
							<label htmlFor='date'>Date: </label>
							<input
								type='date'
								id='date'
								defaultValue={date}
								className={exo.className}
								ref={dateRef}
							/>
						</div>
						<div className={classes.input}>
							<label htmlFor='time'>Time: </label>
							<input
								type='time'
								id='time'
								defaultValue={time}
								className={exo.className}
								ref={timeRef}
							/>
						</div>
						<div className={classes.input}>
							<label htmlFor='brief-description'>Brief description: </label>
							<input
								type='text'
								id='brief-description'
								defaultValue={briefDescription}
								className={exo.className}
								ref={briefDescriptionRef}
							/>
						</div>
						<div className={classes.input}>
							<label htmlFor='price'>Price: </label>
							<input
								type='number'
								id='price'
								defaultValue={ticketPrice}
								className={exo.className}
								ref={ticketPriceRef}
							/>
						</div>
					</div>
				</div>
				<div className={classes.btns}>
					<button className={exo.className} onClick={onClose}>
						Cancel
					</button>
					<button className={exo.className} type='submit'>
						Confirm
					</button>
				</div>
			</form>
		</>
	)
}

export default EventUpdate
