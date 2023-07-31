import EventList from '@/components/EventList/EventList'
import Heading from '@/components/UI/Heading'
import Head from 'next/head'

export default function Home() {
	return (
		<>
			<section>
				<Heading text='Featured Events!' id='featured' />
				<EventList />
			</section>
		</>
	)
}
