import { connectToMongoDB } from '@/helpers/db'
import { ObjectId } from 'mongodb'
import { NextApiHandler } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'DELETE') {
		const session = await getServerSession(req, res, authOptions)

		if (!session) {
			res.status(401).json({ message: 'Not authenticated' })
			return
		}

		const { id } = req.query

		if (Array.isArray(id)) {
			res.status(400).json({ message: 'Invalid id' })
			return
		}

		const newId = new ObjectId(id!)

		let client
		let db
		try {
			client = await connectToMongoDB()
			db = client.db('events')
		} catch {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		const event = await db.collection('events').deleteOne({ _id: newId })

		if (!event) {
			res.status(404).json({ message: 'No event found' })
			return
		}

		if (event.deletedCount === 1) {
			res.status(200).json({ message: 'Event deleted' })
			return
		}

		db = client.db('auth')

		const deletedEventFromUser = await db
			.collection('users')
			.updateOne(
				{ userName: session!.user!.name },
				{ $pop: { ownedEvents: id } }
			)

		console.log(deletedEventFromUser)

		res.status(500).json({ message: 'Something went wrong' })
	}
}

export default handler
