import { useState, useEffect } from 'react';
import Headline from '../../components/Headline/Headline';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]); 

	const getMenu = async () =>  {
		try {
			const res = await fetch(`${PREFIX}/products`);
			if (!res.ok) {
				return;
			}
			const data = await res.json() as Product[];
			setProducts(data);
		} catch(e) {
			console.error(e);
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
			{products.map(p => ( 
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
			
		</>
	);
}
