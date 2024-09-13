import Headline from '../../components/Headline/Headline';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import styles from './Menu.module.css';

export function Menu() {
	return (
		<>
			<div className={styles.head}>
				<Headline>Меню</Headline>
				<SearchInput placeholder="Введите блюдо или состав" />
			</div>
			<ProductCard
				price={300}
				rating={4.5}
				image="/pizza1.jpg"
				title="Наслаждение"
				description="Салями, руккола, помидоры, оливки"
				id={1}
			/>
		</>
	);
}
