import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';
import cn from 'classnames';

export function Layout() {
	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.infoUser}>
					<div>
						<img src="./avatar.jpg" alt="Аватар пользователя" />
					</div>
					<div className={styles.info}>
						<p className={styles.userName}>Антон Ларичев</p>
						<p className={styles.email}>alaricode@ya.ru</p>
					</div>
				</div>
				<div className={styles.links}>
					<div className={styles.linkInner}>
						<img src="./menuicon.svg" alt="Иконка меню" />
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
						<img src="./carticon.svg" alt="Иконка корзины" />
						<NavLink className={({ isActive }) =>
							cn(styles.link, { [styles.active]: isActive })
						} to="/cart">
              Корзина
						</NavLink>
					</div>
				</div>
				<Button type="button" className={styles.logoutButton} apperance="small">
					<img src="./logouticon.svg" alt="Иконка выхода" />
          Выйти
				</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
