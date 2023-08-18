import { MongoClient } from 'mongodb'

const dbPass = process.env.DB_PASS
const dbLogin = process.env.DB_LOGIN

const uri = `mongodb+srv://${dbLogin}:${dbPass}@cluster0.uh376au.mongodb.net/?retryWrites=true&w=majority`

export const connectToMongoDB = async () => {
	const client = new MongoClient(uri)
	return client
}
