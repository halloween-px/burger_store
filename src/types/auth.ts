import { TUser } from './user';

export type TLogin = {
	password: string;
	email: string;
};

export type TRegister = {
	name: string;
	email: string;
	password: string;
};

export type TTokenResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

export type TAuthResponse = {
	user: TUser;
} & TTokenResponse;

export type TForgotPassword = {
	email: string;
};

export type TResetPassword = {
	password: string;
	token: string;
};

export type TSussesResponse = {
	success: boolean;
	message: string;
};
