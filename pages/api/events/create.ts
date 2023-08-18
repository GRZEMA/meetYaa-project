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

		const {
			title,
			location,
			date,
			time,
			description,
			briefDescription,
			username,
			image,
			ticketPrice,
		} = req.body

		if (
			!title ||
			!location ||
			!date ||
			!description ||
			!time ||
			!image ||
			!briefDescription
		) {
			res.status(422).json({ message: 'Invalid input.' })
			return
		}

		if (!username) {
			res.status(422).json({ message: 'Invalid user.' })
			return
		}

		const newEvent = {
			title,
			briefDescription,
			description,
			location,
			date,
			time,
			image,
			ticketPrice,
			organizer: username,
		}

		let db
		let client
		let response
		try {
			client = await connectToMongoDB()
			db = client.db('events')
			await db.collection('events').insertOne(newEvent)
			response = await db.collection('events').findOne(newEvent)
		} catch {
			res.status(500).json({ message: 'Could not connect to events database.' })
			return
		}

		try {
			db = client.db('auth')
			await db
				.collection('users')
				.updateOne(
					{ userName: username },
					{ $push: { ownedEvents: response?._id.toString() } }
				)
		} catch {
			res.status(500).json({ message: 'Could not connect to auth database.' })
			return
		}

		res.status(200).json({ message: 'Event created.', event: newEvent })
	}
}

export default handler
