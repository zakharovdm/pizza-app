import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import { CartItemProps } from './CartItem.props';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const decrease = () => {
		dispatch(cartActions.decrease(props.id));
	};

	const increase = () => {
		dispatch(cartActions.increase(props.id));
	};

	const remove = () => {
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={styles.item}>
			<div
				className={styles.image}
				style={{ background: `url(${props.image}) no-repeat center/cover` }}
			></div>
			<div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.priceWrapper}>
					<div className={styles.price}>
						{props.price}
						<span> ₽</span>
					</div>
				</div>
			</div>
			<div className={styles.actions}>
				<button type="button" className={styles.minus} onClick={decrease}>
					<img src="/minus-icon.svg" alt="Удалить из корзины" />
				</button>
				<div className={styles.number}>{props.count}</div>
				<button type="button" className={styles.plus} onClick={increase}>
					<img src="/plus-icon.svg" alt="Добавить в корзину" />
				</button>
				<button type="button" className={styles.remove} onClick={remove}>
					<img src="/delete-icon.svg" alt="Удалить все" />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
