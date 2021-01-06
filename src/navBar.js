import { NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

import icon from './img/questIcon.png';

export function NavBar({ changeTheme }) {


	return (

		<Nav>
			<Nav.Item>
				<a class="navbar-brand" href="#">
					<img src={icon} width="40" class="d-inline-block align-center" />
		FFXIV Todo Tracker
	</a>
			</Nav.Item>
			<NavDropdown title='Change Theme' id='theme-dropdown'>
				<NavDropdown.Item onClick={() => changeTheme('light')}>One</NavDropdown.Item>
				<NavDropdown.Item onClick={() => changeTheme('dark')}>One</NavDropdown.Item>
				<NavDropdown.Item>One</NavDropdown.Item>
			</NavDropdown>
		</Nav>
	);
}