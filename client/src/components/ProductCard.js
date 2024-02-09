import { useState } from 'react';
import { Formik, Form } from 'formik';
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
			.required('Price is required'),
	});

	const handleSubmit = (values, { setSubmitting }) => {
		fetch(`/products/${product.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
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
			})
			.finally(() => {
				if (typeof setSubmitting === 'function') {
					setSubmitting(false);
				}
			});
	};

	const deleteProduct = () => {
		fetch(`/products/${product.id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.status === 204) {
					console.log('Product deleted successfully');
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
			height="450px"
			width="250px"
		>
			{isFlipped ? (
				<Formik
					initialValues={{
						name: product ? product.name : '',
						image: product ? product.image : '',
						description: product ? product.description : '',
						price: product ? product.price : '',
					}}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						handleSubmit(formData, setSubmitting);
					}}
				>
					{({ errors, touched }) => (
						<Form className="productCard editForm">
							<Text as="h3">Edit Product</Text>
							<FormControl>
								<FormLabel>Name</FormLabel>
								<Input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
								/>
								{errors.name && touched.name && (
									<div className="error">{errors.name}</div>
								)}
							</FormControl>
							<FormControl>
								<FormLabel>Image URL</FormLabel>
								<Input
									type="text"
									name="image"
									value={formData.image}
									onChange={handleChange}
								/>
								{errors.image && touched.image && (
									<div className="error">{errors.image}</div>
								)}
							</FormControl>
							<FormControl>
								<FormLabel>Price</FormLabel>
								<Input
									type="text"
									name="price"
									value={formData.price}
									onChange={handleChange}
								/>
								{errors.price && touched.price && (
									<div className="error">{errors.price}</div>
								)}
							</FormControl>
							<FormControl>
								<FormLabel>Description</FormLabel>
								<Input
									type="text"
									name="description"
									value={formData.description}
									onChange={handleChange}
								/>
								{errors.description && touched.description && (
									<div className="error">{errors.description}</div>
								)}
							</FormControl>
							<Button className="saveBtn" type="submit">
								Save
							</Button>
							<Button
								className="viewBtn"
								onClick={() => setIsFlipped(!isFlipped)}
							>
								View Product
							</Button>
						</Form>
					)}
				</Formik>
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
							Edit
						</Button>
						<Button
							className="deleteBtn"
							onClick={deleteProduct}
							w="80px"
							marginLeft={'4px'}
							marginRight={'4px'}
						>
							Delete.
						</Button>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ProductCard;
