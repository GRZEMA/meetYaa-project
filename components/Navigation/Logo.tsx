import Link from 'next/link'

import { Gochi_Hand } from 'next/font/google'

import LogoSvg from './LogoSvg'
import classes from './Logo.module.scss'

const gochi = Gochi_Hand({ subsets: ['latin'], weight: '400' })

const Logo = (): JSX.Element => {
	return (
		<Link href='/' className={classes.link}>
			<div className={classes.logo}>
				<LogoSvg />
				<p className={gochi.className}>meetYAA</p>
			</div>
		</Link>
	)
}

export default Logo
