/*
Author:     Israel Flores (https://github.com/idflores)
File:       /src/block.js
Purpose:    containes the "Block" class and its methods; each block uses a
            sha256 hash for their identity
*/

const crypto = require('crypto')

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
  // make sure we do not hash an already hashed block
  if (typeof block.hash === 'string') {
    console.log("Block already has hash identity")
    return
  }

  var data = block.index + block.prevHash + block.data + block.timestamp
  return crypto.createHash('sha256').update(data).digest('hex')
}

Block.generate = function (data) {
  const block = chain.getLatestBlock()
  return new Block(block.index + 1, block.hash, data, Date.now())
}

module.exports = Block
