import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import '@/styles/globals.scss'

import Head from 'next/head'

import { Exo } from 'next/font/google'
import Navigation from '@/components/Navigation/Navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const exo = Exo({ subsets: ['latin-ext'] })

export default function App({ Component, pageProps }: AppProps) {
	const { asPath } = useRouter()

	return (
		<>
			<Head>
				<title>meetYAA Events</title>
			</Head>
			<Navigation />
			{asPath === '/' && <Header />}
			<main className={exo.className}>
				<Component {...pageProps} />
			</main>
			<Footer />
		</>
	)
}
