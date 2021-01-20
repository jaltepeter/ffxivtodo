/** React */
import React from 'react';

/** app imports */
import { List } from '../data/items';
import { StorageKey } from '../enums';

function getDefaultList() {
	var list = List;

	list.dailies.sort((a, b) => a.name.localeCompare(b.name));
	list.weeklies.sort((a, b) => a.name.localeCompare(b.name));

	return list;
}

export const UseStateWithLocalStorage = localStorageKey => {
	const [value, setValue] = React.useState(
		JSON.parse(localStorage.getItem(localStorageKey)) || (localStorageKey === StorageKey.List ? getDefaultList() : {}));

	React.useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(value));
	}, [value, localStorageKey]);

	return [value, setValue];
};