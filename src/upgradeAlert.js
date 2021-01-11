/** React */
import React from 'react';

/** react-bootstrap */
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

/** app imports */
import { List } from './data/items'

export function UpgradeAlert({ todos, upgradeList }) {
	const [showToast, setShowToast] = React.useState(true);

	const toggleShow = () => setShowToast(!showToast);

	if (todos.version < List.version)
		return (
			<div style={{ position: 'fixed', zIndex: '3050', top: '0' }}>
				<Toast className='upgradeAlert' onClose={toggleShow} show={showToast} animation={true}>
					<Toast.Header>
						<strong className="mr-auto">New list version</strong>
					</Toast.Header>
					<Toast.Body>
						<p>A new version of the default list has been published. In order to see the changes, you need to upgrade your list.</p>
						<p>WARNING: Upgrading your list may reset your current progress on certain tasks.</p>
						<Button variant="primary" onClick={() => upgradeList(todos)}>Click here to upgrade your list</Button>
					</Toast.Body>
				</Toast>
			</div>
		);
	else
		return (<></>);
}