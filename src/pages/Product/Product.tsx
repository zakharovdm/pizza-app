import { useLoaderData, Await, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import type { Product } from '../../interfaces/product.interface';
import styles from './Product.module.css';
import Headline from '../../components/Headline/Headline';
import Button from '../../components/Button/Button';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';

export function Product() {
	const data = useLoaderData() as { data: Product};
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	
	return <>
		<Suspense fallback="Загрузка...">
			<Await resolve={data.data}>
				{
					({ data }: { data: Product }) => (
						<div>
							<div className={styles.headBlock}>
								<button className={styles.buttonBack} onClick={() => {navigate('/');}}>
									<img src="/back_icon.svg" alt="Стрелка назад" />
								</button>
								<Headline>{data.name}</Headline>
								<Button className={styles.buttonCart} onClick={() => {dispatch(cartActions.increase(data.id));}}>
									<img src="/cart-icon-white.svg" alt="Иконка корзины" />
								В корзину
								</Button>
							</div>
							<div className={styles.description}>
								<img className={styles.image} src={data.image} alt="Изображение блюда" />
								<div className={styles.info}>
									<div className={styles.priceWrapper}>
										<p>Цена</p>
										<div className={styles.price}>{data.price}<span> ₽</span></div>
									</div>
									<hr className={styles.line} />
									<div className={styles.ratingWrapper}>
										<p>Рейтинг</p>
										<div className={styles.rating}>
											<span>{data.rating}</span>
											<img src="/star.svg" alt="Иконка звезды" />
										</div>
									</div>
									<div className={styles.ingredients}>
										<p>Состав:</p>
										<ul>
											{data.ingredients.map((item: string, index: number) => <li key={index}>{item}</li>)}
										</ul>
									</div>
								</div>
							</div>
						</div>
					)
				}
			</Await>
		</Suspense>
	</>;
}