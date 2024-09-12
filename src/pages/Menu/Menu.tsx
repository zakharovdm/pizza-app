import Headline from '../../components/Headline/Headline';
import SearchInput from '../../components/SearchInput/SearchInput';
import styles from './Menu.module.css';

export function Menu() {
	return <div className={styles.head}>
		<Headline>Меню</Headline>
		<SearchInput placeholder='Введите блюдо или состав'/>
	</div>;
}