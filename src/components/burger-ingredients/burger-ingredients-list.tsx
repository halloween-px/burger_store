import styles from './burger-ingredients.module.css';
import {
	TCategoryIngredientName,
	TGroupIngredientsByCategory,
	TIngredient,
} from '@/types/ingredients';
import { CATEGORY_LABELS } from '@/utils/categories-ingredients';
import { BurgerIngredientItem } from './burget-ingredient-item';
import { useLocation, useNavigate } from 'react-router-dom';
import { routesConfig } from '@/routes/routesConfig';

type TBurgerIngredientsProps = {
	ingredients: TGroupIngredientsByCategory;
	refs: Partial<Record<TCategoryIngredientName, React.RefObject<HTMLDivElement>>>;
};

export const BurgerIngredientsList = ({ ingredients, refs }: TBurgerIngredientsProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleClickIngredient = (item: TIngredient) => {
		sessionStorage.setItem('ingredient-modal', JSON.stringify(item));
		navigate(routesConfig.INGREDIENTS(item._id), { state: { background: location } });
	};

	return (
		<>
			{Object.entries(ingredients).map(([type, ingredient]) => {
				const typed = type as TCategoryIngredientName;
				return (
					<div key={type} ref={refs[typed]}>
						<h4 className='text text_type_main-medium mt-10 mb-6'>{CATEGORY_LABELS[typed]}</h4>
						<div className={`${styles.burger_ingredients_wrapper}`}>
							{ingredient.map((item) => (
								<BurgerIngredientItem
									onClick={() => handleClickIngredient(item)}
									key={item._id}
									ingredient={item}
								/>
							))}
						</div>
					</div>
				);
			})}
		</>
	);
};
