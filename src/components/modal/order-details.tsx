import { Modal, PorpsModal } from './modal';

type PropsOrderDetails = {
	number: string;
} & PorpsModal;

export const OrderDetails = ({
	isOpen,
	onClose,
	number,
}: PropsOrderDetails) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h4 className='text text_type_digits-large'>
				{number ? number : '034536'}
			</h4>
			<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
			<img src='./icons/done.svg' alt='done' className='mt-15' />
			<p className='text text_type_main-default mt-15'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default mt-2 mb-20'>
				Дождитесь готовности на орбитальной станции
			</p>
		</Modal>
	);
};
