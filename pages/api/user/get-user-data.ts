import { connectToMongoDB } from '@/helpers/db'
import { UserModel } from '@/types/UserModel'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
		const { username } = req.query

		let db
		try {
			const client = await connectToMongoDB()
			db = client.db('auth')
		} catch {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		const result = await db
			.collection<UserModel>('users')
			.findOne({ userName: username })

		if (!result) {
			res.status(404).json({ message: 'User not found' })
		}

		const userData = {
			...result,
			_id: result?._id.toString(),
		}

		res.status(200).json({ userData, message: 'User succesfully found' })
	}
}

export default handler
