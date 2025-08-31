export type TOrderDetailsResponse = {
	name: string;
	order: {
		number: string;
	};
	success: boolean;
};

export type TStatusNames = 'done' | 'created' | 'pending';

export type TOrderIngredient = {
	image: string;
	price: number;
	title: string;
	count?: number;
	_id: string;
};

export type TOrder = {
	_id: string;
	number: number;
	name: string;
	ingredients: Array<TOrderIngredient>;
	totalPrice: string;
	time: string;
	status?: TStatusNames | undefined;
};

export type TResponseOrder = {
	success: boolean;
	orders: Array<{
		ingredients: Array<string>;
		_id: string;
		name: string;
		status: TStatusNames;
		number: number;
		createdAt: string;
		updatedAt: string;
	}>;
	total: number;
	totalToday: number;
};
