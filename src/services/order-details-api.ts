import { TOrderDetailsResponse } from '@/types/order-details';
import { BASE_API } from '@/utils/api';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const orderDetailsApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
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
