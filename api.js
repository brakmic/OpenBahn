import Hapi from 'hapi';
import path from 'path';
import Inert from 'inert';
import BahnService from './src/services/BahnService.js';
import bows from 'bows';
const log = bows('API');

require('es6-promise').polyfill();
require('isomorphic-fetch');


const server  = new Hapi.Server();
const service = new BahnService({ useLocalApi: false });

server.connection({ port: 3000, routes: { cors: true }  });

server.register(Inert, function () {});

server.route({
  method: 'GET'
, path: '/locations/{location?}'
, handler: function(req, reply) {
    let loc = req.params.location;
    if (loc) {
      return service.getLocations(loc)
                .then(r => r.json())
                .then(data => {
                    log(JSON.stringify(data, null, 4));
                    return reply(data);
                  })
                .catch(err => {
                  log(JSON.stringify(err, null, 4));
                  return reply({ message: 'error', data: err });
                });
    }
    reply('no result');
  }
});

/* start server */
server.start(function() {
    log('Server running at:', server.info.uri);
});
