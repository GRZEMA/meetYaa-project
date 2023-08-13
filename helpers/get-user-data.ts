import { UserModel } from '@/types/UserModel'
import axios from 'axios'

interface responseUserData {
	message: string
	userData?: UserModel
}

export const getUserData = async (username: string) => {
	const response = await axios.get<responseUserData>(
		'http://localhost:3000/api/user/get-user-data',
		{
			params: { username },
		}
	)

	if (!response.data.userData) {
		return { message: response.data.message }
	}

	return response.data
}
