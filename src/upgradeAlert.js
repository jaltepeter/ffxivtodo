/** react-bootstrap */
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/** app imports */
import { List } from './data/items'

export function UpgradeAlert({ todos, upgradeList }) {
	if (todos.version < List.version)
		return (
			<Alert variant='warning'>
				This is an alert!
				<div className="d-flex justify-content-end">
					<Button variant="primary" onClick={() => upgradeList(todos)}>Click here to upgrade</Button>
				</div>
			</Alert>
		);
	else
		return (<></>);
}