import { EventModel } from '@/types/EventModel'
import classes from './MyProfile.module.scss'
import UserEvents from './UserEvents'
import UserInfo from './UserInfo'
import UserSignedEvents from './UserSignedEvents'

interface MyProfileProps {
	userInfo: { email: string; username: string }
	userEvents: EventModel[]
	userSignedEvents: EventModel[]
}

const MyProfile = ({
	userInfo,
	userEvents,
	userSignedEvents,
}: MyProfileProps): JSX.Element => {
	return (
		<section className={classes.section}>
			<UserInfo email={userInfo.email} username={userInfo.username} />
			<UserEvents events={userEvents} />
			<UserSignedEvents />
		</section>
	)
}

export default MyProfile
