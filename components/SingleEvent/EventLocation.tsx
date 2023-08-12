import Image from 'next/image'

import classes from './EventLocation.module.scss'
import { Suspense } from 'react'

interface EventLocationProps {
	location: string
	image: string
	briefDescription: string
}

const EventLocation = ({
	location,
	image,
	briefDescription,
}: EventLocationProps): JSX.Element => {
	const address = location

	return (
		<div className={classes['location-box']}>
			<div className={classes['image-box']}>
				<Image src={image} alt={briefDescription} fill sizes='100%' />
			</div>
			<div className={classes['map-box']}>
				<iframe
					src={`https://maps.google.com/maps?&q="+${address}"&output=embed`}
					loading='lazy'
					style={{
						border: '0',
						position: 'absolute',
						top: '0',
						width: '100%',
						height: '100%',
					}}></iframe>
			</div>
		</div>
	)
}

export default EventLocation
