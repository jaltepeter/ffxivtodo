/** react-bootstrap */
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

/** FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export function TodoItem({ todo, type, index, completeTodo }) {

	let checkMark = <></>;
	let completeButton = <></>;

	if (todo.isCompleted) {
		checkMark = <FontAwesomeIcon icon={faCheckCircle} />;

	} else {
		completeButton = <Button onClick={() => completeTodo(type, index)} size='sm'>Complete</Button>;
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
			<p style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
				<span style={{ color: '#00bc8c', marginRight: '1em' }}>{checkMark}</span>
				{todo.name}
				<OverlayTrigger trigger='click' placement='right' overlay={popover}>
					<FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: '1em', cursor: 'pointer' }} />
				</OverlayTrigger>
			</p>
			<div>
				{completeButton}
			</div>
		</ListGroup.Item>
	);
};