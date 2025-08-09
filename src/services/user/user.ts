import { TUser } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TStateUser = {
	user: TUser | null;
	isAuthChecked: boolean;
};

const initialState: TStateUser = {
	user: null,
	isAuthChecked: false,
};

export const UserSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TUser>) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, clearUser, setIsAuthChecked } = UserSlice.actions;
export default UserSlice.reducer;
