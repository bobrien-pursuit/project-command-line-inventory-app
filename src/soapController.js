const { nanoid } = require("nanoid");
const { fs } = require("node:fs");
const { soaps } = require("../data/cart.json");
const { cart } = require("../data/soaps.json");

function create (soaps, soapName, priceInCents) {
    const soap = {
        name: soapName,
        id: nanoid(5),
        price: priceInCents;
    };

    soaps.push(soap);
    return soaps;
}

function index(soaps) {
    return soaps.map((soap) => `${soap.id} ${soap.name} $${soap.price/100}`).join
}

function show(soaps. soapId) {
    const soap - soaps.find((soap) => soap.id === soapId);
    return `${soap.id} ${soap.name} unit price:${soap.price}`;
}

const inform = console.log;

function destroy (soaps, soapId) {
    const indexOfSoap = soaps.findIndex((soap) => soap.id === soapId);
    if (indexOfSoap > -1) {
        soaps.splice(indexOfSoap, 1);
        inform("Soap removed");
        return soaps;
    } else {
        inform("Soap does not exist");
        return soaps;
    }

}

function update(soaps, soapId, updatedSoap) {
    const indexOfSoap = soaps.findIndex((soap) => soap.id === soapId);
    if (indexOfSoap > -1) {
    soaps[indexOfSoap].id = soapId;
    soaps[indexOfSoap].name = updatedSoap;
    soaps[indexOfSoap].price = soaps[updatedSoap].price;
    inform("Soap updated successfully");
    return soaps;
} else {
    inform("Soap doesn't exist in database.");
    return soaps;
    }
}

function updateCart (soaps, soapId) {
    const soap = soaps.find((soap) => soap.id === soapId);
    cart.push(soap);
    inform(`Item ${soap.name} with ID ${soap.id} has been added to your cart(${cart.length}).`)
    return cart;
}

function removeFromCart (cart, soapId) {
    const indexOfCart = cart.findIndex((soap) => soap.id === soapId);
    if (indexOfCart > -1 && cart.length !== 0) {
        cart.splice(indexOfSoap, 1);
        inform(`Soap removed removed from cart(${cart.length}`);
        return cart;
    } else {
        inform("This soap is not in your cart.");
        return cart;
    }

}
module.exports = {
    create,
    index,
    show,
    destroy,
    update,
    updateCart,
    removeFromCart,
}