import React from 'react';
import ProductCard from './ProductCard';
import { Text } from '@chakra-ui/react';

const ProductList = ({ products, onDelete, updateProduct }) => {
	const productList = products.map((product) => (
		<ProductCard
			key={product.id}
			product={product}
			onDelete={onDelete}
			updateProduct={updateProduct}
		/>
	));

	return (
		<div style={{ marginTop: '10px' }}>
			{products.length === 0 ? (
				<Text>No results match your search.</Text>
			) : (
				<div className="storeContainer">{productList}</div>
			)}
		</div>
	);
};

export default ProductList;
