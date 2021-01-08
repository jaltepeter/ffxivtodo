/** react-bootstrap */
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

/** app imports */
import { TodoItem } from './todoItem';

export function TodoList({ title, todos, completePercent, completeTodo, reset }) {

	return (
		<div>
			<Container>
				<Row>
					<Col><h1 style={{ textTransform: 'capitalize' }}>{title}</h1></Col>
					<Col><Button onClick={() => reset(title)} className='float-right'>Reset</Button></Col>
				</Row>
			</Container>

			<ProgressBar variant='success' now={completePercent.toFixed(0)} style={{ marginBottom: '0.5em' }} />

			<ListGroup>
				{todos.map((todo, index) => (
					<TodoItem
						key={`${title}.${index}`}
						type={title}
						index={index}
						todo={todo}
						completeTodo={completeTodo}
					/>
				))}
			</ListGroup>

		</div>
	);
}