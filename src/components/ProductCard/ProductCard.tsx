import { ProductCardProps } from './ProductCard.props';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard (props: ProductCardProps) {
	return (
		<Link to={`/product/${props.id}`} className={styles.link}>
			<div className={styles.card}>
				<div className={styles.head} style={{ background: `url(${props.image}) no-repeat center/cover` }}>
					<div className={styles.cardContainer}>
						<div className={styles.innerPrice}>
							<div className={styles.priceWrapper}> 
								<div className={styles.price}>{props.price}<span> ₽</span></div>
							</div>
							<button type='button' className={styles.btnAdd}>
								<div>
					  	<img src="/cardicon.svg" alt="Добавить в корзину" />
								</div>
							</button>
						</div>
						<div className={styles.rating}>
							<span>{props.rating}</span>
							<img src="/star.svg" alt="Иконка звезды" />
						</div>
					</div>
				</div>
				<div className={styles.cardContainer}>
					<div className={styles.description}>
						<h3 className={styles.titleCard}>{props.name}</h3>
						<p className={styles.ingredients}>{props.description}</p>
					</div>
				</div>
			</div>
		</Link>

	);
}

export default ProductCard;