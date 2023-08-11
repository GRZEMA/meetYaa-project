import Image from 'next/image'

import classes from './UserInfo.module.scss'
import { Exo } from 'next/font/google'
import { UserModel } from '@/types/UserModel'

const exo = Exo({ subsets: ['latin-ext'] })

interface UserInfoProps {
	userInfo: UserModel
}

const UserInfo = ({ userInfo }: UserInfoProps): JSX.Element => {
	const { userName, email, profilePicture } = userInfo

	const profilePictureUrl = profilePicture
		? profilePicture
		: '/images/defaultUser.png'

	return (
		<div className={classes['info-box']}>
			<div className={classes.image}>
				<Image alt='' src={profilePictureUrl} fill />
			</div>
			<div className={classes['user-info']}>
				<h2>{userName.toUpperCase()}</h2>
				<p>
					Contact Email: {email ? email : 'not set'} -{' '}
					<span>
						<button className={classes['change-btn'] + ' ' + exo.className}>
							Change
						</button>
					</span>
				</p>
				<p>
					Password -{' '}
					<span>
						<button className={classes['change-btn'] + ' ' + exo.className}>
							Change
						</button>
					</span>
				</p>
			</div>
		</div>
	)
}

export default UserInfo
