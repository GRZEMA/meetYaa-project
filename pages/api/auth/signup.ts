import { connectToMongoDB } from '@/helpers/db'
import { encryptPassword } from '@/helpers/auth-helpers'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
	const client = await connectToMongoDB()
	const db = client.db('auth')

	if (req.method === 'POST') {
		const {
			userName,
			userPassword,
		}: { userName: string; userPassword: string } = req.body

		const existingUser = await db
			.collection('users')
			.findOne({ userName: userName })

		if (existingUser) {
			res.status(422).json({ message: 'User already exists' })
			client.close()
			return
		}

		if (
			!userName ||
			userName.trim().length <= 0 ||
			!userPassword ||
			userPassword.trim().length <= 6
		) {
			res.status(422).json({
				message:
					'Unvalid credentials - password must also be at least 6 characters long',
			})
			client.close()
			return
		}

		const hashedPassword = await encryptPassword(userPassword)

		await db.collection('users').insertOne({ userName, hashedPassword })

		res.status(201).json({ message: 'Successfully created user!' })
		client.close()
	}
}

export default handler
