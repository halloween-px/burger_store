import { TGroupIngredientsByCategory, TResponceIngredient } from '@/types/ingredients';
import { BASE_API } from '@/utils/api';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const ingredientsApi = createApi({
	reducerPath: 'ingredientsApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
	endpoints: (builder) => ({
		getIngredients: builder.query<TGroupIngredientsByCategory, void>({
			query: () => '/ingredients',
			transformResponse: (response: TResponceIngredient): TGroupIngredientsByCategory => {
				if (!response.success) {
					throw new Error('Ошибка при получении ингредиентов');
				}
				return response.data?.reduce<TGroupIngredientsByCategory>((acc, item) => {
					if (!acc[item.type]) acc[item.type] = [item];
					else acc[item.type].push(item);
					return acc;
				}, {} as TGroupIngredientsByCategory);
			},
		}),
	}),
});

export const { useGetIngredientsQuery } = ingredientsApi;
