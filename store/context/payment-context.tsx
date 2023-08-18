import { createContext, useState } from 'react'

const initialValues = {
	eventId: '',
	username: '',
	updateEventId: (id: string) => {},
	updateUsername: (username: string) => {},
}

export const PaymentContext = createContext(initialValues)

const PaymentContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [eventId, setEventId] = useState('')
	const [username, setUsername] = useState('')

	const updateEventId = (id: string) => {
		setEventId(id)
	}

	const updateUsername = (username: string) => {
		setUsername(username)
	}

	return (
		<PaymentContext.Provider
			value={{ eventId, username, updateEventId, updateUsername }}>
			{children}
		</PaymentContext.Provider>
	)
}

export default PaymentContextProvider
