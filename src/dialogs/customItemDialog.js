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
import { useInput, useMultiSelect } from '../helpers/useInput';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CustomItemDialog({ isModalOpen, hideModal }) {

	const [items, setItems] = UseStateWithLocalStorage(StorageKey.Custom);

	const [validated, setValidated] = useState(false);

	const { value: name, bind: bindName, reset: resetName } = useInput('');
	const { value: type, bind: bindType, reset: resetType } = useInput('dailies');
	const { value: tags, bind: bindTags, reset: resetTags } = useMultiSelect([]);

	const handleSubmit = (evt) => {
		const form = evt.currentTarget;
		if (form.checkValidity() === false) {
			evt.preventDefault();
			evt.stopPropagation();
			setValidated(true);
		} else {
			evt.preventDefault();
			console.log(`Creating item: ${name} - ${type}`);
			createItem();
			resetName();
			resetType();
			resetTags();
			setValidated(false);
		}
	}

	const createItem = () => {
		var newItems = [...items[type]];
		tags.push('Custom');
		newItems.push({ id: uuidv4(), name: name, tags: tags });
		setItems({ dailies: type === 'dailies' ? newItems : items.dailies, weeklies: type === 'weeklies' ? newItems : items.weeklies });
	};

	const deleteItem = (id, type) => {
		var newItems = [...items[type]];
		newItems = newItems.filter(i => i.id !== id);
		setItems({ dailies: type === 'dailies' ? newItems : items.dailies, weeklies: type === 'weeklies' ? newItems : items.weeklies });
	};

	const saveChanges = () => {
		window.location.reload();
	}

	return (
		<Modal show={isModalOpen} onHide={hideModal} animation={true} backdrop='static'>
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
					<Form.Group as={Row} controlId='tags'>
						<Form.Label column sm='2'>Tags:</Form.Label>
						<Col sm='10'>
							<Form.Control as='select' multiple {...bindTags}>
								<option value='DoW'>DoW</option>
								<option>DoM</option>
								<option>DoH</option>
								<option>DoL</option>
								<option>Gold Saucer</option>
								<option>Other</option>
							</Form.Control>
						</Col>
					</Form.Group>
					<Button variant='primary' type='submit'>Save</Button>
				</Form>
				<hr />
				<h5>Dailies</h5>
				{items.dailies.length > 0
					? <ListGroup className='clearfix'>
						{items.dailies.map(item => (
							<ListGroup.Item
								key={item.id}
								className='d-flex justify-content-between'>{item.name}
								<FontAwesomeIcon icon={faTrash}
									onClick={() => deleteItem(item.id, 'dailies')} />
							</ListGroup.Item>
						))}
					</ListGroup>
					: <p>None yet</p>}

				<h5>Weeklies</h5>

				{items.weeklies.length > 0
					? <ListGroup className='clearfix'>
						{items.weeklies.map(item => (
							<ListGroup.Item
								key={item.id}
								className='d-flex justify-content-between'>{item.name}
								<FontAwesomeIcon icon={faTrash}
									onClick={() => deleteItem(item.id, 'weeklies')} />
							</ListGroup.Item>

						))}
					</ListGroup>
					: <p>None yet</p>}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={saveChanges}>Save Changes and Reload</Button>
			</Modal.Footer>
		</Modal>

	);
}