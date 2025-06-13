import { TIngredient } from '@utils/types.ts';
import React from 'react';
import styles from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import { useModal } from '@/hooks/use-modal';
import { OrderDetails } from '../modal/order-details';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	const orderDetails = useModal<TIngredient | null>();
	const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
	const totalPrice = ingredients.reduce((price, i) => (price += i.price), 0);
	return (
		<section className={styles.burger_constructor}>
			<div className={styles.burger_constructor_wrapper}>
				{bun && (
					<ConstructorElement
						extraClass='ml-8 mr-4'
						isLocked={true}
						price={bun.price}
						text={bun.name}
						thumbnail={bun.image}
						type='top'
					/>
				)}
				<div className={`${styles.burger_constructor_scroll} pr-4`}>
					{ingredients.map((ingredient) => {
						return (
							<div
								className={styles.constructor_element_area}
								key={ingredient._id}>
								<DragIcon type='primary' className={styles.drag_icon} />
								<ConstructorElement
									isLocked={false}
									price={ingredient.price}
									text={ingredient.name}
									thumbnail={ingredient.image}
								/>
							</div>
						);
					})}
				</div>
				{bun && (
					<ConstructorElement
						extraClass='ml-8 mr-4'
						isLocked={true}
						price={bun.price}
						text={bun.name}
						thumbnail={bun.image}
						type='bottom'
					/>
				)}
			</div>
			<div className={`${styles.burger_constructor_footer} pr-4`}>
				<Price price={totalPrice} size='large' />
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='ml-2'
					onClick={() => orderDetails.open(null)}>
					Оформить заказ
				</Button>
			</div>
			<OrderDetails
				isOpen={orderDetails.isOpen}
				onClose={orderDetails.close}
				number={'034536'}
			/>
		</section>
	);
};
