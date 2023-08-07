import { MongoClient } from 'mongodb'
const uri =
	'mongodb+srv://dawidkrzmnsk:5O3LDanAeUDkW7Vt@cluster0.uh376au.mongodb.net/?retryWrites=true&w=majority'

export const connectToMongoDB = async () => {
	const client = new MongoClient(uri)
	return client
}
