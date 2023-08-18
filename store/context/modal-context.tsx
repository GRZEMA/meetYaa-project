import { createContext, useState } from 'react'

const initialValues: {
	openFunction: (
		title: string,
		message: string,
		errors?: { message: string }[]
	) => void
	closeFunction: () => void
	setModalType: (type: 'Information' | 'Error') => void
	type: 'Information' | 'Error'
	errors?: { message: string }[]
	isOpen: boolean
	message: string
	title: string
} = {
	openFunction: (title: string, message: string) => {},
	closeFunction: () => {},
	setModalType: (type: 'Information' | 'Error') => {},
	type: 'Information',
	errors: [],
	isOpen: false,
	message: '',
	title: '',
}

export const ModalContext = createContext(initialValues)

const ModalContextProvider = ({
	children,
}: {
	children: React.ReactNode
}): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [message, setMessage] = useState('')
	const [type, setType] = useState<'Information' | 'Error'>('Information')
	const [errors, setErrors] = useState<{ message: string }[]>([])

	const closeFunction = () => {
		setIsOpen(false)
		setErrors([])
		setTitle('')
		setMessage('')
		setType('Information')
	}

	const setModalType = (type: 'Information' | 'Error') => {
		setType(type)
	}

	const openFunction = (
		title: string,
		message: string,
		errors?: { message: string }[]
	) => {
		setTitle(title)
		setMessage(message)
		if (errors) setErrors(errors)
		setIsOpen(true)
	}

	return (
		<ModalContext.Provider
			value={{
				isOpen,
				title,
				message,
				closeFunction,
				openFunction,
				setModalType,
				type,
				errors: errors,
			}}>
			{children}
		</ModalContext.Provider>
	)
}

export default ModalContextProvider
