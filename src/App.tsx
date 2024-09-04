import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
	return (
		<>
			<Button apperance="big" onClick={() => {}}>
        Оформить
			</Button>
			<Button onClick={() => {}}>Применить</Button>
			<Input />
			<div>
				<a href="/">Меню</a>
				<a href="/cart">Корзина</a>
			</div>
		</>
	);
}

export default App;
