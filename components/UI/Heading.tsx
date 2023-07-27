import classes from './Heading.module.scss'

interface HeadingProps {
	text: string
}

const Heading = ({ text }: HeadingProps): JSX.Element => {
	return (
		<div className={classes['heading-box']}>
			<h2 className={classes.text}>{text}</h2>
			<div className={classes.underline}></div>
		</div>
	)
}

export default Heading
