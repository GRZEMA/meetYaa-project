import Image from 'next/image'

import classes from './UserInfo.module.scss'
import { Exo } from 'next/font/google'
import { UserModel } from '@/types/UserModel'
import { useContext, useEffect, useState } from 'react'
import { getUserData } from '@/helpers/get-user-data'

import { useSession } from 'next-auth/react'
import { UpdateModalContext } from '@/store/context/update-modal-context'

const exo = Exo({ subsets: ['latin-ext'] })

const UserInfo = (): JSX.Element => {
	const [userData, setUserData] = useState<UserModel | undefined>(undefined)
	const { data: session } = useSession()
	const { openFunction } = useContext(UpdateModalContext)

	useEffect(() => {
		const username = session?.user?.name

		if (!username) {
			return
		}

		const fetchUseEffect = async () => {
			const userData = await getUserData(username)
			if (!userData.userData) {
				return
			}
			setUserData(userData.userData)
		}
		fetchUseEffect()
	}, [session?.user?.name])

	const profilePictureUrl = userData?.profilePicture
		? userData.profilePicture
		: '/images/defaultUser.png'

	const openModalHandler = (label: string) => {
		openFunction(label)
	}

	return (
		<div className={classes['info-box']}>
			<div className={classes.image}>
				<Image
					alt=''
					src={profilePictureUrl}
					fill
					sizes='100%'
					style={{ objectFit: 'cover' }}
					loading='lazy'
				/>
			</div>
			<button
				className={classes['change-profile-pic-btn']}
				onClick={openModalHandler.bind(undefined, 'picture')}>
				Change Profile Picture
			</button>
			<p>(Note that we currently support only image links)</p>
			<div className={classes['user-info']}>
				<h2>
					{userData?.userName ? userData?.userName.toUpperCase() : 'Loading...'}
				</h2>
				<p>
					Contact Email: {userData?.email ? userData?.email : 'not set'} -{' '}
					<span>
						<button
							className={classes['change-btn'] + ' ' + exo.className}
							onClick={openModalHandler.bind(undefined, 'email')}>
							Change
						</button>
					</span>
				</p>
				<p>
					Password -{' '}
					<span>
						<button
							className={classes['change-btn'] + ' ' + exo.className}
							onClick={openModalHandler.bind(undefined, 'password')}>
							Change
						</button>
					</span>
				</p>
			</div>
		</div>
	)
}

export default UserInfo
