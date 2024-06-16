# Soap Inventory App

This is a Command Line Inventory App that helps keep track of inventory in a store that sells soaps. 

## Starting Soap Inventory App

The Soap Inventory App starts with the following command: 'npm start'. The user will then be prompted until the user types quit to end the program. 

## Command Line

Users can execute the following Commands:

**create** - Create assigns an id to each soap and adds it to the inventory. You will be prompted for the name and price of soap in cents.

**index** - index prints a list of the current inventory.

**show** - show takes an ID prints the details of the item in the database.

**destroy** - destroy takes an ID and removes that soap from the database.

**update** - update takes a valid ID and asks for the new name and price of your soap.

**updateCart** - updateCart adds a soap by ID to your Cart and removes that soap from the Current Inventory.

**removeFromCart** - removeFromCart removes the soap by ID from your Cart and adds it back to the Current Inventory.

**emptyCart** - emptyCart will remove all of the soap items from the Cart and add them back to your Current Inventory.

**cartTotal** - cartTotal will print the total price of all of the soap items in your Cart. 

**indexCart** - this prints all items in your Cart.

**quit** - ends the program.
