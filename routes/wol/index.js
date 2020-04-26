'use strict';
const router = require('express').Router();
exports = module.exports = router;
const _ = require('lodash'),
  core = require('../../core'),
  create = require('./create');

router.get('/', (req, res, next) => core.wol.wake(_.get(req.query, 'mac', ''))
  .then(() => res.sendStatus(204))
  .catch(next));

router.post('/', create);
