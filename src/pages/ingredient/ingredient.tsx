import styles from './ingredients.module.css';
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details';
import { useGetIngredientsQuery } from '@/services/burger-ingredients/burger-ingredients-api';
import { useParams } from 'react-router-dom';
import { Preloader } from '@/components/preloader/preloader';

const IngredientPage = () => {
	const { id } = useParams();
	const { data: dataIngredient, isLoading, isError } = useGetIngredientsQuery();

	if (isLoading) return <Preloader />;
	if (isError || !dataIngredient?.grouped) return 'Что то пошло не так';

	const ingredientArray = Object.values(dataIngredient.grouped).flat();
	const ingredient = ingredientArray.find((ingr) => ingr._id === id);
	if (!ingredient) return 'Ингредиент не найден';

	return (
		<section className={styles.ingredien_page}>
			<h1 className='text text_type_main-large'>Детали ингредиента</h1>
			<IngredientDetails ingredient={ingredient} />
		</section>
	);
};

export default IngredientPage;
