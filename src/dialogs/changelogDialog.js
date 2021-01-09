/** React */
import React from 'react';

/** react-bootstrap */
import Modal from 'react-bootstrap/Modal';

export function ChangeLog({ isModalOpen, hideModal }) {

	return (

		<Modal show={isModalOpen} onHide={hideModal} animation={true}>
			<Modal.Header closeButton>
				<Modal.Title>FFXIV Todo Tracker Beta</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p><strong>Thank you for helping to test this beta version!</strong></p>
				<p>Please report any issues or suggestions on the <a href='https://github.com/Brunhine/ffxivtodo/issues' target='blank'>GitHub issue Tracker</a></p>
				<hr />
				<h3>v0.3.0</h3>
				<ul>
					<li>Reset buttons now disable and re-enable based on the state of their respective lists</li>
				</ul>
				<hr />
				<h3>v0.2.0</h3>
				<ul>
					<li>Added confirmation dialog when resetting progress</li>
				</ul>
				<hr />
				<h3>v0.1.0</h3>
				<ul>
					<li>Initial testing release</li>
				</ul>
			</Modal.Body>
		</Modal>

	);
}