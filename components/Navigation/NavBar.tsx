import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Exo } from 'next/font/google'
import Link from 'next/link'

import Logo from './Logo'
import BurgerBtn from './BurgerBtn'

import classes from './NavBar.module.scss'
import { useContext } from 'react'
import { ModalContext } from '@/store/context/modal-context'

const exo = Exo({ subsets: ['latin-ext'] })

interface NavBarProps {
	navHandler: () => void
}

const NavBar = ({ navHandler }: NavBarProps): JSX.Element => {
	const { closeFunction } = useContext(ModalContext)
	const { status } = useSession()
	const router = useRouter()

	const logoutHandler = () => {
		signOut({ redirect: false })
		router.push('/')
	}

	const closeModalHandler = (e: React.MouseEvent) => {
		const el = e.target as HTMLElement
		if (el.tagName === 'A') {
			closeFunction()
		}
	}

	return (
		<nav className={classes.navbar + ' ' + exo.className}>
			<div className={classes['mobile-navbar']}>
				<Logo />
				<BurgerBtn navHandler={navHandler} />
			</div>
			<div className={classes['desktop-navbar']}>
				<Logo />
				<ul className={classes.list} onClick={closeModalHandler}>
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
							<button className='logout' onClick={logoutHandler}>
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
