const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const producst = [];

router.get( '/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    producst.push({ title: req.body.title});
    res.redirect('/');
});

exports.router = router;
exports.producst = producst;