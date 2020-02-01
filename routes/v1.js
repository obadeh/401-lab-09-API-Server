'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../modules/categories.js');
const products = require('../modules/products.js');

function getModel(req, res, next) {
  let model = req.params.model;

  switch(model) {
    case "categories":
      req.model = categories;
      next();
      return;
    case "products":
      req.model = products;
      next();
      return;
    default:
      next('invalid model');
      return;
  }
}

router.param('model', getModel);

router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);
router.get('/api/v1/:model/:id', handleGetOne)
router.put('/api/v1/:model/:id', handleUpdate);
router.delete('/api/v1/:model/:id', handleDelete);


function handleGetAll(req, res, next) {
  req.model.get()
    .then(results => {
      console.log('******** results: *********', results);
      let count = results.length;
      res.status(200).json({ count, results });
    })
}

function handleGetOne(req, res, next) {
  let id = req.params.id;
  req.model.get(id)
    .then(record => {
      res.status(200).json(record)
    }).catch(next);
}

function handlePost(req, res, next) {
  req.model.create(req.body)
    .then(results => {
      res.status(201).json(results);
    }).catch(next);
}

function handleUpdate(req, res, next) {
  let id = req.params.id;
  req.model.update(id,req.body)
    .then(results => {
      res.status(200).json(results);
    }).catch(next);
}

function handleDelete(req, res, next) {
  let id = req.params.id;
  const message = 'Item is deleted';
  req.model.delete(id)
    .then(results => {
      res.status(200).json({message});
    }).catch(next);
}

module.exports = router;