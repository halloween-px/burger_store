import { TGroupIngredientsByCategory, TResponceIngredient } from '@/types/ingredients';

export const handleIngredientsResponse = (response: TResponceIngredient) => {
	if (!response.success) throw new Error('Ошибка при получении ингредиентов');

	const grouped = response.data?.reduce<TGroupIngredientsByCategory>((acc, item) => {
		if (!acc[item.type]) acc[item.type] = [item];
		else acc[item.type].push(item);
		return acc;
	}, {} as TGroupIngredientsByCategory);

	return {
		grouped,
		raw: response.data,
	};
};
