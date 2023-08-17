import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { SessionProvider } from 'next-auth/react'

import NextNProgress from 'nextjs-progressbar'

import '@/styles/globals.scss'

import Head from 'next/head'

import PaymentContextProvider from '@/store/payment-context'

import Navigation from '@/components/Navigation/Navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

import { Exo } from 'next/font/google'
import ModalContextProvider, { ModalContext } from '@/store/modal-context'
import UpdateModalContextProvider from '@/store/update-modal-context'
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
					<UpdateModalContextProvider>
						<Head>
							<title>meetYAA Events</title>
						</Head>
						<Navigation />
						<NextNProgress />
						{asPath === '/' && <Header />}
						<main className={exo.className}>
							<Component {...pageProps} />
						</main>
						<Footer />
					</UpdateModalContextProvider>
				</ModalContextProvider>
			</PaymentContextProvider>
		</SessionProvider>
	)
}
