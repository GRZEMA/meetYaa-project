export const validateEventForm = ({
	title,
	location,
	date,
	time,
	image,
	description,
}: {
	title: string
	location: string
	date: string
	time: string
	image: string
	description: string
}) => {
	const errors = []

	if (title.trim() === '') {
		errors.push({
			message: 'Title is required!',
		})
	}

	if (location.trim() === '') {
		errors.push({
			message: 'Location is required!',
		})
	}

	if (date.trim() === '') {
		errors.push({
			message: 'Date is required!',
		})
	}

	if (time.trim() === '') {
		errors.push({
			message: 'Time is required!',
		})
	}

	if (description.trim() === '') {
		errors.push({
			message: 'Description is required!',
		})
	}

	if (image.trim() === '') {
		errors.push({
			message: 'Image is required!',
		})
	}

	return errors
}
