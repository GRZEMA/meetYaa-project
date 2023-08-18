import MyProfile from '@/components/MyProfile/MyProfile'
import Head from 'next/head'
import UpdateModalContextProvider from '@/store/context/update-modal-context'

const MyProfilePage = (): JSX.Element => {
	return (
		<UpdateModalContextProvider>
			<Head>
				<title>meetYAA Events | My Profile</title>
				<meta
					name='description'
					content='Personalize your experience with a customizable profile. Showcase your interests, manage event participation, and engage with like-minded individuals. Your journey, your profile.'
				/>
			</Head>
			<MyProfile />
		</UpdateModalContextProvider>
	)
}

export default MyProfilePage
