import AllEvents from '@/components/AllEvents/AllEvents'
import { connectToMongoDB } from '@/helpers/db'
import { getAllEvents, transformEvents } from '@/helpers/get-events'
import { EventModel } from '@/types/EventModel'
import { GetStaticProps } from 'next'

interface EventsPageProps {
	events: EventModel[]
	message: string
}

const EventsPage = ({ events, message }: EventsPageProps): JSX.Element => {
	if (!events) return <p>{message}</p>
	return <AllEvents events={events} />
}

export const getStaticProps: GetStaticProps = async () => {
	const client = await connectToMongoDB()
	const db = client.db('events')

	const events = await db.collection('events').find().toArray()

	const transformedEvents = transformEvents(events)

	if (!events) {
		return {
			props: {
				events: [],
				message: 'Failed to fetch events',
			},
		}
	}

	return {
		props: {
			events: transformedEvents,
		},
		revalidate: 1,
	}
}

export default EventsPage
