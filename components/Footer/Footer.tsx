import Link from 'next/link'
import Logo from '../Navigation/Logo'
import classes from './Footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFacebookSquare,
	faTwitterSquare,
	faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons'
import { Exo } from 'next/font/google'
import LogoSvg from '../Navigation/LogoSvg'

const exo = Exo({ subsets: ['latin-ext'] })

const Footer = (): JSX.Element => {
	const footerStyles = {}

	return (
		<footer className={classes.footer + ' ' + exo.className}>
			<div className={classes.wrapper}>
				<div className={classes['firm-info']}>
					<h3>
						<LogoSvg /> MY CO.
					</h3>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
						quibusdam velit voluptatibus ducimus animi. Voluptatum adipisci quos
						consequatur officia, asperiores quam eaque aperiam?
					</p>
				</div>
				<div className={classes.socials}>
					<h3>SOCIALS</h3>
					<ul>
						<li>
							<Link href='/'>
								<span>
									<FontAwesomeIcon
										icon={faFacebookSquare}
										style={{ height: '1.2rem' }}
									/>
								</span>
								Facebook
							</Link>
						</li>
						<li>
							<Link href='/'>
								<span>
									<FontAwesomeIcon
										icon={faTwitterSquare}
										style={{ height: '1.2rem' }}
									/>
								</span>
								Twitter
							</Link>
						</li>
						<li>
							<Link href='/'>
								<span>
									<FontAwesomeIcon
										icon={faInstagramSquare}
										style={{ height: '1.2rem' }}
									/>
								</span>
								Instagram
							</Link>
						</li>
					</ul>
				</div>
				<div className={classes.about}>
					<h3>ABOUT</h3>
					<ul>
						<li>
							<Link href='/'>About us</Link>
						</li>
						<li>
							<Link href='/'>Carrier</Link>
						</li>
						<li>
							<Link href='/'>FAQ</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

export default Footer
