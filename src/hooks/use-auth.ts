import { clearUser, setIsAuthChecked, setUser } from '@/services/user/user';
import { useLazyGetUserQuery } from '@/services/user/user-api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLocalStorage } from './use-local-storage';
import { useLogoutMutation, useRefreshTokenMutation } from '@/services/auth/auth-api';
import { keysLS } from '@/utils/keys-local-storage';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.userSlice.user);
	const [refetchUser] = useLazyGetUserQuery();
	const [refreshTokenRequest] = useRefreshTokenMutation();
	const [logoutRequest] = useLogoutMutation();
	const isAuthChecked = useAppSelector((state) => state.userSlice.isAuthChecked);
	const [accessToken, setAccessToken] = useLocalStorage({
		key: keysLS.accessToken,
		syncWrite: true,
	});
	const [refreshToken, setRefreshToken] = useLocalStorage({
		key: keysLS.refreshToken,
		syncWrite: true,
	});

	const fetchUser = async () => {
		try {
			if (!user && !accessToken) return;
			const res = await refetchUser().unwrap();
			dispatch(setUser(res.user));
		} catch (error) {
			if (refreshToken) {
				try {
					const refreshRes = await refreshTokenRequest().unwrap();
					setAccessToken(refreshRes.accessToken);
					setRefreshToken(refreshRes.refreshToken);
					await fetchUser();
				} catch (error) {
					logout();
				}
			} else {
				logout();
			}
		} finally {
			dispatch(setIsAuthChecked(true));
		}
	};

	const logout = () => {
		if (refreshToken) logoutRequest();
		setAccessToken(undefined);
		setRefreshToken(undefined);
		dispatch(clearUser());
	};

	return {
		user,
		isAuthChecked,
		fetchUser,
		logout,
	};
};
