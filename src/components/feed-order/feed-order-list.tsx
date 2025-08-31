import { TOrder } from '@/types/order';
import { OrderItem } from './feed-order-item';
import { useLocation, useNavigate } from 'react-router-dom';
import { routesConfig } from '@/routes/routesConfig';

import styles from './feed-order.module.css';

type TFeedOrderList = {
	orders: Array<TOrder>;
	size?: 'lg' | 'xl' | 'full';
};

export const FeedOrderList = ({ orders, size = 'lg' }: TFeedOrderList) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleClick = (number: number) => {
		navigate(routesConfig.ORDER_DETAILS(location.pathname, number), {
			state: { background: location },
		});
	};

	return (
		<div className={`${styles.list} ${styles[size]}`}>
			{orders.map((order) => (
				<OrderItem key={order.number} {...order} onClick={() => handleClick(order.number)} />
			))}
		</div>
	);
};
