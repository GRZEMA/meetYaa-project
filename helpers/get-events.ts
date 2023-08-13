import { ObjectId } from 'mongodb'
import axios from 'axios'
import { connectToMongoDB } from './db'
import { EventModel } from '@/types/EventModel'

export const transformEvents = (events: any[]) => {
	const newEvents = events.map((event) => {
		return { ...event, _id: event._id.toString() }
	})

	return newEvents
}

interface eventsResponse {
	events?: EventModel[]
	message: string
}

export const getAllEvents = async () => {
	const response = await axios.get<eventsResponse>(
		'http://localhost:3000/api/events/get-all-events'
	)

	if (!response.data.events) {
		return { message: response.data.message }
	}

	return response.data as eventsResponse
}

export const getFeaturedEvents = async () => {
	const response = await axios.get<eventsResponse>(
		'http://localhost:3000/api/events/get-featured-events'
	)

	if (!response.data.events) {
		return { message: response.data.message }
	}

	return response.data as eventsResponse
}

interface eventResponse {
	event?: EventModel
	message: string
}

export const getEventById = async (id: string) => {
	const response = await axios.get<eventResponse>(
		'http://localhost:3000/api/events/get-signle-event',
		{ params: { id } }
	)

	if (!response.data.event) {
		return { message: response.data.message }
	}

	return response.data as eventResponse
}
