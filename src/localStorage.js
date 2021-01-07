/** React */
import React from 'react';

/** app imports */
import { List } from './data/items';

export const UseStateWithLocalStorage = () => {
	const [value, setValue] = React.useState(
		JSON.parse(localStorage.getItem('ffxivtodos')) || List);

	React.useEffect(() => {
		localStorage.setItem('ffxivtodos', JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};