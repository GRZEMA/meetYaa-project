import { hash } from 'bcryptjs'

export const encryptPassword = async (password: string) => {
	const hashedPassword = await hash(password, 12)
	return hashedPassword
}
