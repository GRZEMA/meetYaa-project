import { NextApiHandler } from 'next'
import { ObjectId } from 'mongodb'
import { getUserData } from '@/helpers/get-user-data'
import { connectToMongoDB } from '@/helpers/db'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		const { username } = req.query

		if (!username || Array.isArray(username)) {
			res.status(400).json({ message: 'Invalid user' })
			return
		}

		let userData
		try {
			userData = await getUserData(username!)
		} catch {
			res.status(500).json({ message: 'Could get user from database' })
			return
		}

		if (!userData) {
			res.status(404).json({ message: 'User not found' })
			return
		}

		let signedEventsId: ObjectId[] | undefined = []

		signedEventsId = userData.userData?.signedEvents?.map(
			(eventId: string) => new ObjectId(eventId)
		)

		let db
		try {
			const client = await connectToMongoDB()
			db = client.db('events')
		} catch {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		const ownedEvents = await db
			.collection('events')
			.find({ _id: { $in: signedEventsId } })
			.toArray()

		res.status(200).json({ events: ownedEvents })
	}
}

export default handler
