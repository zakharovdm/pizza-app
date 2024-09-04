import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Menu } from './pages/Menu/Menu.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Menu />
	},
	{
		path: '/cart',
		element: <Cart />
	},
	{
		path: '*',
		element: <Error />
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<RouterProvider router={router} />
	</StrictMode>
);
