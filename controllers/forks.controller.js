const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize')
const forkService = require('../services/fork.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), createForkSchema, createFork);

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

function createForkSchema(req, res, next) {
  const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      createdYear: Joi.number().integer(),
      createdBy: Joi.number().integer()
  });
  validateRequest(req, next, schema);
}

function createFork(req, res, next) {
  forkService.createFork(req.body);
  console.log(req.body);
  res.json({created: 'success'});
}