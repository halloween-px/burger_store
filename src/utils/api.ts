import { TResponceIngredient } from './types';

export const BASE_API = 'https://norma.nomoreparties.space/api';

const checkResponse = async <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};

export const fetchIngredients = async (): Promise<TResponceIngredient> => {
	const res = await fetch(`${BASE_API}/ingredients`);
	return checkResponse<TResponceIngredient>(res);
};
