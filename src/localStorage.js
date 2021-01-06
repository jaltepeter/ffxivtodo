import React from 'react';
import { list } from './data/items';

export const useStateWithLocalStorage = () => {
	const [value, setValue] = React.useState(
		JSON.parse(localStorage.getItem('ffxivtodos')) || list);

	React.useEffect(() => {
		localStorage.setItem('ffxivtodos', JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};