import { useEffect, useState } from 'react';
import DeleteStock from './DeleteStock';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box,
	Center,
	Text,
} from '@chakra-ui/react';

const StockList = ({ searchResults, filterOption, searchQuery }) => {
	const [sortedSearchResults, setSortedSearchResults] = useState([]);

	useEffect(() => {
		const sortResults = () => {
			switch (filterOption) {
				case 'productName':
					return [...searchResults].sort((a, b) =>
						a.product.name.localeCompare(b.product.name)
					);
				case 'productId':
					return [...searchResults].sort((a, b) => a.product.id - b.product.id);
				case 'locationAddress':
					return [...searchResults].sort((a, b) =>
						a.location.address.localeCompare(b.location.address)
					);
				case 'locationId':
					return [...searchResults].sort(
						(a, b) => a.location.id - b.location.id
					);
				default:
					return [...searchResults];
			}
		};

		setSortedSearchResults(sortResults());
	}, [searchResults, filterOption]);
	const handleDeleteStock = (deletedStockId) => {
		const updatedSortedSearchResults = sortedSearchResults.filter(
			(stock) => stock.id !== deletedStockId
		);
		setSortedSearchResults(updatedSortedSearchResults);
	};

	useEffect(() => {
		setSortedSearchResults([...searchResults]);
	}, [searchResults]);
	return (
		<Box p={4}>
			{searchResults.length === 0 ? (
				<Text>No results match your search term, please try again.</Text>
			) : (
				<Center>
					<Table variant="striped" colorScheme="teal">
						<Thead>
							<Tr>
								<Th>Product Name</Th>
								<Th>Product ID</Th>
								<Th>Location Address</Th>
								<Th>Location ID</Th>
								<Th>Quantity</Th>
							</Tr>
						</Thead>
						<Tbody>
							{sortedSearchResults.map((stock) => (
								<Tr key={stock.id}>
									<Td>{stock.product.name}</Td>
									<Td>{stock.product.id}</Td>
									<Td>{stock.location.address}</Td>
									<Td>{stock.location.id}</Td>
									<Td>{stock.quantity}</Td>
									<Td>
										<DeleteStock
											stockId={stock.id}
											onDelete={() => handleDeleteStock(stock.id)}
										/>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Center>
			)}
		</Box>
	);
};

export default StockList;
