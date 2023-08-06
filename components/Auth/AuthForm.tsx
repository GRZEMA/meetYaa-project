import { FormEvent, useState, useRef } from 'react'
import { signIn } from 'next-auth/react'

import { validateLoginForm } from '@/helpers/form-validator-helper'
import { registerHandler } from '@/helpers/register-helper'

import classes from './AuthForm.module.scss'

import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin-ext'] })

const AuthForm = (): JSX.Element => {
	const [login, setLogin] = useState(true)

	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const authHandler = async (e: FormEvent) => {
		e.preventDefault()
		const username = usernameRef.current!.value
		const password = passwordRef.current!.value

		if (!login) {
			if (!validateLoginForm(username, password)) {
				// return modal that says invalid inputs
				console.log('not ok')
				return
			}

			const res = await registerHandler(username, password)
			console.log(res)
			usernameRef.current!.value = ''
			passwordRef.current!.value = ''
			return
		}

		if (!validateLoginForm(username, password)) {
			// return modal that says invalid inputs
			console.log('not ok')
			return
		}

		const res = await signIn('credentials', {
			redirect: false,
			username,
			password,
		})

		console.log(res)
		usernameRef.current!.value = ''
		passwordRef.current!.value = ''
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
					ref={usernameRef}
				/>
				<input
					type='password'
					placeholder='Password'
					id='password'
					className={classes.input}
					ref={passwordRef}
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
