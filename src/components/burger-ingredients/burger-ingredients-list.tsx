import styles from './burger-ingredients.module.css';
import {
	TCategoryIngredientName,
	TGroupIngredientsByCategory,
	TIngredient,
} from '@/types/ingredients';
import { CATEGORY_LABELS } from '@/utils/categories-ingredients';
import { BurgerIngredientItem } from './burget-ingredient-item';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details';
import { useModal } from '@/hooks/use-modal';

type TBurgerIngredientsProps = {
	ingredients: TGroupIngredientsByCategory;
	refs: Partial<
		Record<TCategoryIngredientName, React.RefObject<HTMLDivElement>>
	>;
};

export const BurgerIngredientsList = ({
	ingredients,
	refs,
}: TBurgerIngredientsProps) => {
	const currentIngredient = useModal<TIngredient>();

	return (
		<>
			{Object.entries(ingredients).map(([type, ingredient]) => {
				const typed = type as TCategoryIngredientName;
				return (
					<div key={type} ref={refs[typed]}>
						<h4 className='text text_type_main-medium mt-10 mb-6'>
							{CATEGORY_LABELS[typed]}
						</h4>
						<div className={`${styles.burger_ingredients_wrapper}`}>
							{ingredient.map((item) => (
								<BurgerIngredientItem
									onIngredientsDetails={() => currentIngredient.open(item)}
									key={item._id}
									ingredient={item}
								/>
							))}
						</div>
					</div>
				);
			})}
			{currentIngredient.isOpen && (
				<Modal title='Детали ингредиента' onClose={currentIngredient.close}>
					<IngredientDetails ingredient={currentIngredient.data} />
				</Modal>
			)}
		</>
	);
};
