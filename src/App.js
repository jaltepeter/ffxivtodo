/** React */
import React from 'react';

/** CSS */
import './css/bootstrap.min.css';
import './css/App.css';

/** react-bootstrap */
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/** app imports */
import { TodoList } from './todoList';
import { UseStateWithLocalStorage } from './localStorage';
import { List } from './data/items';
import { UpgradeAlert } from './upgradeAlert'
import { NavBar } from './navBar';

function App() {

	const [todos, setTodos] = UseStateWithLocalStorage();

	/**
	 * Marks a TodoItem as complete
	 * @param {string} type  The type of TodoItem ("daily or "weekly)
	 * @param {int}    index The index of the item in its respective category
	 */
	const completeTodo = (type, index) => {
		const version = todos.version;
		const newTodos = [...todos[type]];
		newTodos[index].isCompleted = !newTodos[index].isCompleted;
		newTodos.sort((a, b) => a.isCompleted - b.isCompleted || a.name.localeCompare(b.name));
		todos[type] = newTodos;

		if (type === 'dailies') {
			setTodos({ 'version': version, 'dailies': newTodos, 'weeklies': todos.weeklies });
		} else {
			setTodos({ 'version': version, 'dailies': todos.dailies, 'weeklies': newTodos });
		}
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
		newTodos.sort((a, b) => a.name.localeCompare(b.name));
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
		setTodos(List);
	}

	// Build values for progress bars
	let dailyComplete = (todos.dailies.filter(d => d.isCompleted === true).length / todos.dailies.length) * 100;
	let weeklyComplete = (todos.weeklies.filter(d => d.isCompleted === true).length / todos.weeklies.length) * 100;

	return (
		<div>
			<NavBar />

			<Container>
				<UpgradeAlert todos={todos} upgradeList={upgradeList} />
				<Container>
					<Row>
						<Col sm={12} md={6} className='todoList'>
							<TodoList
								title='dailies'
								todos={todos.dailies}
								completePercent={dailyComplete}
								completeTodo={completeTodo}
								reset={reset}
							/>
						</Col>
						<Col sm={12} md={6} className='todoList'>
							<TodoList
								title='weeklies'
								todos={todos.weeklies}
								completePercent={weeklyComplete}
								completeTodo={completeTodo}
								reset={reset}
							/>
						</Col>
					</Row>
				</Container>
			</Container>
		</div>
	);
};

export default App;