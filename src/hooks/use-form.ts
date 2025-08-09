import { useState, useMemo, useCallback, useRef } from 'react';

export const useForm = <T extends Record<string, string>>(initialVal: T) => {
	const [values, setValues] = useState({ ...initialVal });
	const isChangeValue = useRef(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		isChangeValue.current = true;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (callback: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		isChangeValue.current = false;
		callback(values);
	};

	const changedValues = useMemo(() => {
		const result = {} as Partial<T>;
		for (const key in values) {
			if (values[key] !== initialVal[key]) {
				result[key] = values[key];
			}
		}
		return result;
	}, [values, initialVal]);

	const reset = useCallback(() => {
		setValues(initialVal);
		isChangeValue.current = false;
	}, [initialVal]);

	const isEqualValues = useMemo(() => {
		return Object.entries(initialVal)
			.map(([key, val]) => values[key] === val)
			.every(Boolean);
	}, [values, initialVal]);

	const names = useMemo(() => {
		return Object.keys(initialVal).reduce(
			(acc, key) => {
				acc[key as keyof T] = key;
				return acc;
			},
			{} as { [K in keyof T]: K }
		);
	}, [initialVal]);

	return {
		values,
		changedValues,
		names,
		isChangeValue: isChangeValue.current,
		isEqualValues,
		setValues,
		handleChange,
		handleSubmit,
		reset,
	};
};
