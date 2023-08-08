import { EventModel } from '@/types/EventModel'
import EventList from '../EventList/EventList'
import Heading from '../UI/Heading'

import classes from './AllEvents.module.scss'
import SearchEvent from './SearchEvent'
import { useEffect, useState } from 'react'

interface AllEventsProps {
	events: EventModel[]
}

const AllEvents = ({ events }: AllEventsProps): JSX.Element => {
	const [eventsProp, setEventsProp] = useState(events)

	useEffect(() => {
		setEventsProp(events)
	}, [events])

	const onSearch = (filter: string = '') => {
		setEventsProp(
			events.filter((event) =>
				event.title.toLowerCase().includes(filter.toLowerCase())
			)
		)
	}

	return (
		<section className={classes.section}>
			<Heading id='All Events' text='All Events' />
			<SearchEvent onSearch={onSearch} />
			<EventList events={eventsProp} />
		</section>
	)
}

export default AllEvents
