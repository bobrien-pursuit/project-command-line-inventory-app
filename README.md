# Soap Inventory App

This is a Command Line Inventory App that helps keep track of inventory in a store that sells soaps. 

## Command Line Arguments

Users can execute the following Commands:

**npm run create** - Takes up to two arguments. The first argument can be a string or undefined. The second argument is the price of the soap in cents. This creates a soap with the name as the first argument and the price as the second argument and stores it in the soaps database. Create assigns an id to each soap.

**Example:** npm run create \<string> \<price in cents>

**npm run index** - index prints a list of the soaps database.

**npm run show** - show takes an ID as the only arguments and prints the details of the item in the database.

**Example:** npm run show \<ID>

**npm run destroy** - destroy takes an ID as an argument and removes that soap from the database.

**Example:** npm run destroy \<ID>

**npm run update** - update takes a valid ID as the first argument along with a on string and a price for the second and third arguments, respectively. This updates the corresponding soap's name and price in the database.

**Example:** npm run update \<ID> \<name> \<price in cents>

**npm run updateCart** - updateCart takes an ID as an argument and removes the soap item from the database and adds it to the cart database. 

**Example:** npm run updateCart \<ID> \<name> \<price in cents>

**npm run removeFromCart** - removeFromCart takes a valid ID and removes that soap item from the cart database and adds it back into the soaps database.

**Example:** npm run removeFromCart \<ID>

**npm run emptyCart** - emptyCart will remove all of the soap items from the cart database and add them to the soaps database.

**Example:** npm run emptyCart

**npm run cartTotal** - cartTotal will print the total price of all of the soap items in your Cart. 

**Example:** npm run cartTotal

**npm run indexCart** - this prints all items in your Cart.

**Example:** npm run indexCart
