import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';

type LoginForm = {
	email: {
		value: string;
	},
	password: {
		value: string;
	}
}
export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate(); 
	
	const sendForm = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		} catch(e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}
	};
	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendForm(email.value, password.value);
	};

	return (
		<div className={styles.formWrapper}>
			<Headline>Вход</Headline>
			<form className={styles.form} onSubmit={submit}>
				{error && <div className={styles.error}>{error}</div>}
				<div className={styles.wrapper}>
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
