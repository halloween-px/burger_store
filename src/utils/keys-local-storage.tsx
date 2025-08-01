export const keysLS = {
	refreshToken: 'refreshToken',
	accessToken: 'accessToken',
	ingredientModal: 'ingredientModal',
} as const;

export type TKeysLS = keyof typeof keysLS;
