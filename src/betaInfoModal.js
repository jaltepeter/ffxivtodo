/** React */
import React from 'react';

/** react-bootstrap */
import Modal from 'react-bootstrap/Modal';

export function BetaInfoModal({ isModalOpen, hideModal }) {
	// const [show, setShow] = React.useState(false);

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);

	return (

		<Modal show={isModalOpen} onHide={hideModal} animation={true}>
			<Modal.Header closeButton>
				<Modal.Title>FFXIV Todo Tracker Beta</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p><strong>Thank you for helping to test this beta version!</strong></p>
				<p>Please report any issues or suggestions on the <a href='https://github.com/Brunhine/ffxivtodo/issues' target='blank'>GitHub issue Tracker</a></p>
			</Modal.Body>
		</Modal>

	);
}