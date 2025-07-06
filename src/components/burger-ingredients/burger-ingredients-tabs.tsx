import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { TCategoryIngredientName } from '@/types/ingredients';

type Props = {
	current: TCategoryIngredientName;
	onTabClick: (type: TCategoryIngredientName) => void;
};

export const BurgerIngredientTabs = ({ current, onTabClick }: Props) => {
	return (
		<nav>
			<ul className={styles.menu}>
				<Tab
					value='bun'
					active={current === 'bun'}
					onClick={() => onTabClick('bun')}>
					Булки
				</Tab>
				<Tab
					value='sauce'
					active={current === 'sauce'}
					onClick={() => onTabClick('sauce')}>
					Соусы
				</Tab>
				<Tab
					value='main'
					active={current === 'main'}
					onClick={() => onTabClick('main')}>
					Начинки
				</Tab>
			</ul>
		</nav>
	);
};
