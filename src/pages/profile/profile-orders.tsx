import { useGetOrdersQuery } from '@/services/orders/order-api';
import { useGetIngredientsQuery } from '@/services/burger-ingredients-api';
import { useOrders } from '@/hooks/use-orders';
import { FeedOrderList } from '@/components/feed-order/feed-order-list';
import { Preloader } from '@/components/preloader/preloader';

import styles from './profile.module.css';

export const ProfileOrders = () => {
	const { data: userOrders, isLoading, error } = useGetOrdersQuery('user-orders');
	const { data: ingredients } = useGetIngredientsQuery();
	const { orderList } = useOrders({ orders: userOrders?.orders, ingredients, isStatus: true });

	const GetOrders = () => {
		return orderList.length ? (
			<FeedOrderList orders={orderList} size='full' />
		) : (
			'Заказы еще не создавались'
		);
	};

	if (error) return <div>Что-то пошло не так</div>;

	return (
		<div className={styles.orders}>
			<div className={styles.orders_wrapper}>
				{isLoading || !userOrders?.orders ? <Preloader /> : <GetOrders />}
			</div>
		</div>
	);
};
