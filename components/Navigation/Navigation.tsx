import { useState } from 'react'

import NavBar from '@/components/Navigation/NavBar'
import MobileNav from '@/components/Navigation/MobileNav'

const Navigation = (): JSX.Element => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

	const navHandler = () => {
		setIsMobileNavOpen((prev) => !prev)
	}

	return (
		<>
			<NavBar navHandler={navHandler} />
			<MobileNav navHandler={navHandler} isOpen={isMobileNavOpen} />
		</>
	)
}

export default Navigation
