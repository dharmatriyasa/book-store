const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/products',
            hasProducts: products.length > 0,
            activeShoo: true,
            productCSS: true
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    res.redirect('/');
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Home Page',
            path: '/',
            hasProducts: products.length > 0,
            activeShoo: true,
            productCSS: true
        });
    });
}

exports.getCart = (req, res, index) => {
    res.render('shop/cart' , {
        pageTitle: 'Cart Page',
        path: '/cart'
    });
}

exports.getOrders = (req, res, index) => {
    res.render('shop/orders' , {
        pageTitle: 'Orders Page',
        path: '/orders'
    });
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}