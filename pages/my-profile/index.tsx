import MyProfile from '@/components/MyProfile/MyProfile'
import { EventModel } from '@/types/EventModel'
import { getSession } from 'next-auth/react'

interface MyProfilePageProps {
	userInfo: { email: string; username: string }
	userEvents: EventModel[]
	userSignedEvents: EventModel[]
}

const MyProfilePage = ({
	userEvents,
	userInfo,
	userSignedEvents,
}: MyProfilePageProps): JSX.Element => {
	return (
		<MyProfile
			userEvents={userEvents}
			userInfo={userInfo}
			userSignedEvents={userSignedEvents}
		/>
	)
}

export const getServerSideProps = async () => {
	const session = getSession()

	// fetch user info from db with session

	return {
		props: {
			userInfo: { email: 'FETCHED_EMAIL', username: 'FETCHED_USERNAME' },
			userEvents: [],
			userSignedEvents: [],
		},
	}
}

export default MyProfilePage
