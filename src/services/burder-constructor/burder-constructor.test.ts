import { describe, it, expect } from 'vitest';
import reducer, {
	addIngridient,
	clearConstructor,
	moveIngredient,
	removeIngredient,
} from './burger-constructor';
import { mockIngredient } from '@/utils/mocks';

const sauce = { ...mockIngredient, _id: 'sauce1', type: 'sauce' } as typeof mockIngredient;

describe('burgerConstructorSlice', () => {
	it('должен вернуть initialState', () => {
		expect(reducer(undefined, { type: '' })).toEqual({
			bun: null,
			ingredients: [],
		});
	});

	it('должен добавить булочку', () => {
		const state = reducer(undefined, addIngridient(mockIngredient));
		expect(state.bun?._id).toBe('bun1');
	});

	it('должен добавить заменить булочку', () => {
		const stateWithBun = reducer(undefined, addIngridient(mockIngredient));
		const newBun = { ...mockIngredient, _id: 'bun2' };
		const state = reducer(stateWithBun, addIngridient(newBun));
		expect(state.bun?._id).toBe('bun2');
	});

	it('обязан добавить ингредиент не bun', () => {
		const state = reducer(undefined, addIngridient(sauce));
		expect(state.ingredients.length).toBe(1);
		expect(state.ingredients[0]._id).toBe('sauce1');
	});

	it('должен удалять ингредиент по uuid', () => {
		const stateWithSauce = reducer(undefined, addIngridient(sauce));
		const uuid = stateWithSauce.ingredients[0].uuid;
		const state = reducer(stateWithSauce, removeIngredient({ uuid }));
		expect(state.ingredients.length).toBe(0);
	});

	it('должен менять порядок ингредиентов', () => {
		let state = reducer(undefined, addIngridient({ ...sauce }));
		state = reducer(state, addIngridient({ ...sauce }));
		state = reducer(state, addIngridient({ ...sauce }));

		const firstUuid = state.ingredients[0].uuid;
		const moveState = reducer(state, moveIngredient({ fromIndex: 0, toIndex: 2 }));
		expect(moveState.ingredients[2].uuid).toBe(firstUuid);
	});

	it('должен очищать конструктор', () => {
		const stateWithData = {
			bun: mockIngredient,
			ingredients: [sauce, sauce],
		};
		const state = reducer(stateWithData, clearConstructor());
		expect(state).toEqual({ bun: null, ingredients: [] });
	});
});
