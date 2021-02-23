const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// GET METHOD

// admin/add-product 
router.get( '/add-product', adminController.getAddProduct);

// admin/products
router.get('/products', adminController.getProducts);

//admin/edit-product
router.get('/edit-product/:productId', adminController.getEditProduct);

// POST METHOD

//admin/add-product
router.post('/add-product', adminController.postAddProduct);

//admin/edit-product
router.post('/edit-product', adminController.postEditProduct);

exports.router = router;