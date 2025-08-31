import { TOrder } from '@/types/order';
import styles from './burger-ingredients.module.css';

type TProps = {
	ingredients: TOrder['ingredients'];
};

export const IngredientStack = ({ ingredients }: TProps) => {
	const ingrds = ingredients.reduce(
		(acc, item, index) => {
			if (index < 5) {
				acc.ingr.push(item);
			} else {
				acc.shadowIngr.count++;
				acc.shadowIngr.img = item.image;
			}
			return acc;
		},
		{ ingr: [] as TOrder['ingredients'], shadowIngr: { count: 0, img: '' } }
	);

	return (
		<div className={styles['ingredients-stack']}>
			{ingrds.ingr.map((ingr, index) => (
				<div key={index} className={styles['ingr-image']} style={{ zIndex: 6 - index }}>
					<img src={ingr.image || '/empty-bun.png'} alt='ingredients' />
				</div>
			))}
			{ingrds.shadowIngr.count > 0 && (
				<div
					className={styles['ingr-image']}
					style={{ zIndex: 0 }}
					data-count={`+${ingrds.shadowIngr.count}`}>
					<img src={ingrds.shadowIngr.img || '/empty-bun.png'} alt='ingredients' />
				</div>
			)}
		</div>
	);
};
