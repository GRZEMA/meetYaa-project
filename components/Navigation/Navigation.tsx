import { useState } from 'react'

import NavBar from '@/components/Navigation/NavBar'
import MobileNav from '@/components/Navigation/MobileNav'

const Navigation = (): JSX.Element => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
	const [navState, setNavState] = useState<'active' | 'closing'>('active')

	const navHandler = () => {
		if (isMobileNavOpen) {
			setNavState('closing')
			setTimeout(() => {
				setIsMobileNavOpen((prev) => !prev)
			}, 500)
		} else {
			setNavState('active')
			setIsMobileNavOpen((prev) => !prev)
		}
	}

	return (
		<>
			<NavBar navHandler={navHandler} />
			{isMobileNavOpen && (
				<MobileNav navState={navState} navHandler={navHandler} />
			)}
		</>
	)
}

export default Navigation
