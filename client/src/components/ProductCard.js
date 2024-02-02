import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
			// w="20vw"
			display="flex"
			flexDirection="column"
			height="600px" // Adjust this property
			width="300px" // Adjust this property
			flex="1 1 0"
		>
			{isFlipped ? (
				<Formik
					initialValues={product}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						fetch(`/products/${product.id}`, {
							method: 'PATCH',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(values),
						})
							.then((r) => {
								if (r.status === 202) {
									return r.json().then((p) => {
										updateProduct(p);
										setIsFlipped(!isFlipped);
									});
								}
							})
							.catch((error) => {
								console.error('Network error:', error);
							})
							.finally(() => {
								setSubmitting(false);
							});
					}}
				>
					{({ errors, touched }) => (
						<Form className="productCard editForm">
							<Text as="h3">Edit Product</Text>
							<FormControl>
								<FormLabel>Name</FormLabel>
								<Input type="text" name="name" />
								<ErrorMessage name="name" component="div" className="error" />
							</FormControl>
							<FormControl>
								<FormLabel>Image URL</FormLabel>
								<Input type="text" name="image" />
								<ErrorMessage name="image" component="div" className="error" />
							</FormControl>
							<FormControl>
								<FormLabel>Description</FormLabel>
								<Input type="text" name="description" />
								<ErrorMessage
									name="description"
									component="div"
									className="error"
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Price</FormLabel>
								<Input type="text" name="price" />
								<ErrorMessage name="price" component="div" className="error" />
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
				<Box className="productCard">
					<Text as="h2">{product.name}</Text>
					<Text as="h3">
						<img src={product.image} alt={product.name} />
					</Text>
					<Text as="h4">{product.description}</Text>
					<Text as="h3">${product.price}</Text>
					<Box
						mt="auto"
						display="flex"
						justifyContent={'space-between'}
						alignItems={'flex-end'}
					>
						<Button className="editBtn" onClick={handleClick} w="8vw">
							Edit
						</Button>
						<Button className="deleteBtn" onClick={deleteProduct} w="8vw">
							Delete.
						</Button>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ProductCard;
