import { createContext, useState } from 'react'

const initialValues: {
	openFunction: (label: string) => void
	closeFunction: () => void
	isOpen: boolean
	label: string
} = {
	openFunction: (label: string) => {},
	closeFunction: () => {},
	isOpen: false,
	label: '',
}

export const UpdateModalContext = createContext(initialValues)

const UpdateModalContextProvider = ({
	children,
}: {
	children: React.ReactNode
}): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false)
	const [label, setLabel] = useState('')

	const closeFunction = () => {
		setIsOpen(false)
		setLabel('')
	}

	const openFunction = (label: string) => {
		setLabel(label)
		setIsOpen(true)
	}

	return (
		<UpdateModalContext.Provider
			value={{
				isOpen,
				closeFunction,
				openFunction,
				label,
			}}>
			{children}
		</UpdateModalContext.Provider>
	)
}

export default UpdateModalContextProvider
