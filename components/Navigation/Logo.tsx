import Link from 'next/link'
import LogoSvg from './LogoSvg'
import classes from './Logo.module.scss'

const Logo = (): JSX.Element => {
	return (
		<Link href='/' className={classes.link}>
			<div className={classes.logo}>
				<LogoSvg />
				<p>meetYAA</p>
			</div>
		</Link>
	)
}

export default Logo
