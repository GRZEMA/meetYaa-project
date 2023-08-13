import axios from 'axios'

export const createEvent = async ({
	title,
	location,
	date,
	time,
	image,
	description,
	briefDescription,
	username,
	ticketPrice,
}: {
	title: string
	location: string
	date: string
	time: string
	image: string
	description: string
	briefDescription: string
	username: string
	ticketPrice: number
}) => {
	const res = await fetch('http://localhost:3000/api/events/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title,
			location,
			date,
			time,
			image,
			description,
			briefDescription,
			username,
			ticketPrice,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			return { data: data }
		})
		.catch((err) => err)

	return res
}
