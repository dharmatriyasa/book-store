const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const producst = [];

// GET METHOD
router.get( '/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});

// POST METHOD
router.post('/add-product', (req, res, next) => {
    producst.push({ title: req.body.title});
    res.redirect('/');
});

exports.router = router;
exports.producst = producst;