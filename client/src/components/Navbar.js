import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Store from './Store';
import Home from './Home';
import LocationFinder from './LocationFinder';

const NavBar = () => {
	return (
		<div>
			<Tabs>
				<TabList>
					<Tab>Home</Tab>
					<Tab>Manage Inventory</Tab>
					<Tab>View/Modify Products</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Home />
					</TabPanel>
					<TabPanel>
						<LocationFinder />
					</TabPanel>
					<TabPanel>
						<Store />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default NavBar;
