/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/blocks/block.js
Purpose:    containes the "Block" class and its methods; each block uses a
            sha256 hash for their identity
*/

const crypto = require('crypto')
const chalk = require('chalk')

const Chain = require('./chain')
const P2PClient = require('../p2p/client.js')

var Block = function (iBlock) {
  // TODO: add block validation code

  // This is the block's identity to be included in `this.hash`.
  // As a rule, no block should be able to be altered without altering the hash.
  var _index = iBlock.index
  var _prevHash = iBlock.prevHash
  var _hash = iBlock.hash
  var _timestamp = iBlock.timestamp
  var _data = iBlock.data
  var _difficulty = iBlock.difficulty
  var _nonce = iBlock.nonce

  // accessor methods to prevent any block contents from being directly set
  var getIndex = function () { return _index }
  var getPrevHash = function () { return _prevHash }
  var getHash = function () { return _hash }
  var getTimestamp = function () { return _timestamp }
  var getData = function () { return _data }
  var getDifficulty = function () { return _difficulty }
  var getNonce = function () { return _nonce }
}

Block.interface = {
  index: null,
  prevHash: null,
  hash: null,
  data: null,
  timestamp: null,
  difficulty: null,
  nonce: null
}

Block.calculateHash = function (iBlock) {
  var content = ''
  for (var element in iBlock) {
    if (element !== 'hash') content += iBlock[element]
  }

  return crypto.createHash('sha256').update(content).digest('hex')
}

Block.generate = function (data) {
  const latestBlock = Chain.getLatestBlock()
  var iBlock = new this.interface
  iBlock.index = latestBlock.getIndex() + 1
  iBlock.prevHash = latestBlock.hash
  iBlock.data = data
  iBlock.timestamp = Date.now()
  // TODO: get global difficulty from peers
  iBlock.difficulty = P2PClient.getDifficulty()
  iBlock.nonce = latestBlock.nonce
  iBlock.hash = this.calculateHash(iBlock)
  return new Block(iBlock)
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

  if (prevBlock.getIndex() + 1 !== newBlock.getIndex()) {
    console.log(
      chalk.red('Invalid block index! Expected ' + prevBlock.getIndex() + 1))
    return false
  }

  if (prevBlock.getHash() !== newBlock.getPrevHash()) {
    console.log(chalk.red('Invalid reference block hash!'))
    return false
  }

  var iBlock = this.interface
  iBlock.index = newBlock.getIndex()
  iBlock.prevHash = newBlock.getPrevHash()
  iBlock.data = newBlock.getData()
  iBlock.timestamp = newBlock.getTimestamp()
  iBlock.difficulty = newBlock.difficulty()
  iBlock.nonce = newBlock.getNonce()
  if (this.calculateHash(iBlock) !== newBlock.getHash()) {
    console.log(chalk.red('Invalid block hash!'))
    return false
  }

  if (!validTimestamp(newBlock, prevBlock)) {
    console.log(chalk.red('Timestamp'))
  }

  return true
}

Block.validTimestamp = function (newBlock, prevBlock) {
  return (prevBlock.timestamp - 60000 < newBlock.timestamp)
    && (newBlock.timestamp - 60000 < Date.now())
}

module.exports = Block
