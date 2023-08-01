import classes from './Auth.module.scss'
import AuthForm from './AuthForm'
import Lottie from 'lottie-react'
import someKindGuyAnimation from '@/public/lottie/someKindGuy.json'
import formAnimation from '@/public/lottie/formSubmit.json'

const Auth = (): JSX.Element => {
	return (
		<section className={classes['auth-section']}>
			<div className={classes.formAnimation}>
				<Lottie animationData={formAnimation} />
			</div>
			<AuthForm />
			<div className={classes.guyAnimation}>
				<Lottie animationData={someKindGuyAnimation} />
			</div>
		</section>
	)
}

export default Auth
