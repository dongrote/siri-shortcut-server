'use strict';
const _ = require('lodash'),
  clients = require('./clients'),
  log = require('debug-logger')('core:Websockets:clientConnect');

exports = module.exports = client => {
  log.info(`client ${client.id} connected`);
  _.set(clients, client.id, client);
};
