import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

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
	const { status } = useSession()

	return (
		<nav className={classes.navbar + ' ' + exo.className}>
			<div className={classes['mobile-navbar']}>
				<Logo />
				<BurgerBtn navHandler={navHandler} />
			</div>
			<div className={classes['desktop-navbar']}>
				<Logo />
				<ul className={classes.list}>
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
					{status === 'authenticated' && (
						<>
							<li>
								<Link href='/my-profile' className={classes.link}>
									My Profile
								</Link>
							</li>
							<li>
								<Link href='/events/create' className={classes.link}>
									Create Event
								</Link>
							</li>
						</>
					)}
					<li>
						{status !== 'authenticated' ? (
							<Link href='/auth' className={classes.link}>
								Sign In / Sign Up
							</Link>
						) : (
							<button
								className='logout'
								onClick={() => signOut({ redirect: false })}>
								Logout
							</button>
						)}
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
