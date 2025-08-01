import styles from './layout.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={`${styles.main}`}>{children}</main>
		</div>
	);
};

export default MainLayout;
