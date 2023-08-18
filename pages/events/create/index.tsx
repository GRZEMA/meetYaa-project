import CreateEvent from '@/components/CreateEvent/CreateEvent'
import Head from 'next/head'

const CreateEventPage = (): JSX.Element => {
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
