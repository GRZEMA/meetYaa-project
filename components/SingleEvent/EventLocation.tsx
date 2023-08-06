import Image from 'next/image'

import classes from './EventLocation.module.scss'

const EventLocation = (): JSX.Element => {
	const address = 'Warszawa, ul. Okopowa 55'
	return (
		<div className={classes['location-box']}>
			<div className={classes['image-box']}>
				<Image src='/images/ok.webp' alt='Image brief description' fill />
			</div>
			<div className={classes['map-box']}>
				<iframe
					src={`https://maps.google.com/maps?&q="+${address}"&output=embed`}
					style={{
						border: '0',
						position: 'absolute',
						top: '0',
						width: '100%',
						height: '100%',
					}}
					loading='lazy'></iframe>
			</div>
		</div>
	)
}

export default EventLocation
