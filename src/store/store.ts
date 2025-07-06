import { ingredientsApi } from '@/services/burger-ingredients-api';
import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from '@/services/burger-constructor';
import { orderDetailsApi } from '@/services/order-details-api';

export const store = configureStore({
	reducer: {
		[ingredientsApi.reducerPath]: ingredientsApi.reducer,
		[orderDetailsApi.reducerPath]: orderDetailsApi.reducer,
		burgerConstructor: burgerConstructorReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			ingredientsApi.middleware,
			orderDetailsApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
