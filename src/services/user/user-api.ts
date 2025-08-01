import { TUserRequest, TUserResponse } from '@/types/user';
import { BASE_API } from '@/utils/api';
import { keysLS } from '@/utils/keys-local-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from './user';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_API,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(keysLS.accessToken);

			if (token) {
				return headers.set('Authorization', `${token}`);
			}
			return headers;
		},
	}),
	endpoints: (build) => ({
		getUser: build.query<TUserResponse, void>({
			query: () => '/auth/user',
		}),
		updateUser: build.mutation<TUserResponse, TUserRequest>({
			query: (body) => ({
				url: '/auth/user',
				method: 'PATCH',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const res = await queryFulfilled;
					dispatch(setUser(res.data.user));
				} catch (err) {
					console.error('Не удалось обновить:', err);
				}
			},
		}),
	}),
});

export const { useGetUserQuery, useLazyGetUserQuery, useUpdateUserMutation } = userApi;
