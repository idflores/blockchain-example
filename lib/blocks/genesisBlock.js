/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/blocks/genesisBlock.js
Purpose:    creates the first block in the block chain
*/

const crypto = require('crypto')

const Block = require('./block.js')

module.exports = function () {

  var nonce = crypto.randomBytes(40)
  var hash = crypto.createHash('sha256').update(nonce).digest('hex')
  console.log(hash)
  return new Block (0, hash, data, Date.now())
}
