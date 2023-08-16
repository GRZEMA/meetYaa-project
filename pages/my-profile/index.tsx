import MyProfile from '@/components/MyProfile/MyProfile'
import UpdateModalContextProvider from '@/store/update-modal-context'

const MyProfilePage = (): JSX.Element => {
	return (
		<UpdateModalContextProvider>
			<MyProfile />
		</UpdateModalContextProvider>
	)
}

export default MyProfilePage
