const { nanoid } = require("nanoid");
const { fs } = require("node:fs");
const { readJSONFile } = require("../src/helpers");
soaps = readJSONFile("data", "soaps.json");
cart = readJSONFile("data", "cart.json");

const inform = console.log;

function create (soaps, name, priceInCents) {
  
 const soap =  {
        name: process.argv[3],
        id: nanoid(5),
        priceInCents: priceInCents || 300,
        inStock: true,
    };

    soaps.push(soap);
    return soaps;
}

function index(soaps) {

    inform(`-- Current Inventory --`)
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
        inform("Soap removed:\n");
        inform(index(soaps));
        return soaps;
    } else {
        inform("Soap does not exist\n");
        inform(index(soaps));
        return soaps;
    }

}

function update(soaps, id, name, priceInCents) {
    if (!name || !priceInCents || !id || typeof priceInCents !== 'number'){
        inform(`Command line argument must take the following format \"npm run update <id> <string> <price in cents>\"`)
        return;
    }
    const indexOfSoap = soaps.findIndex((soap) => soap.id === process.argv[3]);

    if (indexOfSoap > -1) {
    soaps[indexOfSoap] = { id, name, priceInCents };
    inform("Soap updated successfully:\n");
    inform(index(soaps));
    return soaps;
} else {
    inform("Soap doesn't exist in database:\n");
    inform(index(soaps));
    return soaps;
    }
}

function indexCart(cart) {

    inform(`-- Current Cart --`);
    return cart ? cart.map((soap) => `${soap.id} ${soap.name} $${Number.parseFloat(soap.priceInCents/100).toFixed(2)}`).join('\n') : null;
}

function updateCart (cart, soaps, soapId) {

    const soapBar = soaps.find((soap) =>
        soap.id === soapId
    );

if (soapBar)
    {
     cart.push(soapBar);
     inform(`Item ${soapBar.name} with ID ${soapBar.id} has been added to your cart(${cart.length}).\n`);
     inform(index(cart));

     const indexOfSoap = soaps.findIndex((soap) => soap.id === soapId);

      if (indexOfSoap > -1) 
          soaps.splice(indexOfSoap, 1);

     return cart;
    }
else
return inform(`Soap does not exist in database.`);
   
}

function removeFromCart (cart, soaps, soapId) {

    const indexOfCart = cart.findIndex((soap) => soap.id === soapId);
    if (indexOfCart > -1 && cart.length !== 0) {
        soaps.push(cart[indexOfCart]);
        cart.splice(indexOfCart, 1);
        inform(`Soap removed from cart(${cart.length})`);
        inform(indexCart(cart));
        return cart;
    } else {
        inform(`This ID does not match item in Cart.`)
        inform(indexCart(cart));
        return cart;
    }

}

function emptyCart (cart, soaps) {
    while (cart.length > 0) {

        let temp = cart.pop();

        soaps.push(temp);
    }
    inform (`Cart is empty.`);
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