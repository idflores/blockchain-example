/*
Author:     Israel Flores (https://github.com/idflores)
File:       /lib/mining/proofOfWork.js
Purpose:    contains static utilities for performing the Proof-of-Work puzzle
*/

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
    if (PoW.hashMatchDifficulty(iBlock.hash, difficulty)) {
      return new Block(iBlock)
    }
  }
}

// Performs test on hash value
PoW.hashMatchDifficulty = function (hash, difficulty) {
  const binaryHash = convertToBinaryString(hash)
  const prefix = '0'.repeat(difficulty)
  return binaryHash.startsWith(prefix)
}

module.exports = PoW
