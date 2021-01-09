/** React */
import React from 'react';

/** react-bootstrap */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function ResetProgressDialog({ isModalOpen, hideModal, type, reset }) {
	return (

		<Modal show={isModalOpen} onHide={hideModal} animation={true}>
			<Modal.Header closeButton>
				<Modal.Title>Reset {type}?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Are you sure you want to reset your progress for {type}?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={hideModal} variant='primary'>Cancel</Button>
				<Button onClick={reset} variant='primary'>Reset</Button>
			</Modal.Footer>
		</Modal>

	);
}