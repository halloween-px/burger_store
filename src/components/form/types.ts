export type TChildren = Record<'children', React.ReactNode>;

export type TPropsBaseForm = TChildren & {
	title?: string;
	position?: 'auto' | 'center' | 'right';
};

export type TLinkGroup = {
	text: string;
	linkText: string;
	to: string;
};
