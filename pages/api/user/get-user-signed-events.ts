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

		const userData = await getUserData(username!)

		if (!userData) {
			res.status(404).json({ message: 'User not found' })
			return
		}

		let signedEventsId: ObjectId[] | undefined = []

		signedEventsId = userData.userData?.signedEvents?.map(
			(eventId: string) => new ObjectId(eventId)
		)

		const client = await connectToMongoDB()

		const db = client.db('events')

		const ownedEvents = await db
			.collection('events')
			.find({ _id: { $in: signedEventsId } })
			.toArray()

		res.status(200).json({ events: ownedEvents })
	}
}

export default handler
