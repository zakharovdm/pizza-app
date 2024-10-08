import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const profile = useSelector((state: RootState) => state.user.profile);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('auth/login');
	};

	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.infoUser}>
					<div>
						<img src="/avatar.jpg" alt="Аватар пользователя" />
					</div>
					<div className={styles.info}>
						<p className={styles.userName}>{profile?.name}</p>
						<p className={styles.email}>{profile?.email}</p>
					</div>
				</div>
				<div className={styles.links}>
					<div className={styles.linkInner}>
						<img src="/menuicon.svg" alt="Иконка меню" />
						<NavLink
							className={({ isActive }) =>
								cn(styles.link, { [styles.active]: isActive })
							}
							to="/"
						>
              Меню
						</NavLink>
					</div>
					<div className={styles.linkInner}>
						<img src="/carticon.svg" alt="Иконка корзины" />
						<NavLink className={({ isActive }) =>
							cn(styles.link, { [styles.active]: isActive })
						} to="/cart">
              Корзина
						</NavLink>
					</div>
				</div>
				<Button type="button" className={styles.logoutButton} apperance="small" onClick={logout}>
					<img src="/logouticon.svg" alt="Иконка выхода" />
          Выйти
				</Button>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}
