import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ children, className, apperance = 'small', ...props }: ButtonProps) {
	return (
		<button
			className={cn(className, styles.button, {
				[styles.big]: apperance === 'big',
				[styles.small]: apperance === 'small'
			})}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
