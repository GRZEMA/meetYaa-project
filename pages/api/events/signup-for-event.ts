import { connectToMongoDB } from '@/helpers/db'
import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions)

		if (!session) {
			res.status(401).json({ message: 'Unauthorized user.' })
			return
		}

		const { username, eventId } = JSON.parse(req.body)

		if (!username) {
			res.status(422).json({ message: 'Invalid user.' })
			return
		}

		let db
		try {
			const client = await connectToMongoDB()
			db = client.db('auth')
		} catch {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		await db
			.collection('users')
			.updateOne({ userName: username }, { $push: { signedEvents: eventId } })

		res.status(201).json({ message: 'Signed up for event.' })
	}
}

export default handler
