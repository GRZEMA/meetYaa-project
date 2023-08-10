import Image from 'next/image'

import classes from './UserInfo.module.scss'
import { useEffect, useState } from 'react'

interface UserInfoProps {
	email: string
	username: string
}

const UserInfo = ({ email, username }: UserInfoProps): JSX.Element => {
	const [userName, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')

	useEffect(() => {
		setUserName(username)
		email ? setUserEmail(email) : null
	}, [username, email])

	return (
		<div className={classes['info-box']}>
			<div className={classes.image}>
				<Image alt='' src='/' />
			</div>
			<div className={classes['user-info']}>
				<h2>{userName}</h2>
				<p>
					Contact Email: {userEmail ? userEmail : 'not set'} -
					<span>
						<button className={classes['change-btn']}>Change Email</button>
					</span>
				</p>
				<p>
					Password -
					<span>
						<button className={classes['change-btn']}>Change Password</button>
					</span>
				</p>
			</div>
		</div>
	)
}

export default UserInfo
