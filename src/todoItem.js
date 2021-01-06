/** react-bootstrap */
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';

/** FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import emptyIcon from './img/questIconEmpty.png';
import doneIcon from './img/questIcon.png';

function tagToClass(tag) {
	return tag.toLowerCase().replace(/\s/g, '');
}

export function TodoItem({ todo, type, index, completeTodo }) {

	let completeButton =
		<Image
			src={todo.isCompleted ? doneIcon : emptyIcon}
			width='30'
			onClick={() => completeTodo(type, index)}
			alt="click to mark as complete" />;

	let badges;

	if (todo.tags) {
		badges = todo.tags.map((tag) => (
			<Badge className={[tagToClass(tag), 'tagbadge']}>{tag}</Badge>
		))
	}

	const popover = (
		<Popover id={'popover.' + todo.type + '.' + todo.index}>
			<Popover.Title as='h3'>More Details</Popover.Title>
			<Popover.Content>
				<a href={todo.link} target="blank">{todo.link}</a>
			</Popover.Content>
		</Popover>

	);

	return (
		<ListGroup.Item >
			<Row>
				<Col xs={12} md={8}>
					<p style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
						{/* <span style={{ color: '#00bc8c', marginRight: '1em' }}>{checkMark}</span> */}
						{todo.name}
						<OverlayTrigger trigger='click' rootClose placement='auto' overlay={popover}>
							<FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '1em', cursor: 'pointer' }} />
						</OverlayTrigger>
					</p>
					<p>{badges}</p>
				</Col>
				<Col xs={12} md={4} style={{ textAlign: 'right' }}>
					{completeButton}
				</Col>
			</Row>

			<div>

			</div>
		</ListGroup.Item>
	);
};