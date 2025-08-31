import React, { useRef, useState, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientTabs } from './burger-ingredients-tabs';
import { useGetIngredientsQuery } from '@/services/burger-ingredients-api';
import { Preloader } from '../preloader/preloader';
import { BurgerIngredientsList } from './burger-ingredients-list';
import { TCategoryIngredientName } from '@/types/ingredients';

export const BurgerIngredients = (): React.JSX.Element => {
	const { data: ingredients, isLoading, error } = useGetIngredientsQuery();
	const [currentTab, setCurrentTab] = useState<TCategoryIngredientName>('bun');

	const containerRef = useRef<HTMLDivElement>(null);

	const bunRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	const handleTabClick = (type: TCategoryIngredientName) => {
		setCurrentTab(type);

		const sectionMap: Record<TCategoryIngredientName, React.RefObject<HTMLDivElement>> = {
			bun: bunRef,
			sauce: sauceRef,
			main: mainRef,
		};

		const targetRef = sectionMap[type];
		if (targetRef.current) {
			targetRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			if (!bunRef.current || !sauceRef.current || !mainRef.current) return;

			const containerTop = container.getBoundingClientRect().top;

			const bunDist = Math.abs(bunRef.current.getBoundingClientRect().top - containerTop);
			const sauceDist = Math.abs(sauceRef.current.getBoundingClientRect().top - containerTop);
			const mainDist = Math.abs(mainRef.current.getBoundingClientRect().top - containerTop);

			const minDist = Math.min(bunDist, sauceDist, mainDist);

			if (minDist === bunDist) setCurrentTab('bun');
			else if (minDist === sauceDist) setCurrentTab('sauce');
			else if (minDist === mainDist) setCurrentTab('main');
		};

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, [ingredients?.grouped]);

	if (isLoading) return <Preloader />;
	if (error || !ingredients) return <div>Что-то пошло не так</div>;

	return (
		<section className={styles.burger_ingredients}>
			<BurgerIngredientTabs current={currentTab} onTabClick={handleTabClick} />
			<div className={`${styles.burger_ingredients_scroll} pr-4`} ref={containerRef}>
				<BurgerIngredientsList
					ingredients={ingredients.grouped}
					refs={{ bun: bunRef, sauce: sauceRef, main: mainRef }}
				/>
			</div>
		</section>
	);
};
