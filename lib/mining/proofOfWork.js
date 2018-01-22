/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/mining/proofOfWork.js
Purpose:    contains static utilities for performing the Proof-of-Work puzzle
*/

var chalk = require('chalk')

var Block = require('../blocks/block.js')
var Chain = require('../blocks/chain.js')

// generate a new block every 10 seconds
const BLOCK_GENERATION_INTERVAL = 10000
// adjust the difficulty every 12 blocks which, given the block generation
// interval, is about 2 minutes
const DIFFICULTY_ADJUSTMENT_INTERVAL = 12

var PoW = {}

// Converts a given string to its binary representation
PoW.convertHashToBinary = function (hash) {
  var hexDef = {
    '0': '0000',  '1': '0001',  '2': '0010',  '3': '0011',
    '4': '0100',  '5': '0101',  '6': '0110',  '7': '0111',
    '8': '1000',  '9': '1001',  'A': '1010',  'B': '1011',
    'C': '1100',  'D': '1101',  'E': '1110',  'F': '1111'
  }

  var binaryStr = ''
  for (var i = 0; i < hash.length; i++) {
    binaryStr += hexDef[hash[i].toUpperCase()]
  }
  return binaryStr
}

/*
This method could cause performance to suffer. For example purposes, the method
has been left intentionally in a crude state; however, performance may be
increased optmizing memory usage and cleanup when block Objects are invalidated
by the peer network or otherwise.
*/
PoW.findBlock = function (currentBlock) {
  var Block = require('../blocks/block.js')
  var iBlock = new Block.interface()
  iBlock.index = currentBlock.getIndex()
  iBlock.prevHash = currentBlock.getPrevHash()
  iBlock.hash = currentBlock.getHash()
  iBlock.data = currentBlock.getData()
  iBlock.timestamp = currentBlock.getTimestamp()
  iBlock.difficulty = currentBlock.getDifficulty()
  iBlock.nonce = currentBlock.getNonce()

  while (true) {
    // TODO: rectify infinite loop without peer network invalidation
    const hash = Block.calculateHash(iBlock)
    if (this.hashMatchDifficulty(hash, iBlock.difficulty)) {
      iBlock.hash = hash
      return new Block(iBlock)
    }
    iBlock.nonce++
  }
}

PoW.getAdjDifficulty = function (latestBlock, currentChain) {
  const prevAdjBlock = currentChain.chain[currentChain.chain.length -
    DIFFICULTY_ADJUSTMENT_INTERVAL]
  const time = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL
  const timeElapsed = (latestBlock.getTimestamp() - prevAdjBlock.getTimestamp())

  if (time > timeElapsed / 2) return prevAdjBlock.getDifficulty() + 1
  else if (time < timeElapsed * 2) return prevAdjBlock.getDifficulty() - 1
  else return prevAdjBlock.getDifficulty()
}

PoW.getDifficulty = function (currentChain) {
  const latestBlock = currentChain.getLatestBlock()
  if (latestBlock.getIndex() % DIFFICULTY_ADJUSTMENT_INTERVAL === 0
    && latestBlock.getIndex() !== 0)
  {
    return this.getAdjDifficulty(latestBlock, currentChain)
  }
  else return latestBlock.getDifficulty()
}

// Performs test on hash value
PoW.hashMatchDifficulty = function (hash, difficulty) {
  const binaryHash = this.convertHashToBinary(hash)
  return binaryHash.startsWith('0'.repeat(difficulty))
}

module.exports = PoW
