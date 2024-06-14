const { readJSONFile, writeJSONFile } = require("./src/helpers.js");
const { create, index, show, destroy, update, updateCart, removeFromCart, emptyCart, indexCart} = require("./src/soapController.js");

const inform = console.log;

function run() {
    let writeToFile = false;
    let writeToCart = false;
    let updatedSoaps = [];
    let updatedCart = [];
    let soaps = readJSONFile("./data", "soaps.json");
    let cart = readJSONFile("./data", "cart.json");

    const action = process.argv[2];

    switch (action) {
        case "index":
            inform(index(soaps));
            break;
        case "create":
            updatedSoaps = create(soaps, process.argv[3], process.argv[4]);
            writeToFile = true;
            break;
        case "show":
            const soapById = show(soaps, process.argv[3]);
            inform(soapById);
            break;
        case "destroy":
            updatedSoaps = destroy(soaps, process.argv[3]);
            writeToFile = true;
            break;
        case "update":
            updatedSoaps = update(soaps, process.argv[3], process.argv[4], process.argv[5]);
            writeToFile = true;
            break;
        case "indexCart":
            inform(indexCart(cart));
            break;
        case "cartTotal":
            const cartTotal = cart.reduce((acc, curr) => acc + curr.price, 0);
            inform(`Your Cart total is: $${Number.parseFloat(cartTotal/100).toFixed(2)}`);
            break;
        case "updateCart":
            updatedCart = updateCart(cart, soaps, process.argv[3]);
            writeToCart = true;
            updatedSoaps = soaps;
            writeToFile = true;
            break;
        case "removeFromCart": 
            updatedCart = removeFromCart(cart, soaps, process.argv[3]);
            writeToCart = true;
            updatedSoaps = soaps;
            writeToFile = true;
            break;
        case "emptyCart":
            updatedCart = emptyCart(cart, soaps);
            writeToCart = true;
            updatedSoaps = soaps;
            writeToFile = true;
            break;
        default:
            inform("Hm... I'm not familiar with that one, try again.");
        
    }

    if (writeToFile && updatedSoaps) {
        writeJSONFile("./data", "soaps.json", updatedSoaps);
    }

    if (writeToCart && updatedCart) {
        writeJSONFile("./data", "cart.json", updatedCart);
    }
}

run ();