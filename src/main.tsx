import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout/Layout.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Product } from './pages/Product/Product.tsx';
import { AuthLayout } from './layout/AuthLayout/Auth.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				)
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: new Promise((resolve, reject) => {
							axios
								.get(`${PREFIX}/productds/${params.id}`)
								.then((data) => resolve(data)).catch(e => reject(e));
						})
					});
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: '/auth/login',
				element: <Login />
			},
			{
				path: '/auth/register',
				element: <Register />
			}
		]

	},
	{
		path: '*',
		element: <Error />
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
