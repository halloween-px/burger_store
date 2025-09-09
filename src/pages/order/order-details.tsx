import { FeedOrderDetails } from '@/components/feed-order/feed-order-details';

import styles from './order-details.module.css';
import { useGetOrderIdQuery } from '@/services/orders/order-api';
import { useParams } from 'react-router-dom';
import { useOrders } from '@/hooks/use-orders';
import { useGetIngredientsQuery } from '@/services/burger-ingredients/burger-ingredients-api';
import { Preloader } from '@/components/preloader/preloader';

const OrderDetailsPage = () => {
	const { id } = useParams();
	const { data: orders, isLoading } = useGetOrderIdQuery(id);
	const { data: ingredients } = useGetIngredientsQuery();
	const { order } = useOrders({
		orders: orders?.orders,
		ingredients,
		isStatus: true,
		orderNumber: id,
	});
	console.log(orders, ingredients, order);
	if (isLoading) return <Preloader />;

	return <div className={styles.order}>{order && <FeedOrderDetails {...order} />}</div>;
};

export default OrderDetailsPage;
