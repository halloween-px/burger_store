import { TResponseOrder } from '@/types/order';
import { BASE_API, createWebsocketHandler } from '@/utils/api';
import { keysLS } from '@/utils/keys-local-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
	endpoints: (build) => ({
		getOrders: build.query<TResponseOrder, 'feed-orders' | 'user-orders'>({
			queryFn: () => ({ data: {} as TResponseOrder }),
			async onCacheEntryAdded(type, api) {
				let baseUrl = 'wss://norma.nomoreparties.space/orders';
				if (type === 'user-orders') {
					const accessToken = localStorage
						.getItem(keysLS.accessToken)
						?.replace('Bearer', '')
						.trim();
					baseUrl += `?token=${accessToken}`;
				} else if (type === 'feed-orders') {
					baseUrl += '/all';
				}

				await createWebsocketHandler<TResponseOrder>(baseUrl)(type, api);
			},
		}),

		getOrderId: build.query<TResponseOrder, string | undefined>({
			query: (number) => `/orders/${number}`,
		}),
	}),
});

export const { useGetOrderIdQuery, useGetOrdersQuery } = orderApi;
