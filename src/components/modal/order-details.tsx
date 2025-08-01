import { useCreateOrderMutation } from '@/services/order-details-api';
import { Modal, PorpsModal } from './modal';
import { useCallback, useEffect } from 'react';
import { Preloader } from '../preloader/preloader';
import { useAppDispatch } from '@/store/hooks';
import { clearConstructor } from '@/services/burger-constructor';

type PropsOrderDetails = {
	ingredientsIds: string[];
} & PorpsModal;

export const OrderDetails = ({ onClose, ingredientsIds }: PropsOrderDetails) => {
	const dispatch = useAppDispatch();
	const [createOrder, { data, isLoading, error, isSuccess }] = useCreateOrderMutation();

	const handleCloseModal = useCallback(() => {
		if (isSuccess) dispatch(clearConstructor());
		onClose();
	}, [isSuccess, dispatch, onClose]);

	useEffect(() => {
		createOrder(ingredientsIds);
	}, [createOrder, ingredientsIds]);

	if (error) return <div>Произошла ошибка</div>;

	return (
		<Modal onClose={handleCloseModal}>
			{isLoading ? (
				<Preloader />
			) : (
				<>
					<h4 className='text text_type_digits-large'>{data?.order.number}</h4>
					<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
					<img src='./icons/done.svg' alt='done' className='mt-15' />
					<p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
					<p className='text text_type_main-default mt-2 mb-20'>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</Modal>
	);
};
