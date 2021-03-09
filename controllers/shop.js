const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products',
            });
        })
        .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Alternative method
    Product.findAll({where: {id: prodId}})
        .then(product => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product[0].title,
                path: '/products'
             });
        })
        .catch(err => console.log(err));
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
             });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Home Page',
                path: '/',
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    console.log(products);
                    res.render('shop/cart' , {
                        pageTitle: 'Cart Page',
                        path: '/cart',
                        products: products
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for(product of products){
    //             const cartProductData = cart.products.find(
    //                 prod => prod.id === product.id
    //             );
    //             if(cartProductData){
    //                 cartProducts.push({productData: product, qty: cartProductData.qty});
    //             }
    //         }
    //         res.render('shop/cart' , {
    //             pageTitle: 'Cart Page',
    //             path: '/cart',
    //             products: cartProducts
    //         });
    //     });
    // });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantuty = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId} });
        })
        .then(products => {
            let product;
            if(products.length > 0){
                product = products[0];
            }
            if(product){
                const oldQuantity = product.cartItem.quantity;
                newQuantuty = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantuty }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
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