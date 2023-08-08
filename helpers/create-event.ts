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
	const res = axios
		.post('/api/events/create', {
			title,
			location,
			date,
			time,
			image,
			description,
			briefDescription,
			username,
			ticketPrice,
		})
		.then((res) => res)
		.catch((err) => err)

	return res
}
