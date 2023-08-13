import { NextApiHandler } from 'next'
import { ObjectId } from 'mongodb'
import { getUserData } from '@/helpers/get-user-data'
import { connectToMongoDB } from '@/helpers/db'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const { username } = req.body

		const userData = await getUserData(username!)

		if (!userData) {
			res.status(404).json({ message: 'User not found' })
			return
		}

		let userEventsId: ObjectId[] | undefined = []

		userEventsId = userData.userData?.ownedEvents?.map(
			(eventId: string) => new ObjectId(eventId)
		)

		const client = await connectToMongoDB()

		const db = client.db('events')

		const ownedEvents = await db
			.collection('events')
			.find({ _id: { $in: userEventsId } })
			.toArray()

		res.status(200).json({ events: ownedEvents, userData: userData.userData })
	}
}

export default handler
