import styles from './Headline.module.css';
import { HeadlineProps } from './Headline.props';

function Button({ children, ...props }: HeadlineProps) {
	return (
		<h1 {...props} className={styles.headline}>{children}</h1>
	);
}

export default Button;
