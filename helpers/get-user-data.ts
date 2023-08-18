import { UserModel } from '@/types/UserModel'

export interface responseUserData {
	message: string
	userData?: UserModel
}

export const getUserData = async (username: string) => {
	const response = await fetch(
		'https://meet-yaa-project.vercel.app/api/user/get-user-data?username=' +
			username
	)

	const data = await response.json()

	if (!data.userData) {
		return { message: data.message, userData: undefined } as responseUserData
	}

	return data as responseUserData
}
