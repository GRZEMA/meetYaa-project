import Header from '@/components/Header/Header'
import Heading from '@/components/UI/Heading'
import Head from 'next/head'

export default function Home() {
	return (
		<>
			<Header />
			<Heading text='Featured Events!' />
		</>
	)
}
