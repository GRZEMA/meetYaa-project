import axios from 'axios'

export const createEvent = async ({
	title,
	location,
	date,
	time,
	image,
	description,
	username,
}: {
	title: string
	location: string
	date: string
	time: string
	image: string
	description: string
	username: string
}) => {
	const res = axios
		.post('/api/events/create', {
			title,
			location,
			date,
			time,
			image,
			description,
			username,
		})
		.then((res) => res)
		.catch((err) => err)

	return res
}
