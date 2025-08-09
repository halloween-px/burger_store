import React, { useEffect } from 'react';
import MainLayout from '../layout/main-layout';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from '@/routes/routes';
import { useAuth } from '@/hooks';

export const App = (): React.JSX.Element => {
	const { fetchUser } = useAuth();

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<BrowserRouter>
			<MainLayout>
				<MainRoutes />
			</MainLayout>
		</BrowserRouter>
	);
};

export default App;
