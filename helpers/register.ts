export const registerHandler = async (
	userName: string,
	userPassword: string
) => {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ userName, userPassword }),
	})

	return response
}
