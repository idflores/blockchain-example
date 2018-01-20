/*
Author:     Israel Flores (https://github.com/idflores)
File:       /src/block.js
Purpose:    containes the "Block" class and its methods; each block uses a
            sha256 hash for their identity
*/

const crypto = require("crypto")

var Block = function (index, prevHash, timestamp) {
  this.index = index
  this.prevHash = prevHash
  this.timestamp = timestamp
  this.data = "YAY Data!"

  this.hash = this.calculateHash(this)
  console.log(this.hash)
}

Block.prototype.calculateHash = function (block) {
  // make sure we do not hash an already hashed block
  if (Object.keys(block).includes('hash')) return block.hash

  var data = ''
  Object.keys(block).forEach(element => { data += element })
  console.log(data)
  return crypto.createHash('sha256').update(data).digest('hex')
}

module.exports = Block
