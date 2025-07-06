import { TIngredient } from '@/types/ingredients';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

type TConstructorState = {
	bun: TIngredient | null;
	ingredients: TIngredient[];
};

const initialState: TConstructorState = {
	bun: null,
	ingredients: [],
};

const BurgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngridient: (state, action: PayloadAction<TIngredient>) => {
			const ingredient = action.payload;
			if (ingredient.type === 'bun') {
				if (state.bun?._id === ingredient._id) return;
				state.bun = ingredient;
			} else {
				state.ingredients.push({ ...ingredient, uuid: uuid() });
			}
		},
		removeIngredient: (state, action: PayloadAction<{ uuid: string }>) => {
			state.ingredients = state.ingredients.filter(
				(ingredient) => ingredient.uuid !== action.payload.uuid
			);
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) => {
			const [moved] = state.ingredients.splice(action.payload.fromIndex, 1);
			state.ingredients.splice(action.payload.toIndex, 0, moved);
		},
	},
});

export const { addIngridient, removeIngredient, moveIngredient } =
	BurgerConstructorSlice.actions;

export default BurgerConstructorSlice.reducer;
