import { connectToMongoDB } from '@/helpers/db'
import { EventModel } from '@/types/EventModel'
import { ObjectId } from 'mongodb'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		const { id } = req.query

		let db
		try {
			const client = await connectToMongoDB()
			db = client.db('events')
		} catch {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		if (Array.isArray(id)) {
			res.status(400).json({ message: 'Invalid id' })
			return
		}

		const newId = new ObjectId(id!)

		const event = await db.collection('events').findOne({ _id: newId })

		if (!event) {
			res.status(404).json({ message: 'No events found' })
			return
		}

		const transformedEvent = {
			...event,
			_id: event._id.toString(),
		} as EventModel

		res.status(200).json({ event: transformedEvent })
	}
}

export default handler
