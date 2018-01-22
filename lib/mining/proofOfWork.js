/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/mining/proofOfWork.js
Purpose:    contains static utilities for performing the Proof-of-Work puzzle
*/

var Block = require('../blocks/block.js')
var Chain = require('../blocks/chain.js')

// generate a new block every 10 seconds
const BLOCK_GENERATION_INTERVAL = 10000
// adjust the difficulty every 12 blocks which, given the block generation
// interval, is about 2 minutes
const DIFFICULTY_ADJUSTMENT_INTERVAL = 12

var PoW = {}

// Converts a given string to its binary representation
PoW.convertToBinaryString = function (str) {
  if (str == undefined) {
    console.log(chalk.red("String cannot be undefined to convert to Binary!"))
    return undefined
  }

  var binaryStr = ''
  for (var i = 0; i < str.length; i++) {
    binaryStr += str[i].charCodeAt(0).toString(2)
  }
  return binaryStr
}

/*
This method could cause performance to suffer. For example purposes, the method
has been left intentionally in a crude state; however, performance may be
increased optmizing memory usage and cleanup when block Objects are invalidated
by the peer network or otherwise.
*/
PoW.findBlock = function (iBlock) {
  for (iBlock.nonce; true; iBlock.nonce++) {
    // TODO: rectify infinite loop without peer network invalidation
    if (this.hashMatchDifficulty(iBlock.hash, difficulty)) {
      return new Block(iBlock)
    }
  }
}

PoW.getAdjDifficulty = function (latestBlock, currentChain) {
  const prevAdjBlock = currentChain.chain[currentChain.chain.length -
    DIFFICULTY_ADJUSTMENT_INTERVAL]
  const time = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL
  const timeElapsed = (latestBlock.timestamp - prevAdjBlock.timestamp)

  if (time < timeElapsed / 2) return prevAdjBlock.difficulty + 1
  else if (time > timeElapsed * 2) return prevAdjBlock.difficulty - 1
  else return prevAdjBlock.difficulty
}

PoW.getDifficulty = function (currentChain) {
  const latestBlock = currentChain.getLatestBlock()
  if (latestBlock.getIndex() % DIFFICULTY_ADJUSTMENT_INTERVAL === 0
    && latestBlock.getIndex() !== 0)
  {
    return getAdjDifficulty(latestBlock, currentChain)
  }
  else return latestBlock.getDifficulty()
}

// Performs test on hash value
PoW.hashMatchDifficulty = function (hash, difficulty) {
  const binaryHash = convertToBinaryString(hash)
  const prefix = '0'.repeat(difficulty)
  return binaryHash.startsWith(prefix)
}

module.exports = PoW
