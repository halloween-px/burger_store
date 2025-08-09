import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectIngredientCount = (_id: string) =>
	createSelector([(state: RootState) => state.burgerConstructor], (burgerConstructor) => {
		let count = 0;
		if (burgerConstructor.bun?._id === _id) count++;
		count += burgerConstructor.ingredients.filter((ingr) => ingr._id === _id).length;
		return count;
	});
