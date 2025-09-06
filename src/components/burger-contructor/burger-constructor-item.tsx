import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TIngredient } from '@/types/ingredients';
import styles from './burger-constructor.module.css';

type Props = {
	ingredient: TIngredient;
	index: number;
	className?: string;
	onRemove: (uuid: string) => void;
	onMove: (from: number, to: number) => void;
};

export const BurgerConstructorIngredientItem = ({
	ingredient,
	index,
	className,
	onRemove,
	onMove,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	const [, dragRef] = useDrag({
		type: 'ingredient-constructor',
		item: { index },
	});

	const [, dropRef] = useDrop({
		accept: 'ingredient-constructor',
		hover: (dragged: { index: number }) => {
			if (dragged.index === index) return;
			onMove(dragged.index, index);
			dragged.index = index;
		},
	});

	dragRef(dropRef(ref));

	return (
		<div
			className={`${styles.constructor_element_area} ${className}`}
			ref={ref}
			data-cy='constructor-item'
			data-type={ingredient.type}>
			<DragIcon type='primary' className={styles.drag_icon} />
			<ConstructorElement
				isLocked={false}
				price={ingredient.price}
				text={ingredient.name}
				thumbnail={ingredient.image}
				handleClose={() => onRemove(ingredient.uuid)}
			/>
		</div>
	);
};
