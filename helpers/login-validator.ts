export const validateLoginForm = (username: string, password: string) => {
	const errors = []

	if (username.trim() === '') {
		errors.push({
			message: 'Username is required!',
		})
	}

	if (password.trim() === '') {
		errors.push({
			message: 'Password is required!',
		})
	}

	if (password.includes(' ')) {
		errors.push({
			message: 'Password cannot contain spaces!',
		})
	}

	if (password.trim().length < 6) {
		errors.push({
			message: 'Password must be at least 6 characters long!',
		})
	}

	return errors
}