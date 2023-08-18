export const deleteEvent = async (id: string) => {
	const response = await fetch('/api/events/delete-event?id=' + id, {
		method: 'DELETE',
	})

	const data = await response.json()

	if (!data) {
		return { message: 'Something went wrong' }
	}

	return data
}
