module.exports = function () {

  const crypto = require('crypto')

  const Block = require('./blocks/block.js')
  const Chain = require('./blocks/chain.js')
  const genesisBlock = require('./blocks/genesisBlock.js')
  const PoW = require('./mining/proofOfWork.js')

  // instantiate a genesis block to a new chain
  var theChain = new Chain([genesisBlock()])
  console.log(theChain.chain[0].toString())

  // simulate the blockchain process (without Peer2Peer network implementation)
  while (true) {

    // assume we get some data from the network
    var data = "DATA" + crypto.randomBytes(20).toString('hex') + "DATA"

    // assuming it's updated from the network we validate the current chain
    if (!Chain.isValid(theChain.chain)) throw "Chain Invalid!"

    // we form a new block and perform the proof-of-work
    var block = Block.generate(data, theChain)
    var newBlock = PoW.findBlock(block)

    // add the block to the chain
    theChain.chain.push(newBlock)

    console.log(newBlock.toString())
  }
}
