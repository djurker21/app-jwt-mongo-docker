const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize')
const categoryService = require('../services/category.service');

// routes
router.get('/', authorize(), getAll);
router.post('/', authorize(), createCategorySchema, createCategory);
router.get('/:categoryId/subscribe-user/:userId', authorize(), subscribeUser);

module.exports = router;

function getAll(req, res, next) {
  categoryService.getAll(req.query)
        .then(categories => res.json(categories))
        .catch(next);
}

function createCategorySchema(req, res, next) {
  const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function createCategory(req, res, next) {
  categoryService.createCategory(req.body);
  res.json({created: 'success'});
}

function subscribeUser(req, res, next) {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    categoryService.subscribeUser(userId, categoryId);
    res.json({created: 'success'});
}