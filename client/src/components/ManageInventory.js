import StockList from './StockList';
import { useState, useEffect } from 'react';

const ManageInventory = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [allStocks, setAllStocks] = useState([]);
	const [filterOption, setFilterOption] = useState('productName');
	const [products, setProducts] = useState([]);
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		const fetchAllStocks = async () => {
			try {
				const response = await fetch('/stocks');
				const data = await response.json();
				setAllStocks(data);
				setSearchResults([...data]);
			} catch (error) {
				console.error('Error fetching stocks:', error);
			}
		};

		fetchAllStocks();
	}, []);

	useEffect(() => {
		const fetchProductsAndLocations = async () => {
			try {
				const productResponse = await fetch('/products');
				const productData = await productResponse.json();
				setProducts(productData);

				const locationResponse = await fetch('/locations');
				const locationData = await locationResponse.json();
				setLocations(locationData);
			} catch (error) {
				console.error('Error fetching products and locations:', error);
			}
		};

		fetchProductsAndLocations();
	}, []);

	const handleSearch = (searchTerm) => {
		setSearchQuery(searchTerm);

		if (searchTerm.trim() === '') {
			setSearchResults(allStocks);
		} else {
			const filteredStocks = allStocks.filter((stock) => {
				const productName = stock.product.name.toLowerCase();
				const locationAddress = stock.location.address.toLowerCase();
				const searchTermLower = searchTerm.toLowerCase();

				return (
					productName.includes(searchTermLower) ||
					locationAddress.includes(searchTermLower)
				);
			});

			setSearchResults(filteredStocks);
		}
	};

	const handleFilterSelect = (selectedOption) => {
		setFilterOption(selectedOption);
	};

	const handleAddStock = (newStock) => {
		setAllStocks([...allStocks, newStock]);
		setSearchResults([...searchResults, newStock]);
	};

	return (
		<div>
			<StockList
				searchResults={searchResults}
				searchQuery={searchQuery}
				filterOption={filterOption}
				products={products}
				locations={locations}
				onAddStock={handleAddStock}
				onSearch={handleSearch}
				onSelect={handleFilterSelect}
			/>
		</div>
	);
};

export default ManageInventory;
