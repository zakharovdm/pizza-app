import { useSelector } from 'react-redux';
import Headline from '../../components/Headline/Headline';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);

	const items = useSelector((state: RootState) => state.cart.items);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllitems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCartProducts(res);
	};

	useEffect(() => {
		loadAllitems();
	}, [items]);

	return <>
		<Headline>
			Корзина
		</Headline>
		{items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return;
			}
			return <CartItem count={i.count} {...product} />;
		})}
	</>;
}