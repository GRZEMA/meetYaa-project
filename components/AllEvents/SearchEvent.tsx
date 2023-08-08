import { useRef } from 'react'
import classes from './SearchEvent.module.scss'
import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin-ext'] })

interface SearchEventProps {
	onSearch: (filter: string) => void
}

const SearchEvent = ({ onSearch }: SearchEventProps): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null)

	const searchEventsHandler = () => {
		const enteredText = inputRef.current!.value
		onSearch(enteredText)
	}

	return (
		<div className={classes['input-box']}>
			<input
				type='text'
				placeholder='Search some Events!'
				ref={inputRef}
				onChange={searchEventsHandler}
			/>
		</div>
	)
}

export default SearchEvent
