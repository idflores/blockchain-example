const Block = require('../lib/blocks/block.js')
const Chain = require('../lib/blocks/chain.js')

module.export = function (app) {

  app.get('/block', (req, res) => {
    res.send(Chain.chain)
  })

  app.post('/mineBlock', (req, res) => {
    res.send(Block.generate(req.body.data))
  })

  // app.get('/peers', (req, res) => {
  //   res.send(getSockets().map(s => {
  //     s._socket.remoteAddress + ":" + s._socket.remotePort
  //   }))
  // })
  //
  // app.post('/addPeer', (req, res) => {
  //   conectToPeers(req.body.peer)
  //   res.sendStatus(200)
  // })
}
