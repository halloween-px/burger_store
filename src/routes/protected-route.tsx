import { Navigate, useLocation } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import { useAuth } from '@/hooks';
import { Preloader } from '@/components/preloader/preloader';

type TProps = {
	children: JSX.Element;
	onlyUnAuth?: boolean;
};

const Protected = ({ children, onlyUnAuth = false }: TProps) => {
	const { user, isAuthChecked } = useAuth();
	const location = useLocation();

	if (!isAuthChecked) return <Preloader />;

	if (!user && !onlyUnAuth) {
		return <Navigate to={routesConfig.LOGIN} state={{ from: location }} />;
	}

	if (user && onlyUnAuth) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return children;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ children }: { children: JSX.Element }) => (
	<Protected onlyUnAuth={true}>{children}</Protected>
);
