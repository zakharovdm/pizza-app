import { useState, useEffect } from 'react';
import Headline from '../../components/Headline/Headline';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios from 'axios';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false); 

	const getMenu = async () =>  {
		try {
			setIsLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);

		} catch(e) {
			console.error(e);
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);


	return (
		<>
			<div className={styles.head}>
				<Headline>Меню</Headline>
				<SearchInput placeholder="Введите блюдо или состав" />
			</div>
			{!isLoading && products.map(p => ( 
				<ProductCard
					key={p.id}	
					id={p.id}	
					price={p.price}
					rating={p.rating}
					image={p.image}
					name={p.name}
					description={p.ingredients.join(', ')}
				/>
			))}
			{isLoading && 'Загружаем меню...'}
		</>
	);
}