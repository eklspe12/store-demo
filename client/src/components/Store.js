import ProductList from './ProductList';
import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import AddProductForm from './AddProduct';
import ProductSearchBar from './ProductSearchBar';

const Store = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [showForm, setShowForm] = useState(false);

	function handleDelete(productToDelete) {
		const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
		setProducts(updatedProducts);
		setFilteredProducts(updatedProducts);
	}

	const addProduct = (newProduct) => {
		setProducts([...products, newProduct]);
		setFilteredProducts([...filteredProducts, newProduct]);
		setShowForm(false);
	};

	function updateProduct(updatedProduct) {
		const updatedProducts = products.map((product) => {
			return product.id === updatedProduct.id ? updatedProduct : product;
		});
		setProducts(updatedProducts);
		setFilteredProducts(updatedProducts);
	}

	const toggleForm = () => {
		setShowForm(!showForm);
	};

	const handleSearch = (searchTerm) => {
		if (searchTerm.trim() === '') {
			setFilteredProducts(products);
		} else {
			const filtered = products.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredProducts(filtered);
		}
	};

	useEffect(() => {
		fetch('/products')
			.then((r) => r.json())
			.then((products) => {
				setProducts(products);
				setFilteredProducts(products);
			});
	}, []);

	return (
		<Box mx="auto" w="80vw">
			<AddProductForm
				onAddProduct={addProduct}
				onClick={toggleForm}
				showForm={showForm}
				setShowForm={setShowForm}
			/>
			<ProductSearchBar onSearch={handleSearch} />
			<ProductList
				products={filteredProducts}
				onDelete={handleDelete}
				updateProduct={updateProduct}
			/>
		</Box>
	);
};

export default Store;
