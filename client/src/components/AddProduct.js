import React, { useState } from 'react';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Box,
	Text,
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
		<Box mx="auto" w="40%">
			{showForm ? (
				<VStack
					as="form"
					onSubmit={handleSubmit}
					spacing={4}
					align="flex-start"
				>
					<Text fontSize={'34px'} fontWeight={'bold'} textAlign={'center'}>
						Add New Product
					</Text>
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Input
							type="text"
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Image URL</FormLabel>
						<Input
							type="text"
							name="image"
							value={formData.image}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Price</FormLabel>
						<Input
							type="text"
							name="price"
							value={formData.price}
							onChange={handleChange}
						/>
					</FormControl>
					<Button type="submit">Add Product</Button>
					<Button onClick={() => setShowForm(false)}>Hide Form</Button>
				</VStack>
			) : (
				<Button onClick={() => setShowForm(true)}>Add New Product</Button>
			)}
		</Box>
	);
};

export default AddProductForm;
