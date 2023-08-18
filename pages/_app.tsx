import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { SessionProvider } from 'next-auth/react'

import NextNProgress from 'nextjs-progressbar'

import '@/styles/globals.scss'

import Head from 'next/head'

import PaymentContextProvider from '@/store/context/payment-context'

import Navigation from '@/components/Navigation/Navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import { Exo } from 'next/font/google'
import ModalContextProvider from '@/store/context/modal-context'

const exo = Exo({ subsets: ['latin-ext'] })

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	const { asPath } = useRouter()

	return (
		<SessionProvider session={session}>
			<PaymentContextProvider>
				<ModalContextProvider>
						<Head>
							<title>meetYAA Events</title>
							<link
								rel='shortcut icon'
								href='/images/favicon.svg'
								type='image/x-icon'
							/>
							<meta
								name='description'
								content='Explore our dynamic platform with exciting featured events, create your own gatherings, manage your profile, and easily connect with a community of enthusiasts. Join us today!'
							/>
							<meta
								name='viewport'
								content='width=device-width, initial-scale=1.0'
							/>
						</Head>
						<Navigation />
						<NextNProgress />
						{asPath === '/' && <Header />}
						<main className={exo.className}>
							<Component {...pageProps} />
						</main>
						<Footer />
				</ModalContextProvider>
			</PaymentContextProvider>
		</SessionProvider>
	)
}
