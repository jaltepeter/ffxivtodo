/** React */
import React from 'react';

/** react-bootstrap */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

/** compare-versions */
import compareVersions from 'compare-versions';

/** images */
import logo from '../img/questIcon.png';
import updateIcon from '../img/updateIcon.png';

/** components */
import { ChangeLog } from '../dialogs/changelogDialog';
import { PreferencesDialog } from '../dialogs/preferencesDialog';
import { CustomItemDialog } from '../dialogs/customItemDialog';
import { ResetToDefaultsDialog } from '../dialogs/resetDefaultsDialog';
import { NavDropdown } from 'react-bootstrap';

import { StorageKey } from '../enums';
import { version as app_version } from '../../package.json';

export function NavBar({ showHideModeEnabled, toggleShowHideMode, resetDefaults, prefs }) {

	const [isChangeLogModalOpen, setChangeLogModalOpen] = React.useState(false);
	const [isPrefsModalOpen, setPrefsModalOpen] = React.useState(false);
	const [isCustomItemOpen, setCustomItemOpen] = React.useState(false);
	const [isResetDefaultsOpen, setResetDefaultsOpen] = React.useState(false);

	const showChangeLog = () => {
		prefs.lastVersion = app_version;
		localStorage.setItem(StorageKey.Prefs, JSON.stringify(prefs));
		setChangeLogModalOpen(true);
	}

	const hideChangeLog = () => { setChangeLogModalOpen(false); }

	const showPrefs = () => { setPrefsModalOpen(true); }
	const hidePrefs = () => { setPrefsModalOpen(false); }

	const showCustomItems = () => { setCustomItemOpen(true); }
	const hideCustomItems = () => { setCustomItemOpen(false); }

	const showResetDefaults = () => { setResetDefaultsOpen(true); }
	const hideResetDefaults = () => { setResetDefaultsOpen(false); }

	const UpdateBadge = () => {
		if (compareVersions.compare(app_version, prefs.lastVersion || '0.0.0', '>')) {
			return (
				<>&nbsp;<img src={updateIcon} alt='' style={{ width: '2em' }} /></>
			);
		} else {
			return null;
		}
	}

	return (
		<div>
			<Navbar variant='dark' bg='primary' expand='lg' fixed='top'>
				<Navbar.Brand href='/'>
					<Image src={logo} width='40' />FFXIV Todo Tracker
			</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'></Nav>
					<Nav>
						<Nav.Link onClick={showChangeLog} style={{ display: 'flex', alignItems: 'center' }}>Beta {app_version}<UpdateBadge /></Nav.Link>
					</Nav>
					<Nav >
						<NavDropdown title='Options' alignRight id='nav-options-dropdown'>
							<NavDropdown.Item onClick={showPrefs}>Preferences</NavDropdown.Item>
							<NavDropdown.Item onClick={showCustomItems}>Custom Items</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={toggleShowHideMode}>
								{showHideModeEnabled ? 'Exit' : 'Enable'} Show/Hide Mode
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={showResetDefaults}>Restore Defaults</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<ChangeLog
				isModalOpen={isChangeLogModalOpen}
				hideModal={hideChangeLog} />
			<PreferencesDialog
				isModalOpen={isPrefsModalOpen}
				hideModal={hidePrefs} />
			<CustomItemDialog
				isModalOpen={isCustomItemOpen}
				hideModal={hideCustomItems} />
			<ResetToDefaultsDialog
				isModalOpen={isResetDefaultsOpen}
				hideModal={hideResetDefaults}
				reset={resetDefaults} />
		</div>
	);

}