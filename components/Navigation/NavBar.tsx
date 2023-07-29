import { Exo } from 'next/font/google'
import Link from 'next/link'

import Logo from './Logo'
import BurgerBtn from './BurgerBtn'

import classes from './NavBar.module.scss'

const exo = Exo({ subsets: ['latin-ext'] })

interface NavBarProps {
	navHandler: () => void
}

const NavBar = ({ navHandler }: NavBarProps): JSX.Element => {
	return (
		<nav className={classes.navbar + ' ' + exo.className}>
			<div className={classes['mobile-navbar']}>
				<Logo />
				<BurgerBtn navHandler={navHandler} />
			</div>
			<div className={classes['desktop-navbar']}>
				<Logo />
				<ul className={classes.list}>
					{/* {conditional links based on auth} */}
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
					<li>
						<Link href='/auth' className={classes.link}>
							Sign In / Sign Up
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
