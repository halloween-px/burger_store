import {
	TAuthResponse,
	TLogin,
	TRegister,
	TTokenResponse,
	TForgotPassword,
	TResetPassword,
	TSussesResponse,
} from '@/types/auth';
import { BASE_API } from '@/utils/api';
import { handleAuthSusses } from '@/services/auth/auth-handler';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { keysLS } from '@/utils/keys-local-storage';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API}` }),
	endpoints: (build) => ({
		login: build.mutation<TAuthResponse, TLogin>({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				await handleAuthSusses(queryFulfilled, dispatch);
			},
		}),
		register: build.mutation<TAuthResponse, TRegister>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				await handleAuthSusses(queryFulfilled, dispatch);
			},
		}),
		forgotPassword: build.mutation<TSussesResponse, TForgotPassword>({
			query: (body) => ({
				url: '/password-reset',
				method: 'POST',
				body,
			}),
		}),
		resetPassword: build.mutation<TSussesResponse, TResetPassword>({
			query: (body) => ({
				url: '/password-reset/reset',
				method: 'POST',
				body,
			}),
		}),
		logout: build.mutation<TSussesResponse, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
				body: {
					token: localStorage.getItem(keysLS.refreshToken),
				},
			}),
		}),
		refreshToken: build.mutation<TTokenResponse, void>({
			query: () => ({
				url: '/auth/token',
				method: 'POST',
				body: {
					token: localStorage.getItem(keysLS.refreshToken),
				},
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useRefreshTokenMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
} = authApi;
