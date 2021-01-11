/** FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function Footer() {
	return (
		<footer className="footer" >
			<div className="container" >
				<FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} FFXIV Todo Tracker
			</div>
			<div className="container">
				<a href='https://github.com/Brunhine/ffxivtodo'><FontAwesomeIcon icon={faGithub} /> GitHub</a> | <a href='/privacy'>Privacy Policy</a> | <a href='/cookies'>Cookie Policy</a>
			</div>
		</footer>
	);
}