import { comparePasswords } from '@/helpers/auth-helpers'
import { validateLoginForm } from '@/helpers/login-validator'
import { getSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

interface CredentialsUpdateProps {
	label: string
	classes: any
	exo: any
	onClose: () => void
	setMessage: Dispatch<SetStateAction<string | undefined>>
}

const CredentialsUpdate = ({
	classes,
	label,
	exo,
	onClose,
	setMessage,
}: CredentialsUpdateProps): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)

	const submitHandler = async () => {
		const session = await getSession()
		const enteredValue = inputRef!.current!.value

		if (!session?.user?.name) {
			setMessage('You are not logged in!')
			return
		}

		let bodyValues: {
			username: string
			password?: string
			email?: string
			profilePic?: string
		} = { username: session.user.name }

		if (label === 'password') {
			const oldPass = passwordRef.current!.value
			const errors = validateLoginForm(enteredValue)

			if (errors.length > 0) {
				setMessage('Invalid new password!')
				return
			}

			const passMatch = await comparePasswords(session.user.name, oldPass)
			if (!passMatch) {
				setMessage('Incorrect old password!')
				return
			}
			bodyValues.password = enteredValue
		}

		if (label === 'email') {
			if (!enteredValue.includes('@')) {
				setMessage('Invalid email address!')
				return
			}

			bodyValues.email = enteredValue
		}

		if (label === 'picture') {
			bodyValues.profilePic = enteredValue
		}

		setLoading(true)
		const response = await fetch('/api/user/update-user', {
			method: 'POST',
			body: JSON.stringify(bodyValues),
		})

		const data = await response.json()
		if (data) {
			setLoading(false)
		}
		setMessage(data.message)
	}

	const inputType =
		label === 'password' ? 'password' : label === 'email' ? 'email' : 'text'

	return (
		<>
			<h2>Update your {label}</h2>
			{label === 'password' ? (
				<div className={classes.input}>
					<label htmlFor='old-password'>old password:</label>
					<input
						type='password'
						className={exo.className}
						ref={passwordRef}
						id='old-password'
						required
					/>
				</div>
			) : null}
			<div className={classes.input}>
				<label htmlFor={label}>{'new ' + label + ':'}</label>
				<input
					type={inputType}
					className={exo.className}
					ref={inputRef}
					id={label}
					required
				/>
			</div>
			<div className={classes.btns}>
				<button onClick={submitHandler} disabled={loading}>
					{loading ? 'Loading..' : 'Confirm'}
				</button>
				<button onClick={onClose} className={exo.className}>
					Close
				</button>
			</div>
		</>
	)
}

export default CredentialsUpdate
