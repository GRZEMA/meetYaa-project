import { ObjectId } from 'mongodb'
import { connectToMongoDB } from './db'

const transformEvents = (events: any[]) => {
	const newEvents = events.map((event) => {
		return { ...event, _id: event._id.toString() }
	})

	return newEvents
}

export const getAllEvents = async () => {
	const client = await connectToMongoDB()
	const db = client.db('events')

	const events = await db.collection('events').find().toArray()

	const transformedEvents = transformEvents(events)

	return transformedEvents
}

export const getFeaturedEvents = async () => {
	const client = await connectToMongoDB()
	const db = client.db('events')

	const events = await db
		.collection('events')
		.find({ featured: true })
		.toArray()

	const transformedEvents = transformEvents(events)

	return transformedEvents
}

export const getEventById = async (id: string) => {
	const client = await connectToMongoDB()
	const db = client.db('events')

	const newId = new ObjectId(id)

	const event = await db.collection('events').findOne({ _id: newId })

	return { ...event, _id: event?._id.toString() }
}
