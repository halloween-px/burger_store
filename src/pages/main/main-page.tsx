import styles from './main-page.module.css';
import { Container } from '@components/container/container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';

const MainPage = () => {
	return (
		<section className={styles.hero}>
			<Container className={styles.container_layout}>
				<h1 className={`${styles.title} text text_type_main-large pt-10 mb-5`}>Соберите бургер</h1>
				<div className={styles.main_layout}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				</div>
			</Container>
		</section>
	);
};

export default MainPage;
