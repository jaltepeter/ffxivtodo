/** React */
import React from 'react';

/** react-bootstrap */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

/** images */
import logo from '../img/questIcon.png';

/** components */
import { ChangeLog } from '../dialogs/changelogDialog';
import { version as app_version } from '../../package.json';

export function NavBar() {

	const [isModalOpen, setModalOpen] = React.useState(false);

	const showModal = () => {
		setModalOpen(true);
	}

	const hideModal = () => {
		setModalOpen(false);
	}

	return (
		<>
			<Navbar variant='dark' bg='primary' expand='lg' fixed='top'>
				<Navbar.Brand href='/'>
					<Image src={logo} width='40' />FFXIV Todo Tracker
			</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
					</Nav>
					<Nav>
						<Nav.Link className='mr-sm-2' onClick={showModal}>Beta {app_version}</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<ChangeLog
				isModalOpen={isModalOpen}
				hideModal={hideModal} />
		</>
	);

}