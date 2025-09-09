import { describe, expect, it } from 'vitest';
import reducer, { clearUser, setIsAuthChecked, setUser } from './user';

const user = {
	email: 'test@mail.ru',
	name: 'Igor',
};

describe('userSlice', () => {
	it('должен записывать юзера', () => {
		const store = reducer(undefined, setUser(user));
		expect(store.user?.email).toBe('test@mail.ru');
		expect(store.user?.name).toBe('Igor');
	});
	it('должен отчищать юзера', () => {
		const store = reducer(undefined, setUser(user));
		expect(reducer(store, clearUser()).user).toBe(null);
	});
	it('должен менять статус авторизации', () => {
		const store = reducer(undefined, setIsAuthChecked(true));
		expect(store.isAuthChecked).toBe(true);
	});
});
