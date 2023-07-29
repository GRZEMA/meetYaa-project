import EventItem from './EventItem'

import classes from './EventList.module.scss'

const DUMMY_EVENTS = [
	{
		id: 'e1',
		title: 'Programming for everyone',
		briefDescription: 'Learn to code in 2 hours',
		description:
			'engineer occasionally object clay social before tip forty blew knife know want whose fear oldest cage tower back single slide swim moving noted stranger',
		location: 'Somestreet 25, 12345 San Somewhereo',
		date: '2021-05-12',
		image: '/images/ok.webp',
	},
	{
		id: 'e2',
		title: 'Programming for everyone',
		briefDescription: 'Learn to code in 2 hours',
		description:
			'fall outside lay dug basic carbon fierce decide sleep graph broken torn angry direction light dirt sun major section afraid donkey victory border carried',
		location: 'Somestreet 25, 12345 San Somewhereo',
		date: '2021-05-12',
		image: '/images/ok.webp',
	},
	{
		id: 'e3',
		title: 'Programming for everyone',
		briefDescription: 'Learn to code in 2 hours',
		description:
			'construction bush she game cover upward trail hollow family boat public sugar meal oldest new hearing reach supper enter familiar pour tall perfectly shake',
		location: 'Somestreet 25, 12345 San Somewhereo',
		date: '2021-05-12',
		image: '/images/ok.webp',
	},
	{
		id: 'e4',
		title: 'Programming for everyone',
		briefDescription: 'Learn to code in 2 hours',
		description:
			'jungle sold themselves dream opinion flight improve merely verb name lonely knowledge dawn personal powder fat unhappy statement gave next pie suggest train judge',
		location: 'Somestreet 25, 12345 San Somewhereo',
		date: '2021-05-12',
		image: '/images/ok.webp',
	},
]

const EventList = (): JSX.Element => {
	return (
		<ul className={classes.events}>
			{DUMMY_EVENTS.map((event) => (
				<EventItem
					eventName={event.title}
					briefDescription={event.briefDescription}
					eventDate={event.date}
					eventImage={event.image}
					key={event.id}
				/>
			))}
		</ul>
	)
}

export default EventList
