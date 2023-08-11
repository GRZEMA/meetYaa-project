import { EventModel } from '@/types/EventModel'
import classes from './MyProfile.module.scss'
import UserEvents from './UserEvents'
import UserInfo from './UserInfo'
import UserSignedEvents from './UserSignedEvents'
import { UserModel } from '@/types/UserModel'

interface MyProfileProps {
	userData: UserModel
	userEvents: EventModel[]
	userSignedEvents: EventModel[]
}

const MyProfile = ({
	userData,
	userEvents,
	userSignedEvents,
}: MyProfileProps): JSX.Element => {
	return (
		<section className={classes.section}>
			<UserInfo userInfo={userData} />
			<div className={classes.events}>
				<UserEvents events={userEvents} />
				<UserSignedEvents events={userSignedEvents} />
			</div>
		</section>
	)
}

export default MyProfile
