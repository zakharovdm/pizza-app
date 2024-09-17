import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

export function MenuList({ products }: MenuListProps) {
	return (
		products.map(p => ( 
			<ProductCard
				key={p.id}	
				id={p.id}	
				price={p.price}
				rating={p.rating}
				image={p.image}
				name={p.name}
				description={p.ingredients.join(', ')}
			/>
		))
	);
}