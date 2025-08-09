import { setUser } from '@/services/user/user';
import { AppDispatch } from '@/store/store';
import { TAuthResponse } from '@/types/auth';

export const handleAuthSusses = async (
	queryFulfilled: Promise<{ data: TAuthResponse }>,
	dispatch: AppDispatch
) => {
	const { data } = await queryFulfilled;
	localStorage.setItem('accessToken', data.accessToken);
	localStorage.setItem('refreshToken', data.refreshToken);
	dispatch(setUser(data.user));
};
