import { useState, useEffect, ChangeEvent } from 'react';
import Headline from '../../components/Headline/Headline';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: { name }
			});
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	const updateFilter = async (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles.head}>
				<Headline>Меню</Headline>
				<SearchInput
					placeholder="Введите блюдо или состав"
					onChange={updateFilter}
				/>
			</div>
			{error && <>{error}</>}
			{!isLoading && products.length > 0 && <MenuList products={products} />}
			{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
			{isLoading && 'Загружаем меню...'}
		</>
	);
}

export default Menu;
