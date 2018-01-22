/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/blocks/genesisBlock.js
Purpose:    creates the first block in the block chain
*/

const crypto = require('crypto')

const Block = require('./block.js')
const PoW = require('../mining/proofOfWork.js')

module.exports = function () {

  // since this is the genesis block, we will hard-code the difficulty to
  // 0 for example purposes
  var iBlock = new Block.interface()
  iBlock.index = 0
  iBlock.prevHash =
    crypto.createHash('sha256').update(crypto.randomBytes(40)).digest('hex')
  iBlock.data = 'Yay, data!'
  iBlock.timestamp = Date.now()
  iBlock.difficulty = 1
  iBlock.nonce = 0

  iBlock.hash = Block.calculateHash(iBlock)

  // modify the nonce so the genesis block is valid
  var genesis = new Block(iBlock)
  return PoW.findBlock(genesis)
}
