type WebSocketApi<T> = {
	updateCachedData: (updateRecipe: (draft: T) => T) => void;
	cacheEntryRemoved: Promise<void>;
};

export const BASE_API = 'https://norma.nomoreparties.space/api';

export const createWebsocketHandler = <T>(url: string) => {
	return async (_: string, { updateCachedData, cacheEntryRemoved }: WebSocketApi<T>) => {
		const ws = new WebSocket(url);

		ws.onmessage = (event: MessageEvent) => {
			const data: T = JSON.parse(event.data);

			updateCachedData(() => {
				return data;
			});
		};

		ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		await cacheEntryRemoved;
		ws.close();
	};
};
