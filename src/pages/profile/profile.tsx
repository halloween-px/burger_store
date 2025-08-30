import { Container } from '@/components/container/container';
import { NavLink, Outlet } from 'react-router-dom';
import { routesConfig } from '@/routes/routesConfig';
import { useAuth } from '@/hooks';

import styles from './profile.module.css';

const ProfilePage = () => {
	const { logout } = useAuth();
	const getNavLinkClass = (isActive: boolean, extraClass?: string) => {
		return `${styles.link} ${extraClass} ${isActive ? styles.link_active : ''}`;
	};

	const handleLogout = () => logout();

	return (
		<section className={`pt-30 ${styles.profile}`}>
			<Container className={styles.container}>
				<div className={styles.profile_wrapper}>
					<nav className={styles.navigation}>
						<div className={styles.navigation_list}>
							<NavLink
								end
								to={routesConfig.PROFILE}
								className={({ isActive }) =>
									getNavLinkClass(isActive, 'text text_type_main-medium pt-4 pb-5')
								}>
								Профиль
							</NavLink>
							<NavLink
								to={routesConfig.PROFILE_ORDERS}
								className={({ isActive }) =>
									getNavLinkClass(isActive, 'text text_type_main-medium pt-4 pb-5')
								}>
								История заказов
							</NavLink>
							<button
								onClick={handleLogout}
								className={`text text_type_main-medium pt-4 pb-5 ${styles.link}`}>
								Выход
							</button>
						</div>
						<p className={`${styles.naviagtion_footer_text} text text_type_main-default`}>
							В этом разделе вы можете изменить свои персональные данные
						</p>
					</nav>
					<Outlet />
				</div>
			</Container>
		</section>
	);
};

export default ProfilePage;
