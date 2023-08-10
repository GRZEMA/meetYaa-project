import axios from 'axios'

export const signUpForEvent = async (eventId: string, username: string) => {
	const response = axios
		.post('/api/events/signup-for-event', { username, eventId })
		.then((res) => res)
		.catch((err) => err)

	return response
}
