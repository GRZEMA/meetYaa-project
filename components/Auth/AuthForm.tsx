import { FormEvent, useState } from 'react'
import { Exo } from 'next/font/google'

import classes from './AuthForm.module.scss'

const exo = Exo({ subsets: ['latin-ext'] })

const AuthForm = (): JSX.Element => {
	const [login, setLogin] = useState(true)

	const authHandler = (e: FormEvent) => {
		e.preventDefault()
	}

	const formStateHandler = (e: FormEvent) => {
		e.preventDefault()
		setLogin((prevState) => !prevState)
	}

	return (
		<form className={classes.form} onSubmit={authHandler}>
			<h3>{login ? 'Login' : 'Register'}</h3>
			<hr />
			<div className={classes.content}>
				<input
					type='text'
					placeholder='Username'
					id='username'
					className={classes.input}
				/>
				<input
					type='text'
					placeholder='Password'
					id='password'
					className={classes.input}
				/>
				<button className={classes.forgot}>Forgot Password?</button>
				<button className={classes.confirm + ' ' + exo.className} type='submit'>
					{login ? 'Login' : 'Register'}
				</button>
				<div className={classes.member}>
					<p>{login ? 'Not a member?' : 'Already a member?'}</p>
					<button
						onClick={formStateHandler}
						className={classes['form-state'] + ' ' + exo.className}>
						{login ? 'Signup' : 'Login'}
					</button>
				</div>
			</div>
		</form>
	)
}

export default AuthForm
