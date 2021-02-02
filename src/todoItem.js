/** React */
import React from 'react';

/** react-bootstrap */
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

/** images */
import doneIcon from './img/questIcon.png';
import emptyIcon from './img/questIconEmpty.png';
import infoIcon from './img/infoIcon.png';
import cgwLogo from './img/cgw.png';
import geLogo from './img/ge.png';

/** FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLink } from '@fortawesome/free-solid-svg-icons';

import { LinkSource } from './enums'

function tagToClass(tag) {
	return tag.toLowerCase().replace(/\s/g, '');
}

export function TodoItem({ todo, type, completeTodo, hideTodo, hideShowModeEnabled, prefs }) {
	const [open, setOpen] = React.useState(prefs.alwaysShowInfo);

	let completeButton =
		<Image
			src={todo.isCompleted ? doneIcon : emptyIcon}
			width='30'
			onClick={() => completeTodo(type, todo.name)}
			style={{ cursor: 'pointer' }}
			title='click to mark as complete'
			alt="click to mark as complete" />;

	function LinkLogo({ source }) {
		if (source !== 'other') {
			var logo;
			switch (source) {
				case LinkSource.ConsoleGaming:
					logo = cgwLogo;
					break;
				case LinkSource.GamerEscape:
					logo = geLogo;
					break;
				default:
					break;
			}
			return (<img className='linkLogo' src={logo} alt='' />)
		} else {
			return (<FontAwesomeIcon icon={faLink} />);
		}
	}

	function ExternalLink({ source, url }) {

		if ((source === LinkSource.ConsoleGaming && !prefs.hideCGWLinks)
			|| (source === LinkSource.GamerEscape && !prefs.hideGELinks)) {
			return (
				<p className="todoLink"><LinkLogo source={source} /> <a href={url} target="blank">{url}</a></p>
			);
		} else {
			return null;
		}
	}

	function HideShowButton() {
		return (
			<Button
				size='sm'
				onClick={() => hideTodo(type, todo.name)}>
				{todo.hidden === true ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
			</Button>
		);
	}

	let badges;
	if (todo.tags) {
		badges = todo.tags.map((tag) => (
			<Badge key={`${todo.name}.${tagToClass(tag)}`} className={[tagToClass(tag), 'tagbadge']}>{tag}</Badge>
		))
	}

	return (
		<ListGroup.Item>
			<Row>
				<Col xs={9} md={9} >
					<h4 style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{todo.name}</h4>
					<p>{badges}</p>
				</Col>
				{hideShowModeEnabled === false
					? <Col xs={3} md={3} style={{ textAlign: 'right' }}>
						{completeButton}<br />
						{(todo.links && prefs.alwaysShowInfo !== true) &&
							<Image
								src={infoIcon}
								style={{ cursor: 'help', marginTop: '3px' }}
								onClick={() => setOpen(!open)}
								aria-controls="moreInfo-collapse-text"
								aria-expanded={open}
								title='click to show more info'
							/>
						}
					</Col>
					: <Col xs={3} md={3} style={{ textAlign: 'right' }}><HideShowButton /></Col>
				}
			</Row>
			<Collapse in={open}>
				<div id="moreInfo-collapse-text" style={{ overflowWrap: 'anywhere' }}>
					<h5>Notes</h5>
					{todo.links && <h5>Links</h5>}
					{todo.links && todo.links.map((link, index) => (
						<ExternalLink
							source={link.source}
							url={link.url}
							key={link.url}
						/>
					))}
				</div>

			</Collapse>
		</ListGroup.Item>
	);

};