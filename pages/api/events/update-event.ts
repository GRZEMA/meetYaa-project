import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { connectToMongoDB } from '@/helpers/db'
import { ObjectId } from 'mongodb'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'PATCH') {
		const session = getServerSession(req, res, authOptions)

		if (!session) {
			res.status(401).json({ message: 'Not authenticated!' })
			return
		}

		const {
			id,
			briefDescription,
			date,
			description,
			image,
			location,
			ticketPrice,
			time,
			title,
		} = JSON.parse(req.body)

		let db
		try {
			const client = await connectToMongoDB()
			db = client.db('events')
		} catch {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		const response = await db.collection('events').updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					briefDescription,
					date,
					description,
					image,
					location,
					ticketPrice,
					time,
					title,
				},
			}
		)

		console.log(response)
		if (response.modifiedCount === 0) {
			res.status(404).json({ message: 'Event not updated!' })
			return
		}

		res.status(200).json({ message: 'Event updated!' })
	}
}

export default handler
