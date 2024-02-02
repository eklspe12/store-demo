import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from './Navbar';

function App() {
	return (
		<div>
			<ChakraProvider>
				<NavBar />
			</ChakraProvider>
		</div>
	);
}

export default App;
