import { Box, Image, Text } from '@chakra-ui/react';

const ProductImage = ({ imageUrl, isVisible }) => {
	return (
		<Box border={'1px'} boxSize={'200px'} mx={'auto'} marginBottom={'10px'}>
			{isVisible ? (
				<Image src={imageUrl} alt="Product Image" boxSize="190px" />
			) : (
				<Text fontSize="36px" textAlign={'center'} color="gray.600">
					Hover over product to show image
				</Text>
			)}
		</Box>
	);
};

export default ProductImage;
