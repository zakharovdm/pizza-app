import styles from './Headline.module.css';
import { HeadlineProps } from './Headline.props';
import cn from 'classnames';

function Button({ children, className, ...props }: HeadlineProps) {
	return (
		<h1 {...props} className={cn(className, styles.headline)}>{children}</h1>
	);
}

export default Button;
