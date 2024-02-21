import React, { useState } from 'react';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Box,
	Text,
	Flex,
} from '@chakra-ui/react';

const AddProductForm = ({
	onAddProduct,
	showForm,
	setShowForm,
	filteredProducts,
	setFilteredProducts,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		image: '',
		price: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name.trim()) {
			alert('Name required before submitting.');
			return;
		}
		if (!formData.description.trim()) {
			alert('Description required before submitting.');
			return;
		}
		if (!formData.image.trim()) {
			alert('Image URL required before submitting.');
			return;
		}
		if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
			alert('Price must be a positive number.');
			return;
		}
		try {
			const response = await fetch('/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			if (!response.ok) {
				throw new Error('Failed to add product');
			}
			const newProduct = await response.json();
			onAddProduct(newProduct);
			if (Array.isArray(filteredProducts)) {
				setFilteredProducts([...filteredProducts, newProduct]);
			}
			setFormData({ name: '', description: '', image: '', price: '' });
		} catch (error) {
			console.error('Error adding product:', error);
		}
	};

	return (
		<Box
			mx="auto"
			w="400px"
			className="addForm"
			backgroundColor={showForm ? 'rgb(47, 47, 46)' : 'transparent'}
		>
			{showForm ? (
				<VStack
					as="form"
					onSubmit={handleSubmit}
					spacing={0}
					align="flex-start"
				>
					<Flex justifyContent="center" width="100%">
						<Text fontSize={'26px'} fontWeight={'bold'} borderBottom={'1px'}>
							Add New Product
						</Text>
					</Flex>
					<FormControl>
						<FormLabel textAlign={'center'}>Name</FormLabel>
						<Input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							size={'sm'}
							focusBorderColor="orange.600"
						/>
					</FormControl>
					<FormControl>
						<FormLabel textAlign={'center'}>Description</FormLabel>
						<Input
							type="text"
							name="description"
							value={formData.description}
							onChange={handleChange}
							size={'sm'}
							focusBorderColor="orange.600"
						/>
					</FormControl>
					<FormControl>
						<FormLabel textAlign={'center'}>Image URL</FormLabel>
						<Input
							type="text"
							name="image"
							value={formData.image}
							onChange={handleChange}
							size={'sm'}
							focusBorderColor="orange.600"
						/>
					</FormControl>
					<FormControl>
						<FormLabel textAlign={'center'}>Price</FormLabel>
						<Input
							type="text"
							name="price"
							value={formData.price}
							onChange={handleChange}
							size={'sm'}
							focusBorderColor="orange.600"
						/>
					</FormControl>
					<Box justifyContent={'center'} display={'flex'} mx="auto">
						<Button
							type="submit"
							margin={'5px'}
							colorScheme="orange"
							border={'1px'}
							width="110px"
						>
							Add Product
						</Button>
						<Button
							margin={'5px'}
							onClick={() => setShowForm(false)}
							colorScheme="orange"
							border={'1px'}
							width="110px"
						>
							Hide Form
						</Button>
					</Box>
				</VStack>
			) : (
				<Flex justifyContent={'center'}>
					<Button
						colorScheme="orange"
						border={'1px'}
						onClick={() => setShowForm(true)}
						size={'lg'}
						fontSize={'22px'}
					>
						Add New Product
					</Button>
				</Flex>
			)}
		</Box>
	);
};

export default AddProductForm;
