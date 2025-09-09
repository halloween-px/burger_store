import styles from './burger-constructor.module.css';
import { TIngredient } from '@/types/ingredients';
import { forwardRef, Ref, useCallback } from 'react';
import { BurgerConstructorIngredientItem } from './burger-constructor-item';
import { useAppDispatch } from '@/store/hooks';
import { moveIngredient, removeIngredient } from '@/services/burder-constructor/burger-constructor';

type TProps = {
	ingredients: TIngredient[];
	ref: Ref<HTMLDivElement>;
	className?: string;
};

export const BurgerConstructorList = forwardRef<HTMLDivElement, TProps>(
	({ ingredients, className }, ref) => {
		const dispatch = useAppDispatch();
		const handleRemoveIngredient = useCallback(
			(uuid: string) => {
				dispatch(removeIngredient({ uuid }));
			},
			[dispatch]
		);

		const handleMoveIngredient = useCallback(
			(fromIndex: number, toIndex: number) => {
				dispatch(moveIngredient({ fromIndex, toIndex }));
			},
			[dispatch]
		);
		return (
			<div className={`${styles.burger_constructor_scroll}`} ref={ref} data-cy='burger-constructor'>
				{ingredients.length ? (
					ingredients.map((ingredient, index) => (
						<BurgerConstructorIngredientItem
							key={ingredient.uuid}
							index={index}
							ingredient={ingredient}
							onRemove={() => handleRemoveIngredient(ingredient.uuid)}
							onMove={handleMoveIngredient}
						/>
					))
				) : (
					<div
						className={`${styles.burger_constructor_empty} ${styles.burger_constructor_item} ${className} ml-8 mr-4`}>
						<h4 className='text text_type_main-default'>Переместите ингредиенты</h4>
					</div>
				)}
			</div>
		);
	}
);
