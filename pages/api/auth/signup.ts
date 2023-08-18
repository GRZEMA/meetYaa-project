import { connectToMongoDB } from '@/helpers/db'
import { encryptPassword } from '@/helpers/auth-helpers'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const {
			userName,
			userPassword,
		}: { userName: string; userPassword: string } = JSON.parse(req.body)
		
		let db
		try {
			const client = await connectToMongoDB()
			db = client.db('auth')
		} catch {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		const existingUser = await db
			.collection('users')
			.findOne({ userName: userName })

		if (existingUser) {
			res.status(422).json({ message: 'User already exists' })
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
			return
		}

		const hashedPassword = await encryptPassword(userPassword)

		await db.collection('users').insertOne({
			userName,
			hashedPassword,
			ownedEvents: [],
			signedEvents: [],
			email: '',
			profilePicture: '',
		})

		res.status(201).json({ message: 'Successfully created user!' })
	}
}

export default handler
