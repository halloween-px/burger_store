import { TResponceIngredient } from './types';

export const BASE_API = 'https://norma.nomoreparties.space/api';

export const fetchIngredients = async (): Promise<TResponceIngredient> => {
	const res = await fetch(`${BASE_API}/ingredients`);
	return res.json();
};
