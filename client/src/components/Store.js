import ProductList from './ProductList';
import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import AddProductForm from './AddProduct';
import SearchBar from './SearchBar';

const Store = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [showForm, setShowForm] = useState(false);

	function handleDelete(productToDelete) {
		const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
		setProducts(updatedProducts);
	}

	const AddProduct = (newProduct) => {
		setProducts([...products, newProduct]);
		setShowForm(false);
	};

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
				console.log(products);
			});
	}, []);
	return (
		<Box mx="auto" w="80vw">
			<AddProductForm
				onAddProduct={AddProduct}
				onClick={toggleForm}
				showForm={showForm}
				setShowForm={setShowForm}
			/>
			<SearchBar onSearch={handleSearch} />
			<ProductList
				products={filteredProducts}
				updateProduct={updateProduct}
				onDelete={handleDelete}
				filteredProducts={filteredProducts}
				setFilteredProducts={setFilteredProducts}
			/>
		</Box>
	);
};
export default Store;
