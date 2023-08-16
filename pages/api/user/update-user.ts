import { connectToMongoDB } from '@/helpers/db'
import { getServerSession } from 'next-auth'
import { NextApiHandler } from 'next/types'
import { authOptions } from '../auth/[...nextauth]'
import { encryptPassword } from '@/helpers/auth-helpers'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const { email, password, profilePic, username } = req.body

		const client = await connectToMongoDB()

		const db = client.db('users')

		const session = await getServerSession(req, res, authOptions)

		if (!session) {
			res.status(401).json({ message: 'Not authenticated' })
			return
		}

		if (email) {
			await db
				.collection('users')
				.updateOne({ userName: username }, { $set: { email: email } })

			res.status(200).json({ message: 'Email updated' })
			// Update email
		}

		if (password) {
			// Update password
			const encryptedPassword = encryptPassword(password)
			await db
				.collection('users')
				.updateOne(
					{ userName: username },
					{ $set: { password: encryptedPassword } }
				)
		}

		if (profilePic) {
			// Update profile picture
			await db
				.collection('users')
				.updateOne(
					{ userName: username },
					{ $set: { profilePicture: profilePic } }
				)
		}
	}
}

export default handler
