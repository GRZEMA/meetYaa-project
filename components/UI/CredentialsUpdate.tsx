import { comparePasswords } from '@/helpers/auth-helpers'
import { getSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useRef } from 'react'

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

	const submitHandler = async () => {
		const session = await getSession()
		const value = inputRef!.current!.value
		let oldPass = ''
		if (label === 'password') {
			oldPass = passwordRef.current!.value
		}

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
			const passMatch = await comparePasswords(session.user.name, oldPass)
			if (!passMatch) {
				setMessage('Incorrect password!')
				return
			}
			bodyValues.password = value
		}

		if (label === 'email') {
			if (!value.includes('@')) {
				setMessage('Invalid email address!')
				return
			}

			bodyValues.email = value
		}

		if (label === 'picture') {
			bodyValues.profilePic = value
		}

		const response = await fetch('/api/user/update-user', {
			method: 'POST',
			body: JSON.stringify(bodyValues),
		})

		const data = await response.json()
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
				<button onClick={submitHandler}>Submit</button>
				<button onClick={onClose} className={exo.className}>
					Close
				</button>
			</div>
		</>
	)
}

export default CredentialsUpdate
