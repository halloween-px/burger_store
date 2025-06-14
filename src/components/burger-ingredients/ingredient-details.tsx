import { TIngredient } from '@/utils/types';
import styles from './ingredient-details.module.css';

type PropsIngredientDetails = {
	ingredient: TIngredient | null;
};

export const IngredientDetails = ({ ingredient }: PropsIngredientDetails) => {
	if (!ingredient) {
		return null;
	}

	return (
		<>
			<img src={ingredient.image_large} alt={ingredient.name} />
			<h5 className='text text_type_main-medium'>{ingredient.name}</h5>
			<ul className={`${styles.ingredient_info_list} text_type_main-default`}>
				<li className={styles.ingredient_info_list_item}>
					<div>Калории,ккал</div>
					<div>{ingredient.calories}</div>
				</li>
				<li className={styles.ingredient_info_list_item}>
					<div>Белки, г</div>
					<div>{ingredient.proteins}</div>
				</li>
				<li className={styles.ingredient_info_list_item}>
					<div>Жиры, г</div>
					<div>{ingredient.fat}</div>
				</li>
				<li className={styles.ingredient_info_list_item}>
					<div>Углеводы, г</div>
					<div>{ingredient.carbohydrates}</div>
				</li>
			</ul>
		</>
	);
};
