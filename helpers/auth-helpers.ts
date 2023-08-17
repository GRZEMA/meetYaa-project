import { hash, compare } from 'bcryptjs'
import { connectToMongoDB } from './db'
import { getUserData } from './get-user-data'

export const encryptPassword = async (password: string) => {
	const hashedPassword = await hash(password, 12)
	return hashedPassword
}

export const comparePasswords = async (
	username: string,
	oldPassword: string
) => {
	const userData = await getUserData(username)
	const hashedPassword = userData.userData!.hashedPassword

	const passwordMatch = await compare(oldPassword, hashedPassword!)

	return passwordMatch
}
