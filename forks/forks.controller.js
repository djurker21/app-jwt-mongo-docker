const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const authorize = require('../_middleware/authorize')
const Role = require('../_helpers/role');
const forkService = require('./fork.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);

module.exports = router;

function getAll(req, res, next) {
  forkService.getAll(req.query)
        .then(forks => res.json(forks))
        .catch(next);
}

function getById(req, res, next) {
    forkService.getById(req.params.id)
        .then(fork => fork ? res.json(fork) : res.sendStatus(404))
        .catch(next);
}