/** React */
import React, { useEffect } from 'react';

/** react-bootstrap */
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

/** app imports */
import { TodoItem } from './todoItem';
import { ResetProgressDialog } from './dialogs/resetProgressDialog';

/** luxon */
import { DateTime } from 'luxon';

function dailyResetCountdown() {
	var resetTime = DateTime.local().setZone("America/Los_Angeles").set({ hours: 8, minutes: 0, seconds: 0 });
	if (resetTime < DateTime.local()) {
		resetTime = resetTime.plus({ days: 1 });
	}
	return resetTime.diffNow(['hours', 'minutes']);
};

function weeklyResetCountdown() {
	var resetTime = DateTime.local().setZone("America/Los_Angeles").set({ weekday: 2, hours: 1, minutes: 0, seconds: 0 });
	if (resetTime < DateTime.local()) {
		resetTime = resetTime.plus({ weeks: 1 });
	}
	return resetTime.diffNow(['hours', 'minutes']);
};

export function TodoList({ title, todos, completePercent, completeTodo, hideTodo, reset, canReset, hideShowModeEnabled, preferences }) {
	const [isResetModalOpen, setResetModalOpen] = React.useState(false);
	const [dailyresetTime, setDailyResetTime] = React.useState(title === 'dailies' ? dailyResetCountdown : weeklyResetCountdown);

	useEffect(() => {
		const interval = setInterval(() => {
			setDailyResetTime(title === 'dailies' ? dailyResetCountdown : weeklyResetCountdown);
		}, 60000);
		return () => clearInterval(interval);
	})

	const showResetModal = () => setResetModalOpen(true);
	const hideResetModal = () => setResetModalOpen(false);

	if (hideShowModeEnabled === false) {
		todos = todos.filter(s => s.hidden !== true);
	}

	return (
		<div className='h-100'>
			<Container className='stickyHeading'>
				<Row>
					<Col xs='6' style={{ paddingLeft: '0' }}><h1 style={{ textTransform: 'capitalize' }}>{title}</h1></Col>
					<Col xs='6' style={{ paddingRight: '0', textAlign: 'right' }}>
						<Button onClick={() => showResetModal()} className='resetButton' size='sm' disabled={!canReset}>Reset Progress</Button><br />
						<small>Server resets in {dailyresetTime.hours}:{Math.floor(dailyresetTime.minutes).toString().padStart(2, 0)}</small>
					</Col>
				</Row>
				<Row  >
					<Col className='p-0'>
						<ProgressBar variant='success' now={completePercent.toFixed(0)} style={{ marginBottom: '0.5em' }} />
					</Col>
				</Row>
			</Container>
			<ListGroup>
				{todos.map((todo, index) => (
					<TodoItem
						key={`${title}.${todo.name}`}
						type={title}
						index={index}
						todo={todo}
						completeTodo={completeTodo}
						hideTodo={hideTodo}
						hideShowModeEnabled={hideShowModeEnabled}
						preferences={preferences}
					/>
				))}
			</ListGroup>
			<ResetProgressDialog isModalOpen={isResetModalOpen}
				hideModal={hideResetModal}
				reset={() => { reset(title); hideResetModal() }}
				type={title} />
		</div>
	);
}