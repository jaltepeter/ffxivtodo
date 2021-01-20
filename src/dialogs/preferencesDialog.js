/** React */
import React from 'react';

/** react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export function PreferencesDialog({ isModalOpen, hideModal }) {

	const [prefs, setPrefs] = React.useState(JSON.parse(localStorage.getItem('preferences')) || {});

	const togglePref = (prefKey) => {
		prefs[prefKey] = !prefs[prefKey];
		setPrefs(prefs);
		console.log(prefs);
	}

	const cancelChanges = () => {
		setPrefs(JSON.parse(localStorage.getItem('preferences')) || {});
		hideModal();
	}

	const saveChanges = () => {
		localStorage.setItem('preferences', JSON.stringify(prefs));
		hideModal();
		window.location.reload();
	}

	return (
		<Modal show={isModalOpen} onHide={cancelChanges} animation={true}>
			<Modal.Header closeButton>
				<Modal.Title>FFXIV Todo Tracker Preferences</Modal.Title>
			</Modal.Header>
			<Modal.Body className='changeLog'>
				<Form>
					<h5>Layout and Appearance</h5>
					<Form.Group controlId='alwaysShowInfo'>
						<Form.Check
							defaultChecked={prefs.alwaysShowInfo}
							type='checkbox'
							label='Expand "More Info" by default'
							onChange={() => togglePref('alwaysShowInfo')} />
					</Form.Group>
					<h5>More Info Links</h5>
					<Form.Group controlId='hideCGWLinks'>
						<Form.Check
							defaultChecked={prefs.hideCGWLinks}
							type='checkbox'
							label='Hide Console Gaming Wiki Links'
							onChange={() => togglePref('hideCGWLinks')} />
					</Form.Group>
					<Form.Group controlId='hideGELinks'>
						<Form.Check
							defaultChecked={prefs.hideCGWLinks}
							type='checkbox'
							label='Hide Gamer Escape Links'
							onChange={() => togglePref('hideGELinks')} />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={cancelChanges}>Cancel</Button>
				<Button variant="primary" onClick={saveChanges}>Save Changes</Button>
			</Modal.Footer>
		</Modal>

	);
}