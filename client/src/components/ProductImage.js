import { Box, Image, Text } from '@chakra-ui/react';

const ProductImage = ({ imageUrl }) => {
	return (
		<Box border={'1px'} boxSize={'270px'} mx={'auto'} marginBottom={'10px'}>
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt="Product Image"
					boxSize="270px"
					border="1px"
				/>
			) : (
				<Text fontSize="36px" textAlign={'center'} color="gray.600">
					Hover over product to show image
				</Text>
			)}
		</Box>
	);
};

export default ProductImage;
