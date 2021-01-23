/** React */
import React, { useState } from 'react';
import { Col } from 'react-bootstrap';

/** react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { StorageKey } from '../enums';
import { UseStateWithLocalStorage } from '../helpers/localStorage';
import { useInput } from '../helpers/useInput';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CustomItemDialog({ isModalOpen, hideModal }) {

	const [items, setItems] = UseStateWithLocalStorage(StorageKey.Custom);

	const [validated, setValidated] = useState(false);


	const { value: name, bind: bindName, reset: resetName } = useInput('');
	const { value: type, bind: bindType, reset: resetType } = useInput('dailies');

	const handleSubmit = (evt) => {
		const form = evt.currentTarget;
		if (form.checkValidity() === false) {
			evt.preventDefault();
			evt.stopPropagation();
			setValidated(true);
		} else {
			evt.preventDefault();
			console.log(`Creating item: ${name} - ${type}`);
			createItem(name, type);
			resetName();
			resetType();
			setValidated(false);
		}
	}

	const createItem = (name, type) => {
		var newItems = [...items[type]];
		newItems.push({ id: uuidv4(), name: name });
		setItems({ dailies: type === 'dailies' ? newItems : items.dailies, weeklies: type === 'weeklies' ? newItems : items.weeklies });
	};

	const deleteItem = (id, type) => {
		var newItems = [...items[type]];
		newItems = newItems.filter(i => i.id !== id);
		setItems({ dailies: type === 'dailies' ? newItems : items.dailies, weeklies: type === 'weeklies' ? newItems : items.weeklies });
	};

	return (
		<Modal show={isModalOpen} onHide={hideModal} animation={true}>
			<Modal.Header closeButton>
				<Modal.Title>Custom Items</Modal.Title>
			</Modal.Header>
			<Modal.Body className=''>
				<h5>New Item</h5>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group as={Row} controlId='itemName'>
						<Form.Label column sm='2'>Name:</Form.Label>
						<Col sm='10'>
							<Form.Control
								required
								type='text'
								{...bindName}
								placeholder='Do this thing' />
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId='itemType'>
						<Form.Label column sm='2'>Type:</Form.Label>
						<Col sm='10'>
							<Form.Control as='select' {...bindType}>
								<option value='dailies'>Daily</option>
								<option value='weeklies'>Weekly</option>
							</Form.Control>
						</Col>
					</Form.Group>
					<Button variant='primary' type='submit'>Save</Button>
				</Form>
				<hr />
				<h5>Dailies</h5>
				<ListGroup className='clearfix'>
					{items.dailies.map(item => (
						<ListGroup.Item
							key={item.id}
							className='d-flex justify-content-between'>{item.name}
							<FontAwesomeIcon icon={faTrash}
								onClick={() => deleteItem(item.id, 'dailies')} />
						</ListGroup.Item>

					))}
				</ListGroup>
				<h5>Weeklies</h5>
				<ListGroup className='clearfix'>
					{items.weeklies.map(item => (
						<ListGroup.Item
							key={item.id}
							className='d-flex justify-content-between'>{item.name}
							<FontAwesomeIcon icon={faTrash}
								onClick={() => deleteItem(item.id, 'weeklies')} />
						</ListGroup.Item>

					))}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={hideModal}>Done</Button>
			</Modal.Footer>
		</Modal>

	);
}