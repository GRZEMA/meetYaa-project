import Link from 'next/link'

import { Exo } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import classes from './MobileNav.module.scss'
import { useEffect } from 'react'

const exo = Exo({ subsets: ['latin-ext'] })

interface MobileNavProps {
	navHandler: () => void
	navState: 'active' | 'closing'
}

const MobileNav = ({ navHandler, navState }: MobileNavProps): JSX.Element => {
	const navClasses = `${classes[navState]} ${classes.navigation} ${exo.className}`

	return (
		<nav className={navClasses}>
			<button className={classes['close-btn']} onClick={navHandler}>
				<FontAwesomeIcon icon={faXmark} color='white' size='2x' />
			</button>
			<ul className={classes.list}>
				<li>
					<Link href='/auth' className={classes.signin}>
						Sign In / Sign Up
					</Link>
				</li>
				<li>
					<Link href='/' className={classes.link}>
						Home
					</Link>
				</li>
				<li>
					<Link href='/events' className={classes.link}>
						All Events
					</Link>
				</li>
				{/* {conditional links based on auth} */}
			</ul>
		</nav>
	)
}

export default MobileNav
