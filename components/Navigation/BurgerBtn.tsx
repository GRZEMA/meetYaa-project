import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import classes from './BurgerBtn.module.scss'

interface BurgerBtnProps {
	navHandler: () => void
}

const BurgerBtn = ({ navHandler }: BurgerBtnProps): JSX.Element => {
	return (
		<button className={classes.btn} onClick={navHandler}>
			<FontAwesomeIcon
				icon={faBars}
				color='#EEF4ED'
				size='2x'
				style={{ height: '2rem' }}
			/>
		</button>
	)
}

export default BurgerBtn
