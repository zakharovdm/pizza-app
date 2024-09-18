import { useState, useEffect } from 'react';
import Headline from '../../components/Headline/Headline';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>(); 

	const getMenu = async () =>  {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);

		} catch(e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}
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
			{error && <>{error}</>}
			{!isLoading && <MenuList products={products} />}
			{isLoading && 'Загружаем меню...'}
		</>
	);
}