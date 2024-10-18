import { useDispatch, useSelector } from 'react-redux';
import Headline from '../../components/Headline/Headline';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);

	const items = useSelector((state: RootState) => state.cart.items);
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	
	const total = items
		.map((i) => {
			const product = cartProducts.find((p) => p.id === i.id);
			if (!product) {
				return 0;
			}
			return i.count * product.price;
		})
		.reduce((acc, i) => (acc += i), 0);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllitems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCartProducts(res);
	};

	const checkout = async() => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartActions.clean());
		navigate('/success');
	};

	useEffect(() => {
		loadAllitems();
	}, [items]);

	return (
		<>
			<Headline className={styles.headline}>Корзина</Headline>
			{items.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem key={product.id} count={i.count} {...product} />;
			})}
			<div className={styles.line}>
				<div className={styles.text}>Итог</div>
				<div className={styles.price}>
					{total}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.line}>
				<div className={styles.text}>Доставка</div>
				<div className={styles.price}>
					{DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.line}>
				<div className={styles.text}>Итог <span className={styles.totalCount}>({items.length})</span></div>
				<div className={styles.price}>
					{total + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<div className={styles.checkout}>
				<Button apperance='big' onClick={checkout}>Оформить</Button>
			</div>
		</>
	);
}
