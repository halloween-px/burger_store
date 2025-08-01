export const routerState = {
	fromForgot: 'fromForgot',
} as const;

export type TRouterState = (typeof routerState)[keyof typeof routerState];
