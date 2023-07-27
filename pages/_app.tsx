import Navigation from '@/components/Navigation/Navigation'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>meetYAA Events</title>
			</Head>
			<Navigation />
			<main>
				<Component {...pageProps} />
			</main>
		</>
	)
}
