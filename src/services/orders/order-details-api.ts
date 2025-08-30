import { TOrderDetailsResponse } from '@/types/order';
import { BASE_API } from '@/utils/api';
import { keysLS } from '@/utils/keys-local-storage';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const orderDetailsApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_API,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(keysLS.accessToken);
			headers.set('Authorization', `${token}`);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		createOrder: builder.mutation<TOrderDetailsResponse, string[]>({
			query: (ingredientsId) => ({
				url: '/orders',
				method: 'POST',
				body: { ingredients: ingredientsId },
			}),
			transformResponse: (responce: TOrderDetailsResponse) => {
				if (!responce.success) {
					throw Error('Ошибка при формировании заказа');
				}

				return responce;
			},
		}),
	}),
});

export const { useCreateOrderMutation } = orderDetailsApi;
