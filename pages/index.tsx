import EventList from '@/components/EventList/EventList'
import Heading from '@/components/UI/Heading'
import { getFeaturedEvents } from '@/helpers/get-events'
import { EventModel } from '@/types/EventModel'
import { GetStaticProps } from 'next'
import Head from 'next/head'

interface HomeProps {
	events: EventModel[]
}

export default function Home({ events }: HomeProps): JSX.Element {
	return (
		<>
			<section>
				<Heading text='Featured Events!' id='featured' />
				<EventList events={events} />
			</section>
		</>
	)
}

export const getStaticProps: GetStaticProps<{
	events: EventModel[]
}> = async () => {
	const events = await getFeaturedEvents()

	return {
		props: {
			events: events,
		},
		revalidate: 600,
	}
}
