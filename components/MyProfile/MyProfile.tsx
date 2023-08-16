import { EventModel } from '@/types/EventModel'
import classes from './MyProfile.module.scss'
import UserInfo from './UserInfo'
import { UserModel } from '@/types/UserModel'
import Events from './Events'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getUserEvents } from '@/helpers/get-user-events'
import { getSession } from 'next-auth/react'
import { getUserSignedEvents } from '@/helpers/get-user-signed-events'
import UpdateModal from '../UI/UpdateModal'

const MyProfile = (): JSX.Element => {
	const [userEvents, setUserEvents] = useState<EventModel[] | undefined>(
		undefined
	)
	const [userSignedEvents, setUserSignedEvents] = useState<
		EventModel[] | undefined
	>(undefined)
	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			const session = await getSession()

			if (!session) {
				router.push('/auth')
			}
			const username = session?.user?.name

			try {
				const { events: userEvents } = await getUserEvents(username!)
				const userSignedEvents = await getUserSignedEvents(username!)

				setUserEvents(userEvents)
				setUserSignedEvents(userSignedEvents.events)
			} catch {
				throw new Error('Error fetching data')
			}
		}

		fetchData()
	}, [router])
	return (
		<section className={classes.section}>
			<UpdateModal />
			<UserInfo />
			<div className={classes.events}>
				<Events events={userEvents} title='My Events' />
				<Events events={userSignedEvents} title='My Signed Events' />
			</div>
		</section>
	)
}

export default MyProfile
