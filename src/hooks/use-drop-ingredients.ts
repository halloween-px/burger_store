import { addIngridient } from '@/services/burger-constructor';
import { useAppDispatch } from '@/store/hooks';
import { TIngredient } from '@/types/ingredients';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';

type TItemType = 'bun' | 'ingredient';

export const useDropIngredients = (type: TItemType) => {
	const dispatch = useAppDispatch();
	const [collect, ref] = useDrop({
		accept: type,
		collect: (monitor) => ({
			isHover: monitor.isOver(),
			canDrop: monitor.canDrop(),
			getType: monitor.getItemType() as TItemType | null,
		}),
		drop: (item: TIngredient) => {
			if (!collect.isHover) return;
			dispatch(addIngridient({ ...item, uuid: uuid() }));
		},
	});

	return { collect, ref };
};
