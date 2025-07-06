import React from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Container } from '@components/container/container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = (): React.JSX.Element => {
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
						<DndProvider backend={HTML5Backend}>
							<BurgerIngredients />
							<BurgerConstructor />
						</DndProvider>
					</div>
				</Container>
			</main>
		</div>
	);
};

export default App;
