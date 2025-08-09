import styles from './burger-ingredients.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import { TIngredient } from '@/types/ingredients';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { selectIngredientCount } from './selectors';

type PropsIngredientItem = {
	ingredient: TIngredient;
	onClick: () => void;
};

export const BurgerIngredientItem = ({
	ingredient,
	onClick,
}: PropsIngredientItem): React.JSX.Element => {
	const { image, price, name, type, _id } = ingredient;
	const ingredientCount = useSelector(selectIngredientCount(_id));

	const [, ingredientRef] = useDrag({
		type: type === 'bun' ? 'bun' : 'ingredient',
		item: { ...ingredient },
	});

	return (
		<button ref={ingredientRef} className={styles.burger_ingredients_item} onClick={onClick}>
			<img src={image} alt={name} />
			<Price price={price} size='default' position='center' />
			<p className='text text_type_main-default mt-2 mb-6'>{name}</p>
			{ingredientCount > 0 && <Counter count={ingredientCount} size='default' />}
		</button>
	);
};
