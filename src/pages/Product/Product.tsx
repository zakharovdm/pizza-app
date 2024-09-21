import { useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';
import type { Product } from '../../interfaces/product.interface';

export function Product() {
	const data = useLoaderData() as { data: Product};

	return <>
		<Suspense fallback="Загрузка...">
			<Await resolve={data.data}>
				{
					({ data }: { data: Product }) => (
						<>Product {data.name}</>
					)
				}
			</Await>
		</Suspense>
	</>;
}