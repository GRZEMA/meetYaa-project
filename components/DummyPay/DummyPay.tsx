import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useContext } from 'react'
import { PaymentContext } from '@/store/payment-context'

import classes from './DummyPay.module.scss'

import { Gochi_Hand } from 'next/font/google'
import { signUpForEvent } from '@/helpers/signup-for-event'

const gochi = Gochi_Hand({ subsets: ['latin'], weight: '400' })

const DummyPay = (): JSX.Element => {
	const session = useSession()
	const router = useRouter()

	const paymentCtx = useContext(PaymentContext)

	const paymentHandler = async () => {
		if (session.status === 'authenticated') {
			const res = await signUpForEvent(paymentCtx.eventId, paymentCtx.username)

			if (res.status === 201) {
				router.back()
				localStorage.setItem('firstSignup', 'true')
			}
		}
	}

	return (
		<section className={classes.section}>
			<div className={classes.wrapper}>
				<h1>
					Welcome to{' '}
					<span className={gochi.className + ' ' + classes['heading']}>
						DUMMY PAY
					</span>
				</h1>
				<p>Just click the button and u will get redirected</p>
				<p>
					This is just a portfolio site so i didn&apos;t see the point to
					connect payment gateway LUL
				</p>
				<button onClick={paymentHandler}>PAY</button>
			</div>
		</section>
	)
}

export default DummyPay
