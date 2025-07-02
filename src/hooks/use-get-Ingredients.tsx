import { fetchIngredients } from '@/utils/api';
import { TGroupIngredientsByCategory, TIngredient } from '@/utils/types';
import { useEffect, useState } from 'react';

const useGetIngredients = () => {
	const [groupIngedientsByCategory, setGroupIngedientsByType] =
		useState<TGroupIngredientsByCategory | null>(null);
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const loadIngredients = async () => {
			setIsLoading(true);
			try {
				const ingredientsData = await fetchIngredients();

				if (!ingredientsData.success) {
					throw new Error('Ошибка сервера: что-то пошло не так');
				}

				const groupIngredientsByType =
					ingredientsData.data.reduce<TGroupIngredientsByCategory>(
						(acc, ingredient) => {
							if (!acc[ingredient.type]) {
								acc[ingredient.type] = [ingredient];
							} else {
								acc[ingredient.type].push(ingredient);
							}

							return acc;
						},
						{} as TGroupIngredientsByCategory
					);

				setGroupIngedientsByType(groupIngredientsByType);
				setIngredients(ingredientsData.data);
			} catch (error) {
				const e = error as Error;
				setError(e.message);
			} finally {
				setIsLoading(false);
			}
		};

		loadIngredients();
	}, []);

	return { ingredients, groupIngedientsByCategory, isLoading, error };
};

export default useGetIngredients;
