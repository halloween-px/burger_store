import { TIngredientsTransformed } from '@/types/ingredients';
import { BASE_API } from '@/utils/api';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { handleIngredientsResponse } from './handle-ingredient-response';

export const ingredientsApi = createApi({
	reducerPath: 'ingredientsApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
	endpoints: (builder) => ({
		getIngredients: builder.query<TIngredientsTransformed, void>({
			query: () => '/ingredients',
			transformResponse: handleIngredientsResponse,
		}),
	}),
});

export const { useGetIngredientsQuery } = ingredientsApi;
