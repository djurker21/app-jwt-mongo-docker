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
router.get('/by-user/:userId', authorize(), getByUserId);
router.get('/by-category/:CategoryId', authorize(), getByCategoryId);

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
      createdBy: Joi.number().integer(),
      categoryId: Joi.number().integer()
  });
  validateRequest(req, next, schema);
}

function createFork(req, res, next) {
  forkService.createFork(req.body);
  res.json({created: 'success'});
}

function getByUserId(req, res, next) {
    forkService.getByUserId(req.params.userId, req.query)
        .then(forks => forks ? res.json(forks) : res.sendStatus(404))
        .catch(next);
}

function getByCategoryId(req, res, next) {
    forkService.getByCategoryId(req.params.CategoryId, req.query)
        .then(forks => forks ? res.json(forks) : res.sendStatus(404))
        .catch(next);
}