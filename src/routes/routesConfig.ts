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
	PROFILE_ORDERS_ID: (id: string) => `/profile/orders/${id}`,
} as const;

export type TRoutes = keyof typeof routesConfig;
export type TRoutesPath = (typeof routesConfig)[TRoutes];
