import React from 'react';
import styles from './burger-ingredients.module.css';
import {
	TCategoryIngredientName,
	TGroupIngredientsByCategory,
	TIngredient,
} from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CATEGORY_LABELS } from '@/utils/categories-ingredients';
import { BurgerIngredientItem } from './burget-ingredient-item';
import { useModal } from '@/hooks/use-modal';
import { IngredientDetails } from '../modal/ingredient-details';

type TBurgerIngredientsProps = {
	ingredients: TGroupIngredientsByCategory;
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const ingredientDetails = useModal<TIngredient>();
	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div className={`${styles.burger_ingredients_scroll} pr-4`}>
				{Object.entries(ingredients).map(([type, ingredient]) => {
					return (
						<div key={type}>
							<h4 className='text text_type_main-medium mt-10 mb-6'>
								{CATEGORY_LABELS[type as TCategoryIngredientName]}
							</h4>
							<div className={`${styles.burger_ingredients_wrapper}`}>
								{ingredient.map((item) => {
									return (
										<BurgerIngredientItem
											onIngredientsDetails={() => ingredientDetails.open(item)}
											key={item._id}
											ingredient={item}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
			<IngredientDetails
				isOpen={ingredientDetails.isOpen}
				onClose={ingredientDetails.close}
				ingredient={ingredientDetails.data}
			/>
		</section>
	);
};
