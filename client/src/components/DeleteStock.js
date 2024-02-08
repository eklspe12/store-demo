import { useState, useRef } from 'react';
import {
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/react';

const DeleteStock = ({ stockId, onDelete }) => {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();

	const handleDelete = async () => {
		try {
			const response = await fetch(`/stocks/${stockId}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Failed to delete stock');
			}
			onDelete(stockId);
		} catch (error) {
			console.error('Error deleting stock:', error);
		}
	};

	return (
		<>
			<Button colorScheme="red" onClick={() => setIsOpen(true)}>
				Delete
			</Button>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Stock
						</AlertDialogHeader>
						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="red" onClick={handleDelete} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default DeleteStock;
