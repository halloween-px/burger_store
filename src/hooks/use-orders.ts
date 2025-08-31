import { formatNumber, formatDate } from '@/utils/utils';
import { useCallback, useMemo } from 'react';
import { TResponseOrder } from '@/types/order';
import { TIngredient, TIngredientsTransformed } from '@/types/ingredients';

type THookOrder = {
	orders: TResponseOrder['orders'] | undefined;
	ingredients: TIngredientsTransformed | undefined;
	orderNumber?: number | string;
	isStatus?: boolean;
};

export const useOrders = ({ orders, ingredients, orderNumber, isStatus = false }: THookOrder) => {
	const dictionaryIngredient = useMemo(() => {
		return (
			ingredients?.raw.reduce<Record<string, TIngredient>>((acc, ingr) => {
				acc[ingr._id] = ingr;
				return acc;
			}, {}) ?? {}
		);
	}, [ingredients?.raw]);

	const orderList = useMemo(() => {
		if (!orders) return [];

		return orders
			.map((el) => {
				const ingredientCounts: Record<string, number> = {};
				el.ingredients.forEach((id) => {
					ingredientCounts[id] = (ingredientCounts[id] || 0) + 1;
				});

				const ingredients = Object.keys(ingredientCounts).map((id) => {
					const ingr = dictionaryIngredient[id];
					return {
						_id: ingr._id,
						image: ingr.image,
						price: ingr.price,
						count: ingredientCounts[id],
						title: ingr.name,
					};
				});

				return {
					_id: el._id,
					name: el.name,
					number: el.number,
					time: formatDate(el.createdAt),
					totalPrice: formatNumber(
						el.ingredients.reduce((acc, id) => {
							const ingr = dictionaryIngredient[id];
							return acc + ingr.price;
						}, 0)
					),
					...(isStatus ? { status: el.status } : {}),
					ingredients,
					createdAt: el.createdAt,
				};
			})
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	}, [orders, dictionaryIngredient, isStatus]);

	const order = useMemo(
		() => orderList.find((order) => order.number === Number(orderNumber)),
		[orderList, orderNumber]
	);

	const getNumbersOrders = useCallback(
		(status: 'done' | 'pending'): Record<number, number[]> => {
			const filteredOrders = orders?.filter((o) => o.status === status).slice(0, 12) || [];

			return filteredOrders.reduce(
				(acc, order, index) => {
					const columnIndex = Math.floor(index / 7);

					if (!acc[columnIndex]) {
						acc[columnIndex] = [];
					}

					acc[columnIndex].push(order.number);
					return acc;
				},
				{} as Record<number, number[]>
			);
		},
		[orders]
	);

	return {
		order,
		orderList,
		getNumbersOrders,
	};
};
