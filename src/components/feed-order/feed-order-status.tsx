import { TStatusNames } from '@/types/order';
import styles from './feed-order.module.css';

export const OrderStatus = ({ status }: { status: TStatusNames | undefined }) => {
	if (!status) return;

	const formatStatus = (status: TStatusNames) => {
		if (status === 'done') return 'Выполнен';
		if (status === 'created') return 'Создан';
		if (status === 'pending') return 'Готовится';
	};

	return (
		<h6 className={`text text_type_main-small mt-2 ${styles['status']} ${styles[status]}`}>
			{formatStatus(status)}
		</h6>
	);
};
