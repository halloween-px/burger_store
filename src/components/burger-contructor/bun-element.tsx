import styles from './burger-constructor.module.css';
import { TIngredient } from '@/types/ingredients';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { forwardRef, Ref } from 'react';

type TProps = {
	type: 'top' | 'bottom';
	ref?: Ref<HTMLDivElement>;
	className?: string;
	bun: TIngredient | null;
};

export const BunElement = forwardRef<HTMLDivElement, TProps>(
	({ type, className, bun }, ref) => (
		<div ref={ref} className={`${styles.burger_constructor_item} ${className}`}>
			<ConstructorElement
				isLocked
				type={type}
				price={bun?.price || 0}
				text={`${bun?.name || 'Переместите булку'} (${type === 'top' ? 'верх' : 'низ'})`}
				thumbnail={bun?.image || '/empty-bun.png'}
			/>
		</div>
	)
);
