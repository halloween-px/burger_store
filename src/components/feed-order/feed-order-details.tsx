import { Price } from '../price/price';
import { OrderStatus } from './feed-order-status';
import { TOrder } from '@/types/order';
import { CloseIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './feed-order.module.css';

export const FeedOrderDetails = (order: TOrder) => {
	const { name, ingredients, number, time, totalPrice, status } = order;

	return (
		<div>
			<div className={styles.order_details_wrapper}>
				<header className={`text text_type_digits-default ${styles.order_details_header}`}>
					#{number}
				</header>
				<div>
					<h4 className='text text_type_main-medium'>{name}</h4>
					<OrderStatus status={status} />
				</div>
				<div className={styles.ingredient}>
					<h4 className='text text_type_main-medium text-start'>Состав:</h4>
					<div className={styles.ingredient_wrapper}>
						{ingredients?.map((ingr, index) => {
							return (
								<div key={index} className={styles.ingerdient_item}>
									<div className={styles.ingredient_image}>
										<img src={ingr.image} alt='#' />
									</div>
									<h6
										className={`text text_type_main-default text-start ${styles.ingredient_title}`}>
										{ingr.title}
									</h6>
									<div className={`${styles.ingredients_price} text text_type_digits-default`}>
										{ingr.count} <CloseIcon className={styles.multiply} type='primary' />{' '}
										{ingr.price} <CurrencyIcon type='primary' />
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<footer className={styles.order_details_footer}>
					<time className='text text_type_main-default'>{time}</time>
					{totalPrice && <Price price={totalPrice} size='default' />}
				</footer>
			</div>
		</div>
	);
};
