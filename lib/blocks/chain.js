/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/blocks/chain.js
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

Chain.prototype.replace = function (newChain) {
  console.log('Received blockchain...')
  if (this.isValid(newChain) && this.consensus(newChain, this.chain)) {
    console.log('New chain is valid. Replacing chain.')
    this.chain = newChain
    // TODO: broadcast latest chain
  }
  else console.log(chalk.yellow('New chain is invalid!'))
}

Chain.consensus = function(newChain, prevChain) {
  var newDiffSum = 0
  var prevDiffSum = 0
  for (var i = 0; i < newChain.length; i++) {
    newDiffSum += Math.pow(2, newChain.chain[i].getDifficulty())
  }
  for (var i = 0; i < prevChain.length; i++) {
    prevDiffSum += Math.pow(2, prevChain.chain[i].getDifficulty())
  }

  if (newDiffSum > prevDiffSum) return true
  else return false
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

module.exports = Chain
