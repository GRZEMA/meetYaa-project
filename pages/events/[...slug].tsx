import { GetServerSideProps } from 'next'

import SingleEvent from '@/components/SingleEvent/SingleEvent'
import { getEventById } from '@/helpers/get-events'
import { EventModel } from '@/types/EventModel'
import { getUserData } from '@/helpers/get-user-data'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

interface SingleEventPageProps {
	event: EventModel
	userData: any
}

const SingeEventPage = ({
	event,
	userData,
}: SingleEventPageProps): JSX.Element => {
	return <SingleEvent event={event} userData={userData} />
}

export default SingeEventPage

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const { params } = context
	const { slug } = params

	const singleEvent = await getEventById(slug[0])

	const session = await getServerSession(context.req, context.res, authOptions)

	const username = session?.user?.name

	let userData = null

	if (username) {
		userData = await getUserData(username)
	}

	return {
		props: {
			event: singleEvent,
			userData: userData,
		},
	}
}
