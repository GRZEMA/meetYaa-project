import AllEvents from '@/components/AllEvents/AllEvents'
import { getAllEvents } from '@/helpers/get-events'
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
	const events = await getAllEvents()

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
		revalidate: 10,
	}
}

export default EventsPage
