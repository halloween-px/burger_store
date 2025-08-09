import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

type size = 'default' | 'large';
type position = 'start' | 'center' | 'end';

type PropsPrice = {
	price: number;
	size: size;
	position?: position;
};

export const Price = (props: PropsPrice) => {
	const { price, size, position } = props;

	const sizeObject: Record<size, string> = {
		default: 'text_type_digits-default',
		large: 'text_type_digits-medium',
	};

	return (
		<span className={`${styles.price_area} ${position ? styles[position] : styles.center} mt-2`}>
			<span itemProp='price' className={sizeObject[size]}>
				{price}
			</span>
			<CurrencyIcon type='primary' />
		</span>
	);
};
