import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headline from '../../components/Headline/Headline';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import { FormEvent, useEffect } from 'react';

type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
	name: {
		value: string;
	};	
};

export function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user );

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendForm = async (email: string, password: string, name: string) => {
		dispatch(register({ email, password, name }));
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name } = target;
		await sendForm(email.value, password.value, name.value);
	};

	return (
		<div className={styles.formWrapper}>
			<Headline>Регистрация</Headline>
			<form className={styles.form} onSubmit={submit}>
				{registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
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
					<div className={styles.input}>
						<label className={styles.label} htmlFor="name">
              Ваше имя
						</label>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="Имя"
						/>
					</div>
				</div>
				<div className={styles.buttonWrapper}>
					<Button type="submit" apperance="big">
            Зарегистрироваться
					</Button>
				</div>
			</form>
			<div className={styles.inner}>
				<p className={styles.text}>Есть аккаунт?</p>
				<Link className={styles.login} to="/auth/login">
          Войти
				</Link>
			</div>
		</div>
	);
}
