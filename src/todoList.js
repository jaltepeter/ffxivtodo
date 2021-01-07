/** react-bootstrap */
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';

/** app imports */
import { TodoItem } from './todoItem';

export function TodoList({ title, todos, completePercent, completeTodo, reset }) {

	return (
		<div>
			<h1 style={{ textTransform: 'capitalize' }}>{title}</h1>

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
			<Button onClick={() => reset(title)}>Reset</Button>
		</div>
	);
}