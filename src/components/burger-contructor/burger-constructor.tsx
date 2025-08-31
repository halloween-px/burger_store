import React, { useMemo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import { OrderDetails } from '../modal/order-details';
import { useAppSelector } from '@/store/hooks';
import { BunElement } from './bun-element';
import { BurgerConstructorList } from './burger-constructor-lists';
import { useAuth, useDropIngredients, useModal } from '@/hooks';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '@/selectors/total-price';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '@/routes/routesConfig';
import { formatNumber } from '@/utils/utils';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
	const { user } = useAuth();
	const navigation = useNavigate();
	const orderDetailsModal = useModal<string[] | null>();
	const bun = useAppSelector((state) => state.burgerConstructor.bun);
	const ingredients = useAppSelector((state) => state.burgerConstructor.ingredients);
	const totalPrice = useSelector(selectTotalPrice());
	const { collect: bunCollect, ref: bunRef } = useDropIngredients('bun');
	const { collect: ingrCollect, ref: ingrRef } = useDropIngredients('ingredient');

	const handleOpenModal = () => {
		if (!user) {
			navigation(routesConfig.LOGIN);
		}
		if (bun && ingredients.length >= 2) {
			orderDetailsModal.open(null);
		}
	};

	const ingredientsOrderIds = useMemo(() => {
		return [...ingredients.map((i) => i._id), bun?._id].filter(Boolean) as string[];
	}, [ingredients, bun]);

	const classBun =
		bunCollect.canDrop && bunCollect.getType === 'bun'
			? `${styles['active-drop']} ${styles.top}`
			: '';
	const classIngr =
		ingrCollect.canDrop && ingrCollect.getType === 'ingredient'
			? `${styles['active-drop']} ${styles.middle}`
			: '';

	return (
		<section className={styles.burger_constructor}>
			<div className={styles.burger_constructor_wrapper}>
				<BunElement bun={bun} ref={bunRef} type='top' className={classBun} />
				<BurgerConstructorList ingredients={ingredients} ref={ingrRef} className={classIngr} />
				<BunElement bun={bun} type='bottom' />
			</div>
			<div className={`${styles.burger_constructor_footer}`}>
				<Price price={formatNumber(totalPrice)} size='large' />
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='ml-2'
					onClick={handleOpenModal}>
					Оформить заказ
				</Button>
			</div>
			{orderDetailsModal.isOpen && (
				<OrderDetails onClose={orderDetailsModal.close} ingredientsIds={ingredientsOrderIds} />
			)}
		</section>
	);
};
