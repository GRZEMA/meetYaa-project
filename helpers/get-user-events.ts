export const getUserEvents = async (username: string) => {
	const response = await fetch('/api/user/get-user-events?username=' + username)
	const data = await response.json()

	return data
}
