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

		const client = await connectToMongoDB()
		const db = client.db('events')

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

		res.status(200).json({ message: 'Event updated!' })
	}
}

export default handler
