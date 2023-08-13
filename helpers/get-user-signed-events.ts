import axios from 'axios'

export const getUserSignedEvents = async (username: string) => {
	// const response = await axios
	// 	.post('http://localhost:3000/api/user/get-user-signed-events', {
	// 		username: username,
	// 	})
	// 	.then((res) => res.data)
	// 	.catch((err) => err.response)

	const response = await fetch(
		'http://localhost:3000/api/user/get-user-signed-events?username=' + username
	)

	const data = await response.json()

	return data
}
