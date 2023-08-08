import AllEvents from '@/components/AllEvents/AllEvents'
import { getAllEvents } from '@/helpers/get-events'
import { EventModel } from '@/types/EventModel'
import { GetStaticProps } from 'next'

interface EventsPageProps {
	events: EventModel[]
}

const EventsPage = ({ events }: EventsPageProps): JSX.Element => {
	return <AllEvents events={events} />
}

export const getStaticProps: GetStaticProps = async () => {
	const events = await getAllEvents()

	return {
		props: {
			events: events,
		},
	}
}

export default EventsPage
