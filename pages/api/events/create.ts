import { connectToMongoDB } from '@/helpers/db'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
		const client = await connectToMongoDB()
		const db = client.db('auth')

		const { title, location, date, time, description, username, image } =
			req.body

		if (!title || !location || !date || !description || !time) {
			res.status(422).json({ message: 'Invalid input.' })
			return
		}

		if (!username) {
			res.status(422).json({ message: 'Invalid user.' })
			return
		}

		const newEvent = {
			title,
			location,
			date,
			time,
			image,
			description,
		}

		res.status(201).json({ message: 'Event created.', event: newEvent })
	}
}

export default handler
