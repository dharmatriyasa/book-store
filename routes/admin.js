const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// GET METHOD
router.get( '/add-product', productsController.getAddProduct);

// POST METHOD
router.post('/add-product', productsController.postAddProduct);

exports.router = router;