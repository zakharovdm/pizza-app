import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import { CartItemProps } from './CartItem.props';

function CartItem (props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();
	
	const decrease = () => {
		dispatch(cartActions.add(props.id));
	};

	const increase = () => {

	};

	const remove = () => {

	};

	return (
		<div className={styles.item}>
			<div className={styles.image} style={{ background: `url(${props.image}) no-repeat center/cover` }}></div>
			<div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.priceWrapper}> 
					<div className={styles.price}>{props.price}<span> ₽</span></div>
				</div>
			</div>
			<div className={styles.actions}>
				<button type='button' className={styles.button} onClick={increase}>
					<div>
					  	<img src="/cardicon.svg" alt="Удалить из корзины" />
					</div>
				</button>
				<div>{props.count}</div>
				<button type='button' className={styles.button} onClick={decrease}>
					<div>
					  	<img src="/cardicon.svg" alt="Добавить в корзину" />
					</div>
				</button>
				<button type='button' className={styles.remove} onClick={remove}>
					<div>
					  	<img src="/cardicon.svg" alt="Удалить все" />
					</div>
				</button>
			</div>
		</div>

	);
}

export default CartItem;