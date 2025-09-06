import { describe, expect, it } from 'vitest';
import { selectTotalPrice } from './total-price';
import { RootState } from '@/store/store';

describe('selectTotalPrice', () => {
	it('считает сумму цены булки и ингредиентов', () => {
		const state = {
			burgerConstructor: {
				bun: { price: 50 },
				ingredients: [{ price: 20 }, { price: 30 }],
			},
		} as RootState;

		const result = selectTotalPrice()(state);
		expect(result).toBe(100);
	});

	it('возвращает 0 если ничего нет', () => {
		const state = {
			burgerConstructor: { bun: null, ingredients: [] },
		} as unknown as RootState;

		const result = selectTotalPrice()(state);
		expect(result).toBe(0);
	});
});
