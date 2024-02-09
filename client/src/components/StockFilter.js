import { Select, Box, Text } from '@chakra-ui/react';

const StockFilter = ({ onSelect }) => {
	const handleChange = (e) => {
		const selectedOption = e.target.value;
		onSelect(selectedOption);
	};

	return (
		<Box>
			<Text fontSize="lg" fontWeight="bold" mb={2}>
				Sort By:
			</Text>
			<Select placeholder="Select filter option" onChange={handleChange}>
				<option value="productName">Product Name</option>
				<option value="productId">Product ID</option>
				<option value="locationAddress">Location Address</option>
				<option value="locationId">Location ID</option>
			</Select>
		</Box>
	);
};

export default StockFilter;
