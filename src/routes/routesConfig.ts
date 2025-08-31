export const routesConfig = {
	MAIN: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	PROFILE: '/profile',
	PROFILE_ORDERS: '/profile/orders',
	FEED_ORDERS: '/feed',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',
	NOT_FOUND: '/*',

	INGREDIENTS: (id: string) => `/ingredients/${id}`,
	FEED_ORDERS_ID: (id: string) => `/feed/${id}`,
	PROFILE_ORDERS_ID: (id: string) => `/profile/orders/${id}`,
	ORDER_DETAILS: (path: string, number: string | number) => `${path}/${number}`,
} as const;

export type TRoutes = keyof typeof routesConfig;
export type TRoutesPath = (typeof routesConfig)[TRoutes];
