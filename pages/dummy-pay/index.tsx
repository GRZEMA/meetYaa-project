import DummyPay from '@/components/DummyPay/DummyPay'
import Head from 'next/head'

const DummyPayPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>meetYAA Events | Payment</title>
				<meta
					name='description'
					content='Streamlined and secure payment processing for event organizers. Experience hassle-free transactions and ensure a seamless experience for both event hosts and participants.'
				/>
			</Head>
			<DummyPay />
		</>
	)
}

export default DummyPayPage
