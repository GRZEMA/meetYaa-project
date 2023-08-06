import axios from 'axios'

export const registerHandler = async (
	userName: string,
	userPassword: string
) => {
	const res = axios
		.post('/api/auth/signup', { userName, userPassword })
		.then((res) => res)
		.catch((err) => err)

	return res
}
