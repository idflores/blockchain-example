/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/blocks/block.js
Purpose:    containes the "Block" class and its methods; each block uses a
            sha256 hash for their identity
*/

const crypto = require('crypto')
const chalk = require('chalk')

const Chain = require('./chain')
const PoW = require('../mining/proofOfWork.js')


var Block = function (iBlock) {
  // TODO: add block validation code

  // This is the block's identity to be included in `this.hash`.
  // As a rule, no block should be able to be altered without altering the hash.
  var _index = iBlock.index
  var _prevHash = iBlock.prevHash
  var _hash = iBlock.hash
  var _data = iBlock.data
  var _timestamp = iBlock.timestamp
  var _difficulty = iBlock.difficulty
  var _nonce = iBlock.nonce

  // accessor methods to prevent any block contents from being directly set
  this.getIndex = function () { return _index }
  this.getPrevHash = function () { return _prevHash }
  this.getHash = function () { return _hash }
  this.getData = function () { return _data }
  this.getTimestamp = function () { return _timestamp }
  this.getDifficulty = function () { return _difficulty }
  this.getNonce = function () { return _nonce }
}

Block.prototype.toString = function () {
  return chalk.yellow("Block") + " {\n" +
    "  Index:               " + this.getIndex() + "\n" +
    "  Previous Block Hash: " + this.getPrevHash() + "\n" +
    "  Block Hash:          " + this.getHash() + "\n" +
    "  Data:                " + this.getData() + "\n" +
    "  Timestamp:           " + new Date(this.getTimestamp()).toUTCString() +
    "\n" +
    "  Difficulty:          " + this.getDifficulty() + "\n" +
    "  Nonce:               " + this.getNonce() + "\n" +
  "}\n"
}

Block.interface = function () {
  this.index = null
  this.prevHash = null
  this.hash = null
  this.data = null
  this.timestamp = null
  this.difficulty = null
  this.nonce = null
}

Block.calculateHash = function (iBlock) {
  var content = ''
  for (var element in iBlock) {
    if (element !== 'hash') content += iBlock[element]
  }

  return crypto.createHash('sha256').update(content).digest('hex')
}

Block.generate = function (data, currentChain) {
  const latestBlock = currentChain.getLatestBlock()
  var iBlock = new this.interface()
  iBlock.index = latestBlock.getIndex() + 1
  iBlock.prevHash = latestBlock.getHash()
  iBlock.data = data
  iBlock.timestamp = Date.now()
  // TODO: get global difficulty from peers
  iBlock.difficulty = PoW.getDifficulty(currentChain)
  iBlock.nonce = 0
  iBlock.hash = this.calculateHash(iBlock)
  return new Block(iBlock)
}

Block.isValid = function (newBlock, prevBlock) {
  if (typeof newBlock.getIndex() !== 'number'
    || typeof newBlock.getHash() !== 'string'
    || typeof newBlock.getPrevHash() !== 'string'
    || typeof newBlock.getTimestamp() !== 'number'
    || typeof newBlock.getData() !== 'string'
    || typeof newBlock.getDifficulty() !== 'number'
    || typeof newBlock.getNonce() !== 'number')
  {
    console.log(chalk.magenta(newBlock))
    console.log(chalk.red('Invalid block structure!'))
    return false
  }

  if (prevBlock.getIndex() + 1 !== newBlock.getIndex()) {
    console.log(
      chalk.red('Invalid block index! Expected ' + prevBlock.getIndex() + 1))
    return false
  }

  if (prevBlock.getHash() !== newBlock.getPrevHash()) {
    console.log(chalk.red('Invalid reference block hash!'))
    return false
  }

  var iBlock = new this.interface()
  iBlock.index = newBlock.getIndex()
  iBlock.prevHash = newBlock.getPrevHash()
  iBlock.data = newBlock.getData()
  iBlock.timestamp = newBlock.getTimestamp()
  iBlock.difficulty = newBlock.getDifficulty()
  iBlock.nonce = newBlock.getNonce()
  if (this.calculateHash(iBlock) !== newBlock.getHash()) {
    console.log(chalk.red('Invalid block hash!'))
    return false
  }

  if (!this.validTimestamp(newBlock, prevBlock)) {
    console.log(chalk.red('Invalid timestamp!'))
  }

  return true
}

Block.validTimestamp = function (newBlock, prevBlock) {
  return (prevBlock.getTimestamp() - 60000 < newBlock.getTimestamp())
    && (newBlock.getTimestamp() - 60000 < Date.now())
}

module.exports = Block
