import { TIngredient } from '@/utils/types';
import styles from './burger-ingredients.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';

type PropsIngredientItem = {
	ingredient: TIngredient;
	onIngredientsDetails: () => void;
};

export const BurgerIngredientItem = ({
	ingredient,
	onIngredientsDetails,
}: PropsIngredientItem): React.JSX.Element => {
	const { image, price, name } = ingredient;
	return (
		// Был article но линтер ругался на то что он неинтерактивный, поэтому либо div либо button, на button думаю логичнее повесить onClick
		<button
			className={styles.burger_ingredients_item}
			onClick={() => onIngredientsDetails()}>
			<img src={image} alt={name} />
			<Price price={price} size='default' position='center' />
			<p className='text text_type_main-default mt-2 mb-6'>{name}</p>
			<Counter count={1} size='default' />
		</button>
	);
};
