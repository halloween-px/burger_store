import { Container } from '@/components/container/container';
import { FeedOrderList } from '@/components/feed-order/feed-order-list';
import { useGetOrdersQuery } from '@/services/orders/order-api';
import { useGetIngredientsQuery } from '@/services/burger-ingredients/burger-ingredients-api';
import { useOrders } from '@/hooks/use-orders';
import { Preloader } from '@/components/preloader/preloader';
import { FeedOrderInfo } from '@/components/feed-order/feed-order-info';

import styles from './feed-page.module.css';

const FeedPage = () => {
	const { data: ordersFeed, isLoading, error } = useGetOrdersQuery('feed-orders');
	const { data: ingredients } = useGetIngredientsQuery();
	const { orderList, getNumbersOrders } = useOrders({ orders: ordersFeed?.orders, ingredients });

	if (error) return <div>Что-то пошло не так</div>;
	if (isLoading || !ordersFeed?.orders) return <Preloader isFull />;

	return (
		<section className={styles['feed_order']}>
			<Container className={styles['container_layout']}>
				<h2 className='text text_type_main-large pt-10 mb-5'>Лента заказов</h2>
				<div className={styles['feed_layout']}>
					<FeedOrderList orders={orderList} />
					<FeedOrderInfo
						doneNumbers={getNumbersOrders('done')}
						pendingNumbers={getNumbersOrders('pending')}
						total={ordersFeed?.total || 0}
						totalToday={ordersFeed?.totalToday || 0}
					/>
				</div>
			</Container>
		</section>
	);
};

export default FeedPage;
