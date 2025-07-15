export type TCategoryIngredientName = 'bun' | 'main' | 'sauce';

export type TIngredient = {
	_id: string;
	name: string;
	type: TCategoryIngredientName;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	uuid: string;
	__v: number;
};

export type TGroupIngredientsByCategory = {
	[K in TCategoryIngredientName]: TIngredient[];
};

export type TResponceIngredient = {
	success: boolean;
	data: TIngredient[];
};
