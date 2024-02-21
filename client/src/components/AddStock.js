import { useState } from 'react';
import { Button, Select, Box, Text } from '@chakra-ui/react';

const AddStock = ({ products, locations, onAddStock }) => {
	const [selectedProduct, setSelectedProduct] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');
	const [quantity, setQuantity] = useState(1);

	const handleProductChange = (e) => {
		setSelectedProduct(e.target.value);
	};

	const handleLocationChange = (e) => {
		setSelectedLocation(e.target.value);
	};

	const handleQuantityChange = (e) => {
		setQuantity(parseInt(e.target.value));
	};

	const handleSubmit = async () => {
		if (!selectedProduct || !selectedLocation || !quantity) {
			alert('Please select an option from each field before submitting.');
			return;
		}

		try {
			const response = await fetch('/stocks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					product_id: selectedProduct,
					location_id: selectedLocation,
					quantity: quantity,
				}),
			});
			if (!response.ok) {
				throw new Error('Failed to add stock');
			}
			const newStock = await response.json();
			onAddStock(newStock);
			setSelectedProduct('');
			setSelectedLocation('');
			setQuantity(1);
		} catch (error) {
			console.error('Error adding stock:', error);
		}
	};

	return (
		<Box
			p={4}
			mb={4}
			borderWidth="1px"
			borderRadius="lg"
			w="400px"
			mx="auto"
			textAlign={'center'}
			className="addForm"
		>
			<Text fontSize="36px" fontWeight="bold" mb={2} textAlign={'center'}>
				Add New Stock
			</Text>
			<Select
				value={selectedProduct}
				onChange={handleProductChange}
				placeholder="Select Product"
				textAlign={'center'}
			>
				{products.map((product) => (
					<option key={product.id} value={product.id}>
						{product.name}
					</option>
				))}
			</Select>
			<Select
				value={selectedLocation}
				onChange={handleLocationChange}
				placeholder="Select Location"
				textAlign={'center'}
				minH={'30px'}
				h={'30px'}
			>
				{locations.map((location) => (
					<option key={location.id} value={location.id}>
						{location.address}
					</option>
				))}
			</Select>
			<Select
				value={quantity}
				onChange={handleQuantityChange}
				textAlign={'center'}
				placeholder="Select Quantity"
			>
				{[...Array(20).keys()].map((num) => (
					<option key={num + 1} value={num + 1}>
						{num + 1}
					</option>
				))}
			</Select>
			<Button mt={2} onClick={handleSubmit} colorScheme="orange" border={'1px'}>
				Add Stock
			</Button>
		</Box>
	);
};

export default AddStock;
