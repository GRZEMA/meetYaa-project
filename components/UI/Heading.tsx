import classes from './Heading.module.scss'

interface HeadingProps {
	text: string
	id: string
}

const Heading = ({ text, id }: HeadingProps): JSX.Element => {
	return (
		<div className={classes['heading-box']}>
			<h2 className={classes.text} id={id}>
				{text}
			</h2>
			<div className={classes.underline}></div>
		</div>
	)
}

export default Heading
