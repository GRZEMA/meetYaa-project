import CreateEvent from '@/components/CreateEvent/CreateEvent'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import NotFound from '@/components/404/NotFound'

const CreateEventPage = (): JSX.Element => {
	const router = useRouter()
	const session = useSession()

	if (session.status === 'unauthenticated') {
		router.push('/auth')
		return <NotFound />
	}

	return (
		<>
			<Head>
				<title>meetYAA Events | Create Event</title>
				<meta
					name='description'
					content='Bring your event ideas to life effortlessly. Create, customize, and promote your gatherings using our intuitive event creation tool. Let your creativity shine!'
				/>
			</Head>
			<CreateEvent />
		</>
	)
}

export default CreateEventPage
