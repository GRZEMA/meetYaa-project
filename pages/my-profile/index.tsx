import MyProfile from '@/components/MyProfile/MyProfile'
import { getUserEvents } from '@/helpers/get-user-events'
import { EventModel } from '@/types/EventModel'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { getUserSignedEvents } from '@/helpers/get-user-signed-events'
import { transformEvents } from '@/helpers/get-events'
import { UserModel } from '@/types/UserModel'

interface MyProfilePageProps {
	userData: UserModel
	userEvents: EventModel[]
	userSignedEvents: EventModel[]
}

const MyProfilePage = ({
	userEvents,
	userData,
	userSignedEvents,
}: MyProfilePageProps): JSX.Element => {
	return (
		<MyProfile
			userEvents={userEvents}
			userData={userData}
			userSignedEvents={userSignedEvents}
		/>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(context.req, context.res, authOptions)

	if (!session) {
		return {
			props: {},
			redirect: {
				destination: '/auth',
			},
		}
	}

	// fetch user info from db with session

	const username = session.user?.name

	try {
		const userEventsAndData = await getUserEvents(username!)
		const userEvents = userEventsAndData.events
		const userSignedEvents = await getUserSignedEvents(username!)

		const userData: UserModel = userEventsAndData.userData

		return {
			props: {
				userEvents: userEvents,
				userSignedEvents: userSignedEvents.events,
				userData: userData,
			},
		}
	} catch (err) {
		console.log(err)
		return {
			props: {
				userInfo: {
					email: 'FETCHED_EMAIL',
					username: 'FETCHED_USERNAME',
				},
				userEvents: [],
				userSignedEvents: [],
			},
		}
	}
}

export default MyProfilePage
