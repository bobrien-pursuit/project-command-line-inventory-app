const { readJSONFile, writeJSONFile } = require("./src/helpers.js");
const { create, index, show, destroy, update, updateCart, removeFromCart, emptyCart, indexCart} = require("./src/soapController.js");
const chalk = require("chalk");
var figlet = require("figlet");
const lolcats = require("lolcats");

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const inform = console.log;

const rl = readline.createInterface({ input, output });

function run() {

    let writeToCart = false;
    let updatedSoaps = [];
    let updatedCart = [];
    let soaps = readJSONFile("./data", "soaps.json");
    let cart = readJSONFile("./data", "cart.json");
    
      rl.question(chalk.white(`What would you like to do?: `), (action) => {
                    if (action == 'index'){
                        inform(chalk.blue(index(soaps) + '\n'));
                        run();
                    }
                 else if (action == `create`){
                    rl.question (chalk.white(`What would you like to name your soap? `), (name) => {
                        rl.question (chalk.white(`How much should it cose (in cents)? `), (priceInCents) => {
                            updatedSoaps = create(soaps, name, priceInCents);
                            writeJSONFile("./data", "soaps.json", updatedSoaps);
                            run();
                        }); // end price
                    }); // end name
               } else if (action == `show`){
                    rl.question (chalk.white(`What is the ID of the soap you would like to see? `), (id) => {
                        const soapById = show(soaps, id);
                        inform(soapById);
                        run();
                    });
               } else if (action == `destroy`){
                if (soaps.length === 0) {
                    inform(chalk.red(`\nCurrent Inventory is Empty\n`))
                    run()
                } else {
                    rl.question(chalk.white(`Enter Soap ID to remove from database? `), (id) => {
                        updatedSoaps = destroy(soaps, id);
                        writeJSONFile("./data", "soaps.json", updatedSoaps);
                        run();
                    });
                }
            }
                 else if (action == `update`){
                    rl.question(chalk.white(`Enter ID of the soap you would like to update? `), (id) => {
                        rl.question(chalk.white(`What would you like to call your new soap? `), (name) => {
                            rl.question(chalk.white(`What will be the price of the soap (in cents)? `), (priceInCents) => {
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
                    rl.question(chalk.white(`Enter ID of the soap you would like to add to your Cart? `), (id) => {
                        updatedCart = updateCart(cart, soaps, id);
                        writeJSONFile("./data", "cart.json", updatedCart);
                        updatedSoaps = soaps;
                        writeJSONFile("./data", "soaps.json", updatedSoaps);
                        run();
                    });
                 }
                 else if (action == `removeFromCart`){
                    if (cart.length === 0) {
                        inform(chalk.red(`\nCart is Empty\n`));
                        run();
                    }
                    else{
                    inform(chalk.green(indexCart(cart)));
                    rl.question(chalk.white(`Enter ID of the soap you would like to remove from your Cart? `), (id) => {
                        updatedCart = removeFromCart(cart, soaps, id);
                        writeJSONFile("./data", "cart.json", updatedCart);
                        updatedSoaps = soaps;
                        writeJSONFile("./data", "soaps.cart", updatedSoaps);
                        run();
                    });
                }
                 }
                 else if (action == `emptyCart`) {
                     updatedCart = emptyCart(cart, soaps);
                     writeJSONFile("./data", "cart.json", updatedCart);
                     updatedSoaps = soaps;
                     writeJSONFile("./data", "soaps.cart", updatedSoaps);
                     run();
                    }
                else if (action == `quit`){
                    inform(chalk.white("\nThank you for shopping at Soap Store. Have a great Day!"));
                    rl.close();
                }
                else
                    run();
            
                if (writeToCart && updatedCart) {
                    writeJSONFile("./data", "cart.json", updatedCart);
                }
            }); // end rl
        }; // end run

        lolcats.print(
            figlet.textSync("Soap Store", {
              font: "Caligraphy2",
              horizontalLayout: "default",
              verticalLayout: "default",
              width: 110,
              whitespaceBreak: false,
            }) + `\n`);

         run();

// start();