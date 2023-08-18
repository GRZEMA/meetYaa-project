import { GetStaticProps } from 'next'
import Head from 'next/head'

import AllEvents from '@/components/AllEvents/AllEvents'
import { connectToMongoDB } from '@/helpers/db'
import { transformEvents } from '@/helpers/get-events'
import { EventModel } from '@/types/EventModel'

interface EventsPageProps {
	events: EventModel[]
	message: string
}

const EventsPage = ({ events, message }: EventsPageProps): JSX.Element => {
	if (!events) return <p>{message}</p>
	return (
		<>
			<Head>
				<title>meetYAA Events | All Events</title>
				<meta
					name='description'
					content='Browse a diverse range of events that cater to every interest. From art and culture to technology and wellness, find and engage with events that resonate with you.'
				/>
			</Head>
			<AllEvents events={events} />
		</>
	)
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
