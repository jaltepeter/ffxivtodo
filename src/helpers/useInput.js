import { useState } from 'react';

export const useInput = initialValue => {
	const [value, setValue] = useState(initialValue);

	return {
		value,
		setValue,
		reset: () => setValue(initialValue),
		bind: {
			value,
			onChange: event => {
				setValue(event.target.value);
			}
		}
	};
};

export const useMultiSelect = initialValue => {
	const [value, setValue] = useState(initialValue);

	return {
		value,
		setValue,
		reset: () => setValue(initialValue),
		bind: {
			value,
			onChange: event => {

				setValue(Array.from(event.target.selectedOptions, option => option.value));

				// if (value.includes(event.target.value)) {
				// 	value.pop(event.target.value);
				// } else {
				// 	value.push(event.target.value);
				// }
				// console.log(event.target.value);
				// console.log(value);
				// setValue(value);
			}
		}
	};
}