const { readJSONFile, writeJSONFile } = require("./src/helpers.js");
const { create, index, show, destroy, update, updateCart, removeFromCart, emptyCart, indexCart} = require("./src/soapController.js");
const chalk = require("chalk");
var figlet = require("figlet");
const lolcats = require("lolcats");

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const inform = console.log;

const rl = readline.createInterface({ input, output });

function run() { // main app

    let updatedSoaps = [];
    let updatedCart = [];
    let soaps = readJSONFile("./data", "soaps.json");
    let cart = readJSONFile("./data", "cart.json");
    
      rl.question(chalk.white(`What would you like to do?: `), (action) => { // main question
                    if (action == 'index'){
                        inform(chalk.blue(index(soaps) + '\n'));
                        run();
                    } else if (action == `create`){
                    rl.question (chalk.white(`What would you like to name your soap? `), (name) => {
                        rl.question (chalk.white(`How much should it cose (in cents)? `), (priceInCents) => {
                            if (Number(priceInCents) < 0){
                                inform(chalk.red(`\nCannot create soap, price must be in cents\n`));
                                run();
                            } else {
                            updatedSoaps = create(soaps, name, priceInCents);
                            writeJSONFile("./data", "soaps.json", updatedSoaps);
                            run();
                        
                    }
                }); // index cost
            }); // index name
        } // create
        
               else if (action == `show`){
                    rl.question (chalk.white(`What is the ID of the soap you would like to see? `), (id) => {
                        const soapById = show(soaps, id);
                        inform(chalk.green(soapById));
                        run();
                    }); // soap ID
                }  // show
                
                else if (action == `destroy`){
                if (soaps.length === 0) {
                    inform(chalk.red(`\nCurrent Inventory is Empty\n`));
                    run()
                } else {
                    rl.question(chalk.white(`Enter Soap ID to remove from database? `), (id) => {
                        updatedSoaps = destroy(soaps, id);
                        writeJSONFile("./data", "soaps.json", updatedSoaps);
                        run();
                    });
                }
            } // show
    
                 else if (action == `update`){
                    inform(`\n` + chalk.blue(index(soaps) + `\n`));
                    rl.question(chalk.white(`Enter ID of the soap you would like to update? `), (id) => {
                        if (soaps.find((soap) => soap.id === undefined)){
                            inform(chalk.red(`\nID not found in Current Inventory\n`))
                            run();
                        } else {
                        rl.question(chalk.white(`What would you like to call your new soap? `), (name) => {
                            rl.question(chalk.white(`What will be the price of the soap (in cents)? `), (priceInCents) => {
                                if (Number(priceInCents) < 0 ){
                                    inform(chalk.red(`\nCannot create soap, price must be in cents\n`));
                                    run();
                                }
                                updatedSoaps = update(soaps, id, name, priceInCents);
                                writeJSONFile("./data", "soaps.json", updatedSoaps);
                                run();
                            });
                        });
                    }
                });
            } //update

                else if (action == `indexCart`){
                    inform(chalk.green(indexCart(cart)));
                    run();
                } // indexCart
                else if (action == `cartTotal`){
                    const cartTotal = cart.reduce((acc, curr) => acc + Number(curr.priceInCents), 0);
                    inform(chalk.white(`\nYour Cart total is: $${Number.parseFloat(cartTotal/100).toFixed(2)}`) + `\n`);
                    run();
                } // cartTotal
                else if (action == `updateCart`){
                    inform(chalk.blue(index(soaps)));
                    rl.question(chalk.white(`Enter ID of the soap you would like to add to your Cart? `), (id) => {
                        if (soaps.find((soap) => soap.id === undefined)){
                            inform(chalk.red(`\nID not found in Cart\n`))
                        } else {
                        updatedCart = updateCart(cart, soaps, id);
                        writeJSONFile("./data", "cart.json", updatedCart);
                        updatedSoaps = soaps;
                        writeJSONFile("./data", "soaps.json", updatedSoaps);
                        run();
                        }
                    
                    });
                } // updateCart
                
                else if (action == `removeFromCart`){
                    if (cart.length === 0) {
                        inform(chalk.red(`\nCart is Empty\n`));
                        run();
                    } else {
                    inform(chalk.green(indexCart(cart)));
                    rl.question(chalk.white(`Enter ID of the soap you would like to remove from your Cart? `), (id) => {
                        if (cart.find((soap) => soap.id === id)){
                        updatedCart = removeFromCart(cart, soaps, id);
                        writeJSONFile("./data", "cart.json", updatedCart);
                        updatedSoaps = soaps;
                        writeJSONFile("./data", "soaps.cart", updatedSoaps);
                        run();
                    }
                    });
                }
            } // removeFromCart
                 
                 else if (action == `emptyCart`) {
                    if (cart.length > 0){
                        updatedCart = emptyCart (cart, soaps)
                        writeJSONFile("./data", "cart.json", []);
                        updatedSoaps = soaps;
                        writeJSONFile("./data", "soaps.cart", updatedSoaps);
                        run();
                    } else {
                        writeJSONFile("./data", "cart.jason", []);
                        inform(chalk.red(`Cart already empty.`));
                        run();
                    }
                    } // emptyCart

                else if (action == `quit`){
                    inform(chalk.white("\nThank you for shopping at Soap Store. Have a great Day!"));
                    rl.close();
                } // quit
                else
                    run();
            
                
            }); // end main question
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