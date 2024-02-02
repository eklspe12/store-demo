import { Box, Text, Link } from '@chakra-ui/react';
const Home = () => {
	return (
		<Box className="homepage" p={4}>
			<Box className="homeInfo">
				<Text>
					Welcome to 'King of the Grill' a general store demo app. The frontend
					was made from scratch with the use of React and Formik, while the
					backend was made with a combination of python and flask. For more
					information about how the site works, feel free to explore the other
					links, or checkout the Readme.
				</Text>
			</Box>
			<Box className="contactInfo">
				<Text className="name">Spencer Eklund</Text>
				<Text>
					<Link
						href="https://www.linkedin.com/in/spencer-eklund/"
						className="linkedin"
					>
						LinkedIn
					</Link>
				</Text>
				<Text>
					<Link href="https://github.com/eklspe12" className="github">
						Github
					</Link>
				</Text>
			</Box>
		</Box>
	);
};
export default Home;
