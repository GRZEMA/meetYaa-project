export const getUserSignedEvents = async (username: string) => {
	const response = await fetch(
		'http://localhost:3000/api/user/get-user-signed-events?username=' + username
	)

	const data = await response.json()

	return data
}
