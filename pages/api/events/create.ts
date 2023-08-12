import { connectToMongoDB } from '@/helpers/db'
import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const client = await connectToMongoDB()

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

		let db = client.db('events')
		await db.collection('events').insertOne(newEvent)
		const response = await db.collection('events').findOne(newEvent)

		db = client.db('auth')
		await db
			.collection('users')
			.updateOne(
				{ userName: username },
				{ $push: { ownedEvents: response?._id.toString() } }
			)

		res.status(201).json({ message: 'Event created.', event: newEvent })
	}
}

export default handler
