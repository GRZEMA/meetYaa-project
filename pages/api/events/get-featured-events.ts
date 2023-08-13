import { connectToMongoDB } from '@/helpers/db'
import { transformEvents } from '@/helpers/get-events'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		const client = await connectToMongoDB()
		const db = client.db('events')

		const events = await db
			.collection('events')
			.find({ featured: true })
			.toArray()

		if (!events) {
			res.status(404).json({ message: 'No events found' })
			return
		}

		const transformedEvents = transformEvents(events)

		res.status(200).json({ events: transformedEvents })
	}
}

export default handler
