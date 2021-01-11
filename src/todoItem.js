/** React */
import React from 'react';

/** react-bootstrap */
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

/** images */
import doneIcon from './img/questIcon.png';
import emptyIcon from './img/questIconEmpty.png';
import infoIcon from './img/infoIcon.png';

function tagToClass(tag) {
	return tag.toLowerCase().replace(/\s/g, '');
}

export function TodoItem({ todo, type, index, completeTodo }) {
	const [open, setOpen] = React.useState(false);

	let completeButton =
		<Image
			src={todo.isCompleted ? doneIcon : emptyIcon}
			width='30'
			onClick={() => completeTodo(type, index)}
			style={{ cursor: 'pointer' }}
			title='click to mark as complete'
			alt="click to mark as complete" />;

	let badges;

	if (todo.tags) {
		badges = todo.tags.map((tag) => (
			<Badge key={`${todo.name}.${tagToClass(tag)}`} className={[tagToClass(tag), 'tagbadge']}>{tag}</Badge>
		))
	}

	return (
		<ListGroup.Item>
			<Row>
				<Col xs={10} md={10} >
					<h4 style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{todo.name}</h4>
					<p>{badges}</p>
				</Col>
				<Col xs={2} md={2} style={{ textAlign: 'right' }}>
					{completeButton}<br />
					{/* <OverlayTrigger trigger='click' rootClose placement='auto' overlay={popover}> */}
					<Image
						src={infoIcon}
						style={{ cursor: 'help', marginTop: '3px' }}
						onClick={() => setOpen(!open)}
						aria-controls="example-collapse-text"
						aria-expanded={open} />
					{/* </OverlayTrigger> */}
				</Col>
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