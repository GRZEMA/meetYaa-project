import EventList from '@/components/EventList/EventList'
import Heading from '@/components/UI/Heading'
import { getFeaturedEvents } from '@/helpers/get-events'
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
	const events = await getFeaturedEvents()

	if (!events.events) {
		return {
			props: {
				events: undefined,
				message: 'No events found',
			},
		}
	}

	return {
		props: {
			events: events.events,
		},
		revalidate: 600,
	}
}
