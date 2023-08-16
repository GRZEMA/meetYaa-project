import { createContext, useState } from 'react'

const initialValues: {
	openFunction: (label: string, type: string) => void
	closeFunction: () => void
	isOpen: boolean
	label: string
	type: string
} = {
	openFunction: (label: string, type: string) => {},
	closeFunction: () => {},
	isOpen: false,
	label: '',
	type: '',
}

export const UpdateModalContext = createContext(initialValues)

const UpdateModalContextProvider = ({
	children,
}: {
	children: React.ReactNode
}): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false)
	const [label, setLabel] = useState('')
	const [type, setType] = useState('')

	const closeFunction = () => {
		setIsOpen(false)
		setLabel('')
		setType('')
	}

	const openFunction = (label: string, type: string) => {
		setLabel(label)
		setType(type)
		setIsOpen(true)
	}

	return (
		<UpdateModalContext.Provider
			value={{
				isOpen,
				closeFunction,
				openFunction,
				label,
				type,
			}}>
			{children}
		</UpdateModalContext.Provider>
	)
}

export default UpdateModalContextProvider
