// https://hypercore-protocol.org/guides/examples/hyperbee-app/

const { Client: HyperspaceClient } = require('hyperspace');
//const client = new HyperspaceClient();
const Hyperbee = require('hyperbee');


async function init(){
  console.log("hyper client init...");

  const client = new HyperspaceClient({
    host: 'my-hyperspace'
  })
  await client.ready(); // wait for .peers to be populated

  //console.log(client)
  //console.log(client.network.peers)
  //console.log(client.network.publickey)
  //console.log(client.network.keyPair)

  //let key = '747581522100e8894ed0d5f588ab1b65b4a3b31a911e6e7ebb533db7b1bc187b';
  // client.corestore().get(null) // new key
  // client.corestore().get(key) // set key
  // 

  const corestore = client.corestore();
  //
  console.log("ON FEED...")
  corestore.on('feed', async feed => {
    console.log('feed...');
  });

  corestore.on('append', () => {
    console.log('append...');
  });
  let key = '2caec71c9928fb0202979e6a997b888fc02f31dfc0b53eb24ddaad5cf84375ad';

  let bee = new Hyperbee(corestore.get(key), { //null= new key
    keyEncoding: 'utf8',
    valueEncoding: 'json'
  })
  await client.replicate(bee.feed) // fetch from the network

  await bee.ready()
  //console.log('New bee created, key:')
  //console.log(bee);
  console.log(bee.feed);
  // key  747581522100e8894ed0d5f588ab1b65b4a3b31a911e6e7ebb533db7b1bc187b
  // discoveryKey  f4f3e013d299ddf288aae0bfb123eeb1dfbeaa47554fbe7266d4923c30932238

  await bee.put('some-key', 'Foo bar');
  await bee.put('some-key1', 'Foo bar2');

  console.log(await bee.get('some-key'))
  console.log(await bee.get('some-key1'))
  
  console.log('end setup');

}

init();