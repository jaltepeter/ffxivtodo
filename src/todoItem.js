/** React */
import React from 'react';

/** react-bootstrap */
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

/** images */
import doneIcon from './img/questIcon.png';
import emptyIcon from './img/questIconEmpty.png';
import infoIcon from './img/infoIcon.png';

/** FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function tagToClass(tag) {
	return tag.toLowerCase().replace(/\s/g, '');
}

export function TodoItem({ todo, type, completeTodo, hideTodo, hideShowModeEnabled }) {
	const [open, setOpen] = React.useState(false);

	let completeButton =
		<Image
			src={todo.isCompleted ? doneIcon : emptyIcon}
			width='30'
			onClick={() => completeTodo(type, todo.name)}
			style={{ cursor: 'pointer' }}
			title='click to mark as complete'
			alt="click to mark as complete" />;

	function HideShowButton() {
		return (
			<Button
				size='sm'
				onClick={() => hideTodo(type, todo.name)}>
				{todo.hidden === true ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
			</Button>
		);
	}

	let badges;
	if (todo.tags) {
		badges = todo.tags.map((tag) => (
			<Badge key={`${todo.name}.${tagToClass(tag)}`} className={[tagToClass(tag), 'tagbadge']}>{tag}</Badge>
		))
	}

	return (
		<ListGroup.Item>
			<Row>
				<Col xs={9} md={9} >
					<h4 style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{todo.name}</h4>
					<p>{badges}</p>
				</Col>
				{hideShowModeEnabled === false
					? <Col xs={3} md={3} style={{ textAlign: 'right' }}>
						{completeButton}<br />
						<Image
							src={infoIcon}
							style={{ cursor: 'help', marginTop: '3px' }}
							onClick={() => setOpen(!open)}
							aria-controls="example-collapse-text"
							aria-expanded={open} />
					</Col>
					: <Col xs={3} md={3} style={{ textAlign: 'right' }}><HideShowButton /></Col>
				}
			</Row>
			<Collapse in={open}>
				<div id="example-collapse-text" style={{ overflowWrap: 'anywhere' }}>
					<p>
						<a href={todo.link} target="blank">{todo.link}</a>
					</p>
				</div>
			</Collapse>



			{/* <Row>
				<Col xs={12}>
					
				</Col>

			</Row> */}
		</ListGroup.Item>
	);

};