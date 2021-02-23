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
router.get('/admin/edit-product/:productId', adminController.getEditProduct);

// POST METHOD

router.post('/add-product', adminController.postAddProduct);

exports.router = router;