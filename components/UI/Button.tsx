import classes from './Button.module.scss'

interface ButtonProps {
	customStyle?: {}
	text: string
	onClick: () => void
}

const Button = ({ text, onClick, customStyle }: ButtonProps): JSX.Element => {
	console.log(customStyle)
	return (
		<button onClick={onClick} className={classes.button} style={customStyle}>
			{text}
		</button>
	)
}

export default Button
