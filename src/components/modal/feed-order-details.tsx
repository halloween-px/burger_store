import { useNavigate, useParams } from 'react-router-dom';
import { FeedOrderDetails } from '../feed-order/feed-order-details';
import { useGetOrdersQuery } from '@/services/orders/order-api';
import { useGetIngredientsQuery } from '@/services/burger-ingredients-api';
import { useOrders } from '@/hooks/use-orders';
import { Preloader } from '../preloader/preloader';
import { Modal } from './modal';

export const ModalFeedOrderDetails = ({ type }: { type: 'feed-orders' | 'user-orders' }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: ordersFeed, isLoading } = useGetOrdersQuery(type);
	const { data: ingredientsData } = useGetIngredientsQuery();
	const { order } = useOrders({
		orders: ordersFeed?.orders,
		ingredients: ingredientsData,
		orderNumber: id,
	});

	if (isLoading) return <Preloader />;

	return (
		<Modal onClose={() => navigate(-1)}>
			<>{order && <FeedOrderDetails {...order} />}</>
		</Modal>
	);
};
