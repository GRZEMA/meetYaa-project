import type { AppProps } from 'next/app'

import '@/styles/globals.scss'

import Head from 'next/head'

import { Exo } from 'next/font/google'
import Navigation from '@/components/Navigation/Navigation'

const exo = Exo({ subsets: ['latin-ext'] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>meetYAA Events</title>
			</Head>
			<Navigation />
			<main className={exo.className}>
				<Component {...pageProps} />
			</main>
		</>
	)
}
