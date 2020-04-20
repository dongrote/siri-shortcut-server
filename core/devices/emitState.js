'use strict';
const state = require('./state'),
  Websockets = require('../Websockets');

exports = module.exports = () => Websockets.hasClients()
  ? state().then(devices => Websockets.emit('devices', devices))
  : Promise.resolve();
