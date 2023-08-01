import Link from 'next/link'
import { MouseEventHandler, useRef, useState } from 'react'

import { Exo } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { CSSTransition } from 'react-transition-group'

import classes from './MobileNav.module.scss'

const exo = Exo({ subsets: ['latin-ext'] })

interface MobileNavProps {
	navHandler: () => void
	isOpen: boolean
}

const MobileNav = ({ navHandler, isOpen }: MobileNavProps): JSX.Element => {
	const navRef = useRef<HTMLElement>(null)

	const hideNavHandler = (e: React.MouseEvent) => {
		const el = e.target as HTMLElement
		if (el.tagName === 'A') {
			navHandler()
		}
	}

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
					<FontAwesomeIcon icon={faXmark} color='white' size='2x' />
				</button>
				<ul className={classes.list} onClick={hideNavHandler}>
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
		</CSSTransition>
	)
}

export default MobileNav