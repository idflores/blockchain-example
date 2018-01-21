/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/blocks/block.js
Purpose:    containes the "Block" class and its methods; each block uses a
            sha256 hash for their identity
*/

const crypto = require('crypto')
const chalk = require('chalk')

const chain = require('./chain')

var Block = function (index, prevHash, data, timestamp) {
  // TODO: add block validation code

  // This is the block's identity to be included in `this.hash`.
  // As a rull, no block should be able to be altered without altering the hash.
  this.index = index
  this.prevHash = prevHash
  this.timestamp = timestamp
  this.data = data

  // The `hash` is calculated through the block's "identity" above.
  this.hash = this.calculateHash(this)
}

Block.prototype.calculateHash = function (block) {
  var content = block.index + block.prevHash + block.data + block.timestamp
  return crypto.createHash('sha256').update(content).digest('hex')
}

Block.generate = function (data) {
  const block = chain.getLatestBlock()
  return new Block(block.index + 1, block.hash, data, Date.now())
}

Block.isValid = function (newBlock, prevBlock) {
  if (typeof block.index !== 'number'
    || typeof block.hash !== 'string'
    || typeof block.prevHash !== 'string'
    || typeof block.timestamp !== 'number'
    || typeof block.data !== 'string')
  {
    console.log(chalk.red('Invalid block structure!'))
    return false
  }
  else if (prevBlock.index + 1 !== newBlock.index) {
    console.log(
      chalk.red('Invalid block index! Expected ' + prevBlock.index + 1))
    return false
  }
  else if (prevBlock.hash !== newBlock.prevHash) {
    console.log(chalk.red('Invalid reference block hash!'))
    return false
  }
  else if (this.calculateHash(newBlock) !== newBlock.hash) {
    console.log(chalk.red('Invalid block hash!'))
    return false
  }
  return true
}

module.exports = Block
