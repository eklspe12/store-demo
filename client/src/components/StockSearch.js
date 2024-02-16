import { useState } from 'react';
import { Input, Flex } from '@chakra-ui/react';

const StockSearch = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
		onSearch(e.target.value.trim());
	};

	return (
		<Flex w="600px">
			<Input
				placeholder="Search by product name or location"
				value={searchTerm}
				onChange={handleChange}
				mr={2}
				focusBorderColor="gray.400"
			/>
		</Flex>
	);
};

export default StockSearch;
