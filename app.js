/*
Author:     Israel Flores (https://github.com/idflores)
File:       /app.js
Purpose:    boots the server creating an instance of the blockchain client
*/

const app = (require('express'))()
const bodyParser = require('body-parser')
const chalk = require('chalk')
const fs = require('fs')
const https = require('https')
const path = require('path')
const WebSocket = require('ws')

const p2p = require('./lib/p2p/client.js')

const PORT = 443

// translate incling responses to JSON
app.use(bodyParser.json())

// get server routes
var routes = fs.readdirSync('routes')
for (var i = 0; i < routes.length ; i++) {
  if (path.extname(routes[i]) != '.js') continue
  else {
    var routes = require('./routes/' + routes[i])
    if (typeof routes === 'function') routes(app)
  }
}

// create the server instance and attach a WebSocket server instance
var server = https.createServer(app)
var wsServer = new WebSocket.Server({ server: server })

// configure the WebSocket server
p2p(wsServer)

// boot the server
server.listen(PORT, function () {
  console.log(chalk.green("Blockchain HTTPS Server running..."))
})

// instantiate the genesisBlock
// TODO: instantiate the genesis block only if a blockchain cannot be polled

// create instance of the blockchain
