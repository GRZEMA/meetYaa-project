import Link from 'next/link'
import { useContext, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Exo } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { CSSTransition } from 'react-transition-group'

import classes from './MobileNav.module.scss'
import { ModalContext } from '@/store/context/modal-context'

const exo = Exo({ subsets: ['latin-ext'] })

interface MobileNavProps {
	navHandler: () => void
	isOpen: boolean
}

const MobileNav = ({ navHandler, isOpen }: MobileNavProps): JSX.Element => {
	const { closeFunction } = useContext(ModalContext)
	const navRef = useRef<HTMLElement>(null)
	const router = useRouter()

	const hideNavHandler = (e: React.MouseEvent) => {
		const el = e.target as HTMLElement
		if (el.tagName === 'A') {
			closeFunction()
			navHandler()
		}
	}

	const logoutHandler = () => {
		signOut({ redirect: false })
		router.push('/')
	}

	const { status } = useSession()

	return (
		<CSSTransition
			nodeRef={navRef}
			in={isOpen}
			classNames={{
				enter: classes['navigation-enter'],
				enterActive: classes['navigation-enter-active'],
				exit: classes['navigation-exit'],
				exitActive: classes['navigation-exit-active'],
			}}
			timeout={500}
			unmountOnExit>
			<nav className={`${classes.navigation} ${exo.className}`} ref={navRef}>
				<button className={classes['close-btn']} onClick={navHandler}>
					<FontAwesomeIcon
						icon={faXmark}
						color='white'
						size='2x'
						style={{ height: '2rem' }}
					/>
				</button>
				<ul className={classes.list} onClick={hideNavHandler}>
					<li>
						{status === 'authenticated' ? (
							<button
								className={`logout ${classes.signin}`}
								onClick={logoutHandler}>
								Logout
							</button>
						) : (
							<Link href='/auth' className={classes.signin}>
								Sign In / Sign Up
							</Link>
						)}
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
				</ul>
			</nav>
		</CSSTransition>
	)
}

export default MobileNav
