export function listSort(list) {
	list.sort((a, b) => a.isCompleted - b.isCompleted || a.name.localeCompare(b.name));
}