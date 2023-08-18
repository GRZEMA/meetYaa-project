import { connectToMongoDB } from '@/helpers/db'
import { getServerSession } from 'next-auth'
import { NextApiHandler } from 'next/types'
import { authOptions } from '../auth/[...nextauth]'
import { encryptPassword } from '@/helpers/auth-helpers'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const { email, password, profilePic, username } = JSON.parse(req.body)

		let db
		try {
			const client = await connectToMongoDB()
			db = client.db('auth')
		} catch {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		const session = await getServerSession(req, res, authOptions)

		if (!session) {
			res.status(401).json({ message: 'Not authenticated' })
			return
		}

		if (email) {
			const response = await db
				.collection('users')
				.updateOne({ userName: username }, { $set: { email: email } })

			if (response.modifiedCount === 0) {
				res.status(422).json({ message: 'User not found' })
				return
			}

			res.status(200).json({ message: 'Email updated' })
			// Update email
		}

		if (password) {
			// Update password
			const encryptedPassword = await encryptPassword(password)
			const response = await db
				.collection('users')
				.updateOne(
					{ userName: username },
					{ $set: { hashedPassword: encryptedPassword } }
				)

			if (response.modifiedCount === 0) {
				res.status(422).json({ message: 'User not found' })
				return
			}

			res.status(200).json({ message: 'Password updated' })
		}

		if (profilePic) {
			// Update profile picture
			await db
				.collection('users')
				.updateOne(
					{ userName: username },
					{ $set: { profilePicture: profilePic } }
				)
			res.status(200).json({ message: 'Profile picture updated' })
		}
	}
}

export default handler
