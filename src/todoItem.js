/** react-bootstrap */
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';

/** images */
import doneIcon from './img/questIcon.png';
import emptyIcon from './img/questIconEmpty.png';
import infoIcon from './img/infoIcon.png';

function tagToClass(tag) {
	return tag.toLowerCase().replace(/\s/g, '');
}

export function TodoItem({ todo, type, index, completeTodo }) {

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

	const popover = (
		<Popover id={'popover.' + todo.type + '.' + todo.index}>
			<Popover.Title as='h3'>More Details</Popover.Title>
			<Popover.Content>
				<a href={todo.link} target="blank">{todo.link}</a>
			</Popover.Content>
		</Popover>
	);

	return (
		<ListGroup.Item>
			<Row>
				<Col xs={12} md={8}>
					<h4 style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{todo.name}</h4>
					<p>{badges}</p>
				</Col>
				<Col xs={12} md={4} style={{ textAlign: 'right' }}>
					{completeButton}<br />
					<OverlayTrigger trigger='click' rootClose placement='auto' overlay={popover}>
						<Image src={infoIcon} style={{ cursor: 'help', marginTop: '3px' }} />
					</OverlayTrigger>
				</Col>
			</Row>
		</ListGroup.Item>
	);
};