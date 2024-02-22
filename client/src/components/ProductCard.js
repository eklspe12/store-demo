import { useState } from 'react';
import {
	Button,
	Input,
	FormControl,
	FormLabel,
	Box,
	Text,
} from '@chakra-ui/react';
import * as Yup from 'yup';

const ProductCard = ({ product, onDelete, updateProduct }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [formData, setFormData] = useState({
		name: product.name,
		image: product.image,
		description: product.description,
		price: product.price,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		image: Yup.string().required('Image URL is required'),
		price: Yup.number()
			.typeError('Price must be a number')
			.required('Price is required')
			.positive('Price must be a positive number'),
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		validationSchema
			.validate(formData, { abortEarly: false })
			.then(() => {
				fetch(`/products/${product.id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				})
					.then((response) => {
						if (response.status === 202) {
							return response.json();
						} else {
							throw new Error('Error updating product');
						}
					})
					.then((updatedProduct) => {
						updateProduct(updatedProduct);
						setIsFlipped(false);
					})
					.catch((error) => {
						console.error('Network error:', error);
					});
			})
			.catch((error) => {
				alert(error.errors.join('\n'));
			});
	};

	const deleteProduct = () => {
		fetch(`/products/${product.id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.status === 204) {
					onDelete(product);
				} else {
					console.error('Error deleting product');
				}
			})
			.catch((error) => {
				console.error('Network error:', error);
			});
	};

	return (
		<Box
			className={isFlipped ? 'cardback' : 'productCard'}
			mx="auto"
			display="flex"
			flexDirection="column"
			height="500px"
			width="250px"
		>
			{isFlipped ? (
				<form onSubmit={handleSubmit} className="productCard editForm">
					<Text as="h3" className="editTitle">
						Edit Product
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
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Input
							type="text"
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>
					</FormControl>
					<Button className="saveBtn" type="submit">
						Save 💾
					</Button>
					<Button className="viewBtn" onClick={() => setIsFlipped(!isFlipped)}>
						View Product 🔍
					</Button>
				</form>
			) : (
				<Box
					className="productCard"
					display="flex"
					flexDirection="column"
					justifyContent="space-between"
					height="100%"
				>
					<Text as="h2" fontSize={'24px'} fontWeight={'bold'}>
						{product.name}
					</Text>
					<Text as="h3" textAlign={'center'}>
						<img
							src={product.image}
							alt={product.name}
							style={{ width: '180px', height: '200px', margin: 'auto' }}
						/>
					</Text>
					<Text as="h3" fontSize={'22px'} color={'black'}>
						${product.price}
					</Text>
					<Text as="h4">{product.description}</Text>

					<Box mt="auto" margin={'auto'}>
						<Button
							className="editBtn"
							onClick={handleClick}
							w="80px"
							marginLeft={'4px'}
							marginRight={'4px'}
						>
							Edit ✏️
						</Button>
						<Button
							className="deleteBtn"
							onClick={deleteProduct}
							w="80px"
							marginLeft={'4px'}
							marginRight={'4px'}
						>
							Delete 🗑️
						</Button>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ProductCard;
