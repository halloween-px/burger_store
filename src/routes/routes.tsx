import { Outlet, Route, Routes, useLocation, useNavigate, Location } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import IngredientPage from '@/pages/ingredient/ingredient';
import MainPage from '@/pages/main/main-page';
import NotFoundPage from '@/pages/not-found/not-found';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import ResetPasswordPage from '@/pages/auth/reset-password';
import { OnlyAuth, OnlyUnAuth } from './protected-route';
import ProfilePage from '@/pages/profile/profile';
import ProfileForm from '@/pages/profile/profile-form';
import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/burger-ingredients/ingredient-details';
import FeedPage from '@/pages/feed/feed-page';
import { ProfileOrders } from '@/pages/profile/profile-orders';
import OrderDetailsPage from '@/pages/order/order-details';
import { ModalFeedOrderDetails } from '@/components/modal/feed-order-details';

export const MainRoutes = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const state = location.state as { background?: Location };
	const ingredientsData = JSON.parse(`${sessionStorage.getItem('ingredient-modal')}`);
	const handleCloseModal = () => navigate(-1);

	return (
		<>
			<Routes location={state?.background || location}>
				<Route path={routesConfig.MAIN} element={<MainPage />} />
				<Route path={routesConfig.INGREDIENTS(':id')} element={<IngredientPage />} />
				<Route path={routesConfig.NOT_FOUND} element={<NotFoundPage />} />
				<Route path={routesConfig.FEED_ORDERS} element={<FeedPage />} />
				<Route path={routesConfig.FEED_ORDERS_ID(':id')} element={<OrderDetailsPage />} />

				<Route
					element={
						<OnlyUnAuth>
							<Outlet />
						</OnlyUnAuth>
					}>
					<Route path={routesConfig.LOGIN} element={<LoginPage />} />
					<Route path={routesConfig.REGISTER} element={<RegisterPage />} />
					<Route path={routesConfig.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
					<Route path={routesConfig.RESET_PASSWORD} element={<ResetPasswordPage />} />
				</Route>

				<Route
					element={
						<OnlyAuth>
							<Outlet />
						</OnlyAuth>
					}>
					<Route path={routesConfig.PROFILE} element={<ProfilePage />}>
						<Route index element={<ProfileForm />} />
						<Route path={routesConfig.PROFILE_ORDERS} element={<ProfileOrders />} />
					</Route>
					<Route path={routesConfig.PROFILE_ORDERS_ID(':id')} element={<OrderDetailsPage />} />
				</Route>
			</Routes>

			{state?.background && (
				<Routes>
					{ingredientsData && (
						<Route
							path={routesConfig.INGREDIENTS(':id')}
							element={
								<Modal title='Детали ингредиента' onClose={handleCloseModal}>
									<IngredientDetails ingredient={ingredientsData} />
								</Modal>
							}
						/>
					)}
					<Route
						path={routesConfig.FEED_ORDERS_ID(':id')}
						element={<ModalFeedOrderDetails type='feed-orders' />}
					/>
					<Route
						path={routesConfig.PROFILE_ORDERS_ID(':id')}
						element={<ModalFeedOrderDetails type='user-orders' />}
					/>
				</Routes>
			)}
		</>
	);
};
