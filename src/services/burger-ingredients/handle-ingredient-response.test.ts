import { expect, it } from 'vitest';
import { handleIngredientsResponse } from './handle-ingredient-response';
import { TResponceIngredient } from '@/types/ingredients';

it('группировка ингредиентов работает', () => {
	const response = {
		success: true,
		data: [
			{ _id: '1', type: 'bun', name: 'Bun 1' },
			{ _id: '2', type: 'sauce', name: 'Sauce 1' },
		],
	};

	const result = handleIngredientsResponse(response as TResponceIngredient);

	expect(result.grouped.bun.length).toBe(1);
	expect(result.grouped.sauce.length).toBe(1);
	expect(result.raw.length).toBe(2);
});
