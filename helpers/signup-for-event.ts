export const signUpForEvent = async (eventId: string, username: string) => {
	const response = await fetch('/api/events/signup-for-event', {
		method: 'POST',
		body: JSON.stringify({ username, eventId }),
	})

	return response
}
