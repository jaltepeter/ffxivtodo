/** React */
import React from 'react';

/** CSS */
import './css/App.css';
import './css/bootstrap.min.css';

/** react-bootstrap */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row';

/** app imports */
import { TodoItem } from './todoItem';
import { useStateWithLocalStorage } from './localStorage';
import { list } from './data/items';
import { UpgradeAlert } from './upgradeAlert'

function App() {
	const [todos, setTodos] = useStateWithLocalStorage();

	/**
	 * Marks a TodoItem as complete
	 * @param {string} type  The type of TodoItem ("daily or "weekly)
	 * @param {int}    index The index of the item in its respective category
	 */
	const completeTodo = (type, index) => {
		const version = todos.version;
		const newTodos = [...todos[type]];
		console.log(index);
		console.log(newTodos);
		newTodos[index].isCompleted = true;
		todos[type] = newTodos;

		if (type === 'dailies') {
			setTodos({ 'version': version, 'dailies': newTodos, 'weeklies': todos.weeklies });
		} else {
			setTodos({ 'version': version, 'dailies': todos.dailies, 'weeklies': newTodos });
		}

		console.log(todos);
	};

	/**
	 * Resets progress on the specified list by marking all items as incomplete
	 * @param {string} type The type of TodoItem ("daily or "weekly)
	 */
	const reset = type => {
		const version = todos.version;
		const newTodos = [...todos[type]];
		newTodos.forEach(element => {

			element.isCompleted = false;

		});
		if (type === 'dailies') {
			setTodos({ 'version': version, 'dailies': newTodos, 'weeklies': todos.weeklies });
		} else {
			setTodos({ 'version': version, 'dailies': todos.dailies, 'weeklies': newTodos });
		}
	}

	/**
	 * Provides functionality to upgrade the list in the user's localstorage to a new version 
	 * in the event that the list was changed.
	 */
	const upgradeList = () => {
		setTodos(list);
	}

	// Build values for progress bars
	let dailyComplete = (todos.dailies.filter(d => d.isCompleted === true).length / todos.dailies.length) * 100;
	let weeklyComplete = (todos.weeklies.filter(d => d.isCompleted === true).length / todos.weeklies.length) * 100;

	return (
		<Container>
			<UpgradeAlert todos={todos} upgradeList={upgradeList} />
			<Container>
				<Row>
					<Col>
						<Card>
							<Card.Header>Dailies <ProgressBar now={dailyComplete.toFixed(0)} /></Card.Header>
							<ListGroup>
								{todos.dailies.map((todo, index) => (
									<TodoItem
										key={index}
										type='dailies'
										index={index}
										todo={todo}
										completeTodo={completeTodo}
									/>
								))}
							</ListGroup>
							<Card.Footer><Button onClick={() => reset('dailies')}>Reset Dailies</Button></Card.Footer>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Header>Weeklies  <ProgressBar now={weeklyComplete.toFixed(0)} /></Card.Header>
							<ListGroup>
								{todos.weeklies.map((todo, index) => (
									<TodoItem
										key={index}
										type='weeklies'
										index={index}
										todo={todo}
										completeTodo={completeTodo}
									/>
								))}
							</ListGroup>
							<Card.Footer><Button onClick={() => reset('weeklies')}>Reset Weeklies</Button></Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>

			<Container>
				<label>Your list schema version: {todos.version}</label>
			</Container>

			<Container>
				<Button onClick={() => upgradeList()}>Upgrade List</Button>
			</Container>
		</Container>
	);
};

export default App;