import { Box, Text, Flex, Button, Icon } from '@chakra-ui/react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import kog from '../assets/kog.png';
const Home = () => {
	return (
		<Flex p={4} marginTop={'50px'} justifyContent={'center'}>
			<Box flex="1" className="homepage" p={4} my={'auto'} maxWidth="50%">
				<Box>
					<Text>
						Welcome to 'King of the Grill' a general store demo app. The
						frontend was made using React, Chakra, and Formik while the backend
						was made with Python, Flask, and SQLAlchemy. For more information
						about how the site works, feel free to explore the other links, or
						check out the ReadMe.
					</Text>
				</Box>
				<Box marginTop={'15px'}>
					<Flex justifyContent={'center'}>
						<a href="https://www.linkedin.com/in/spencer-eklund">
							<Button
								leftIcon={<Icon as={FaLinkedin} />}
								colorScheme="blue"
								mr={4}
							>
								LinkedIn
							</Button>
						</a>
						<a href="https://github.com/eklspe12">
							<Button leftIcon={<Icon as={FaGithub} />} colorScheme="gray">
								GitHub
							</Button>
						</a>
					</Flex>
				</Box>
			</Box>
			<Box className="logo" display={'flex'} alignItems="center">
				<img
					src={kog}
					alt="logo"
					style={{
						border: '15px solid rgb(255, 140, 50)',
						borderRadius: '15px',
					}}
				/>
			</Box>
		</Flex>
	);
};
export default Home;
