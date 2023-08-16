import EventList from '@/components/EventList/EventList'
import Heading from '@/components/UI/Heading'
import { connectToMongoDB } from '@/helpers/db'
import { getFeaturedEvents, transformEvents } from '@/helpers/get-events'
import { EventModel } from '@/types/EventModel'
import { GetStaticProps } from 'next'
import Head from 'next/head'

interface HomeProps {
	events: EventModel[]
	message: string
}

export default function Home({ events, message }: HomeProps): JSX.Element {
	if (!events) return <p>{message}</p>
	return (
		<>
			<section>
				<Heading text='Featured Events!' id='featured' />
				<EventList events={events} />
			</section>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const client = await connectToMongoDB()
	const db = client.db('events')

	const events = await db
		.collection('events')
		.find({ featured: true })
		.toArray()

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
		revalidate: 600,
	}
}
