import { TOrder } from '@/types/order';
import { Price } from '../price/price';
import { IngredientStack } from '../burger-ingredients/ingredient-stack';
import { OrderStatus } from './feed-order-status';

import styles from './feed-order.module.css';

type TItemProps = TOrder & {
	onClick: () => void;
};

export const OrderItem = (props: TItemProps) => {
	const { ingredients, name, number, totalPrice, time, status, onClick } = props;
	console.log(status);
	return (
		<button className={styles.item} onClick={onClick}>
			<div className={styles.item_info}>
				<div className='text text_type_digits-default'>#0{number}</div>
				<time className='text text_type_main-default'>{time}</time>
			</div>
			<div>
				<h4 className='text text_type_main-medium'>{name}</h4>
				{status && <OrderStatus status={status} />}
			</div>
			<div className={styles.item_info}>
				<IngredientStack ingredients={ingredients} />
				<Price price={totalPrice} size='default' />
			</div>
		</button>
	);
};
