const { nanoid } = require("nanoid");
const { fs } = require("node:fs");
const { readJSONFile } = require("../src/helpers");
const soaps = readJSONFile("data", "soaps.json");
const cart = readJSONFile("data", "cart.json");
const chalk = require("chalk");


const inform = console.log;


function create (soaps, name, priceInCents) {
  
 const soap =  {
        name: process.argv[3],
        id: nanoid(5),
        priceInCents: priceInCents || 500,
    };

    soaps.push(soap);
    return soaps;
}

function index(soaps) {
    inform(chalk.blue(`-- Current Inventory --`));
    return soaps ? soaps.map((soap) => `${soap.id} ${soap.name} $${Number.parseFloat(soap.priceInCents/100).toFixed(2)}`).join('\n') : null;
}

function show(soaps, soapId) {
    
    const soap = soaps.find((soap) => soap.id === soapId);
    
    return soap ? `${soap.id} ${soap.name} Unit Price: $${Number.parseFloat(soap.priceInCents/100).toFixed(2)}` : `Soap ID not in database.`;
    
    }

function destroy (soaps, soapId) {
    const indexOfSoap = soaps.findIndex((soap) => soap.id === soapId);
    if (indexOfSoap > -1) {
        soaps.splice(indexOfSoap, 1);
        inform(chalk.white("Soap removed:\n"));
        inform(index(soaps));
        return soaps;
    } else {
        inform(chalk.red("Soap does not exist\n"));
        inform(index(soaps));
        return soaps;
    }

}

function update(soaps, id, name, priceInCents) {
    if (!name && !priceInCents && !id && typeof priceInCents !== 'number'){
        inform(chalk.white(`Command line argument must take the following format \"npm run update <id> <string> <price in cents>\"`));
        return;
    }
    else {
    const indexOfSoap = soaps.findIndex((soap) => soap.id === process.argv[3]);

    if (indexOfSoap > -1) {
    soaps[indexOfSoap] = { id, name, priceInCents };
    inform(chalk.white("Soap updated successfully:\n"));
    inform(chalk.blue(index(soaps)));
    return soaps;
    } else {
    inform(chalk.red("Soap doesn't exist in database:\n"));
    inform(chalk.blue(index(soaps)));
    return soaps;
    }
}
}

function indexCart(cart) {

    inform(chalk.green(`-- Current Cart --`));
    return cart ? cart.map((soap) => `${soap.id} ${soap.name} $${Number.parseFloat(soap.priceInCents/100).toFixed(2)}`).join('\n') : null;
}

function updateCart (cart, soaps, soapId) {

    const soapBar = soaps.find((soap) =>
        soap.id === soapId
    );

if (soapBar)
    {
     cart.push(soapBar);
     inform(chalk.white(`Item ${soapBar.name} with ID ${soapBar.id} has been added to your cart(${cart.length}).\n`));
     inform(chalk.green(index(cart)));

     const indexOfSoap = soaps.findIndex((soap) => soap.id === soapId);

      if (indexOfSoap > -1) 
          soaps.splice(indexOfSoap, 1);

     return cart;
    }
else
return inform(chalk.red(`Soap does not exist in database.`));
   
}

function removeFromCart (cart, soaps, soapId) {

    const indexOfCart = cart.findIndex((soap) => soap.id === soapId);
    if (indexOfCart > -1 && cart.length !== 0) {
        soaps.push(cart[indexOfCart]);
        cart.splice(indexOfCart, 1);
        inform(chalk.white(`Soap removed from cart(${cart.length})`));
        inform(chalk.green(indexCart(cart)));
        return cart;
    } else {
        inform(chalk.red(`This ID does not match item in Cart.`));
        inform(chalk.green(indexCart(cart)));
        return cart;
    }

}

function emptyCart (cart, soaps) {
    while (cart.length > 0) {

        let temp = cart.pop();

        soaps.push(temp);
    }
    inform (chalk.white(`Cart is empty.`));
    return cart;
}

module.exports = {
    create,
    index,
    show,
    destroy,
    update,
    updateCart,
    removeFromCart,
    emptyCart,
    indexCart,
}