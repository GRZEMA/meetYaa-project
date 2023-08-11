import axios from 'axios'

export const getUserEvents = async (username: string) => {
	const response = await axios
		.post('http://localhost:3000/api/user/get-user-events', {
			username: username,
		})
		.then((res) => res.data)
		.catch((err) => err.response)

	return response
}
