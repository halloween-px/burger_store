import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectTotalPrice = () =>
	createSelector(
		[(state: RootState) => state.burgerConstructor],
		(burgerConstructor) => {
			return [burgerConstructor.bun, ...burgerConstructor.ingredients].reduce(
				(price, el) => (price += el?.price || 0),
				0
			);
		}
	);
