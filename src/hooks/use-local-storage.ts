import { TKeysLS } from '@/utils/keys-local-storage';
import { useCallback, useEffect, useState } from 'react';

type TProps<T> = {
	key: TKeysLS;
	defaultValue?: T | unknown;
	syncWrite?: boolean;
};

export const useLocalStorage = <T>({ key, defaultValue, syncWrite }: TProps<T>) => {
	const [value, setValue] = useState(() => {
		const item = localStorage.getItem(key);
		if (item) {
			try {
				return JSON.parse(item);
			} catch (error) {
				return item;
			}
		}
		return defaultValue;
	});

	const writeToStorage = useCallback((val: T | undefined) => {
		if (val === undefined) {
			if (localStorage.getItem(key)) {
				localStorage.removeItem(key);
			}
			return;
		}

		const stringified = typeof val === 'string' ? val : JSON.stringify(val);
		localStorage.setItem(key, stringified);
	}, []);

	useEffect(() => {
		if (!syncWrite) writeToStorage(value);
	}, [value, key, syncWrite]);

	const setAndSync = (val: T | undefined) => {
		setValue(val);
		if (syncWrite) writeToStorage(val);
	};

	return [value, setAndSync];
};
