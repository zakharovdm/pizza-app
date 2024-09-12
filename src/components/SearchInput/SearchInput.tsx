import styles from './SearchInput.module.css';
import { SearchInputProps } from './SearchInput.props';

function SearchInput({ placeholder, ...props }: SearchInputProps) {
	return ( 
		<div className={styles.inputWrapper}>
			<img className={styles.icon} src="./searchicon.svg" alt="Иконка поиска" />
			<input className={styles.input} placeholder={placeholder} {...props} />
		</div>);
}

export default SearchInput;
