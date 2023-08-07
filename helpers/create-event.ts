import axios from 'axios'

export const createEvent = async ({
	title,
	location,
	date,
	time,
	image,
	description,
}: {
	title: string
	location: string
	date: string
	time: string
	image: string
	description: string
}) => {
	const res = axios
		.post('/api/events/create', {
			title,
			location,
			date,
			time,
			image,
			description,
		})
		.then((res) => res)
		.catch((err) => err)

	return res
}
