/** React */
import React from 'react';

/** app imports */
import { List } from './data/items';

function getDefaultList() {
	var list = List;

	list.dailies.sort((a, b) => a.name.localeCompare(b.name));
	list.weeklies.sort((a, b) => a.name.localeCompare(b.name));

	return list;
}

export const UseStateWithLocalStorage = () => {
	const [value, setValue] = React.useState(
		JSON.parse(localStorage.getItem('ffxivtodos')) || getDefaultList());

	React.useEffect(() => {
		localStorage.setItem('ffxivtodos', JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};