import ProductList from './ProductList';
import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const Store = () => {
	const [products, setProducts] = useState([]);

	function handleDelete(productToDelete) {
		const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
		setProducts(updatedProducts);
	}

	function updateProduct(updatedProduct) {
		const updatedProducts = products.map((product) => {
			if (product.id !== updatedProduct.id) {
				return product;
			} else {
				return updatedProduct;
			}
		});
		setProducts(updatedProducts);
	}
	useEffect(() => {
		fetch('/products')
			.then((r) => r.json())
			.then((products) => {
				setProducts(products);
				// setOriginalProducts(products);
				console.log(products);
			});
	}, []);
	return (
		<Box mx="auto" w="80vw">
			<ProductList
				products={products}
				updateProduct={updateProduct}
				onDelete={handleDelete}
			/>
		</Box>
	);
};
export default Store;
