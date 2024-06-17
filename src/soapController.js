const { nanoid } = require("nanoid");
const { fs } = require("node:fs");
const { readJSONFile } = require("../src/helpers");
const soaps = readJSONFile("data", "soaps.json");
const cart = readJSONFile("data", "cart.json");
const chalk = require("chalk");



const inform = console.log;


function create (soaps, name, priceInCents) {
  
 const soap =  {
        name: name,
        id: nanoid(5),
        priceInCents: priceInCents || 500,
    };

    soaps.push(soap);
    inform(chalk.white(`\nSoap has been created\n`));
    inform(chalk.blue(index(soaps))+`\n`);
    return soaps || [""];
}

function index(soaps) {
    inform(chalk.blue(`\n-- Current Inventory --`));
    return soaps ? soaps.map((soap) => `${soap.id} ${soap.name} $${Number.parseFloat(soap.priceInCents/100).toFixed(2)}`).join('\n') + `\n`: [""];
}

function show(soaps, id) {
    
    const soap = soaps.find((soap) => soap.id === id);
    
    return soap ? `\n${soap.id} ${soap.name} Unit Price: $${Number.parseFloat(soap.priceInCents/100).toFixed(2)}\n` : `\nSoap ID not in database.`;
    
    }

function destroy (soaps, id) {
    const indexOfSoap = soaps.findIndex((soap) => soap.id === id);
    if (indexOfSoap > -1) {
        soaps.splice(indexOfSoap, 1);
        inform(chalk.white("\nSoap removed:\n"));
        inform(chalk.blue(index(soaps) + `\n`));
        return soaps || [""];
    } else {
        inform(chalk.red("\nSoap does not exist\n"));
        inform(index(soaps));
        return soaps || [""];
    }

}

function update(soaps, id, name, priceInCents) {
    if (!name && !priceInCents && !id && typeof priceInCents !== 'number'){
        return;
    }
    else {
    const indexOfSoap = soaps.findIndex((soap) => soap.id === id);

    if (indexOfSoap > -1) {
    soaps[indexOfSoap] = { id, name, priceInCents };
    inform(chalk.white("\nSoap updated successfully:\n"));
    inform(chalk.blue(index(soaps)));
    return soaps || [""];
    } else {
    inform(chalk.red("\nSoap doesn't exist in database:\n"));
    inform(chalk.blue(`\n` + index(soaps)));
    return soaps [""];
    }
}
}

function indexCart(cart) {

  //  if (cart.length > 0)
        inform(chalk.green(`\n-- Current Cart\n`));
        return cart ? cart.map((soap) => { inform(chalk.green(`${soap.id} ${soap.name} $${Number.parseFloat(soap.priceInCents/100).toFixed(2)}`))}).join(`\n`) : inform(chalk.red(`\nCart is Empty.\n`));
}

function updateCart (cart, soaps, id) {

    if (soaps.find((soap) => soap.id !== undefined))
        {

    const soapBar = soaps.find((soap) => soap.id === id );

     cart.push(soapBar);
     inform(chalk.white(`\nItem ${soapBar.name} with ID ${soapBar.id} has been added to your cart(${cart.length}).\n`));
     inform(chalk.green(indexCart(cart)));

     const indexOfSoap = soaps.findIndex((soap) => soap.id === id );

      if (indexOfSoap > -1) 
          soaps.splice(indexOfSoap, 1);

     return cart;
    }
else
return inform(chalk.red(`\nSoap does not exist in database.`));
   
}

function removeFromCart (cart, soaps, id) {

    const indexOfCart = cart.findIndex((soap) => soap.id === id);

    if (indexOfCart > -1) {
        soaps.push(cart[indexOfCart]);
        cart.splice(indexOfCart, 1);
        inform(chalk.white(`\nSoap removed from cart(${cart.length})`));
        inform(chalk.green(indexCart(cart)));
        return cart, soaps;
    } else {
        inform(chalk.red(`\nThis ID does not match item in Cart.`));
        inform(chalk.green(indexCart(cart)));
        return cart, soaps; 
    }

}

function emptyCart (cart, soaps) {
    let temp = {};
    while (cart.length > 0) {
        temp = cart.pop();
        soaps.push(temp);
    }
    inform (chalk.white(`\nCart is empty\n`));
    return;
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