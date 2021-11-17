
// https://hypercore-protocol.org/guides/getting-started/hyperspace/

const { Server: HyperspaceServer } = require('hyperspace')

async function init(){
  const server = new HyperspaceServer({
    storage: './my-hyperspace-storage',
    host: 'my-hyperspace'
  })

  server.on('client-open', () => {
    // Our program has connected to the daemon
    console.log('(local) A HyperspaceClient has connected')
  })
  server.on('client-close', () => {
    // Our program has disconnected from the daemon
    console.log('(local) A HyperspaceClient has disconnected')
  })

  await server.ready()
  //console.log(server);
  console.log("hyper server init...");
}

init();