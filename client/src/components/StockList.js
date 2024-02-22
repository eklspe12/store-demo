import { useEffect, useState } from 'react';
import DeleteStock from './DeleteStock';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	Input,
	Box,
	Center,
	Flex,
	Text,
} from '@chakra-ui/react';
import AddStock from './AddStock';
import StockFilter from './StockFilter';
import StockSearch from './StockSearch';
const StockList = ({
	searchResults,
	filterOption,
	products,
	locations,
	onAddStock,
	onSearch,
	onSelect,
}) => {
	const [sortedSearchResults, setSortedSearchResults] = useState([]);
	const [hoveredStockId, setHoveredStockId] = useState(null);
	const [changedStockId, setChangedStockId] = useState(null);
	const [quantity, setQuantity] = useState(1);

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

	const handleQuantityChange = (value) => {
		if (value >= 1 && value <= 99) {
			setQuantity(value);
			setChangedStockId(hoveredStockId);
		}
	};

	const handleConfirmChange = async () => {
		try {
			const values = { quantity };
			const response = await fetch(`/stocks/${changedStockId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});
			if (response.ok) {
				const updatedStock = await response.json();
				setChangedStockId(null);
				setQuantity(updatedStock.quantity);
				const updatedResults = sortedSearchResults.map((stock) =>
					stock.id === updatedStock.id ? updatedStock : stock
				);
				setSortedSearchResults(updatedResults);
			} else {
				console.error('Failed to update quantity:', response.statusText);
			}
		} catch (error) {
			console.error('Error updating quantity:', error);
		}
	};

	return (
		<Box p={4} w="80vw" mx="auto">
			<Box>
				<AddStock
					products={products}
					locations={locations}
					onAddStock={onAddStock}
				/>
			</Box>

			<Box justifyContent={'center'}>
				<Box justifyContent="center" display="flex">
					<StockFilter onSelect={onSelect} />
					<StockSearch onSearch={onSearch} />
				</Box>
			</Box>
			{sortedSearchResults.length === 0 ? (
				<Text>No results match your search.</Text>
			) : (
				<Center marginTop="10px">
					<Box maxHeight="500px" overflowY="auto" position="relative">
						<Table variant="striped" colorScheme="gray">
							<Thead
								position="sticky"
								top="0"
								zIndex="sticky"
								className="tHead"
							>
								<Tr>
									<Th>Product Name</Th>
									<Th>Product ID</Th>
									<Th>Location Address</Th>
									<Th>Location ID</Th>
									<Th>Quantity</Th>
									<Th></Th>
								</Tr>
							</Thead>

							<Tbody>
								{sortedSearchResults.map((stock, index) => (
									<Tr
										key={stock.id}
										onMouseEnter={() => {
											setHoveredStockId(stock.id);
										}}
										onMouseLeave={() => setHoveredStockId(null)}
										backgroundColor={index % 2 === 0 ? 'lightorange' : 'white'}
									>
										<Td>{stock.product.name}</Td>
										<Td>{stock.product.id}</Td>
										<Td>{stock.location.address}</Td>
										<Td>{stock.location.id}</Td>
										<Td>
											<Flex alignItems="center">
												{changedStockId === stock.id ? (
													<>
														<Button
															onClick={() => handleQuantityChange(quantity - 1)}
															colorScheme="red"
														>
															-
														</Button>
														<Input
															type="number"
															min={1}
															max={99}
															value={quantity}
															readOnly
															onChange={(e) =>
																handleQuantityChange(e.target.value)
															}
															width={'50px'}
															sx={{ py: '0', px: '0', textAlign: 'center' }}
														/>
														<Button
															onClick={() => handleQuantityChange(quantity + 1)}
															colorScheme="green"
														>
															+
														</Button>
														<Button
															onClick={handleConfirmChange}
															ml={2}
															colorScheme="orange"
														>
															Confirm Change?
														</Button>
													</>
												) : (
													<>
														<Button
															onClick={() => setChangedStockId(stock.id)}
															marginRight={'5px'}
															colorScheme="orange"
														>
															Change
														</Button>
														{stock.quantity}
													</>
												)}
											</Flex>
										</Td>
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
					</Box>
				</Center>
			)}
		</Box>
	);
};

export default StockList;
