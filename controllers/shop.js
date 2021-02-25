const Product = require('../models/product');
const Cart = require('../models/cart');

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
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
           product: product,
           pageTitle: product.title,
           path: '/products'
        });
    });
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

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart' , {
                pageTitle: 'Cart Page',
                path: '/cart',
                products: cartProducts
            });
        });
    });
    
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
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