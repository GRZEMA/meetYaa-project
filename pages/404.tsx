import NotFound from '@/components/404/NotFound'
import Head from 'next/head'

const Custom404 = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>meetYAA Events | 404</title>
				<meta
					name='description'
					content="Oops! It seems you've taken a wrong turn. Discover your way back to engaging events and captivating content on our platform. Explore the possibilities anew!"
				/>
			</Head>
			<NotFound />
		</>
	)
}

export default Custom404
