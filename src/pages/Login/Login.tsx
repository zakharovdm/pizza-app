import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent } from 'react';

export function Login() {
	const submit = (e: FormEvent) => {
		e.preventDefault();
		console.log(e);
	};

	return (
		<div className={styles.formWrapper}>
			<form className={styles.form} onSubmit={submit}>
				<div className={styles.wrapper}>
					<Headline>Вход</Headline>
					<div className={styles.input}>
						<label className={styles.label} htmlFor="email">Ваш email</label>
						<Input type='email' name='email' id='email' placeholder='Email' />
					</div>
					<div  className={styles.input}>
						<label className={styles.label} htmlFor="email">Ваш пароль</label>
						<Input type='password' name='password' id='password' placeholder='Пароль' />
					</div>
				</div>
				<div className={styles.buttonWrapper}>
					<Button type='submit' apperance='big'>Вход</Button>
				</div>
			</form>
			<div className={styles.inner}>
				<p className={styles.text}>Нет аккаунта?</p>
				<Link className={styles.register} to='/auth/register'>Зарегистрироваться</Link>
			</div>
		</div>
	);
}
