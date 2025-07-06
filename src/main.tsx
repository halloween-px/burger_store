import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

const initialStore = store;

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={initialStore}>
			<App />
		</Provider>
	</React.StrictMode>
);
