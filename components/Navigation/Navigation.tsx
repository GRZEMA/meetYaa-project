import Link from 'next/link'
import Logo from './Logo'
import classes from './Navigation.module.scss'

const Navigation = (): JSX.Element => {
	return (
		<ul className={classes.nav}>
			<li>
				<Logo />
			</li>
			<li>
				<Link href='/auth' className={classes.link}>
					Sign In
				</Link>
			</li>
		</ul>
	)
}

export default Navigation
