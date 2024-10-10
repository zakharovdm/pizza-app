import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, userActions } from '../../store/user.slice';
import { AppDispatch, RootState } from '../../store/store';

type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};
export function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendForm = async (email: string, password: string) => {
		dispatch(login({ email, password }));
	};
	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendForm(email.value, password.value);
	};

	return (
		<div className={styles.formWrapper}>
			<Headline>Вход</Headline>
			<form className={styles.form} onSubmit={submit}>
				{loginErrorMessage && (
					<div className={styles.error}>{loginErrorMessage}</div>
				)}
				<div className={styles.wrapper}>
					<div className={styles.input}>
						<label className={styles.label} htmlFor="email">
              Ваш email
						</label>
						<Input type="email" name="email" id="email" placeholder="Email" />
					</div>
					<div className={styles.input}>
						<label className={styles.label} htmlFor="password">
              Ваш пароль
						</label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Пароль"
						/>
					</div>
				</div>
				<div className={styles.buttonWrapper}>
					<Button type="submit" apperance="big">
            Вход
					</Button>
				</div>
			</form>
			<div className={styles.inner}>
				<p className={styles.text}>Нет аккаунта?</p>
				<Link className={styles.register} to="/auth/register">
          Зарегистрироваться
				</Link>
			</div>
		</div>
	);
}
