import { useState } from 'react';
import { Input, Flex } from '@chakra-ui/react';

const StockSearch = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
		onSearch(e.target.value.trim());
	};

	return (
		<Flex alignItems="center">
			<Input
				placeholder="Search by product name or location"
				value={searchTerm}
				onChange={handleChange}
				mr={2}
			/>
		</Flex>
	);
};

export default StockSearch;
