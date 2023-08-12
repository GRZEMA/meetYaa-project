import { UserModel } from '@/types/UserModel'
import { connectToMongoDB } from './db'

export const getUserData = async (username: string) => {
	const client = await connectToMongoDB()
	const db = client.db('auth')

	const result = await db
		.collection<UserModel>('users')
		.findOne({ userName: username })

	const userData = {
		...result,
		_id: result?._id.toString(),
	}

	return userData
}
