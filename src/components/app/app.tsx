import React from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '@components/preloader/preloader';
import useGetIngredients from '@/hooks/use-get-Ingredients';
import { Container } from '@components/container/container';

export const App = (): React.JSX.Element => {
	const { ingredients, groupIngedientsByCategory, isLoading, error } =
		useGetIngredients();

	if (isLoading) return <Preloader />;
	if (!groupIngedientsByCategory || !ingredients)
		return <div>Что то пошло не так: {error}</div>;

	return (
		<div className={styles.app}>
			<AppHeader />

			<main className={`${styles.main}`}>
				<Container className={styles.container_layout}>
					<h1
						className={`${styles.title} text text_type_main-large pt-10 mb-5`}>
						Соберите бургер
					</h1>
					<div className={styles.main_layout}>
						<BurgerIngredients ingredients={groupIngedientsByCategory} />
						<BurgerConstructor ingredients={ingredients} />
					</div>
				</Container>
			</main>
		</div>
	);
};

export default App;
