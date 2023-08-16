import { GetServerSideProps } from 'next'

import SingleEvent from '@/components/SingleEvent/SingleEvent'
import { getEventById } from '@/helpers/get-events'
import { EventModel } from '@/types/EventModel'
import { getUserData } from '@/helpers/get-user-data'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { UserModel } from '@/types/UserModel'

interface SingleEventPageProps {
	event: EventModel
	userData: UserModel
	organizerData: UserModel
}

const SingeEventPage = ({
	event,
	userData,
	organizerData,
}: SingleEventPageProps): JSX.Element => {
	return (
		<SingleEvent
			event={event}
			userData={userData}
			organizerData={organizerData}
		/>
	)
}

export default SingeEventPage

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const { params } = context
	const { slug } = params

	const singleEvent = await getEventById(slug[0])

	if (!singleEvent.event) {
		return {
			props: {
				message: singleEvent.message,
			},
		}
	}

	const organizerData = await getUserData(singleEvent.event?.organizer)

	const session = await getServerSession(context.req, context.res, authOptions)

	const username = session?.user?.name

	let userData: { userData?: UserModel; message: string } = null as any

	if (username) {
		userData = await getUserData(username)
	}

	return {
		props: {
			event: singleEvent.event,
			userData: userData ? userData.userData : null,
			organizerData: organizerData,
		},
	}
}
