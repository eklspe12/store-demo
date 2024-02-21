# King of the Grill - General Store Demo

---

## Author

### Spencer Eklund

- Linkedin https://www.linkedin.com/in/spencer-eklund/
- Github https://github.com/eklspe12

---

## Introduction

This app is a demo designed to showcase several skills and concepts relevant to maintaining inventory online. The 'Manage Inventory' tab allows users to update inventory of individual products and locations, while 'View/Modify Products' allows users to add new products and modify existing ones. The front-end is made with React, Chakra, and Formik while the back-end is made with Python, Flask, and SQL. Continue reading for an explanation of each page, followed by a detailed explanation of each file.

---

## Getting Started

Before you start this application you will need to install a few things. Navigate to the root folder and run "npm install" and "pipenv install". When these have finished downloading, you can start the frontend by navigating to the client folder and running "npm start". To start the backend, open a new tab in your terminal and run "pipenv shell", followed by "python seed.py", and finally "python app.py".

---

# Pages

## Nav Bar

On the top of each page is the NavBar created with Chakra UI. The tabs present allow users to switch which page they view.

## Homepage

This page is where users would include background and contact information about their company.

## Manage Inventory

This is where store owners would keep track of inventory for each location. Once this page users can add new inventory to specific stores, update the quantity of a product at a given store, and delete a product from a store entirely. Users can also search for specific products or locations with the searchbar.

## View/Modify Products

Here users can view and modify information about available products. All products are viewable on loading, to view specific items you can use the searchbar to look for specific names. Each product card displays a price, description, and image for a product. If users would like to edit products they can click the edit product button, which flips the product card to an update form that will save information on submit. To add a new product use the associated form. To delete a product, click the 'Delete' button.

---

# Files

## Client

### AddProduct.js

Contains form for adding new products using Chakra UI components. Form input is validated with formik and alerts are sent to the user to ensure all fields have content of correct type. An alert is displayed to the user if an input field is blank or contains the wrong data type. When the 'Add Product" button is clicked and all validations pass, a POST request is sent to add the new location to the backend database. The new product is automatically rendered for the user.

### AddStock.js

Contains form for adding new inventory using Chakra UI components. All form input fields utilize formik and alerts for validation. An alert is shown to the user if an input field is blank or the wrong data type. The handleLocation/Quantity/Product change functions update values using Reacts useState. When the "Add Product" button is clicked and all validations pass, a POST request is sent to add the new products values to the backend database. The new stock instance is automatically rendered for the user.

### App.js

Contains NavBar component and wraps it in ChakraProvider component from Chakra UI to allow a seamless transition between pages.

### DeleteStock.js

Receives stockId from parent component. On click, sends an alert to the user to confirm they would like to delete the stock instance before sending a delete patch to the server. Stock table is automatically updated to remove deleted stock.

### Home.js

Component that holds information for the homepage such as business details, contact information, and brand logo.

### Manage Inventory

Parent component that contains several functions to be passed down as props. fetchAllStocks fetches all stock instances from the back end then updates the allStocks and searchResults variables using React useState. fetchProductsAndLocations performs a similar function to fetchAllStocks except that as the name implies, this function receives and sets states relevant to product and location instances. handleSearch will be passed down to the StockSearch component where it is given the input from the searchbar as a prop before checking to see if the name of any products or locations match the searched term (more info under StockSearch.js). handleFilter updates the filterOption variable using useState and is passed to the StockFilter component. handleAddStock receives a newStock and adds it to the appropriate variables using React useState. The ManageIventory component also contains the StockList component.

### NavBar.js

Uses Chakra UI Tab components to create a clean and efficient navigation bar on the top of the page.

### ProductCard.js

Receives individual products as well as functions to assist with deleting and updating products. One side of product card displays product name, description, image, price, a button for removing the product, and a button for editing the product. If the user clicks the "Remove from catalog" button then delete patch is sent to remove it from the database, then the products state is updated on the front end to remove the product for the user as well. The edit product button changes the class of the card which changes the display to a form that is controlled with formik. Whatever the user enters in the form will be be sent to the backend as a PATCH request when the user clicks save. The save button also automatically changes the card to show updated values.

### ProductList.js

Receives products state variable then maps each product to create individual product cards. Also receives functions for assisting with deleting and updating products to be passed to individual ProductCard components.

### StockFilter

Component contains dropdown menu with Chakra UI Select components to choose how stock instances should be organized. Once an option is selected, the table is updated automatically.

### StockList

Displays stock instances as a table created with Chakra UI. A React useEffect hook is used to render the stock items in the order determined by the sortResults, which decides the order based on the option selected with the StockFilter component. handleDeleteStock removes a stock instance from the array and rerenders the table without the deleted stock. handleQuantityChange ensures the user selected a valid number before updating the quantity for a stock instance on the front and back end.

### StockSearch.js

Retrieves onSearch function from parent component and updates searchTerm state based on user input. User input is then sent to the onSearch function on each change, which causes the stock list to rerender.

### Store.js

Highest level component for the 'View/Modify Products' page. This file contains functions for adding, deleting, updating, and filtering products. Also passes props from App.js down to AddProduct and ProductList components. Formik is used to control input of search bar.

### Index.js

Imports BrowerRouter and wraps App component with it to allow the use of the NavBar to move between pages.

---

## Server

### app.db

Database that stores information for each instance of stocks, products, and locations. Can be viewed with SQLite.

### app.py

Holds functions necessary to create backend routes as well as the routes themselves.

### config.py

Holds imports for Flask and SQL to be used on the back-end. Also instantiates database and API.

### models.py

Holds relationships and validations for each model and determines attributes for each model.

### seed.py

This file contains functions that utilize Faker to generate instances products, locations, and inventory then uses separate functions to save these instances to the database on app.py.
