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
	const response = await fetch('/api/events/get-all-events')

	const data: eventsResponse = await response.json()

	if (!data.events) {
		return { message: data.message }
	}

	return data as eventsResponse
}

export const getFeaturedEvents = async () => {
	const response = await fetch('/api/events/get-featured-events')

	const data: eventsResponse = await response.json()

	if (!data.events) {
		return { message: data.message }
	}

	return data as any
}

interface eventResponse {
	event?: EventModel
	message: string
}

export const getEventById = async (id: string) => {
	const response = await fetch(
		'https://meet-yaa-project.vercel.app/api/events/get-signle-event?id=' + id
	)

	const data = await response.json()

	if (!data.event) {
		return { message: data.message } as eventResponse
	}

	return data as eventResponse
}
