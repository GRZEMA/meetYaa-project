import { GetServerSideProps } from 'next'

import SingleEvent from '@/components/SingleEvent/SingleEvent'
import { getEventById } from '@/helpers/get-events'
import { EventModel } from '@/types/EventModel'

interface SingleEventPageProps {
	event: EventModel
}

const SingeEventPage = ({ event }: SingleEventPageProps): JSX.Element => {
	return <SingleEvent event={event} />
}

export default SingeEventPage

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const { params } = context
	const { slug } = params

	const singleEvent = await getEventById(slug[0])

	return {
		props: {
			event: singleEvent,
		},
	}
}
