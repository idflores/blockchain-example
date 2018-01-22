
module.exports = function (server) {
  server.on('listening', () => { console.log('WebSocket Server connected...')})
}
