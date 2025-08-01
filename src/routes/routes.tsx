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

export const MainRoutes = () => {
	{
		/* С модалкой грязно написано может можно лучше, но пока не знаю как ?  */
	}
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
						<Route path={routesConfig.PROFILE_ORDERS} element={<>История заказов</>} />
					</Route>
				</Route>
			</Routes>

			{/* С модалкой грязно написано может можно лучше, но пока не знаю как ?  */}
			{state?.background && ingredientsData && (
				<Routes>
					<Route
						path={routesConfig.INGREDIENTS(':id')}
						element={
							<Modal title='Детали ингредиента' onClose={handleCloseModal}>
								<IngredientDetails ingredient={ingredientsData} />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
