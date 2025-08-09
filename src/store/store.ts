import { ingredientsApi } from '@/services/burger-ingredients-api';
import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from '@/services/burger-constructor';
import userReducer from '@/services/user/user';
import { orderDetailsApi } from '@/services/order-details-api';
import { userApi } from '@/services/user/user-api';
import { authApi } from '@/services/auth/auth-api';

export const store = configureStore({
	reducer: {
		[ingredientsApi.reducerPath]: ingredientsApi.reducer,
		[orderDetailsApi.reducerPath]: orderDetailsApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		burgerConstructor: burgerConstructorReducer,
		userSlice: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			ingredientsApi.middleware,
			orderDetailsApi.middleware,
			userApi.middleware,
			authApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
