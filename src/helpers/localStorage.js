/** React */
import React from 'react';

/** app imports */
import { List } from '../data/items';
import { StorageKey } from '../enums';
import { listSort } from './listSort';

function getDefaultList() {
	var list = List;

	listSort(list.dailies);
	listSort(list.weeklies);

	return list;
}

export function mergeLists(baseList, customList) {

	mergeSubList(baseList, customList, 'dailies');
	mergeSubList(baseList, customList, 'weeklies');

	return baseList;
}

function mergeSubList(baseList, customList, type) {
	if (customList && customList[type].length > 0) {
		const list = [...customList[type]];
		list.forEach(item => {
			if (baseList[type].filter(i => i.id === item.id).length === 0) {
				baseList[type].push(item);
			}
		});
	}

	if (customList)
		baseList[type] = baseList[type].filter(f => !f.id || customList[type].filter(j => j.id === f.id).length > 0);

	listSort(baseList[type]);
}

export const UseStateWithLocalStorage = localStorageKey => {
	var res = null;
	switch (localStorageKey) {
		case StorageKey.List:
			res = mergeLists(JSON.parse(localStorage.getItem(StorageKey.List)) || getDefaultList(), JSON.parse(localStorage.getItem(StorageKey.Custom)));
			break;
		case StorageKey.Custom:
			res = JSON.parse(localStorage.getItem(StorageKey.Custom)) || { dailies: [], weeklies: [] };
			break;
		case StorageKey.Prefs:
			res = JSON.parse(localStorage.getItem(StorageKey.Prefs));
			break;
		default:
			res = {};
			break;
	}

	const [value, setValue] = React.useState(res);

	React.useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(value));
	}, [value, localStorageKey]);

	return [value, setValue];
};