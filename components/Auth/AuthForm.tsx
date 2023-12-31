import { FormEvent, useState, useRef, useContext } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { validateLoginForm } from '@/helpers/login-validator'
import { registerHandler } from '@/helpers/register'

import classes from './AuthForm.module.scss'

import { Exo } from 'next/font/google'
import { ModalContext } from '@/store/context/modal-context'

const exo = Exo({ subsets: ['latin-ext'] })

const AuthForm = (): JSX.Element => {
	const [login, setLogin] = useState(true)
	const [loading, setLoading] = useState(false)
	const { openFunction, setModalType, closeFunction } = useContext(ModalContext)

	const router = useRouter()

	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const authHandler = async (e: FormEvent) => {
		e.preventDefault()

		setLoading(true)
		const session = await getSession()
		if (session) {
			// Modal that says you are already logged in
			setModalType('Information')
			openFunction('Already logged in', 'You are already logged in.')
			return
		}

		const username = usernameRef.current!.value
		const password = passwordRef.current!.value

		if (!login) {
			const errors = validateLoginForm(password, username)
			if (errors.length > 0) {
				// return modal that says invalid inputs
				setModalType('Error')
				openFunction('Invalid input', 'Your inputs are invalid!', errors)
				return
			}

			const response = await registerHandler(username, password)
			await signIn('credentials', {
				redirect: false,
				username,
				password,
			})

			if (response.status === 201) {
				setLoading(false)
				setModalType('Information')
				openFunction('Success', 'You have successfully registered!')
			} else {
				setLoading(false)
				setModalType('Error')
				openFunction('Error', 'Something went wrong!')
			}

			usernameRef.current!.value = ''
			passwordRef.current!.value = ''
			router.push('/my-profile')
			closeFunction()
			return
		}

		const res = await signIn('credentials', {
			redirect: false,
			username,
			password,
		})

		if (!res?.ok) {
			setLoading(false)
			setModalType('Error')
			openFunction('Invalid credentials', 'Your credentials are invalid!')
			return
		}

		setLoading(false)
		setModalType('Information')
		openFunction('Success', 'You have successfully logged in!')
		usernameRef.current!.value = ''
		passwordRef.current!.value = ''
		router.push('/my-profile')
		closeFunction()
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
					required
				/>
				<input
					type='password'
					placeholder='Password'
					id='password'
					className={classes.input}
					ref={passwordRef}
					required
				/>
				{login ? (
					<button className={classes.forgot} type='button'>
						Forgot Password?
					</button>
				) : null}
				<button
					className={classes.confirm + ' ' + exo.className}
					type='submit'
					disabled={loading}>
					{loading ? 'Loading...' : login ? 'Login' : 'Register'}
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
