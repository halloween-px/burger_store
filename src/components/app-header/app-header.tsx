import { Link, NavLink } from 'react-router-dom';
import { Container } from '../container/container';
import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { routesConfig } from '@/routes/routesConfig';

export const AppHeader = () => {
	const getNavLinkClass = (isActive: boolean, extraClass?: string) => {
		return `${styles.link} ${extraClass} ${isActive ? styles.link_active : ''}`;
	};

	return (
		<header className={styles.header}>
			<Container>
				<nav className={`${styles.menu}`}>
					<div className={styles.menu_part_left}>
						<NavLink to={routesConfig.MAIN} className={({ isActive }) => getNavLinkClass(isActive)}>
							<BurgerIcon type='primary' />
							<p className='text text_type_main-default ml-2'>Конструктор</p>
						</NavLink>
						<NavLink
							to={routesConfig.FEED_ORDERS}
							className={({ isActive }) => getNavLinkClass(isActive, 'ml-10')}>
							<ListIcon type='secondary' />
							<p className='text text_type_main-default ml-2'>Лента заказов</p>
						</NavLink>
					</div>
					<div className={styles.logo}>
						<Link to={routesConfig.MAIN}>
							<Logo />
						</Link>
					</div>
					<NavLink
						to={routesConfig.PROFILE}
						className={({ isActive }) => getNavLinkClass(isActive, `${styles.link_position_last}`)}>
						<ProfileIcon type='secondary' />
						<p className='text text_type_main-default ml-2'>Личный кабинет</p>
					</NavLink>
				</nav>
			</Container>
		</header>
	);
};
