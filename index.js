/*
Author:     Israel Flores (https://github.com/idflores)
File:       /index.js
Purpose:    boots the server creating an instance of the blockchain client
*/

const app = (require("express"))()
const bodyParser = require("body-parser")
const https = require("https")

const PORT = 443

// translate incling responses to JSON
app.use(bodyParser.json())

// boot the server
https.createServer(app).listen(PORT, function () {
  console.log("blockchain instance running...")
})

// instantiate the genesisBlock
// TODO: instantiate the genesis block only if a blockchain cannot be polled

// create instance of the blockchain
var Block = require('./lib/block.js')
console.log(new Block(2, 0, "YAY DATA!", 0))
