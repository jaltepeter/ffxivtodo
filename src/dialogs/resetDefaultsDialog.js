/** React */
import React from 'react';

/** react-bootstrap */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function ResetToDefaultsDialog({ isModalOpen, hideModal, type, reset }) {
	return (

		<Modal show={isModalOpen} onHide={hideModal} animation={true}>
			<Modal.Header closeButton>
				<Modal.Title>Reset To Defaults?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>This will reset your lists to defaults. All custom items, and notes will be deleted.</p>
				<p>This cannot be undone.</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={hideModal} variant='primary'>Cancel</Button>
				<Button onClick={reset} variant='primary'>Reset</Button>
			</Modal.Footer>
		</Modal>

	);
}