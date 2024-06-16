const { readJSONFile, writeJSONFile } = require("./src/helpers.js");
const { create, index, show, destroy, update, updateCart, removeFromCart, emptyCart, indexCart} = require("./src/soapController.js");
const chalk = require("chalk");
var figlet = require("figlet");

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const inform = console.log;

// function run() { 
    
//     let writeToFile = false;
//     let writeToCart = false;
//     let updatedSoaps = [];
//     let updatedCart = [];
//     let soaps = readJSONFile("./data", "soaps.json");
//     let cart = readJSONFile("./data", "cart.json");
    
//     const action = process.argv[2];

//     switch (action) {
//         case "index":
//             inform(chalk.blue(index(soaps) + '\n'));
//             break;
//         case "create":
//             updatedSoaps = create(soaps, process.argv[3], process.argv[4]);
//             writeToFile = true;
//             break;
//         case "show":
//             const soapById = show(soaps, process.argv[3]);
//             inform(soapById);
//             break;
//         case "destroy":
//             updatedSoaps = destroy(soaps, process.argv[3]);
//             writeToFile = true;
//             break;
//         case "update":
//             updatedSoaps = update(soaps, process.argv[3], process.argv[4], process.argv[5]);
//             writeToFile = true;
//             break;
//         case "indexCart":
//             inform(chalk.green(indexCart(cart)));
//             break;
//         case "cartTotal":
//             const cartTotal = cart.reduce((acc, curr) => acc + curr.price, 0);
//             inform(chalk.white(`Your Cart total is: $${Number.parseFloat(cartTotal/100).toFixed(2)}`));
//             break;
//         case "updateCart":
//             updatedCart = updateCart(cart, soaps, process.argv[3]);
//             writeToCart = true;
//             updatedSoaps = soaps;
//             writeToFile = true;
//             break;
//         case "removeFromCart": 
//             updatedCart = removeFromCart(cart, soaps, process.argv[3]);
//             writeToCart = true;
//             updatedSoaps = soaps;
//             writeToFile = true;
//             break;
//         case "emptyCart":
//             updatedCart = emptyCart(cart, soaps);
//             writeToCart = true;
//             updatedSoaps = soaps;
//             writeToFile = true;
//             break;
//         default:
//             inform(chalk.white("Hm... I'm not familiar with that one, try again."));
//         } // end switch

//         if (writeToFile && updatedSoaps) {
//             writeJSONFile("./data", "soaps.json", updatedSoaps);
//         }
    
//         if (writeToCart && updatedCart) {
//             writeJSONFile("./data", "cart.json", updatedCart);
//         }
//     } // end run();


const rl = readline.createInterface({ input, output });

function run() {

    let writeToCart = false;
    let updatedSoaps = [];
    let updatedCart = [];
    let soaps = readJSONFile("./data", "soaps.json");
    let cart = readJSONFile("./data", "cart.json");
    
      rl.question(`What would you like to do?: `, (action) => {
                    if (action == 'index'){
                        inform(chalk.blue(index(soaps) + '\n'));
                        run();
                    }
                 else if (action == `create`){
                    rl.question (`What would you like to name your soap? `, (name) => {
                        rl.question (`How much should it cose (in cents)? `, (priceInCents) => {
                            updatedSoaps = create(soaps, name, priceInCents);
                            writeJSONFile("./data", "soaps.json", updatedSoaps);
                            run();
                        }); // end price
                    }); // end name
               } else if (action == `show`){
                    rl.question (`What is the ID of the soap you would like to see? `, (id) => {
                        const soapById = show(soaps, id);
                        inform(soapById);
                        run();
                    });
               } else if (action == `destroy`){
                    rl.question(`Enter Soap ID to remove from database? `, (id) => {
                        updatedSoaps = destroy(soaps, id);
                        writeJSONFile("./data", "soaps.json", updatedSoaps);
                        run();
                    });
                }
                 else if (action == `update`){
                    rl.question(`Enter ID of the soap you would like to update? `, (id) => {
                        rl.question(`What would you like to call your new soap? `, (name) => {
                            rl.question(`What will be the price of the soap (in cents)? `, (priceInCents) => {
                                updatedSoaps = update(soaps, id, name, priceInCents);
                                writeJSONFile("./data", "soaps.json", updatedSoaps);
                                run();
                            });
                        });
                    });
                }
                else if (action == `indexCart`){
                    inform(chalk.green(indexCart(cart)));
                    run();
                }
                else if (action == `cartTotal`){
                    const cartTotal = cart.reduce((acc, curr) => acc + Number(curr.priceInCents), 0);
                    inform(chalk.white(`\nYour Cart total is: $${Number.parseFloat(cartTotal/100).toFixed(2)}`) + `\n`);
                    run();
                }
                else if (action == `updateCart`){
                    inform(chalk.blue(index(soaps)));
                    rl.question(`Enter ID of the soap you would like to add to your Cart? `, (id) => {
                                updatedCart = updateCart(cart, soaps, id);
                                writeJSONFile("./data", "cart.json", updatedCart);
                                updatedSoaps = soaps;
                                writeJSONFile("./data", "soaps.json", updatedSoaps);
                                run();
                    });
                 }
                 else if (action == `removeFromCart`){
                    inform(chalk.green(indexCart(cart)));
                    rl.question(`Enter ID of the soap you would like to remove from your Cart? `, (id) => {
                        updatedCart = removeFromCart(cart, soaps, id);
                        writeJSONFile("./data", "cart.json", updatedCart);
                        updatedSoaps = soaps;
                        writeJSONFile("./data", "soaps.cart", updatedSoaps);
                        run();
                    });
                 }
                 else if (action == `emptyCart`) {
                     updatedCart = emptyCart(cart, soaps);
                     writeJSONFile("./data", "cart.json", updatedCart);
                     updatedSoaps = soaps;
                     writeJSONFile("./data", "soaps.cart", updatedSoaps);
                     run();
                    }
                else if (action == `quit`){
                    inform("\nThank you for shopping at Soap Store. Have a great Day!");
                    rl.close();
                }
                else
                    run();
            
                if (writeToCart && updatedCart) {
                    writeJSONFile("./data", "cart.json", updatedCart);
                }
            }); // end rl
        }; // end run

        inform(chalk.red(
            figlet.textSync("Soap Store", {
              font: "Caligraphy2",
              horizontalLayout: "default",
              verticalLayout: "default",
              width: 110,
              whitespaceBreak: false,
            }) + `\n`)
          );

         run();

// start();