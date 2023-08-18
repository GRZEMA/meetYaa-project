import Auth from '@/components/Auth/Auth'
import Head from 'next/head'

const AuthPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>meetYAA Events | Login</title>
				<meta
					name='description'
					content='Access your account and dive into a world of engaging events. Log in to unlock personalized recommendations, manage your participation, and connect with a passionate community.'
				/>
			</Head>
			<Auth />
		</>
	)
}

export default AuthPage
