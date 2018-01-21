/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/chain.js
Purpose:    houses the utilities to handle useage of a block chain
*/

const chalk = require('chalk')

const Block = require('./block.js')

var Chain = function(chain) {
  this.chain = chain
}

Chain.prototype.getLatestBlock = function () {
  return this.chain[this.chain.length - 1]
}

Chain.isValid = function (chain) {
  for (var i = 1; i <= chain.length; i++) {
    if (!Block.isValid(chain[i], chain[i - 1])) {
      console.log(chalk.red('Chain is invalid!'))
      return false
    }
  }
  return true
}

Chain.prototype.replace = function (newChain) {
  console.log('Received blockchain...')
  if (this.isValid(newChain) && newChain.length > this.chain.length) {
    console.log('New chain is valid. Replacing chain.')
    this.chain = newChain
    // TODO: broadcast latest chain
  }
  else console.log(chalk.yellow('New chain is invalid!'))
}

module.exports = Chain
