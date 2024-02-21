import { Select, Box } from '@chakra-ui/react';

const StockFilter = ({ onSelect }) => {
	const handleChange = (e) => {
		const selectedOption = e.target.value;
		onSelect(selectedOption);
	};

	return (
		<Box w="200px">
			<Select
				placeholder="Sort by..."
				onChange={handleChange}
				focusBorderColor="gray.400"
			>
				<option value="productName">Product Name</option>
				<option value="productId">Product ID</option>
				<option value="locationAddress">Location Address</option>
				<option value="locationId">Location ID</option>
			</Select>
		</Box>
	);
};

export default StockFilter;
