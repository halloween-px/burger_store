import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type TTypedError = FetchBaseQueryError & {
	data: {
		success: boolean;
		message: string;
	};
};
