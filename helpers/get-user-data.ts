import { UserModel } from '@/types/UserModel'

interface responseUserData {
	message: string
	userData?: UserModel
}

export const getUserData = async (username: string) => {
	const response = await fetch(
		'http://localhost:3000/api/user/get-user-data?username=' + username
	)

	const data = await response.json()

	if (!data.userData) {
		return { message: data.message, userData: undefined }
	}

	return data as responseUserData
}
