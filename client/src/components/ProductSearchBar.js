import React, { useState } from 'react';
import { Input, Box, Text } from '@chakra-ui/react';

const ProductSearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	return (
		<Box w="100%">
			<Text fontSize="lg" fontWeight="bold" mb={2}>
				Search Products
			</Text>
			<Input
				placeholder="Search by product name"
				value={searchTerm}
				onChange={handleChange}
			/>
		</Box>
	);
};

export default ProductSearchBar;
